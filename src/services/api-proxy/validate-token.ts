import { AES, enc } from 'crypto-js';

import {
  PROXY_EXPIRE_TOKEN_SECONDS,
  PROXY_DATE_SECRET,
  PROXY_AUTH_TEXT,
  PROXY_SECRET,
} from '~/enums';
import { isValidDate, differenceInSeconds } from '~/utils/date';

export const validateToken = (token?: string | null): boolean => {
  if (!token) {
    return false;
  }

  const splitToken = token.split('::');

  if (splitToken.length !== 2) {
    return false;
  }

  const [encryptedAuthText, encryptedDate] = splitToken;

  const decryptedDateString = AES.decrypt(
    encryptedDate,
    PROXY_DATE_SECRET,
  ).toString(enc.Utf8);

  const decryptedDate = new Date(decryptedDateString);

  if (!isValidDate(decryptedDate)) {
    return false;
  }

  if (
    differenceInSeconds(decryptedDate, new Date(), { abs: true }) >
    PROXY_EXPIRE_TOKEN_SECONDS
  ) {
    return false;
  }

  const decryptedAuthText = AES.decrypt(
    encryptedAuthText,
    PROXY_SECRET,
  ).toString(enc.Utf8);

  if (decryptedAuthText !== PROXY_AUTH_TEXT) {
    return false;
  }

  return true;
};
