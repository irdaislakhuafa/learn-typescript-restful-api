# User API Spec

## Register User

Endpoint: POST /api/v1/users

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

## Get User

## Update User

## Logout User
