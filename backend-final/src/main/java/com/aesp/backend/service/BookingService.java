package com.aesp.backend.service; // Khai báo package để sửa lỗi dòng 1

// Import các thư viện Spring Boot
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// Import các file cùng dự án
import com.aesp.backend.entity.Booking;
import com.aesp.backend.repository.BookingRepository;

@Service // Đã có import nên sẽ hết lỗi "cannot be resolved to a type"
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private NotificationService notificationService;

    public Booking createBooking(Booking booking) {
        // Lưu lịch đặt vào database
        Booking savedBooking = bookingRepository.save(booking);

        // TRIGGER: Gửi thông báo cho Mentor ngay lập tức
        notificationService.createNotification(
                booking.getMentorId(),
                "Lịch mới: Một học viên đã đặt lịch tư vấn với bạn!",
                "BOOKING");

        return savedBooking;
    }
}