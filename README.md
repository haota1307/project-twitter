Tổng hợp chức năng chính

# 1. Tài khoản người dùng

**1.1. Đăng nhập**

- 1.1.1. Đăng nhập với gmail và mật khẩu

  - Xác thực token: access token và refresh token
  - Thực hiện refresh token khi access token hết hạn

- 1.1.2. Đăng nhập với google(Oauth 2.0)

**1.2. Đăng ký**

**1.3. Đổi mật khẩu**

**1.4. Quên mật khẩu**

**1.5. Đăng xuất**

**1.6. Xem thông tin người dùng**

**1.7. Thay đổi thông tin người dùng**

- Username
- Thông tin cá nhân: name, bio, date of birth
- Thay đổi avatar, cover photo

# 2. Tương tác người dùng

**2.1. Tương tác với người khác**

- Theo dõi
- Hủy theo dõi
- Nhắn tin

**2.2 Bài viết**

- Tạo bài viết(hashtag, image or video)
- Xóa bài viết cá nhân
- Like bài viết

  - Tạo like
  - Hủy like

- Comment bài viết
- Bookmark bài viết

  - Tạo bookmark
  - Hủy bookmark

**2.3 Tìm kiếm**

- Tìm kiếm bài viết
- Tìm kiếm người dùng

# 3. Khác

- Send email xác thực tài khoản
- Send email reset mật khẩu(Quên mật khẩu)
- Lưu file aws

---

## Giới thiệu về TypeScript

- TypeScript là một ngôn ngữ lập trình mã nguồn mở, phát triển bởi Microsoft. Nó là một siêu tập hợp (superset) của JavaScript, có nghĩa là nó bổ sung các tính năng mới và mở rộng của JavaScript bằng cách thêm vào các khái niệm từ các ngôn ngữ lập trình khác như Java hoặc C#. Mục tiêu chính của TypeScript là tăng cường tính đúng đắn và quản lý mã nguồn trong quá trình phát triển phần mềm lớn và phức tạp.

- Các đặc điểm chính của TypeScript bao gồm:

  - Kiểu dữ liệu tĩnh: TypeScript cho phép khai báo kiểu dữ liệu cho biến, tham số hàm, giá trị trả về của hàm và các thành phần khác của mã nguồn. Điều này giúp phát hiện lỗi và cung cấp các thông báo cảnh báo trong quá trình biên dịch, giúp làm giảm các lỗi trong quá trình chạy ứng dụng.

  - Kiểu dữ liệu động: TypeScript vẫn hỗ trợ kiểu dữ liệu động như JavaScript, nhưng nó cung cấp tính năng kiểm tra kiểu dữ liệu tại thời điểm biên dịch.

  - Cú pháp được mở rộng: TypeScript bổ sung các tính năng mới cho JavaScript như interfaces, generics, enums và các kiểu dữ liệu phức tạp hơn, giúp tạo ra mã nguồn dễ đọc và dễ bảo trì hơn.

  - Hỗ trợ tiện ích lập trình: TypeScript đi kèm với các công cụ hỗ trợ như TypeScript Compiler (tsc) để biên dịch mã nguồn TypeScript thành mã nguồn JavaScript, cũng như các trình biên tập mã như Visual Studio Code có hỗ trợ tốt cho TypeScript.

## Giới thiệu về React

- React (hay còn được gọi là React.js hoặc ReactJS) là một thư viện JavaScript front-end mã nguồn mở và miễn phí để xây dựng giao diện người dùng dựa trên các thành phần UI riêng lẻ. Nó được phát triển và duy trì bởi Meta (trước đây là Facebook) và cộng đồng các nhà phát triển và công ty cá nhân. React có thể được sử dụng làm cơ sở để phát triển các ứng dụng SPA (Single page application), thiết bị di động hoặc ứng dụng được kết xuất bằng máy chủ với các thư viện khác như Next.js. Tuy nhiên, React chỉ hướng tới việc quản lý trạng thái và hiển thị trạng thái đó cho DOM, vì vậy việc tạo ứng dụng bằng React thường yêu cầu sử dụng thêm các thư viện bổ sung để thực hiện định tuyến trang, cũng như thêm một số chức năng ở phía máy khách.

