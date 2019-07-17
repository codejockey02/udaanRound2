FANTASY LEAGUE

1. POST route => /signup
Payloads:
uname
password

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

4. POST route => /assign-points
Payloads:
uname,
points

Response:
message