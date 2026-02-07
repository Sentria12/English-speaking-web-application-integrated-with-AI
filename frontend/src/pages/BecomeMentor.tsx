import React, { useState } from 'react';
import axios from 'axios';
import { Send, FileText, Award, AlertCircle } from 'lucide-react';

const BecomeMentor = () => {
    const [formData, setFormData] = useState({
        experienceSummary: '',
        certificatesUrl: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        
        try {
            const token = localStorage.getItem("token");
            await axios.post('http://localhost:8080/api/mentor/register', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStatus('success');
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Đã gửi đơn đăng ký!</h2>
                <p className="text-gray-500 mt-2">Hồ sơ của bạn đang được Admin xem xét. Vui lòng đợi phê duyệt.</p>
                <button onClick={() => window.location.href = '/dashboard'} className="mt-6 text-blue-600 font-medium hover:underline">Quay lại Dashboard</button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-gray-800">Đăng ký làm Mentor</h2>
                <p className="text-gray-500 mt-2">Chia sẻ kiến thức của bạn và nhận thu nhập xứng đáng.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Award size={18} className="text-blue-500" /> Tóm tắt kinh nghiệm
                    </label>
                    <textarea 
                        required
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all h-32"
                        placeholder="Ví dụ: 5 năm dạy IELTS, đạt chứng chỉ 8.5..."
                        value={formData.experienceSummary}
                        onChange={(e) => setFormData({...formData, experienceSummary: e.target.value})}
                    />
                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <FileText size={18} className="text-blue-500" /> Link chứng chỉ (Drive/Dropbox/Cloudinary)
                    </label>
                    <input 
                        type="url"
                        required
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="https://example.com/my-cert.pdf"
                        value={formData.certificatesUrl}
                        onChange={(e) => setFormData({...formData, certificatesUrl: e.target.value})}
                    />
                </div>

                {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-lg text-sm">
                        <AlertCircle size={16} /> Có lỗi xảy ra, vui lòng thử lại.
                    </div>
                )}

                <button 
                    disabled={status === 'loading'}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:bg-gray-400"
                >
                    {status === 'loading' ? 'Đang gửi hồ sơ...' : 'Gửi yêu cầu phê duyệt'}
                </button>
            </form>
        </div>
    );
};

export default BecomeMentor;