- Các đặc điểm chính của ReactJS bao gồm:

  - Components (Các thành phần): ReactJS chia giao diện người dùng thành các thành phần độc lập, có thể tái sử dụng và tự đủ để xử lý việc hiển thị dữ liệu. Mỗi thành phần có thể chứa mã HTML, CSS và JavaScript của riêng nó, giúp tách biệt logic và giao diện người dùng.

  - Virtual DOM (DOM ảo): ReactJS sử dụng một cơ chế gọi là Virtual DOM để tối ưu hóa hiệu suất của ứng dụng. Thay vì cập nhật trực tiếp DOM mỗi khi có thay đổi trong dữ liệu, React tạo ra một bản sao của DOM (Virtual DOM), thực hiện các thay đổi trên bản sao này, và sau đó so sánh với DOM thực sự để cập nhật chỉ những phần cần thiết. Điều này giúp giảm thiểu số lượng thao tác trên DOM và cải thiện hiệu suất của ứng dụng.

  - One-way Data Binding (Ràng buộc dữ liệu một chiều): Trong ReactJS, dữ liệu luôn được truyền từ các thành phần cha đến các thành phần con theo một chiều duy nhất. Điều này giúp dễ dàng theo dõi và quản lý dữ liệu trong ứng dụng, cũng như tránh được các vấn đề liên quan đến xung đột dữ liệu.

  - JSX (JavaScript XML): ReactJS sử dụng JSX, một phần mở rộng của JavaScript, để viết các mẫu giao diện người dùng dưới dạng mã JavaScript. JSX cho phép viết mã HTML bên trong mã JavaScript, giúp tạo ra mã nguồn dễ đọc và dễ hiểu hơn.

## Giới thiệu về Tailwind CSS

- Tailwind CSS là một thư viện CSS được thiết kế để giúp phát triển giao diện người dùng nhanh chóng và dễ dàng. Nó không phải là một framework CSS truyền thống như Bootstrap hay Foundation, mà là một tập hợp các lớp CSS được đặt tên theo các chức năng cụ thể.

- Các đặc điểm chính của Tailwind CSS bao gồm:

  - Utility-First: Tailwind CSS tập trung vào việc cung cấp một tập hợp các lớp CSS đơn giản và đa dạng, mỗi lớp thực hiện một chức năng cụ thể như căn chỉnh, kích thước, màu sắc, hiển thị, và nhiều hơn nữa. Thay vì viết CSS tùy chỉnh từ đầu hoặc sử dụng các thành phần được xây sẵn, bạn có thể sử dụng các lớp này trực tiếp trong mã HTML.

  - Customizable: Mặc dù Tailwind CSS cung cấp một số lượng lớp CSS mặc định, nhưng bạn vẫn có thể tùy chỉnh và mở rộng chúng để phù hợp với nhu cầu cụ thể của dự án của bạn. Bằng cách sử dụng các công cụ như Tailwind Config, bạn có thể điều chỉnh các thiết lập của Tailwind CSS và tạo ra các lớp CSS mới.

  - Responsive Design: Tailwind CSS hỗ trợ thiết kế đáp ứng bằng cách cung cấp các lớp CSS cho các breakpoint khác nhau, giúp điều chỉnh giao diện người dùng dựa trên kích thước của màn hình.

  - Highly Composable: Với cách tiếp cận utility-first, bạn có thể kết hợp các lớp CSS lại với nhau để tạo ra giao diện phức tạp, mà không cần phải viết CSS tùy chỉnh.

## Giới thiệu về Express.js

