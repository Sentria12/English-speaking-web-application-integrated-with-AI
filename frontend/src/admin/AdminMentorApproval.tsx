import { useEffect, useState } from 'react';
import { getPendingMentors, approveMentor } from '../utils/adminService'; 
import { CheckCircle, ExternalLink, AlertCircle, UserCheck, Mail, Briefcase, FileText } from 'lucide-react';

const AdminMentorApproval = () => {
    const [pendingList, setPendingList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMentors = async () => {
        try {
            const response = await getPendingMentors();
            setPendingList(response.data);
        } catch (error) {
            console.error("Lỗi lấy danh sách:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMentors();
    }, []);

    const handleApprove = async (profileId: number) => {
        if (!window.confirm("Xác nhận cấp quyền Mentor cho người dùng này?")) return;
        
        try {
            await approveMentor(profileId);
            alert("Đã phê duyệt thành công!");
            setPendingList(prev => prev.filter(item => item.id !== profileId));
        } catch (error) {
            alert("Lỗi hệ thống khi duyệt. Vui lòng thử lại sau.");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600 font-medium">Đang tải hồ sơ...</span>
            </div>
        );
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen font-sans">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="mb-8 flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
                            <UserCheck className="text-white" size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">Phê duyệt Mentor</h2>
                            <p className="text-gray-500 text-sm">Quản lý và thẩm định hồ sơ chuyên gia mới</p>
                        </div>
                    </div>
                    <div className="bg-blue-50 px-4 py-2 rounded-full">
                        <span className="text-blue-700 font-semibold text-sm">
                            {pendingList.length} yêu cầu đang chờ
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                {pendingList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-20 bg-white rounded-3xl border-2 border-dashed border-gray-200 shadow-sm">
                        <div className="bg-gray-50 p-6 rounded-full mb-4">
                            <AlertCircle size={60} className="text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-700">Tất cả đã sạch sẽ!</h3>
                        <p className="text-gray-400 mt-1">Hiện tại không có hồ sơ nào cần phê duyệt.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Ứng viên</th>
                                    <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Kinh nghiệm</th>
                                    <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Chứng chỉ</th>
                                    <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {pendingList.map((item) => (
                                    <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="p-5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
                                                    {(item.user?.fullName || 'U').charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                                                        {item.user?.fullName || 'N/A'}
                                                    </div>
                                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                                        <Mail size={12} /> {item.user?.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex items-start gap-2 max-w-xs">
                                                <Briefcase size={16} className="text-gray-400 mt-0.5 shrink-0" />
                                                <p className="text-sm text-gray-600 line-clamp-2">
                                                    {item.experienceSummary || "Chưa cung cấp mô tả kinh nghiệm"}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <a 
                                                href={item.certificatesUrl} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                className="inline-flex items-center gap-2 text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-200 px-4 py-1.5 rounded-full text-xs font-semibold transition-all shadow-sm"
                                            >
                                                <FileText size={14} /> Xem hồ sơ <ExternalLink size={12} />
                                            </a>
                                        </td>
                                        <td className="p-5 text-center">
                                            <button 
                                                onClick={() => handleApprove(item.id)} 
                                                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-emerald-100 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 mx-auto"
                                            >
                                                <CheckCircle size={16} /> Phê duyệt
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminMentorApproval;