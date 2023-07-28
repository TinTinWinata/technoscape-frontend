export type IResponseType<T> = {
  data: T | string;
  isError: boolean;
};
