from setuptools import setup,find_packages

with open('README.rst') as f:
    long_description = f.read()

VERSION = "0.1"

setup(
    name='xaal.dashboard_robin',
    version=VERSION,
    license='GPL License',
    author='Robin You',
    author_email='robin.you@telecom-bretagne.eu',
    #url='',
    description=('xAAL Dashboard'),
    long_description=long_description,
    classifiers=[
        'Programming Language :: Python',
        'Topic :: Software Development :: Libraries :: Python Modules',
    ],
    keywords=['xaal', 'socketio','html','dashboard'],
    platforms='any',
    packages=find_packages(),
    include_package_data=True,

    install_requires=[
        'xaal.lib',
        'bottle',
        'gevent',
        'gevent-websocket',
        'python-socketio',
        'mako',
    ]
)
