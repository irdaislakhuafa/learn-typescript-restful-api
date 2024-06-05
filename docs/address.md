# Address API Spec

## Create Address

Endpoint: POST /api/v1/contacts/:idContact/addresses
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

## Get Address

## Update Address

## Remove Address

## List Address
