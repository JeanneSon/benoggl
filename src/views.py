from aiohttp import web
import aiohttp_jinja2
import json
from cards import deck
import random

players = []
cardsDealt = 0
random.shuffle(deck)



@aiohttp_jinja2.template('index.html')
async def index(request):
    return
    #return web.Response(text="Hello, index of Benoggl")

async def favicon(request):
    return web.FileResponse(path='C:/Users/HScha/1_python_programs/benoggl/src/img/Bay_schellen.svg')

async def nickname(request):
    try:
        data = await request.post()
        player = data['name']
        print("Creating a new player with name: ", player)
        players.append(player)
        response_obj = {'status': 'ok', 'message': 'Your name is ' + player, 'players': '&'.join(players)}
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