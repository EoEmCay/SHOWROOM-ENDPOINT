import { useState } from "react";
import { useUser } from "../components/UserContext";

interface LoginProps {
  onNavigate: (page: string, carId?: string, extra?: any) => void;
  carId?: string; // To redirect back to car detail
}

export default function Login({ onNavigate, carId }: LoginProps) {
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setError(null);
    setLoading(true);
    try {
      const profile = await login(email, password);
      if (profile.role === "admin") onNavigate("admin");
      else onNavigate(carId ? "detail" : "home", carId);
    } catch (err: any) {
      setError(err?.message || "Đăng nhập thất bại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex items-center justify-center py-20 px-6">
      <div className="bg-white max-w-md w-full border border-gray-200 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)] mx-auto flex items-center justify-center mb-4">
            <span className="text-black font-bold font-display">KT</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-gray-900">Đăng Nhập</h2>
          <p className="text-gray-500 text-sm mt-2">Đăng nhập để đặt thuê xe</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded">{error}</div>
          )}
          <div className="bg-blue-50 border border-blue-100 text-blue-700 text-[11px] p-3 rounded leading-relaxed">
            Demo quản trị: <b>admin@ktshowroom.vn</b> / <b>admin123</b>. Khách hàng: nhập email bất kỳ.
          </div>
          <div>
            <label className="text-gray-600 text-xs uppercase tracking-wider mb-2 block">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full bg-[#f4f6f8] border border-gray-200 text-gray-900 px-4 py-3 text-sm focus:outline-none focus:border-[#ff003c] transition-colors"
            />
          </div>
          <div>
            <label className="text-gray-600 text-xs uppercase tracking-wider mb-2 block">
              Mật khẩu <span className="text-gray-400 normal-case">(khách hàng có thể bỏ trống)</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#f4f6f8] border border-gray-200 text-gray-900 px-4 py-3 text-sm focus:outline-none focus:border-[#ff003c] transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)] text-white text-sm font-bold tracking-widest uppercase hover:bg-[#ff3366] transition-all mt-4 disabled:opacity-50"
          >
            {loading ? "Đang đăng nhập…" : "Đăng Nhập"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <button
            onClick={() => onNavigate("register", carId)}
            className="text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] font-semibold hover:underline"
          >
            Đăng ký ngay
          </button>
        </div>
      </div>
    </div>
  );
}
