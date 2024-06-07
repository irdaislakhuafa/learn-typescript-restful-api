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

Endpoint: GET /api/v1/contacts/:contactID

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

Endpoint: DELETE /api/v1/contacts/:id

Request Header:

- x-api-header: `${token here}`

Response (success):

```json
{
  "data": "ok"
}
```

Response (failed):

```json
{
  "errors": ["contact not found"]
}
```

## Search Contact

Endpoint: SEARCH /api/v1/contacts

Query Parameter:

- `name`: string, contact first_name or last_name, optional
- `phone`: string, contact phone, optional
- `email`: string, contact email, optional
- `page`: number, page number, default 1
- `size`: number, size data, default 1

Request Header:

- x-api-header: `${token here}`

Response (success):

```json
{
  "paging": {
    "current_page": 1,
    "total": 10,
    "size": 10
  },
  "data": [
    {
      "id": 1,
      "first_name": "Irda",
      "last_name": "Islakhu Afa",
      "email": "i@gmail.com",
      "phone": "0812345678910"
    },
    {
      "id": 2,
      "first_name": "Irda",
      "last_name": "Islakhu Afa",
      "email": "i@gmail.com",
      "phone": "0812345678910"
    }
  ]
}
```

Response (failed):

```json
{
  "errors": ["unauthorized"]
}
```