- Express.js là một framework web được xây dựng trên nền tảng Node.js, giúp việc phát triển ứng dụng web và API trở nên đơn giản và nhanh chóng. Express.js được thiết kế để làm việc với Node.js một cách linh hoạt, cho phép xử lý các yêu cầu HTTP, quản lý session, xử lý routing, và thực hiện nhiều chức năng khác liên quan đến phía server.

- Các đặc điểm chính của Express.js bao gồm:

  - Routing: Express.js cung cấp một cách tiếp cận dễ dàng để xác định các endpoint (điểm kết thúc) của ứng dụng và xử lý các yêu cầu từ phía client. Bằng cách sử dụng các phương thức như GET, POST, PUT, DELETE, bạn có thể định nghĩa các tuyến đường và xử lý các yêu cầu tương ứng.

  - Middleware: Middleware là các hàm được thực thi theo trình tự trong quá trình xử lý yêu cầu. Express.js cho phép bạn sử dụng middleware để thực hiện các chức năng như xác thực, xử lý lỗi, logging, và nhiều hơn nữa. Middleware giúp tách biệt logic xử lý yêu cầu thành các phần nhỏ và dễ quản lý.

  - Template Engine Support: Express.js hỗ trợ nhiều template engine khác nhau như EJS, Pug, và Handlebars để tạo ra các trang HTML động dựa trên dữ liệu từ server.

  - Cấu trúc dự án mở rộng: Express.js không yêu cầu một cấu trúc dự án cụ thể nào và cho phép bạn tự do tổ chức mã nguồn của ứng dụng theo cách bạn muốn. Điều này giúp cho việc phát triển ứng dụng linh hoạt và dễ dàng mở rộng.

## Giới thiệu về Node.JS

- Node.js là một nền tảng phát triển ứng dụng web được xây dựng trên JavaScript. Nó cho phép viết mã nguồn JavaScript chạy phía server, thay vì chỉ chạy trên trình duyệt như trong môi trường web truyền thống.

- Các đặc điểm chính của Node.js bao gồm:

  - JavaScript Everywhere: Node.js cho phép sử dụng JavaScript để xây dựng cả phía server và phía client của ứng dụng web, giúp đơn giản hóa việc phát triển và duy trì mã nguồn. Điều này cũng có nghĩa là các nhà phát triển có thể chia sẻ mã nguồn giữa phía client và phía server.

  - Asynchronous và Non-blocking I/O: Node.js sử dụng mô hình I/O không chặn (non-blocking I/O) và các hàm gọi lại (callbacks) để xử lý các yêu cầu mạng và I/O. Điều này giúp tối ưu hóa hiệu suất của ứng dụng, đặc biệt là khi xử lý các yêu cầu mạng đồng thời.

  - Cộng đồng lớn và Hệ sinh thái phong phú: Node.js có một cộng đồng phát triển lớn và mạnh mẽ, cung cấp nhiều thư viện và framework cho phát triển ứng dụng. Nhiều công cụ và thư viện bổ sung cũng đã được xây dựng để hỗ trợ việc phát triển ứng dụng Node.js.

  - Cross-platform: Node.js được hỗ trợ trên nhiều nền tảng hệ điều hành như Windows, macOS và Linux, cho phép viết mã một lần và chạy trên nhiều môi trường khác nhau.

## Giới thiệu về MongoDB

