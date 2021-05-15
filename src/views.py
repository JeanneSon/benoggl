from aiohttp import web, WSMsgType
import json
from cards import deck
import random

players = []
cardsDealt = 0
random.shuffle(deck)


async def index(request):
    return web.FileResponse('src/templates/index.html')

async def favicon(request):
    return web.FileResponse(path='C:/Users/HScha/1_python_programs/benoggl/src/img/Bay_schellen.svg')

async def nickname(request):
    print(request.app)
    try:
        data = await request.post()
        player = data['name']
        print("Creating a new player with name: ", player)
        players.append(player)
        response_obj = {'status': 'ok', 'message': 'Your name is ' + player, 'players': '&'.join(players)}
        for _ws in request.app['websockets']:
            await _ws.send_json({'player': player})
        return web.Response(text=json.dumps(response_obj), status=200)
    except Exception as e:
        response_obj = {'status': 'failed', 'message': str(e)}
        return web.Response(text=json.dumps(response_obj), status=500)

async def getCards(request):
    if len(players) == 4:
        if cardsDealt in [0, 11, 22, 33]:
            deal = deck[:11]
            del deck[:11]
            response_obj = {'status': 'ok', 'cards': ';'.join(deal)}
        else:
            response_obj = {'status': 'failed', 'message': 'No more cards!'}
    else:
        response_obj = {'status': 'failed', 'message': 'You need to be 4 players'}
    return web.Response(text=json.dumps(response_obj), status=200)

async def seeDabb(request):
    response_obj = {'status': 'failed', 'message': 'You cannot see the dabb for now'}
    if len(deck) == 4:
        response_obj = {'status': 'ok', 'cards': ';'.join(deck)}
    return web.Response(text=json.dumps(response_obj), status=200)


async def websocket_handler(request):
    ws = web.WebSocketResponse()
    await ws.prepare(request)
    request.app['websockets'].add(ws)
    async for msg in ws:
        if msg.type == WSMsgType.TEXT:
            if msg.data == 'close':
                await ws.close()
            else:
                await ws.send_str(msg.data + '/answer')
        elif msg.type == WSMsgType.ERROR:
            print('ws connection closed with exception %s' %
                  ws.exception())

    print('websocket connection closed')

    return ws