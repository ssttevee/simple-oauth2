/**
 * Clients credentials flow implementation
 */
export default (core, config) => {
  /**
   * Returns the Access Token Object
   * @param  {Object} params
   * @param  {String} params.scope A string that represents the application privileges
   * @return {Promise}
   */
  async function getToken(params) {
    const options = Object.assign({}, params, {
      grant_type: 'client_credentials',
    });

    return core.request(config.auth.tokenPath, options);
  }

  return {
    getToken,
  };
};
