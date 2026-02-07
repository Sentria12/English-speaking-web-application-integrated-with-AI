import React, { useState, useEffect } from "react";
import axios from "axios";
import { FileText, Link, Send } from "lucide-react";

const MentorDocuments = () => {
  const [learners, setLearners] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    learnerId: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLearners = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:8080/api/mentor/learners",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setLearners(res.data);
      } catch (err) {
        console.error("Lỗi lấy danh sách học viên", err);
      }
    };
    fetchLearners();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/api/mentor/upload-document",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      alert("Gửi tài liệu thành công!");
      setFormData({ title: "", url: "", description: "", learnerId: "" });
    } catch (err) {
      alert("Lỗi khi gửi tài liệu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
        <FileText className="text-blue-600" /> Quản lý và Gửi tài liệu học tập
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md border border-gray-100 space-y-5"
      >
        <div>
          <label
            htmlFor="learner-select"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Chọn học viên nhận tài liệu
          </label>
          <select
            id="learner-select"
            title="Danh sách học viên của bạn"
            required
            className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all"
            value={formData.learnerId}
            onChange={(e) =>
              setFormData({ ...formData, learnerId: e.target.value })
            }
          >
            <option value="">-- Chọn học viên nhận tài liệu --</option>
            {learners.map((l: any) => (
              <option key={l.userId || l.id} value={l.userId || l.id}>
                {l.fullName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="doc-title"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Tiêu đề bài học / Tài liệu
          </label>
          <input
            id="doc-title"
            type="text"
            required
            className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ví dụ: Tài liệu IELTS Speaking Part 1 - Topic: Family"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

        <div>
          <label
            htmlFor="doc-url"
            className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"
          >
            <Link size={14} className="text-blue-500" /> Đường dẫn tài liệu
            (Drive / Video / Cloud)
          </label>
          <input
            id="doc-url"
            type="url"
            required
            className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://drive.google.com/file/d/..."
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          />
        </div>

        {/* Mô tả */}
        <div>
          <label
            htmlFor="doc-desc"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Hướng dẫn hoặc Mô tả ngắn
          </label>
          <textarea
            id="doc-desc"
            className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            placeholder="Nhập ghi chú hoặc hướng dẫn cho học viên sử dụng tài liệu này..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-bold hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 disabled:bg-gray-400 disabled:shadow-none"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Đang xử lý...
            </>
          ) : (
            <>
              <Send size={18} /> Gửi tài liệu ngay
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default MentorDocuments;
