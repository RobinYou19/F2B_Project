""" 
This file contains some helpers functions. This functions aren't used in the lib itself
but can be usefull for xaal packages developpers
"""

import logging
import logging.handlers
import os
import coloredlogs

from . import config,Engine

def singleton(class_):
  instances = {}
  def getinstance(*args, **kwargs):
    if class_ not in instances:
        instances[class_] = class_(*args, **kwargs)
    return instances[class_]
  return getinstance

def set_console_title(value):
    # set xterm title
    print("\x1B]0;xAAL => %s\x07" % value )

def setup_console_logger(level=config.log_level):
     coloredlogs.install(level=level)

def setup_file_logger(name,level=config.log_level,filename = None):
    filename = filename or os.path.join(config.log_path,'%s.log' % name)
    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(name)s - %(message)s')
    handler = logging.handlers.RotatingFileHandler(filename, 'a', 10000, 1, 'utf8')
    handler.setLevel(level)
    handler.setFormatter(formatter)
    # register the new handler
    logger = logging.getLogger(name)
    logger.root.addHandler(handler)
    logger.root.setLevel('DEBUG')

def run_package(pkg_name,pkg_setup,console_log = True,file_log=False):
    if console_log:
        set_console_title(pkg_name)
        setup_console_logger()
    if file_log:
        setup_file_logger(pkg_name)
    eng = Engine()
    logger = logging.getLogger(pkg_name)
    logger.info('starting xaal package: %s'% pkg_name )
    result = pkg_setup(eng)
    if result != True:
        logger.critical("something goes wrong with package: %s" % pkg_name)
    try:
        eng.run()
    except KeyboardInterrupt:
        logger.info("exit")
