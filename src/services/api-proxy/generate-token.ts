import { AES } from 'crypto-js';

import { PROXY_SECRET, PROXY_AUTH_TEXT, PROXY_DATE_SECRET } from '~/enums';

export const generateToken = (): string => {
  const encryptedAuthText = AES.encrypt(PROXY_AUTH_TEXT, PROXY_SECRET);
  const encryptedDate = AES.encrypt(
    new Date().toISOString(),
    PROXY_DATE_SECRET,
  );

  return `${encryptedAuthText}::${encryptedDate}`;
};
