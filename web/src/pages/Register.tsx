import { useState } from "react";
import { useUser, UserProfile } from "../components/UserContext";

interface RegisterProps {
  onNavigate: (page: string, carId?: string, extra?: any) => void;
  carId?: string; // To redirect back to car detail
}

export default function Register({ onNavigate, carId }: RegisterProps) {
  const { register } = useUser();
  const [formData, setFormData] = useState<UserProfile>({
    fullName: "",
    idNumber: "",
    phone: "",
    email: "",
    address: "",
    driverLicense: "",
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.fullName) return;
    setError(null);
    setLoading(true);
    try {
      await register({ ...formData, password });
      onNavigate(carId ? "detail" : "home", carId);
    } catch (err: any) {
      setError(err?.message || "Đăng ký thất bại.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex items-center justify-center py-20 px-6">
      <div className="bg-white max-w-lg w-full border border-gray-200 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl font-bold text-gray-900">Đăng Ký Tài Khoản</h2>
          <p className="text-gray-500 text-sm mt-2">Vui lòng điền thông tin cá nhân để thuê xe</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded">{error}</div>
          )}
          <div>
            <label className="text-gray-600 text-xs uppercase tracking-wider mb-2 block">Họ và tên *</label>
            <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full bg-[#f4f6f8] border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#ff003c]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-600 text-xs uppercase tracking-wider mb-2 block">CCCD / Hộ chiếu *</label>
              <input type="text" name="idNumber" required value={formData.idNumber} onChange={handleChange} className="w-full bg-[#f4f6f8] border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#ff003c]" />
            </div>
            <div>
              <label className="text-gray-600 text-xs uppercase tracking-wider mb-2 block">Số điện thoại *</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full bg-[#f4f6f8] border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#ff003c]" />
            </div>
          </div>
          <div>
            <label className="text-gray-600 text-xs uppercase tracking-wider mb-2 block">Email *</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-[#f4f6f8] border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#ff003c]" />
          </div>
          <div>
            <label className="text-gray-600 text-xs uppercase tracking-wider mb-2 block">Mật khẩu *</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#f4f6f8] border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#ff003c]" />
          </div>
          <div>
            <label className="text-gray-600 text-xs uppercase tracking-wider mb-2 block">Địa chỉ thường trú *</label>
            <input type="text" name="address" required value={formData.address} onChange={handleChange} className="w-full bg-[#f4f6f8] border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#ff003c]" />
          </div>
          <div>
            <label className="text-gray-600 text-xs uppercase tracking-wider mb-2 block">Số Bằng Lái Xe</label>
            <input type="text" name="driverLicense" value={formData.driverLicense} onChange={handleChange} className="w-full bg-[#f4f6f8] border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#ff003c]" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)] text-white text-sm font-bold tracking-widest uppercase hover:bg-[#ff3366] transition-all mt-6 disabled:opacity-50"
          >
            {loading ? "Đang xử lý…" : "Đăng Ký"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <button onClick={() => onNavigate("login", carId)} className="text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] font-semibold hover:underline">
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}
