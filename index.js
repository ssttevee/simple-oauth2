import coreModule from './lib/core';
import authCodeModule from './lib/client/auth-code';
import passwordModule from './lib/client/password';
import accessTokenModule from './lib/access-token';
import clientCredentialsModule from './lib/client/client';

export default class {
  constructor(config) {
    this.__config = config || {};
    this.__config.client = this.__config.client || {};
    this.__config.client.idParamName = this.__config.client.idParamName || 'client_id';
    this.__config.options = this.__config.options || {};
    this.__config.options.authorizationMethod = this.__config.options.authorizationMethod || 'header';
    this.__config.options.bodyFormat = this.__config.options.bodyFormat || 'form';
    
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
