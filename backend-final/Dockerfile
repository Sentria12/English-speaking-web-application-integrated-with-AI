# Sử dụng Eclipse Temurin (JDK 17) bản Alpine để vừa nhẹ vừa ổn định
FROM eclipse-temurin:17-jdk-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy file jar đã build từ máy thật vào container
# Đảm bảo tên file backend-0.0.1-SNAPSHOT.jar khớp hoàn toàn với thư mục target/
COPY target/backend-0.0.1-SNAPSHOT.jar application.jar

# Khai báo cổng ứng dụng (để làm tài liệu, không bắt buộc nhưng nên có)
EXPOSE 8080

# Lệnh chạy ứng dụng
ENTRYPOINT ["java", "-jar", "application.jar"]