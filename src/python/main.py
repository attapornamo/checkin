import serial
import _mysql

def config(filename):
    with open(filename) as config_file:
        setup = list()
        for config in config_file:
            setup.append(config.strip('\n').split('=')[1])

    return setup

def make_connection(setup):
    con = _mysql.connect(setup[0],setup[1],setup[2],setup[3])
    return con

def update_to_database(con, uid):
    q = con.query("INSERT INTO `records`(`uid`) VALUES ('"+str(uid)+"')")
    if(q):
        return True
    else:
        return False

db_setup = config('db.config')
serial_setup = config('serial.config')
con = make_connection(db_setup)

ser = serial.Serial(serial_setup[0],serial_setup[1])
while(True):
    while(ser.in_waiting):
        uid = int(ser.readline().decode())
        update_to_database(con,uid)
'''
status = update_to_database(con,uid)

if(status):
    print("Successfully Checked!")
else:
    print("There is an error")

    '''