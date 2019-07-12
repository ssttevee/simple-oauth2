'use strict';

const authCodeModule = require('./lib/client/auth-code');
const passwordModule = require('./lib/client/password');
const accessTokenModule = require('./lib/access-token');
const clientCredentialsModule = require('./lib/client/client');

module.exports = {

  /**
   * Creates a new simple-oauth2 client with the provided configuration
   * @param  {Object}  opts Module options as defined in schema
   * @returns {Object} The simple-oauth2 client
   */
  create(options = {}) {
    return {
      accessToken: accessTokenModule(options),
      ownerPassword: passwordModule(options),
      authorizationCode: authCodeModule(options),
      clientCredentials: clientCredentialsModule(options),
    };
  },
};
