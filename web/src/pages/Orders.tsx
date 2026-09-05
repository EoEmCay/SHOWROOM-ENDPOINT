import { useCallback, useEffect, useState } from "react";
import { useUser } from "../components/UserContext";
import { cancelOrder, getOrders, RentalOrder } from "../lib/api";
import { formatPrice } from "../data/cars";

interface OrdersProps {
  onNavigate: (page: string, carId?: string, extra?: any) => void;
}

const statusStyle: Record<string, string> = {
  "Chờ duyệt": "bg-amber-100 text-amber-700 border-amber-200",
  "Đã xác nhận": "bg-blue-100 text-blue-700 border-blue-200",
  "Đang thuê": "bg-green-100 text-green-700 border-green-200",
  "Đã hoàn thành": "bg-gray-100 text-gray-600 border-gray-200",
  "Đã hủy": "bg-red-100 text-red-600 border-red-200",
};

const CANCELABLE = ["Chờ duyệt", "Đã xác nhận"];

function carImg(hinhAnh: string | null) {
  if (!hinhAnh) return "/images/cars/default.png";
  return hinhAnh.startsWith("/") ? hinhAnh : `/images/cars/${hinhAnh}`;
}

function fmtDate(s: string) {
  const d = new Date(s.replace(" ", "T"));
  return isNaN(d.getTime()) ? s : d.toLocaleString("vi-VN");
}

export default function Orders({ onNavigate }: OrdersProps) {
  const { user, isLoggedIn } = useUser();
  const [orders, setOrders] = useState<RentalOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user?.email) return;
    setLoading(true);
    setError(null);
    try {
      const { orders } = await getOrders(user.email);
      setOrders(orders);
    } catch (e: any) {
      setError(e.message || "Không tải được danh sách đơn thuê.");
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    load();
  }, [load]);

  const onCancel = async (maDatXe: string) => {
    if (!user?.email) return;
    if (!confirm(`Hủy đơn thuê ${maDatXe}?`)) return;
    setBusy(maDatXe);
    try {
      await cancelOrder(maDatXe, user.email);
      await load();
    } catch (e: any) {
      alert(e.message || "Không hủy được đơn.");
    } finally {
      setBusy(null);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[60vh] bg-[#f4f6f8] flex flex-col items-center justify-center px-6 text-center">
        <p className="text-gray-600 mb-4">Bạn cần đăng nhập để xem đơn thuê của mình.</p>
        <button
          onClick={() => onNavigate("login")}
          className="px-6 py-3 bg-[#ff003c] text-white text-xs font-bold tracking-widest uppercase"
        >
          Đăng nhập
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6f8] pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 pt-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-12 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)]" />
              <span className="text-[#ff003c] text-sm font-medium tracking-widest uppercase">Tài khoản</span>
            </div>
            <h1 className="font-display text-4xl font-bold text-gray-900">Đơn Thuê Của Tôi</h1>
            <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
          </div>
          <button
            onClick={load}
            className="text-xs px-4 py-2 border border-gray-200 text-gray-600 hover:border-[#ff003c] hover:text-[#ff003c] transition-colors uppercase tracking-wider"
          >
            Tải lại
          </button>
        </div>

        {loading ? (
          <div className="text-center py-24 text-gray-400">Đang tải…</div>
        ) : error ? (
          <div className="bg-white border border-red-200 p-6 text-center">
            <p className="text-red-600 text-sm mb-3">{error}</p>
            <p className="text-gray-400 text-xs">
              Kiểm tra backend PHP đã chạy chưa: <code>php -S localhost:8000 "api/index.php"</code>
            </p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <div className="text-6xl mb-4">📋</div>
            <p className="mb-4">Bạn chưa có đơn thuê nào.</p>
            <button
              onClick={() => onNavigate("rent")}
              className="px-6 py-3 bg-[#ff003c] text-white text-xs font-bold tracking-widest uppercase"
            >
              Thuê xe ngay
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o.maDatXe} className="bg-white border border-gray-200 p-5 flex flex-col sm:flex-row gap-5">
                <img
                  src={carImg(o.hinhAnh)}
                  alt={o.tenXe}
                  className="w-full sm:w-40 h-28 object-cover flex-shrink-0 bg-gray-100"
                  onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-lg font-bold text-gray-900">{o.tenXe}</p>
                      <p className="text-gray-400 text-xs">
                        Mã đơn: {o.maDatXe} · {o.maXe} · {o.mau}
                      </p>
                    </div>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 border rounded uppercase tracking-wider ${
                        statusStyle[o.trangThai] || "bg-gray-100 text-gray-600 border-gray-200"
                      }`}
                    >
                      {o.trangThai}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-xs">
                    <div>
                      <p className="text-gray-400">Nhận xe</p>
                      <p className="text-gray-800 font-medium">{fmtDate(o.ngayNhan)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Trả xe</p>
                      <p className="text-gray-800 font-medium">{fmtDate(o.ngayTra)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Tổng tiền</p>
                      <p className="text-[#ff003c] font-bold">{formatPrice(o.tongTien)} ₫</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Thanh toán</p>
                      <p className="text-gray-800 font-medium">{o.trangThaiThanhToan || "—"}</p>
                    </div>
                  </div>

                  {o.services.length > 0 && (
                    <div className="mt-3 text-xs">
                      <p className="text-gray-400 mb-1">Dịch vụ bổ sung</p>
                      <div className="flex flex-wrap gap-1.5">
                        {o.services.map((s) => (
                          <span key={s.madv} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                            {s.ten}
                            {s.gia > 0 ? ` · ${formatPrice(s.gia)}₫` : ""}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={() => onNavigate("detail", o.maXe)}
                      className="text-xs px-4 py-2 border border-gray-200 text-gray-600 hover:border-[#ff003c] hover:text-[#ff003c] transition-colors uppercase tracking-wider"
                    >
                      Xem xe
                    </button>
                    {CANCELABLE.includes(o.trangThai) && (
                      <button
                        onClick={() => onCancel(o.maDatXe)}
                        disabled={busy === o.maDatXe}
                        className="text-xs px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 transition-colors uppercase tracking-wider disabled:opacity-40"
                      >
                        {busy === o.maDatXe ? "Đang hủy…" : "Hủy đơn"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
