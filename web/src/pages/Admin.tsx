import { useCallback, useEffect, useState } from "react";
import { useUser } from "../components/UserContext";
import { useCars } from "../components/CarsContext";
import {
  AdminCar,
  AdminOrder,
  AdminPayment,
  CarInput,
  adminDeleteCar,
  adminGetCars,
  adminGetOrders,
  adminGetPayments,
  adminSaveCar,
  adminSetCarStatus,
  adminSetOrderStatus,
} from "../lib/api";
import { formatPrice } from "../data/cars";

interface AdminProps {
  onNavigate: (page: string, carId?: string) => void;
}

type Tab = "orders" | "cars" | "payments";

const ORDER_STATUSES = ["Chờ duyệt", "Đã xác nhận", "Đang thuê", "Đã hoàn thành", "Đã hủy"];
const CAR_STATUSES = ["Sẵn sàng", "Đang thuê", "Bảo trì"];

const orderBadge: Record<string, string> = {
  "Chờ duyệt": "bg-amber-100 text-amber-700",
  "Đã xác nhận": "bg-blue-100 text-blue-700",
  "Đang thuê": "bg-green-100 text-green-700",
  "Đã hoàn thành": "bg-gray-100 text-gray-600",
  "Đã hủy": "bg-red-100 text-red-600",
};

function fmt(s: string | null) {
  if (!s) return "—";
  const d = new Date(s.replace(" ", "T"));
  return isNaN(d.getTime()) ? s : d.toLocaleString("vi-VN");
}

