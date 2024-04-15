export const extractHashtags = (content: string) => {
  const regex = /#\w+/g // Biểu thức chính quy để tìm các chuỗi hashtag (bắt đầu bằng # và theo sau là các ký tự chữ)
  const hashtags = content.match(regex) // Sử dụng phương thức match để lấy ra các chuỗi hashtag từ nội dung

  if (hashtags) {
    // Nếu tìm thấy các hashtag
    return hashtags.map((tag) => tag.slice(1)) // Loại bỏ ký tự "#" từ mỗi hashtag và trả về mảng mới
  } else {
    return [] // Trả về mảng rỗng nếu không tìm thấy hashtag
  }
}
