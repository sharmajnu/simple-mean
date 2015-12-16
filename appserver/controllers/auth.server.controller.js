/**
 * Created by DEEPAK.SHARMA on 10/16/2015.
 */
var express = require('express');
var request = require('request');
var userController = require('./user.server.controller.js');
var router = express.Router();

var config = require('../config/config.js');

router.post('/google', function (req, res) {
    var url = "https://accounts.google.com/o/oauth2/token";
    var apiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

    var params = {
        client_id: req.body.clientId,
        redirect_uri: req.body.redirectUri,
        code: req.body.code,
        grant_type: 'authorization_code',
        client_secret: config.GOOGLE_CLIENT_SECRET

    };
    request.post(url, {
        json: true,
        form: params
    }, function (err, response, token) {
        console.log(token);
        var accessToken = token.access_token;
        var headers = {
            Authorization: 'Bearer ' + accessToken
        };



        request.get({
            url: apiUrl,
            headers: headers,
            json: true
        }, function (err, response, profile) {

            userController.findOrCreateUser(profile, res, token);
        })

    });
});

module.exports = router;