- MongoDB là một hệ quản trị cơ sở dữ liệu NoSQL mã nguồn mở, được thiết kế để lưu trữ và quản lý lượng dữ liệu lớn theo cách linh hoạt và có khả năng mở rộng cao. Thay vì sử dụng các bảng và hàng như trong các cơ sở dữ liệu quan hệ thì MongoDB sử dụng các collections và các documents.
- Các đặc điểm chính của MongoDB bao gồm:

  - Document-Oriented: MongoDB lưu trữ dữ liệu dưới dạng các tài liệu BSON (Binary JSON), cho phép lưu trữ các cấu trúc dữ liệu phức tạp với nhiều cấp độ lồng nhau. Mỗi tài liệu có thể có các trường khác nhau, điều này mang lại sự linh hoạt lớn trong việc lưu trữ và quản lý dữ liệu.

  - Schema-less: MongoDB không yêu cầu một schema cố định, cho phép các tài liệu trong cùng một collection có cấu trúc khác nhau. Điều này rất hữu ích trong các ứng dụng cần sự linh hoạt và thay đổi cấu trúc dữ liệu thường xuyên.

  - Scalability and Performance: MongoDB được thiết kế để có khả năng mở rộng ngang (horizontal scaling) thông qua sharding, cho phép phân phối dữ liệu và tải công việc trên nhiều máy chủ. Điều này giúp tăng cường khả năng xử lý của hệ thống khi lưu trữ và truy xuất lượng dữ liệu lớn.

  - Indexing: MongoDB hỗ trợ nhiều loại chỉ mục (indexes), giúp tăng tốc độ truy vấn dữ liệu. Bạn có thể tạo các chỉ mục đơn giản, phức tạp, và toàn văn bản để tối ưu hóa hiệu suất truy vấn.

  - Aggregation Framework: MongoDB cung cấp một framework mạnh mẽ để xử lý và chuyển đổi dữ liệu, cho phép thực hiện các phép tính tổng hợp phức tạp, nhóm dữ liệu, và xử lý dữ liệu theo pipeline.

## Giới thiệu về xác thực bằng JWT(Json web token), access token, refresh token

- JWT:
  - JWT (JSON Web Token) là một chuẩn mở dựa trên JSON để tạo ra các token truy cập, thường được sử dụng để chứng thực và ủy quyền trong các ứng dụng web và API.
  - JWT bao gồm ba phần chính, mỗi phần được mã hóa dưới dạng Base64Url và nối với nhau bằng dấu chấm (.):
    - Header (Phần đầu): Phần này chứa thông tin về loại token (thường là "JWT") và thuật toán mã hóa được sử dụng để tạo chữ ký (ví dụ: HMAC SHA256 hoặc RSA). Header sau đó được mã hóa dưới dạng chuỗi Base64Url.
    - Payload: Phần này chứa các thông tin mà người dùng định nghĩa. Payload cũng được mã hóa dưới dạng chuỗi Base64Url.
    - Signature: Phần này được tạo bằng cách dùng thuật toán HMACSHA256 (cái này có thể thay đổi) với nội dung là Base64 encoded Header + Base64 encoded Payload kết hợp một "secret key" (khóa bí mật). Signature (Chữ ký) giúp đảm bảo tính toàn vẹn và bảo mật của thông tin trong JWT.
- Access token:
  - Access Token là một chuỗi mã hóa ngắn hạn được cấp cho người dùng sau khi họ đã xác thực thành công. Nó được sử dụng để truy cập các tài nguyên bảo vệ (protected resources) trên máy chủ trong một khoảng thời gian ngắn.
  - Đặc điểm:
    - Thời gian sống ngắn: Thường có thời gian sống (TTL - Time to Live) ngắn, ví dụ từ vài phút đến một giờ. Điều này giúp giảm thiểu rủi ro nếu token bị đánh cắp.
    - Chứa thông tin người dùng và quyền hạn: Access token thường chứa các thông tin mã hóa về người dùng và quyền truy cập của họ. Thông tin này có thể được mã hóa dưới dạng JWT (JSON Web Token).
    - Gửi kèm trong mỗi yêu cầu: Access token được gửi kèm trong mỗi yêu cầu HTTP đến API hoặc máy chủ bảo vệ tài nguyên, thường qua tiêu đề(Headers) "Authorization: Bearer <token>."
