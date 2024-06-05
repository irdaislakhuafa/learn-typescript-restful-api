# Address API Spec

## Create Address

Endpoint: POST /api/v1/contacts/`:contactID`/addresses

Request Header:

- x-api-header: `${token here}`

Request:

```json
{
  "street": "street name",
  "city": "city name",
  "province": "province name",
  "country": "country name",
  "postal_code": "123456"
}
```

Response (success):

```json
{
  "data": {
    "id": 1,
    "street": "street name",
    "city": "city name",
    "province": "province name",
    "country": "country name",
    "postal_code": "123456"
  }
}
```

Response (failed):

```json
{
  "errors": ["country cannot be blank"]
}
```

## Get Address

Endpoint: GET /api/v1/contacts/`:contactID`/addresses/`:addressID`

Request Header:

- x-api-header: `${token here}`

Response (success):

```json
{
  "data": [
    {
      "id": 1,
      "street": "street name",
      "city": "city name",
      "province": "province name",
      "country": "country name",
      "postal_code": "123456"
    }
  ]
}
```

Response (failed):

```json
{
  "errors": ["address is not found"]
}
```

## Update Address

Endpoint: PUT /api/v1/contacts/`:contactID`/addresses/`:addressID`

Request Header:

- x-api-header: `${token here}`

Request:

```json
{
  "street": "street name",
  "city": "city name",
  "province": "province name",
  "country": "country name",
  "postal_code": "123456"
}
```

Response (success):

```json
{
  "data": {
    "id": 1,
    "street": "street name",
    "city": "city name",
    "province": "province name",
    "country": "country name",
    "postal_code": "123456"
  }
}
```

Response (failed):

```json
{
  "errors": ["country cannot be blank"]
}
```

## Remove Address

Endpoint: DELETE /api/v1/contacts/`:contactID`/addresses/`:addressID`

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
  "errors": ["address is not found"]
}
```

## List Address
