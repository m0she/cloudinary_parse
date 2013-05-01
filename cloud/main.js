cloudinary_sign = require("cloud/cloudinary_sign");
var _ = require('cloud/lib/underscore');
Parse.Cloud.define("sign_upload_request", function(request, response) {
    if (!request.user || !request.user.authenticated()) {
        response.error("Needs an authenticated user");
        return;
    }
    response.success(
        cloudinary_sign.sign_upload({tags: request.user.getUsername()})
    );
});
