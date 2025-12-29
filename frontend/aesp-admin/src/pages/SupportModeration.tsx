import { useState } from "react";

type TicketStatus = "OPEN" | "PROCESSING" | "RESOLVED";

interface Ticket {
  id: number;
  user: string;
  issue: string;
  status: TicketStatus;
}

const initialTickets: Ticket[] = [
  {
    id: 1,
    user: "Nguyễn Văn A",
    issue: "Không đăng nhập được",
    status: "OPEN",
  },
  {
    id: 2,
    user: "Trần Thị B",
    issue: "Lỗi thanh toán",
    status: "PROCESSING",
  },
];

const statusStyle = (status: TicketStatus) => {
  switch (status) {
    case "OPEN":
      return "bg-red-100 text-red-700";
    case "PROCESSING":
      return "bg-yellow-100 text-yellow-700";
    case "RESOLVED":
      return "bg-green-100 text-green-700";
  }
};

export default function SupportModeration() {
  const [tickets, setTickets] = useState(initialTickets);

  const markResolved = (id: number) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "RESOLVED" } : t
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Hỗ trợ & Kiểm duyệt</h1>
      <p className="text-gray-500">
        Admin xử lý các yêu cầu hỗ trợ và kiểm duyệt từ người dùng
      </p>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500 border-b">
            <tr>
              <th className="py-2">Người dùng</th>
              <th>Vấn đề</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((t) => (
              <tr key={t.id} className="border-b last:border-0">
                <td className="py-3">{t.user}</td>
                <td>{t.issue}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                      t.status
                    )}`}
                  >
                    {t.status}
                  </span>
                </td>
                <td>
                  {t.status !== "RESOLVED" ? (
                    <button
                      onClick={() => markResolved(t.id)}
                      className="px-3 py-1 text-xs rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      Đánh dấu đã xử lý
                    </button>
                  ) : (
                    <span className="text-green-600 text-xs font-medium">
                      Hoàn tất
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
