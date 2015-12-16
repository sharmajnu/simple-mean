var User = require('../models/user.server.model.js');
var jwt = require('jwt-simple');

var secret = 'This is top secret';

function createPayloadAndSendResponse(user, token, res){

    var encoded = jwt.encode(token, secret, 'HS512');
    res.status(200).json({user: user, token: encoded});
}

var findOrCreate = function (profile, res, token) {

    User.findOne({googleId: profile.sub}, function (err, foundUser) {
        if (foundUser) {
            createPayloadAndSendResponse(foundUser.toObject(), token, res);

        } else {
            var newUser = new User({
                name: profile.name,
                googleId: profile.sub,
                email: profile.email
            });

            newUser.save();
            createPayloadAndSendResponse(newUser.toObject(), token, res);
        }
    });
};



module.exports = {findOrCreateUser: findOrCreate};

