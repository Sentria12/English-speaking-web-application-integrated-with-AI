import { Users, UserCheck, DollarSign, Activity } from "lucide-react";

const stats = [
  {
    title: "Người dùng",
    value: 1240,
    icon: Users,
    note: "+12% so với tháng trước",
  },
  {
    title: "Mentor",
    value: 87,
    icon: UserCheck,
    note: "+5 mentor mới",
  },
  {
    title: "Doanh thu",
    value: "45.000.000đ",
    icon: DollarSign,
    note: "+8% tăng trưởng",
  },
];

const activities = [
  {
    id: 1,
    user: "Nguyễn Văn A",
    action: "Đăng ký gói Premium",
    time: "5 phút trước",
    status: "Thành công",
  },
  {
    id: 2,
    user: "Trần Thị B",
    action: "Yêu cầu trở thành mentor",
    time: "30 phút trước",
    status: "Đang chờ",
  },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Dashboard Admin</h1>

      {/* ===== STATS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition"
          >
            <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600">
              <item.icon size={28} />
            </div>

            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <p className="text-2xl font-bold">{item.value}</p>
              <p className="text-xs text-green-600">{item.note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ===== ACTIVITIES ===== */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity size={20} />
          <h2 className="text-lg font-semibold">Hoạt động gần đây</h2>
        </div>

        <table className="w-full text-sm">
          <thead className="text-left text-gray-500 border-b">
            <tr>
              <th className="py-2">Người dùng</th>
              <th>Hành động</th>
              <th>Thời gian</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((a) => (
              <tr key={a.id} className="border-b last:border-0">
                <td className="py-3">{a.user}</td>
                <td>{a.action}</td>
                <td>{a.time}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      a.status === "Thành công"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
