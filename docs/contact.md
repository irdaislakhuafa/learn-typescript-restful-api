# Contact API Spec

## Create Contact

Endpoint: POST /api/v1/contacts

Request Header:

- x-api-header: `${token here}`

Request:

```json
{
  "first_name": "Irda",
  "last_name": "Islakhu Afa",
  "email": "i@gmail.com",
  "phone": "0812345678910"
}
```

Response (success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Irda",
    "last_name": "Islakhu Afa",
    "email": "i@gmail.com",
    "phone": "0812345678910"
  }
}
```

Response (failed):

```json
{
  "errors": ["first_name must not blank"]
}
```

## Get Contact

Endpoint: GET /api/v1/contacts/:id

Request Header:

- x-api-header: `${token here}`

Response (success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Irda",
    "last_name": "Islakhu Afa",
    "email": "i@gmail.com",
    "phone": "0812345678910"
  }
}
```

Response (failed):

```json
{
  "errors": ["contact not found"]
}
```

## Update Contact

Endpoint: PUT /api/v1/contacts/:id

Request Header:

- x-api-header: `${token here}`

Request:

```json
{
  "first_name": "Irda",
  "last_name": "Islakhu Afa",
  "email": "i@gmail.com",
  "phone": "0812345678910"
}
```

Response (success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Irda",
    "last_name": "Islakhu Afa",
    "email": "i@gmail.com",
    "phone": "0812345678910"
  }
}
```

Response (failed):

```json
{
  "errors": ["contact not found"]
}
```

## Delete Contact

## Search Contact
