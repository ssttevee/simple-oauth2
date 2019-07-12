import { getAuthorizationHeaderToken } from './encoding';

const defaultHeaders = {
  Accept: 'application/json',
};

export default (config) => {
  const headers = Object.assign({}, defaultHeaders, (config.http && config.http.headers));

  async function request(url, params) {
    let payload = params;
    const options = {
      method: 'POST',
      headers: Object.assign({}, headers),
    };

    if (!config || !config.options || !config.options.authorizationMethod || config.options.authorizationMethod === 'header') {
      const basicHeader = getAuthorizationHeaderToken(
        config.client.id,
        config.client.secret
      );

      options.headers['Authorization'] = `Basic ${basicHeader}`;
    } else {
      payload = Object.assign({}, payload, {
        [config.client.idParamName]: config.client.id,
        [config.client.secretParamName]: config.client.secret,
      });
    }

    if (!config || !config.options || !config.options.bodyFormat || config.options.bodyFormat === 'form') {
      // An example using `form` authorization params in the body is the
      // GitHub API.
      options.body = new URLSearchParams(payload).toString();
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    } else {
      // An example using `json` authorization params in the body is the
      // Amazon Developer Publishing API.
      options.body = JSON.stringify(payload);
      options.headers['Content-Type'] = 'application/json';
    }

    const result = await fetch(config.auth.tokenHost + url, options);

    return await result.json();
  }

  return {
    request,
  };
};
