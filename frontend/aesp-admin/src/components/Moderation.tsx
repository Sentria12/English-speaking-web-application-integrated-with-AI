import React, { useState } from 'react';

interface Feedback {
  id: string;
  userId: string;
  userName: string;
  mentorId: string;
  mentorName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  reports?: number;
}

const Moderation: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: 'FDB001',
      userId: '#101',
      userName: 'Nguyễn Văn A',
      mentorId: '#M001',
      mentorName: 'Nguyễn Văn Mentor A',
      rating: 5,
      comment: 'Mentor rất nhiệt tình, giảng dạy dễ hiểu. Tôi đã học được rất nhiều kiến thức bổ ích.',
      date: '25/12/2025 10:30',
      status: 'pending',
      reports: 0
    },
    {
      id: 'FDB002',
      userId: '#102',
      userName: 'Trần Thị B',
      mentorId: '#M002',
      mentorName: 'Trần Thị Mentor B',
      rating: 4,
      comment: 'Khóa học tốt, nhưng có một số phần hơi nhanh.',
      date: '24/12/2025 14:20',
      status: 'approved',
      reports: 0
    },
    {
      id: 'FDB003',
      userId: '#104',
      userName: 'Phạm Thị D',
      mentorId: '#M001',
      mentorName: 'Nguyễn Văn Mentor A',
      rating: 2,
      comment: 'Mentor không chuyên nghiệp, thường xuyên trễ hẹn. Nội dung không đúng như mô tả.',
      date: '24/12/2025 11:00',
      status: 'pending',
      reports: 2
    },
    {
      id: 'FDB004',
      userId: '#105',
      userName: 'Hoàng Văn E',
      mentorId: '#M003',
      mentorName: 'Lê Văn Mentor C',
      rating: 1,
      comment: 'Rất tệ!!! Lãng phí tiền. Không khuyến khích.',
      date: '23/12/2025 09:45',
      status: 'rejected',
      reports: 3
    }
  ]);

  const approveFeedback = (id: string) => {
    setFeedbacks(feedbacks.map(f => 
      f.id === id ? { ...f, status: 'approved' as const } : f
    ));
  };

  const rejectFeedback = (id: string) => {
    setFeedbacks(feedbacks.map(f => 
      f.id === id ? { ...f, status: 'rejected' as const } : f
    ));
  };

  const pendingCount = feedbacks.filter(f => f.status === 'pending').length;
  const approvedCount = feedbacks.filter(f => f.status === 'approved').length;
  const rejectedCount = feedbacks.filter(f => f.status === 'rejected').length;
  const reportedCount = feedbacks.filter(f => (f.reports || 0) > 0).length;

  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Kiểm duyệt Feedback & Bình luận</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary">🔽 Bộ lọc nâng cao</button>
          <button className="btn btn-primary">📊 Báo cáo</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card orange">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <div className="stat-label">Chờ duyệt</div>
            <div className="stat-value">{pendingCount}</div>
          </div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <div className="stat-label">Đã duyệt</div>
            <div className="stat-value">{approvedCount}</div>
          </div>
        </div>
        <div className="stat-card blue">
          <div className="stat-icon">❌</div>
          <div className="stat-info">
            <div className="stat-label">Đã từ chối</div>
            <div className="stat-value">{rejectedCount}</div>
          </div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon">🚨</div>
          <div className="stat-info">
            <div className="stat-label">Bị báo cáo</div>
            <div className="stat-value">{reportedCount}</div>
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-header">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Tìm kiếm feedback..." />
          </div>
          <div className="filter-group">
            <select>
              <option value="">Tất cả trạng thái</option>
              <option value="pending">Chờ duyệt</option>
              <option value="approved">Đã duyệt</option>
              <option value="rejected">Đã từ chối</option>
            </select>
            <select>
              <option value="">Tất cả đánh giá</option>
              <option value="5">⭐ 5 sao</option>
              <option value="4">⭐ 4 sao</option>
              <option value="3">⭐ 3 sao</option>
              <option value="2">⭐ 2 sao</option>
              <option value="1">⭐ 1 sao</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Học viên</th>
                <th>Mentor</th>
                <th>Đánh giá</th>
                <th>Nội dung</th>
                <th>Ngày gửi</th>
                <th>Báo cáo</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback) => (
                <tr key={feedback.id} style={{ 
                  backgroundColor: (feedback.reports || 0) > 0 ? 'rgba(239, 68, 68, 0.05)' : undefined 
                }}>
                  <td><strong>{feedback.id}</strong></td>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar-small">{feedback.userName[0]}</div>
                      <div>
                        <div>{feedback.userName}</div>
                        <div style={{ fontSize: '12px', color: 'var(--gray)' }}>
                          {feedback.userId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div>{feedback.mentorName}</div>
                      <div style={{ fontSize: '12px', color: 'var(--gray)' }}>
                        {feedback.mentorId}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="rating" style={{ fontSize: '16px' }}>
                      {renderStars(feedback.rating)}
                    </div>
                  </td>
                  <td>
                    <div style={{ maxWidth: '300px' }}>
                      {feedback.comment}
                    </div>
                  </td>
                  <td>{feedback.date}</td>
                  <td>
                    {(feedback.reports || 0) > 0 ? (
                      <span className="badge badge-danger">
                        🚨 {feedback.reports} báo cáo
                      </span>
                    ) : (
                      <span style={{ color: 'var(--gray)' }}>-</span>
                    )}
                  </td>
                  <td>
                    <span className={`badge ${
                      feedback.status === 'pending' ? 'badge-warning' :
                      feedback.status === 'approved' ? 'badge-success' :
                      'badge-danger'
                    }`}>
                      {feedback.status === 'pending' ? 'Chờ duyệt' :
                       feedback.status === 'approved' ? 'Đã duyệt' :
                       'Đã từ chối'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="Xem chi tiết">👁️</button>
                      {feedback.status === 'pending' && (
                        <>
                          <button 
                            className="btn-icon btn-success" 
                            title="Phê duyệt"
                            onClick={() => approveFeedback(feedback.id)}
                          >
                            ✅
                          </button>
                          <button 
                            className="btn-icon btn-danger" 
                            title="Từ chối"
                            onClick={() => rejectFeedback(feedback.id)}
                          >
                            ❌
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <div className="pagination-info">
            Hiển thị {feedbacks.length} feedback
          </div>
          <div className="pagination">
            <button className="btn-page">‹</button>
            <button className="btn-page active">1</button>
            <button className="btn-page">2</button>
            <button className="btn-page">›</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Moderation;