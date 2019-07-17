FANTASY LEAGUE

1. POST route => /signup
Payloads:
name
uname
password
contact

Response:
message

2. POST route => /login
Payloads:
uname
password

Response:
message

3. POST route => /admin-login
Payloads:
uname: 'admin'
password: '123'

Response:
User array in message