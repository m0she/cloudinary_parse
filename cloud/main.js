cloudinary_sign = require("cloud/cloudinary_sign");
var _ = require('cloud/lib/underscore');
Parse.Cloud.define("get_signature", function(request, response) {
    if (!request.user || !request.user.authenticated()) {
        response.error("Needs an authenticated user");
        return;
    }
    response.success(cloudinary_sign.sign({tags: request.user.getUsername()}));
});
