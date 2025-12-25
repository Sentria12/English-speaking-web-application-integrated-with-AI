import React, { useState } from 'react';

interface Purchase {
  id: string;
  userId: string;
  userName: string;
  packageName: string;
  price: number;
  purchaseDate: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'cancelled';
  paymentMethod: string;
}

const Purchases: React.FC = () => {
  const [purchases] = useState<Purchase[]>([
    {
      id: 'PUR001',
      userId: '#101',
      userName: 'Nguyễn Văn A',
      packageName: 'Premium',
      price: 999000,
      purchaseDate: '15/01/2025',
      startDate: '15/01/2025',
      endDate: '15/07/2025',
      status: 'active',
      paymentMethod: 'Chuyển khoản'
    },
    {
      id: 'PUR002',
      userId: '#102',
      userName: 'Trần Thị B',
      packageName: 'Basic',
      price: 299000,
      purchaseDate: '10/01/2025',
      startDate: '10/01/2025',
      endDate: '10/02/2025',
      status: 'active',
      paymentMethod: 'Thẻ tín dụng'
    },
    {
      id: 'PUR003',
      userId: '#104',
      userName: 'Phạm Thị D',
      packageName: 'Standard',
      price: 599000,
      purchaseDate: '01/01/2025',
      startDate: '01/01/2025',
      endDate: '01/04/2025',
      status: 'active',
      paymentMethod: 'Ví điện tử'
    },
    {
      id: 'PUR004',
      userId: '#105',
      userName: 'Hoàng Văn E',
      packageName: 'Premium',
      price: 999000,
      purchaseDate: '20/12/2024',
      startDate: '20/12/2024',
      endDate: '20/06/2025',
      status: 'expired',
      paymentMethod: 'Chuyển khoản'
    }
  ]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const totalRevenue = purchases.reduce((sum, p) => sum + p.price, 0);
  const activePurchases = purchases.filter(p => p.status === 'active').length;

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Lịch sử Mua Gói Dịch vụ</h2>
        <button className="btn btn-secondary">📥 Xuất báo cáo</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon">💳</div>
          <div className="stat-info">
            <div className="stat-label">Tổng giao dịch</div>
            <div className="stat-value">{purchases.length}</div>
          </div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <div className="stat-label">Gói đang hoạt động</div>
            <div className="stat-value">{activePurchases}</div>
          </div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <div className="stat-label">Tổng doanh thu</div>
            <div className="stat-value">{formatPrice(totalRevenue)}</div>
          </div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon">📈</div>
          <div className="stat-info">
            <div className="stat-label">Doanh thu TB/giao dịch</div>
            <div className="stat-value">{formatPrice(totalRevenue / purchases.length)}</div>
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-header">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Tìm kiếm theo ID hoặc tên..." />
          </div>
          <div className="filter-group">
            <select>
              <option value="">Tất cả gói</option>
              <option value="Basic">Basic</option>
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
              <option value="Enterprise">Enterprise</option>
            </select>
            <select>
              <option value="">Tất cả trạng thái</option>
              <option value="active">Đang hoạt động</option>
              <option value="expired">Đã hết hạn</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Mã GD</th>
                <th>Người dùng</th>
                <th>Gói dịch vụ</th>
                <th>Giá trị</th>
                <th>Ngày mua</th>
                <th>Thời hạn</th>
                <th>PT Thanh toán</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td><strong>{purchase.id}</strong></td>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar-small">{purchase.userName[0]}</div>
                      <div>
                        <div>{purchase.userName}</div>
                        <div style={{ fontSize: '12px', color: 'var(--gray)' }}>
                          {purchase.userId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-info">{purchase.packageName}</span>
                  </td>
                  <td><strong>{formatPrice(purchase.price)}</strong></td>
                  <td>{purchase.purchaseDate}</td>
                  <td>
                    <div style={{ fontSize: '13px' }}>
                      <div>{purchase.startDate}</div>
                      <div style={{ color: 'var(--gray)' }}>đến {purchase.endDate}</div>
                    </div>
                  </td>
                  <td>{purchase.paymentMethod}</td>
                  <td>
                    <span className={`badge ${
                      purchase.status === 'active' ? 'badge-success' :
                      purchase.status === 'expired' ? 'badge-danger' :
                      'badge-warning'
                    }`}>
                      {purchase.status === 'active' ? 'Đang hoạt động' :
                       purchase.status === 'expired' ? 'Đã hết hạn' :
                       'Đã hủy'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="Xem chi tiết">👁️</button>
                      <button className="btn-icon" title="In hóa đơn">🖨️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <div className="pagination-info">
            Hiển thị {purchases.length} giao dịch
          </div>
          <div className="pagination">
            <button className="btn-page">‹</button>
            <button className="btn-page active">1</button>
            <button className="btn-page">2</button>
            <button className="btn-page">3</button>
            <button className="btn-page">›</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchases;