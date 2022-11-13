import { StageEnum, STAGE } from '~/enums';

const ONE_HOUR_IN_SECONDS = 3600;

type RevalidatePages = {
  home: number;
};

const verifyEnv = (seconds: number): number =>
  STAGE !== StageEnum.Prod ? 5 : seconds;

export const revalidate: RevalidatePages = {
  home: verifyEnv(ONE_HOUR_IN_SECONDS),
};
