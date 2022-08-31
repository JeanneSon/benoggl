from aiohttp import web
import aiohttp_jinja2
import jinja2
import weakref

from routes import setup_routes
from settings import config, BASE_DIR


app = web.Application()
app['config'] = config
app['websockets'] = weakref.WeakSet()

#aiohttp_jinja2.setup(app, loader=jinja2.FileSystemLoader(str(BASE_DIR / 'src' / 'templates')))

setup_routes(app)
#web.run_app(app, host='192.168.2.104')
web.run_app(app, host='10.10.24.203')