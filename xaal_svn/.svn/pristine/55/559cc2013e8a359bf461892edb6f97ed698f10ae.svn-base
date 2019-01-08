
=================
xAAL Python stack
=================

Requirements
~~~~~~~~~~~~
To install xAAL for Python, you need Python3. Python version 3 isn't mandatory
but highly recommended (some parts haven't be tested with Python 2 since a while).
Install the following packages: 
  
- subversion 
- python3-dev
- libsodium-dev

For Debian / Ubuntu users: 

.. code-block:: bash
          
   $ apt-get install subversion python3-dev libsodium-dev 

Install
~~~~~~~
Right now, there is no public release (pip based) of xAAL Python binding, so
you have to install things from SVN or archive.

You can use virtualenv (recommended). 

First build a virtualenv :

.. code-block:: bash
                
   # for debian / ubuntu
   $ python3 -m virtualenv --python=python3 xaal_env

   # or
   $ virtualenv3 xaal_env 
   
   $ source xaal_env/bin/activate

Everytime, you want to use the binding, you must source the activate script.

Download sources from SVN:

.. code-block:: bash

   $ svn checkout https://redmine.telecom-bretagne.eu/svn/xaal/code/Python/trunk/ xaal_svn

First, install the xaal.lib package:

.. code-block:: bash
   
   $ cd xaal_svn/libs/lib/
   $ python setup.py develop

Install the monitor lib (needed by Dashboard, REST API..)

.. code-block:: bash
   
   $ cd xaal_svn/libs/monitor/
   $ python setup.py develop

Install the schemas (needed by some devices)

.. code-block:: bash
                
   $ cd xaal_svn/libs/schemas/
   $ python setup.py develop


Install the tools

.. code-block:: bash
                
   $ cd xaal_svn/apps/tools
   $ python setup.py develop

You can use the *python setup.py install* instead of *develop*, but modification
in source files, won't be applied, you have to re-install it. Right now develop,
is the best option. 

Create the configuration file in your home directory:

.. code-block:: bash

   $ mkdir ~/.xaal/
   $ cp xaal_svn/libs/lib/xaal.ini.sample ~/.xaal/xaal.ini
   $ xaal-keygen

xaal-keygen will compute an key for a given passphrase. Edit the xaal.ini
file according to your needs.

Tests
~~~~~
First, you can launch a message dumper with this tools

.. code-block:: bash

   $ xaal-dumper
   $ or xaal-tail 0

To start an fake lamp: 

.. code-block:: bash

   $ cd xaal_svn/devices/test/DummyDevices/
   $ python lamp.py

To check devices, you can use:

.. code-block:: bash

   # search alive devices 
   $ xaal-isalive

   # search lamp.basic devices
   $ xaal-isalive lamp.basic

   # search any kind of lamp 
   $ xaal-isalive lamp.any

   # display description / attribute
   $ xaal-info xxxxxxxxxxxxxx <- uuid

   # display description / attribute for all devices
   $ xaal-walker

   # same but on for lamp devices
   $ xaal-walker lamp.any


Coding style
~~~~~~~~~~~~
Every xAAL program (device, gateway, apps) use a namespace. For example, xaal.rest,
or xaal.zwave. By convention, you can run everything just by calling the namespace
module.

.. code-block:: bash

   # to run the meta data sever:
   $ python -m xaal.metadb

   # to run the dashboard (web interface)
   $ python -m xaal.dashboard

   # to run the Zwave gateway
   $ python -m xaal.zwave
   
Of course, you find need to install needed packages. 
   

Notes
~~~~~
- If you use xAAL on multiple hosts, take care of the system clock. xAAL use
  date/time to cypher the messages. If clocks differs, you will receive an error
  message about a "replay attack". In production, NTP is your best friend. A window
  of 1 minutes is accepted, but no more. 


FAQ
~~~
- Python terminated by signal SIGSEGV: You probably forgot to setup the key in
  config file.

- Configuration files are hard to read / edit. Why don't you use YAML or XML
  for config ?

  First, we need something that support nested config so we can not use 
  ConfigParser. Next, we tested severals YAML packages, but they are really 
  slow to import. We want xAAL stack to load as fast as possible, and importing
  big packages (like PyYAML) take around 0.5 sec on a Raspy. This is way too 
  much for a simple command-line tools like xaal-info for example.
  We want to provide a better user experience.
  
