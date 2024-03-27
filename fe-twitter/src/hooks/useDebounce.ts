import { useEffect, useState } from 'react'

// DEBOUNCE: SET --> đợi 400ms --> submit; SET --> đợi 200ms --> tiếp tục set --> clear timeout --> đợi....
export const useDebounce = <T>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timeOut)
  }, [value, delay])
  return debouncedValue
}
