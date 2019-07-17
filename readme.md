FANTASY LEAGUE
The base URL is "https://udaan2416.herokuapp.com/"

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
playername,
points
{By default, 11 players have been created namely, player1, player2,....player11}

Response:
message

5. POST route => /create-players
Payloads:
playername,

Response:
message

6. POST route => /fetch-score
Payloads:
all 11 playername

Response:
message