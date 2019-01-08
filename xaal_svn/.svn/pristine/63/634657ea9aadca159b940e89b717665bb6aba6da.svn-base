from . import dpts

# This file include the functions you can apply to data to 
# match and attribute


def bool_(attribute,dpt,data):
    val = dpts.decode[dpt](data)
    attribute.value = bool(val)

def bool_inv(attribute,dpt,data):
    val = dpts.decode[dpt](data)
    attribute.value = not bool(val)

def on_off(attribute,dpt,data):
    val = bool(dpts.decode[dpt](data))
    if val:
        attribute.value = 'ON'
    else:
        attribute.value = 'OFF'

def round_(attribute,dpt,data):
    val = dpts.decode[dpt](data)
    attribute.value = round(val)

def set_(attribute,dpt,data):
    val = dpts.decode[dpt](data)
    attribute.value = val

funct = {
    "bool"     : bool_,
    "bool_inv" : bool_inv,
    "round"    : round_,
    "set"      : set_,
    "on_off"   : on_off,
}