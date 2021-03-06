from views import index
from views import favicon
from views import nickname
from views import getCards
from views import seeDabb
from views import websocket_handler

def setup_routes(app):
    app.router.add_get( '/',             index)
    app.router.add_get( '/favicon.ico',  favicon)
    app.router.add_post('/nickname',     nickname)
    app.router.add_get( '/getCards',     getCards)
    app.router.add_get( '/seeDabb',      seeDabb)
    app.router.add_get( '/ws',           websocket_handler)
    app.router.add_static('/static', 'src/static', name='static')