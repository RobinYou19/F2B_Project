import socket
import ujson



# code riped from https://github.com/javefang/pyaqara/tree/master/aqara


ADDR = '192.168.1.10'
PORT = 9898
AQARA_ENCRYPT_IV = b'\x17\x99\x6d\x09\x3d\x28\xdd\xb3\xba\x69\x5a\x2e\x6f\x58\x56\x2e'


sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

data = {"cmd": "get_id_list"}
pkt = ujson.encode(data).encode('utf8')

sock.sendto(pkt,(ADDR,PORT))
print(sock.recv(65507))
