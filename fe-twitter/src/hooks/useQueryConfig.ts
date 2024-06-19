import useQueryParams from './useQueryParams'

export type QueryConfig = {
  [key in keyof any]: string
}

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = {
    page: queryParams.page || '1',
    limit: queryParams.limit || '20'
  }
  return queryConfig
}
