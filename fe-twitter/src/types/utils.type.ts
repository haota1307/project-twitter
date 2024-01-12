export interface SuccessResponseApi<Data> {
  message: string
  data: Data
}
export interface ErrorResponseApi<Data> {
  message: string
  data?: Data
}

// cú pháp `-?` sẽ loại bỏ undefiend của key optional(handle?:)
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
