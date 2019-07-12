import isDate from 'date-fns/isDate';
import parse from 'date-fns/parse';
import addSeconds from 'date-fns/addSeconds';

export default (token) => {
  const parsedTokenProps = {};

  if ('expires_at' in token) {
    if (!isDate(token.expires_at)) {
      parsedTokenProps.expires_at = parse(token.expires_at);
    }
  } else if ('expires_in' in token) {
    parsedTokenProps.expires_at = addSeconds(
      new Date(),
      Number.parseInt(token.expires_in, 10)
    );
  }

  return Object.assign({}, token, parsedTokenProps);
};
