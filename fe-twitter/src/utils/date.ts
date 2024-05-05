export const formatDate = (createdAt: string): string => {
  const date = new Date(createdAt)

  const day = date.getUTCDate()
  const month = date.getUTCMonth() + 1 // Tháng bắt đầu từ 0
  const year = date.getUTCFullYear()

  return `${day}/${month}/${year}`
}

export const formatTime = (createdAt: string): string => {
  const time = new Date(createdAt)

  const hour = time.getHours()
  const minute = time.getMinutes()

  return `${hour}:${minute < 10 ? '0' + minute : minute}`
}
