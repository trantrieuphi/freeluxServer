
# DB
## user
- 

# API

## Auth
In local, url is: http://localhost:3000
### Register
Method: POST
Register user
```
{url}/api/auth/register
```
Request body example:
```
{
    "firstName": "user123",
    "lastName" : "tran",
    "email": "freeluxmail@gmail.com",
    "username": "freelux",
    "password": "phi127"
}
```
Reponse:
- user info
- jwt token

### Login
Login user
```
{url}/api/auth/login
```
Request body example:
```
{
    "username": "nghia",
    "password": "phi127"
}
```
Response:
- user info
- jwt token

### Verify
Verify user
```
{url}/api/auth/verify
```
Request example:
- Body:
```
{
    "verifyCode": "600195"
}
```
- Header:
```
Authorization: Bearer {{jwt token}}
```
Response:
- message: "verify successfully"

### Send Verify code again:
Verify user
```
{url}/api/auth/resend-verify-code
```
Request example:
- Body:
```
{
    "verifyCode": "600195"
}
```
- Header:
```
Authorization: Bearer {{jwt token}}
```
Response:
- message: "verify successfully"




