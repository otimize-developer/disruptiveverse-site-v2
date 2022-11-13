export enum ErrorEnum {
  InternalServerError = '500',
  BadRequest = '400',
  NotFound = '404',
}

export const ERROR_PATHS_STATUS_CODE = {
  '/_error': ErrorEnum.InternalServerError,
  '/500': ErrorEnum.InternalServerError,
  '/404': ErrorEnum.NotFound,
};
