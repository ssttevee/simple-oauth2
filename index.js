import coreModule from './lib/core';
import authCodeModule from './lib/client/auth-code';
import passwordModule from './lib/client/password';
import accessTokenModule from './lib/access-token';
import clientCredentialsModule from './lib/client/client';

export default class {
  constructor(config) {
    this.__config = config;
    this.__core = coreModule(config);
  }

  authorizationCode() {
    return authCodeModule(this.__core, this.__config);
  }

  ownerPassword() {
    return passwordModule(this.__core, this.__config);
  }

  accessToken() {
    return accessTokenModule(this.__core, this.__config);
  }

  clientCredentials() {
    return clientCredentialsModule(this.__core, this.__config);
  }
}
