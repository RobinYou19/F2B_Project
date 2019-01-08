from setuptools import setup,find_packages


with open('README.rst') as f:
    long_description = f.read()

VERSION = "0.1"

setup(
    name='xaal.pushbullet',
    version=VERSION,
    license='GPL License',
    author='Jerome Kerdreux',
    author_email='Jerome.Kerdreux@imt-atlantique.fr',
    #url='',
    description=('xAAL notification for pushbullet' ),
    long_description=long_description,
    classifiers=[
        'Programming Language :: Python',
        'Topic :: Software Development :: Libraries :: Python Modules',
    ],
    keywords=['xaal', 'pushbullet'],
    platforms='any',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'xaal.lib',
        'pushbullet.py',
    ]
)