export default function Admin({ onNavigate }: AdminProps) {
  const { isAdmin } = useUser();
  const { reload: reloadCatalog } = useCars();
  const [tab, setTab] = useState<Tab>("orders");
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [cars, setCars] = useState<AdminCar[]>([]);
  const [payments, setPayments] = useState<AdminPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // null = đóng form; "new" = thêm xe; AdminCar = sửa xe
  const [carForm, setCarForm] = useState<AdminCar | "new" | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [o, c, p] = await Promise.all([adminGetOrders(), adminGetCars(), adminGetPayments()]);
      setOrders(o.orders);
      setCars(c.cars);
      setPayments(p.payments);
    } catch (e: any) {
      setError(e?.message || "Không tải được dữ liệu quản trị.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const changeOrder = async (maDatXe: string, trangThai: string) => {
    setOrders((prev) => prev.map((o) => (o.maDatXe === maDatXe ? { ...o, trangThai } : o)));
    try {
      await adminSetOrderStatus(maDatXe, trangThai);
    } catch (e: any) {
      alert(e?.message || "Lỗi cập nhật");
      load();
    }
  };

  const changeCar = async (maXe: string, trangThai: string) => {
    setCars((prev) => prev.map((c) => (c.maXe === maXe ? { ...c, trangThai } : c)));
    try {
      await adminSetCarStatus(maXe, trangThai);
      reloadCatalog();
    } catch (e: any) {
      alert(e?.message || "Lỗi cập nhật");
      load();
    }
  };

  const saveCar = async (input: CarInput) => {
    const res = await adminSaveCar(input);
    setCarForm(null);
    await load();
    reloadCatalog();
    return res;
  };

  const removeCar = async (c: AdminCar) => {
    if (c.soDon > 0) {
      alert(`Xe ${c.maXe} đang có ${c.soDon} đơn thuê nên không thể xóa. Hãy chuyển trạng thái sang "Bảo trì".`);
      return;
    }
    if (!confirm(`Xóa xe ${c.maXe} — ${c.tenXe}? Không thể hoàn tác.`)) return;
    try {
      await adminDeleteCar(c.maXe);
      await load();
      reloadCatalog();
    } catch (e: any) {
      alert(e?.message || "Không xóa được xe.");
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-[60vh] bg-[#f4f6f8] flex flex-col items-center justify-center px-6 text-center">
        <p className="text-gray-600 mb-4">Khu vực này chỉ dành cho quản trị viên.</p>
        <button
          onClick={() => onNavigate("login")}
          className="px-6 py-3 bg-[#ff003c] text-white text-xs font-bold tracking-widest uppercase"
        >
          Đăng nhập quản trị
        </button>
      </div>
    );
  }

  const pending = orders.filter((o) => o.trangThai === "Chờ duyệt").length;
  const revenue = payments
    .filter((p) => p.trangThai === "Đã thanh toán")
    .reduce((s, p) => s + (p.soTien || 0), 0);

  return (
    <div className="min-h-screen bg-[#f4f6f8] pb-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-px w-12 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)]" />
          <span className="text-[#ff003c] text-sm font-medium tracking-widest uppercase">Quản trị hệ thống</span>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
          <h1 className="font-display text-4xl font-bold text-gray-900">Bảng Điều Khiển</h1>
          <button
            onClick={load}
            className="text-xs px-4 py-2 border border-gray-200 text-gray-600 hover:border-[#ff003c] hover:text-[#ff003c] uppercase tracking-wider"
          >
            Tải lại
          </button>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Tổng đơn thuê", value: orders.length },
            { label: "Chờ duyệt", value: pending },
            { label: "Tổng xe", value: cars.length },
            { label: "Doanh thu đã thu", value: `${formatPrice(revenue)} ₫` },
          ].map((k) => (
            <div key={k.label} className="bg-white border border-gray-200 p-4">
              <p className="text-gray-400 text-xs uppercase tracking-wider">{k.label}</p>
              <p className="text-gray-900 font-display text-2xl font-bold mt-1">{k.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200 mb-6">
          {([
            ["orders", `Đơn thuê (${orders.length})`],
            ["cars", `Quản lý xe (${cars.length})`],
            ["payments", `Thanh toán (${payments.length})`],
          ] as [Tab, string][]).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`px-4 py-3 text-sm font-semibold tracking-wide uppercase transition-colors ${
                tab === id ? "text-[#ff003c] border-b-2 border-[#ff003c]" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-24 text-gray-400">Đang tải…</div>
        ) : error ? (
          <div className="bg-white border border-red-200 p-6 text-center text-red-600 text-sm">{error}</div>
        ) : tab === "orders" ? (
          <div className="overflow-x-auto bg-white border border-gray-200">
            <table className="w-full text-sm min-w-[820px]">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="text-left px-4 py-3">Mã đơn</th>
                  <th className="text-left px-4 py-3">Khách hàng</th>
                  <th className="text-left px-4 py-3">Xe</th>
                  <th className="text-left px-4 py-3">Thời gian</th>
                  <th className="text-right px-4 py-3">Tổng tiền</th>
                  <th className="text-left px-4 py-3">Thanh toán</th>
                  <th className="text-left px-4 py-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.maDatXe} className="border-t border-gray-100 align-top">
                    <td className="px-4 py-3 font-medium text-gray-900">{o.maDatXe}</td>
                    <td className="px-4 py-3">
                      <div className="text-gray-900">{o.hoTen}</div>
                      <div className="text-gray-400 text-xs">{o.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-gray-900">{o.tenXe}</div>
                      {o.services.length > 0 && (
                        <div className="text-gray-400 text-xs">+ {o.services.length} dịch vụ</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">
                      {fmt(o.ngayNhan)}
                      <br />→ {fmt(o.ngayTra)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-900">
                      {formatPrice(o.tongTien)} ₫
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{o.trangThaiThanhToan || "—"}</td>
                    <td className="px-4 py-3">
                      <select
                        value={o.trangThai}
                        onChange={(e) => changeOrder(o.maDatXe, e.target.value)}
                        className={`text-xs px-2 py-1.5 rounded border-0 font-semibold cursor-pointer ${
                          orderBadge[o.trangThai] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {ORDER_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-400">
                      Chưa có đơn thuê nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : tab === "cars" ? (
          <div>
            <div className="flex justify-end mb-3">
              <button
                onClick={() => setCarForm("new")}
                className="text-xs px-4 py-2 bg-[#ff003c] text-white font-bold tracking-wider uppercase hover:bg-[#ff3366] transition-colors"
              >
                ＋ Thêm xe
              </button>
            </div>
            <div className="overflow-x-auto bg-white border border-gray-200">
              <table className="w-full text-sm min-w-[820px]">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="text-left px-4 py-3">Mã xe</th>
                    <th className="text-left px-4 py-3">Tên xe</th>
                    <th className="text-left px-4 py-3">Biển số</th>
                    <th className="text-right px-4 py-3">Giá/ngày</th>
                    <th className="text-center px-4 py-3">Lượt đặt</th>
                    <th className="text-left px-4 py-3">Trạng thái</th>
                    <th className="text-right px-4 py-3">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((c) => (
                    <tr key={c.maXe} className="border-t border-gray-100">
                      <td className="px-4 py-3 font-medium text-gray-900">{c.maXe}</td>
                      <td className="px-4 py-3">
                        <div className="text-gray-900">{c.tenXe}</div>
                        <div className="text-gray-400 text-xs">
                          {c.phanLoai === "xemay" ? "🏍️" : "🚗"} {c.loaiXe} · {c.mau}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{c.bienSo}</td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-900">
                        {formatPrice(c.giaNgay)} ₫
                      </td>
                      <td className="px-4 py-3 text-center text-gray-600">{c.soDon}</td>
                      <td className="px-4 py-3">
                        <select
                          value={c.trangThai}
                          onChange={(e) => changeCar(c.maXe, e.target.value)}
                          className="text-xs px-2 py-1.5 rounded border border-gray-200 cursor-pointer"
                        >
                          {CAR_STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button
                          onClick={() => setCarForm(c)}
                          className="text-xs px-3 py-1.5 border border-gray-200 text-gray-600 hover:border-[#ff003c] hover:text-[#ff003c] uppercase tracking-wider"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => removeCar(c)}
                          disabled={c.soDon > 0}
                          title={c.soDon > 0 ? "Xe đang có đơn thuê" : "Xóa xe"}
                          className="ml-2 text-xs px-3 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 uppercase tracking-wider disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                  {cars.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-gray-400">
                        Chưa có xe nào. Bấm "Thêm xe" để tạo mới.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white border border-gray-200">
            <table className="w-full text-sm min-w-[720px]">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="text-left px-4 py-3">Mã GD</th>
                  <th className="text-left px-4 py-3">Đơn</th>
                  <th className="text-left px-4 py-3">Khách hàng</th>
                  <th className="text-left px-4 py-3">Phương thức</th>
                  <th className="text-right px-4 py-3">Số tiền</th>
                  <th className="text-left px-4 py-3">Trạng thái</th>
                  <th className="text-left px-4 py-3">Thời gian</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.maThanhToan} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-900">{p.maThanhToan}</td>
                    <td className="px-4 py-3 text-gray-600">{p.maDatXe}</td>
                    <td className="px-4 py-3">
                      <div className="text-gray-900">{p.hoTen}</div>
                      <div className="text-gray-400 text-xs">{p.tenXe}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{p.pttt}</td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-900">
                      {formatPrice(p.soTien)} ₫
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded font-semibold ${
                          p.trangThai === "Đã thanh toán"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {p.trangThai}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{fmt(p.thoiGian)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {carForm !== null && (
        <CarForm
          initial={carForm === "new" ? null : carForm}
          onClose={() => setCarForm(null)}
          onSave={saveCar}
        />
      )}
    </div>
  );
}

function CarForm({
  initial,
  onClose,
  onSave,
}: {
  initial: AdminCar | null;
  onClose: () => void;
  onSave: (input: CarInput) => Promise<unknown>;
}) {
  const [f, setF] = useState<CarInput>({
    maXe: initial?.maXe,
    tenXe: initial?.tenXe ?? "",
    loaiXe: initial?.loaiXe ?? "",
    phanLoai: initial?.phanLoai ?? "oto",
    mau: initial?.mau ?? "",
    bienSo: initial?.bienSo ?? "",
    odo: initial?.odo ?? 0,
    trangThai: initial?.trangThai ?? "Sẵn sàng",
    giaNgay: initial?.giaNgay ?? 0,
    datCoc: initial?.datCoc ?? 0,
    hinhAnh: initial?.hinhAnh ?? "",
    moTa: initial?.moTa ?? "",
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const set = (k: keyof CarInput, v: string | number) => setF((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      await onSave(f);
    } catch (e: any) {
      setErr(e?.message || "Lưu không thành công.");
      setBusy(false);
    }
  };

  const field = "w-full bg-[#f4f6f8] border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#ff003c]";
  const lbl = "text-gray-500 text-xs uppercase tracking-wider mb-1 block";

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-display text-xl font-bold text-gray-900">
            {initial ? `Sửa xe ${initial.maXe}` : "Thêm xe mới"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">
            ×
          </button>
        </div>

        {err && <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 mb-4 rounded">{err}</div>}

        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className={lbl}>Loại phương tiện *</label>
            <div className="flex gap-2">
              {([["oto", "🚗 Ô tô"], ["xemay", "🏍️ Xe máy"]] as const).map(([v, lb]) => (
                <button
                  type="button"
                  key={v}
                  onClick={() => set("phanLoai", v)}
                  className={`flex-1 py-2.5 text-sm font-semibold border transition-colors ${
                    f.phanLoai === v
                      ? "bg-[#ff003c] text-white border-[#ff003c]"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {lb}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={lbl}>Tên xe *</label>
            <input required value={f.tenXe} onChange={(e) => set("tenXe", e.target.value)} placeholder={f.phanLoai === "xemay" ? "VD: Honda SH 160i" : "VD: Toyota Vios"} className={field} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={lbl}>{f.phanLoai === "xemay" ? "Dòng xe *" : "Kiểu dáng *"}</label>
              <input required value={f.loaiXe} onChange={(e) => set("loaiXe", e.target.value)} placeholder={f.phanLoai === "xemay" ? "Xe ga / Xe số / Xe điện" : "Sedan 5 chỗ / SUV 7 chỗ"} className={field} />
            </div>
            <div>
              <label className={lbl}>Màu *</label>
              <input required value={f.mau} onChange={(e) => set("mau", e.target.value)} placeholder="Trắng" className={field} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={lbl}>Biển số *</label>
              <input required value={f.bienSo} onChange={(e) => set("bienSo", e.target.value)} placeholder="51K-123.45" className={field} />
            </div>
            <div>
              <label className={lbl}>Số km đã đi (ODO)</label>
              <input type="number" min={0} value={f.odo} onChange={(e) => set("odo", Number(e.target.value))} className={field} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={lbl}>Giá thuê / ngày (₫) *</label>
              <input type="number" min={0} required value={f.giaNgay} onChange={(e) => set("giaNgay", Number(e.target.value))} className={field} />
            </div>
            <div>
              <label className={lbl}>Tiền đặt cọc (₫)</label>
              <input type="number" min={0} value={f.datCoc} onChange={(e) => set("datCoc", Number(e.target.value))} className={field} />
            </div>
          </div>
          <div>
            <label className={lbl}>Trạng thái</label>
            <select value={f.trangThai} onChange={(e) => set("trangThai", e.target.value)} className={field}>
              {CAR_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={lbl}>Đường dẫn ảnh</label>
            <input value={f.hinhAnh} onChange={(e) => set("hinhAnh", e.target.value)} placeholder="/images/cars/ten_anh.png" className={field} />
          </div>
          <div>
            <label className={lbl}>Mô tả</label>
            <textarea value={f.moTa} onChange={(e) => set("moTa", e.target.value)} rows={2} className={`${field} resize-none`} />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 border border-gray-200 text-gray-600 text-xs font-semibold tracking-widest uppercase">
              Hủy
            </button>
            <button type="submit" disabled={busy} className="flex-1 py-3 bg-[#ff003c] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#ff3366] disabled:opacity-50">
              {busy ? "Đang lưu…" : initial ? "Lưu thay đổi" : "Thêm xe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
