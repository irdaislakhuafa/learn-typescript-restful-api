# User API Spec

## Register User

Endpoint: POST /api/v1/auth/register

Request:

```json
{
  "name": "Irda Islakhu Afa",
  "username": "irdaislakhuafa",
  "password": "12345678"
}
```

Response (success):

```json
{
  "data": {
    "name": "Irda Islakhu Afa",
    "username": "Irda Islakhu Afa"
  }
}
```

Response (failed):

```json
{
  "errors": ["username must not blank"]
}
```

## Login User

Endpoint: POST /api/v1/auth/login

Request:

```json
{
  "username": "irdaislakhuafa",
  "password": "12345678"
}
```

Response (success):

```json
{
  "data": {
    "name": "Irda Islakhu Afa",
    "username": "Irda Islakhu Afa",
    "token": "${uud}"
  }
}
```

Response (failed):

```json
{
  "errors": ["username or password not match"]
}
```

## Get Current User

Endpoint: GET /api/v1/users/current

Request Header:

- x-api-header: `${token here}`

Response (success):

```json
{
  "data": {
    "name": "Irda Islakhu Afa",
    "username": "Irda Islakhu Afa"
  }
}
```

Response (failed):

```json
{
  "errors": ["unauthorized"]
}
```

## Update User

Endpoint: PATCH /api/v1/users/current

Request Header:

- x-api-header: `${token here}`

Request:

```json
{
  "name": "Irda Islakhu Afa",
  "username": "irdaislakhuafa"
}
```

Response (success):

```json
{
  "data": {
    "name": "Irda Islakhu Afa",
    "username": "Irda Islakhu Afa"
  }
}
```

Response (failed):

```json
{
  "errors": ["unauthorized"]
}
```

## Logout User
