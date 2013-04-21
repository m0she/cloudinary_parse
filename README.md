# Cloud code
## Files

* `main.js` contains a sample cloud function (`get_signature`) that returns a necessary data to perform a direct upload to cloudinary. 
The sample function requires an authenticated Parse user and embeds the username into the tags field.   
The returned data can be used to construct an HTML form or passed to cloudinary front-end libraries to initiate an image upload. 
* `cloudinary_sign.coffee` exports one function (`sign`) which signs a request using the parameters provided
* `cloudinary_sign.js` compiled from `cloudinary_sign.coffee` using CoffeeScript
* `cloudinary_config.js` holds cloudinary configuration as demonstrated in `cloudinary_config.js.sample` 

## Setup the sample project

* [Signup or login to Parse](https://parse.com/#signup)
* [Create a new app](https://parse.com/apps/new)
* Install the Cloud Code Command Line Tool (See [Cloud Code Guide](https://parse.com/docs/cloud_code_guide#started) for more info)
* Create a new project with `parse new`
* Copy the files in this package to the new project folder
* Create cloudinary configuration file (`cloudinary_config.js`)
* Deploy your code `parse deploy`

You're now ready to go

# Sample usage with cURL
## Signup 

    curl -X POST \
      -H "X-Parse-Application-Id: APP-ID" \
      -H "X-Parse-REST-API-Key: REST-API-KEY" \
      -H "Content-Type: application/json" \
      -d '{"username":"user","password":"pass"}' \
      https://api.parse.com/1/users

## Login

    curl -X GET \
      -H "X-Parse-Application-Id: APP-ID" \
      -H "X-Parse-REST-API-Key: REST-API-KEY" \
      -G \
      --data-urlencode 'username=user' \
      --data-urlencode 'password=pass' \
      https://api.parse.com/1/login

Response:

    {
      "username":"user",
      "createdAt":"2013-04-21T12:55:41.891Z",
      "updatedAt":"2013-04-21T12:55:41.891Z",
      "objectId":"JovCXZZxk7",
      "sessionToken":"SESSION-TOKEN"
    }


## Get signature

Use `sessionToken` from login response

    curl -X POST \
      -H "X-Parse-Application-Id: APP-ID" \
      -H "X-Parse-REST-API-Key: REST-API-KEY" \
      -H "X-Parse-Session-Token: SESSION-TOKEN" \
      -H "Content-Type: application/json" \
      -d '{}' \
      https://api.parse.com/1/functions/get_signature

Resposne:

    {
      "result": {
        "fields": {
          "timestamp":1366555048,
          "tags":"user",
          "signature":"cloudinary_signature",
          "api_key":"my_api_key"
        },
        "form_attrs": {
          "action":"https://api.cloudinary.com/v1_1/my_cloud_name/image/upload",
          "method":"POST",
          "enctype":"multipart/form-data"
        }
      }
    }

## Upload image

Using the response from `get_signature`:

    curl -X POST \
      -F timestamp=1366555048 \
      -F tags=user \
      -F signature=cloudinary_signature \
      -F api_key="my_api_key" \
      -F file=@my_image.jpg \
      http://api.cloudinary.com/v1_1/my_cloud_name/image/upload

Response:

    {
      "public_id":"k3vmeifbepxddbzjuop9",
      "version":1366555348,
      "signature":"signature_of_resposne",
      "width":453,
      "height":604,
      "format":"jpg",
      "resource_type":"image",
      "created_at":"2013-04-21T15:31:06Z",
      "tags":["user"],
      "bytes":52534,
      "type":"upload",
      "url":"http://res.cloudinary.com/my_cloud_name/image/upload/v1366555348/k3vmeifbepxddbzjuop9.jpg",
      "secure_url":"https://cloudinary-a.akamaihd.net/my_cloud_name/image/upload/v1366555348/k3vmeifbepxddbzjuop9.jpg"
    }
