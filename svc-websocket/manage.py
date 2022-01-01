# #!/usr/bin/env python3

from flask import session, copy_current_request_context, render_template, request
from flask_socketio import SocketIO, send, disconnect
from app import create_app
from threading import Lock
import os
import requests
import json
from datetime import timedelta

thread = None
thread_lock = Lock()
app = create_app()

clients = {}
socketio = SocketIO(app, async_mode='eventlet', cors_allowed_origins='*', ping_timeout=10, ping_interval=5, logging=True, engineio_logger=True)

@app.route('/')
def index():
    return render_template('index.html', async_mode=socketio.async_mode)

@socketio.on('connect_request')
def connect_request(message):
    session['receive_count'] = session.get('receive_count', 0) + 1
    send({'data': message['data'], 'count': session['receive_count']})

@socketio.on('question')
def question(message):
    session['receive_count'] = session.get('receive_count', 0) + 1
    payload = dict(question=message['data'], auth=os.getenv("SECRET_KEY"))
    r = requests.post(os.getenv("SVC_FLASK_ENDPOINT")+'/api/knowledge', data=payload)
    if isinstance(r.json()['data']['answer'],str):
        send({'data': r.json()['data']['answer'], 'count': session['receive_count']})
    else:
        for row in r.json()['data']['answer']:
            send({'data': row, 'count': session['receive_count']})
            session['receive_count'] = session.get('receive_count', 0) + 1

@socketio.on('disconnect_request')
def disconnect_request():
    @copy_current_request_context
    def can_disconnect():
        disconnect()

    session['receive_count'] = session.get('receive_count', 0) + 1
    send({'data': 'Disconnected!', 'count': session['receive_count']},
         callback=can_disconnect)

if __name__ == '__main__':
    socketio.run(app, os.environ.get('APP_HOST', os.getenv("APP_HOST")), port=int(os.environ.get('APP_PORT', 5001)))
    while True:
        socketio.sleep(0)