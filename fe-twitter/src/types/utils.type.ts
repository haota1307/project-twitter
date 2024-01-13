export interface SuccessResponseApi<Data> {
  message: string
  result: Data
}
export interface ErrorResponseApi<Data> {
  message: string
  errors?: Data
}

// cú pháp `-?` sẽ loại bỏ undefiend của key optional(handle?:)
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
