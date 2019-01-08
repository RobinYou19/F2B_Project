import tmux


sess = tmux.Tmux('xAAL')


sess.add_window("GW","~/run","python -m xaal.zwave")
sess.add_pane("python -m xaal.owm")
#sess.add_pane("python -m xaal.htu21d")

sess.add_window("Web","~/run","python -m xaal.rest")
sess.add_pane("python -m xaal.dashboard")

sess.add_window("TAIL","~/run","xaal-tail 3")
sess.add_pane("xaal-log")

sess.add_window("MetaDB","~/run","python -m xaal.metadb")
sess.add_window("FakeLamp","~/run","python xaal_svn/devices/test/DummyDevices/lamp.py 7c89ced8-5e8c-11e8-b4b3-b827ebc3cbdf")


sess.run()
