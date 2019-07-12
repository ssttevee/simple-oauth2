export function useFormURLEncode(value) {
  return encodeURIComponent(value).replace(/%20/g, '+');
}

export function getAuthorizationHeaderToken(clientID, clientSecret) {
  const encodedCredentials = `${useFormURLEncode(clientID)}:${useFormURLEncode(clientSecret)}`;

  return btoa(encodedCredentials);
}
