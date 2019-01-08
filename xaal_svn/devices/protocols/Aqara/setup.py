from setuptools import setup,find_packages


with open('README.rst') as f:
    long_description = f.read()

VERSION = "0.1"

setup(
    name='xaal.aqara',
    version=VERSION,
    license='GPL License',
    author='Jerome Kerdreux',
    author_email='Jerome.Kerdreux@imt-atlantique.fr',
    #url='',
    description=('xAAL devices for Xiaomi / Aqara' ),
    long_description=long_description,
    classifiers=[
        'Programming Language :: Python',
        'Topic :: Software Development :: Libraries :: Python Modules',
    ],
    keywords=['xaal', 'aqara'],
    platforms='any',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'xaal.lib',
        'gevent',
        'pycrypto',
    ]
)
