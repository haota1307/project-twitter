export const formatDate = (createdAt: string): string => {
  const date = new Date(createdAt)

  const day = date.getUTCDate()
  const month = date.getUTCMonth() + 1 // Tháng bắt đầu từ 0
  const year = date.getUTCFullYear()

  return `${day}/${month}/${year}`
}
