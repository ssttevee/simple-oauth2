/**
 * Authorization Code flow implementation
 */
export default (core, config) => {
  const authorizeUrl = new URL(config.auth.authorizePath, config.auth.authorizeHost || config.auth.tokenHost);

  /**
   * Redirect the user to the autorization page
   * @param  {String} params.redirectURI A string that represents the registered application URI
   *                                     where the user is redirected after authentication
   * @param {String|Array<String>} params.scope A String or array of strings
   *                                     that represents the application privileges
   * @param {String} params.state A String that represents an option opaque value used by the client
   *                              to main the state between the request and the callback
   * @return {String} the absolute authorization url
   */
  function authorizeURL(params = {}) {
    const baseParams = {
      response_type: 'code',
      [config.client.idParamName]: config.client.id,
    };

    if (Array.isArray(params.scope)) {
      params.scope = params.scope.join(',');
    }

    const options = Object.assign({}, baseParams, params);

    return `${authorizeUrl}?${new URLSearchParams(options)}`;
  }

  /**
   * Returns the Access Token Object
   * @param  {String} params.code Authorization code (from previous step)
   * @param  {String} params.redirecURI A string that represents the callback uri
   * @return {Promise}
   */
  async function getToken(params) {
    const options = Object.assign({}, params, {
      grant_type: 'authorization_code',
    });

    return core.request(config.auth.tokenPath, options);
  }

  return {
    authorizeURL,
    getToken,
  };
};