- Refresh Token:
  - Refresh Token là một chuỗi mã hóa dài hạn hơn được cấp cùng với access token sau khi người dùng xác thực thành công. Nó được sử dụng để lấy một access token mới khi access token hiện tại hết hạn mà không cần yêu cầu người dùng xác thực lại.
  - Đặc điểm chính:
    - Thời gian sống dài: Có thời gian sống dài hơn so với access token, có thể từ vài ngày đến vài tuần hoặc hơn.
    - Bảo mật cao: Refresh token thường được lưu trữ an toàn hơn, như trong các cookie bảo mật hoặc lưu trữ bảo mật trên client.
    - Không gửi kèm trong mỗi yêu cầu: Không giống như access token, refresh token không được gửi kèm trong mỗi yêu cầu tới API.

# Phân tích chức năng

## Đăng nhập

### Đăng nhập với email và password

- Phía người dùng(Client)
  - Khi người dùng ấn vào nút "Login" hiện ra một cửa sổ đăng nhập cho người dùng nhập email và password.
  - Khi này ta sẽ kiểm tra giá trị nhập vào của người dùng có hợp lệ với quy định hay không:
    - Với email: Người dùng bất buộc phải nhập đúng định dạng email(VD: xxx@gmail.com).
    - Với password: Người dùng bất buộc nhập đúng định dạng như là đủ kí tự in hoa, in thường ,số, kí tự đặc biệt, độ dài từ 6 - 50 kí tự.
  - Nếu thỏa mảng việc kiểm tra giá trị thì tiếp theo đó ta sẽ gửi request lên server.
  - Khi nhận được access token và refresh token thì sẽ thực hiện lưu vào thiết bị người dùng và thông báo cho người dùng đăng nhập thành công.
- Phía máy chủ(Server)
  - Khi nhận được request thì thực hiện xác nhận giá trị gửi lên có đúng định dạng hay không, nếu không sẽ gửi về lỗi.
  - Nếu đúng định dạng thì tiếp tục mã hóa password(vì password được lưu vào database đã được mã hóa) và so sánh password được lưu trong document tương ứng.
  - Nếu đúng thì trả về access token và refresh token.

### Đăng nhập với Google

- Phía người dùng(Client)

  - Khi người dùng ấn vào nút "Login" và sau người dùng ấn vào nút "Sign in with Google" thì redirect người dùng đến trang:
    https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?
    client_id=748812675450-ouolfjf59ohvis3m4inkug0jn3rg7lmn.apps.googleusercontent.com&
    redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fusers%2Foauth%2Fgoogle&
    response_type=code&
    scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapiscom%2Fauth%2Fuserinfo.email&
    prompt=consent&
    access_type=offline&
    service=lso&o2v=2&ddm=0&
    flowName=GeneralOAuthFlow

  - Người dùng chọn tài khoản Google để đăng nhập, khi đăng nhập thành công sẽ được google cho redirect về
    .../oauth/google?code=4%2F0AbUR2VPc2mJ0zoSxvWVI2XwyCV-8PwkVpIoUu1SBfV3CSYJ30orHOff_fse9GzsG0UpTtw&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+openid&authuser=0&prompt=consent. Đây là url api server của chúng ta. Lúc này các query phía sau url như code, scope, đây là những tham số do google tự sinh ra và gửi lại cho chúng ta.

  - Sau khi server trả về access_token và refresh_token qua query và tiến hành lưu vào thiết bị người dùng.

- Phía máy chủ(Server)
  - Server sẽ lấy được giá trị "code" thông qua query và tiến hành gọi lên Google API để lấy thông tin "id_token" và "access_token".
  - Server sẽ lấy thông tin id_token và access_token để gọi lên Google API 1 lần nữa để lấy thông tin người dùng như email, name, avatar, ...
  - Có được email người dùng rồi thì kiểm tra trong database xem thử email này đã được đăng ký chưa. Nếu chưa thì tạo mới user (mật khẩu có thể cho random, sau này người dùng reset mật khẩu để đổi mật khẩu).
  - Tạo access_token và refresh_token.
  - Server redirect về .../login/oauth?access_token=...&refresh_token=...
