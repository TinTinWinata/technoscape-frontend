export interface IBackendInterface<T> {
  data: T;
  success: boolean;
  errorMessage: string;
}
