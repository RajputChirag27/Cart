const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
var redis = require('redis');
var JWTR =  require('jwt-redis').default;
var redisClient = redis.createClient();
var jwtr = new JWTR(redisClient);

const secretKey = process.env.JWT_SECRET_KEY;

const revokedTokens = new Set();

function checkTokenRevocation(req, res, next) {
  const token = req.headers.authorization;

  if (token && revokedTokens.has(token)) {
    jwtr.destroy(token)
    return res.status(401).json({ message: "Token has been revoked" });
  }
  next();
}

module.exports = {checkTokenRevocation, revokedTokens};