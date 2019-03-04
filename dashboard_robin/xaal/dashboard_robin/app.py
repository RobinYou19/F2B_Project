from gevent import monkey; monkey.patch_all()


from bottle import default_app,debug,get,redirect,static_file,TEMPLATE_PATH


from gevent.pywsgi import WSGIServer
from geventwebsocket.handler import WebSocketHandler


from .pages import default_pages
from .core import xaal_core
from .core import sio 

import os

HOME = os.path.dirname(__file__)

@get('/static/<filename:path>')
def send_static(filename):
    root = os.path.join(HOME,'static')
    return static_file(filename, root=root)

@get('/')
def goto_home():
    redirect('/login')
    
def run():
    """ start the xAAL stack & launch the HTTP stuff"""
    # add the default template directory to the bottle search path
    root = os.path.join(HOME,'templates')
    TEMPLATE_PATH.append(root)

    xaal_core.setup()
    # debug disable template cache & enable error reporting
    debug(True)
    bottle_app = default_app()
    app = sio.setup(bottle_app)
    
    server = WSGIServer(("", 9090), app, handler_class=WebSocketHandler)
    server.serve_forever()
    
def main():
    try:
        run()
    except KeyboardInterrupt:
        print("Bye Bye...")
    
if __name__ == '__main__':
    main()
