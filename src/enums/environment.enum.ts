export enum Environment {
  Development = 'development',
  Production = 'production',
}

export enum StageEnum {
  Local = 'local',
  Prod = 'prod',
  Dev = 'dev',
}

export const STAGE: StageEnum[number] =
  process.env.NEXT_PUBLIC_STAGE || StageEnum.Local;

export const NODE_ENV =
  STAGE !== Environment.Production
    ? Environment.Development
    : Environment.Production;

export const SITE_URL = process.env.NEXT_PUBLIC_URL;
