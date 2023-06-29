import { isAxiosError, AxiosError } from "axios"

import HttpStatusCode from "src/constants/httpStatusCode.enum"

export const isErrorOfAxios = <T>(error: unknown): error is AxiosError<T> => {
  return isAxiosError(error)
}

export const isAxiosUnprocessableEntityError = <FormError>(error: unknown): error is AxiosError<FormError> => {
  return isErrorOfAxios(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
