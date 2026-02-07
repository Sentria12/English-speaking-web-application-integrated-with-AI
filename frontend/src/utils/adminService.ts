import axios from "axios";

const API_URL = "http://localhost:8080/api/admin";

/**
 * Hàm hỗ trợ lấy cấu hình Header kèm Token JWT
 * Giúp Backend nhận diện bạn là Admin đã đăng nhập
 */
const getAuthHeader = () => {
  // Lấy token từ localStorage
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Lấy danh sách mentor đang chờ (kèm Token)
export const getPendingMentors = () => {
  return axios.get(`${API_URL}/pending-mentors`, getAuthHeader());
};

// Phê duyệt mentor theo ID (kèm Token)
export const approveMentor = (id: number) => {
  return axios.put(`${API_URL}/approve-mentor/${id}`, {}, getAuthHeader());
};
