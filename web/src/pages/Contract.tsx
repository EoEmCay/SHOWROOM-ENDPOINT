import { useState, useRef, useEffect, useCallback } from "react";
import { formatPrice } from "../data/cars";
import { useCars } from "../components/CarsContext";
import { useUser } from "../components/UserContext";
import ServicePicker from "../components/ServicePicker";
import { Service } from "../lib/api";

interface ContractProps {
  carId: string;
  onNavigate: (page: string, carId?: string, extra?: any) => void;
}

interface CustomerInfo {
  fullName: string;
  idNumber: string;
  phone: string;
  email: string;
  address: string;
  driverLicense?: string;
  rentDays?: number;
  startDate?: string;
}

export default function Contract({ carId, onNavigate }: ContractProps) {
  const { user } = useUser();
  const { cars } = useCars();
  const car = cars.find((c) => c.id === carId);
  const [step, setStep] = useState<"form" | "contract" | "sign_buyer" | "sign_seller" | "done">("form");
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: user?.fullName || "",
    idNumber: user?.idNumber || "",
    phone: user?.phone || "",
    email: user?.email || "",
    address: user?.address || "",
    driverLicense: user?.driverLicense || "",
    rentDays: 3,
    startDate: new Date().toISOString().split("T")[0],
  });
  const [serviceIds, setServiceIds] = useState<string[]>([]);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const selectedServices = allServices.filter((s) => serviceIds.includes(s.id));
  const serviceTotal = selectedServices.reduce((sum, s) => sum + s.price, 0);

  const [buyerSig, setBuyerSig] = useState<string | null>(null);
  const [sellerSig] = useState<string>("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==");
  const [signingFor, setSigningFor] = useState<"buyer" | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const contractRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  // Cố định số hợp đồng theo vòng đời component (tránh bị random lại mỗi lần re-render)
  const [contractNo] = useState(
    () =>
      `HĐ-RENT-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}-${Math.floor(Math.random() * 9000 + 1000)}`
  );

  if (!car) return null;

  const rentTotal = car.rentPriceDay * (customerInfo.rentDays || 1);
  const totalPrice = rentTotal + serviceTotal;

  const getPos = (e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDraw = useCallback((e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    isDrawing.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    lastPos.current = getPos(e, canvas);
  }, []);

  const draw = useCallback((e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    if (!isDrawing.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pos = getPos(e, canvas);
    if (lastPos.current) {
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = "#1a1a6e";
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    }
    lastPos.current = pos;
  }, []);

  const stopDraw = useCallback(() => {
    isDrawing.current = false;
    lastPos.current = null;
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    setBuyerSig(dataUrl);
    setSigningFor(null);
    setStep("done");
  };

  useEffect(() => {
    if (signingFor !== "buyer") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDraw);
    canvas.addEventListener("mouseleave", stopDraw);
    canvas.addEventListener("touchstart", startDraw, { passive: false });
    canvas.addEventListener("touchmove", draw, { passive: false });
    canvas.addEventListener("touchend", stopDraw);
    return () => {
      canvas.removeEventListener("mousedown", startDraw);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDraw);
      canvas.removeEventListener("mouseleave", stopDraw);
      canvas.removeEventListener("touchstart", startDraw);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", stopDraw);
    };
  }, [signingFor, startDraw, draw, stopDraw]);

  const validateForm = () => {
    return (
      customerInfo.fullName.trim() &&
      customerInfo.idNumber.trim() &&
      customerInfo.phone.trim() &&
      customerInfo.email.trim() &&
      customerInfo.address.trim()
    );
  };

  if (step === "form") {
    return (
      <div className="min-h-screen bg-[#f4f6f8] pb-20">
        <div className="max-w-2xl mx-auto px-6 lg:px-12 pt-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)]" />
            <span className="text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] text-sm font-medium tracking-widest uppercase">
              Thông tin khách hàng
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
            Đặt Thuê Xe
          </h1>
          <p className="text-gray-600 text-sm mb-10">{car.name}</p>

          <div className="bg-white border border-gray-200 p-8 space-y-5">
            {[
              { key: "fullName", label: "Họ và tên *", placeholder: "Nguyễn Văn A", type: "text" },
              { key: "idNumber", label: "CCCD / Hộ chiếu *", placeholder: "012345678901", type: "text" },
              { key: "phone", label: "Số điện thoại *", placeholder: "0901234567", type: "tel" },
              { key: "email", label: "Email *", placeholder: "example@email.com", type: "email" },
              { key: "address", label: "Địa chỉ thường trú *", placeholder: "Số 1, Đường ABC, Quận 1, TP.HCM", type: "text" },
            ].map((field) => (
              <div key={field.key}>
                <label className="text-gray-600 text-xs uppercase tracking-wider mb-2 block">{field.label}</label>
                <input
                  type={field.type}
                  value={customerInfo[field.key as keyof CustomerInfo] as string}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                  className="w-full bg-[#f4f6f8] border border-gray-200 text-gray-900 px-4 py-3 text-sm focus:outline-none focus:border-[#ff003c] shadow-[0_0_10px_rgba(255,0,60,0.3)] transition-colors placeholder-white/20"
                />
              </div>
            ))}

                <div>
                  <label className="text-gray-600 text-xs uppercase tracking-wider mb-2 block">Bằng lái xe *</label>
                  <input
                    type="text"
                    value={customerInfo.driverLicense || ""}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, driverLicense: e.target.value })}
                    placeholder="Số bằng lái xe"
                    className="w-full bg-[#f4f6f8] border border-gray-200 text-gray-900 px-4 py-3 text-sm focus:outline-none focus:border-[#ff003c] shadow-[0_0_10px_rgba(255,0,60,0.3)] transition-colors placeholder-white/20"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-600 text-xs uppercase tracking-wider mb-2 block">Ngày nhận xe *</label>
                    <input
                      type="date"
                      value={customerInfo.startDate || ""}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, startDate: e.target.value })}
                      className="w-full bg-[#f4f6f8] border border-gray-200 text-gray-900 px-4 py-3 text-sm focus:outline-none focus:border-[#ff003c] shadow-[0_0_10px_rgba(255,0,60,0.3)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 text-xs uppercase tracking-wider mb-2 block">Thời gian thuê *</label>
                    <select
                      value={customerInfo.rentDays || 1}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, rentDays: Number(e.target.value) })}
                      className="w-full bg-[#f4f6f8] border border-gray-200 text-gray-900 px-4 py-3 text-sm focus:outline-none focus:border-[#ff003c] shadow-[0_0_10px_rgba(255,0,60,0.3)] transition-colors"
                    >
                      <optgroup label="Theo giờ">
                        <option value={1/24}>1 giờ</option>
                        <option value={2/24}>2 giờ</option>
                        <option value={4/24}>4 giờ</option>
                        <option value={8/24}>8 giờ</option>
                        <option value={12/24}>12 giờ</option>
                        <option value={24/24}>1 ngày</option>
                      </optgroup>
                      <optgroup label="Theo ngày">
                        <option value={1}>1 ngày</option>
                        <option value={2}>2 ngày</option>
                        <option value={3}>3 ngày</option>
                        <option value={5}>5 ngày</option>
                        <option value={7}>7 ngày</option>
                        <option value={14}>14 ngày</option>
                        <option value={30}>30 ngày</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
          </div>

          {/* Dịch vụ bổ sung */}
          <div className="mt-6">
            <ServicePicker
              selectedIds={serviceIds}
              onChange={setServiceIds}
              onLoaded={setAllServices}
            />
          </div>

          {/* Summary */}
          <div className="bg-white border border-[#ff003c] shadow-[0_0_10px_rgba(255,0,60,0.3)]/20 p-6 mt-6">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>{car.name}</span>
                <span>{`${formatPrice(car.rentPriceDay)}/ngày`} ₫</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Số ngày thuê</span>
                <span>{customerInfo.rentDays} ngày</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tiền thuê xe</span>
                <span>{formatPrice(rentTotal)} ₫</span>
              </div>
              {selectedServices.map((s) => (
                <div key={s.id} className="flex justify-between text-gray-500 text-xs pl-3">
                  <span>+ {s.name}</span>
                  <span>{s.price > 0 ? `${formatPrice(s.price)} ₫` : "Miễn phí"}</span>
                </div>
              ))}
              {serviceTotal > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Dịch vụ bổ sung ({selectedServices.length})</span>
                  <span>{formatPrice(serviceTotal)} ₫</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Đặt cọc</span>
                <span>{car.deposit > 0 ? `${formatPrice(car.deposit)} ₫` : 'Miễn phí'}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] font-bold font-display text-xl">
                <span>Tổng tiền</span>
                <span>{formatPrice(totalPrice)} ₫</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={() => onNavigate("detail", car.id)}
              className="flex-1 py-4 border border-gray-200 text-gray-600 text-sm font-semibold tracking-widest uppercase hover:border-white/40 transition-all"
            >
              ← Quay lại
            </button>
            <button
              onClick={() => validateForm() && setStep("contract")}
              disabled={!validateForm()}
              className="flex-1 py-4 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)] text-white text-sm font-bold tracking-widest uppercase hover:bg-[#ff3366] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Xem Hợp Đồng →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "contract" || step === "done") {
    const endDate = customerInfo.startDate && customerInfo.rentDays
      ? new Date(new Date(customerInfo.startDate).getTime() + customerInfo.rentDays * 86400000).toLocaleDateString("vi-VN")
      : "";

    return (
      <div className="min-h-screen bg-[#f4f6f8] pb-20">
        {/* Signing overlay */}
        {signingFor === "buyer" && (
          <div className="fixed inset-0 z-50 bg-white/90 flex items-center justify-center p-4">
            <div className="bg-white max-w-lg w-full p-6">
              <h3 className="text-gray-900 font-bold text-lg mb-1">Ký xác nhận</h3>
              <p className="text-gray-500 text-sm mb-4">Sử dụng chuột hoặc ngón tay để ký tên của bạn bên dưới</p>
              <canvas
                ref={canvasRef}
                width={500}
                height={200}
                className="signature-canvas w-full border-2 border-dashed border-gray-300 bg-gray-50 block"
                style={{ touchAction: "none" }}
              />
              <p className="text-gray-400 text-xs text-center mt-2 mb-4">Vẽ chữ ký của bạn vào khu vực trên</p>
              <div className="flex gap-3">
                <button onClick={clearCanvas} className="flex-1 py-3 border border-gray-300 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors">
                  Xóa lại
                </button>
                <button onClick={() => { setSigningFor(null); }} className="flex-1 py-3 border border-gray-300 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors">
                  Hủy
                </button>
                <button onClick={saveSignature} className="flex-1 py-3 bg-[#1a1a6e] text-gray-900 text-sm font-bold hover:bg-[#2a2a8e] transition-colors">
                  Xác nhận ký
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 pt-8">
          {/* Progress */}
          <div className="flex items-center gap-3 mb-8 px-2">
            {["Thông tin", "Hợp đồng", "Hoàn tất"].map((s, i) => (
              <div key={s} className="flex items-center gap-3 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  i <= (step === "done" ? 2 : 1) ? "bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)] text-white" : "border border-gray-200 text-gray-400"
                }`}>{i + 1}</div>
                <span className={`text-xs font-medium ${i <= (step === "done" ? 2 : 1) ? "text-gray-900" : "text-gray-400"}`}>{s}</span>
                {i < 2 && <div className="flex-1 h-px bg-[#2a2a2a]" />}
              </div>
            ))}
          </div>

          {/* Contract document */}
          <div ref={contractRef} className="bg-white text-gray-900 p-8 lg:p-12 mb-8 shadow-2xl">
            {/* Header */}
            <div className="text-center border-b-2 border-gray-900 pb-6 mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-16 h-16 bg-[#1a1a6e] rounded-full flex items-center justify-center">
                  <span className="text-gray-900 font-bold text-xl font-display">KT</span>
                </div>
                <div className="text-left">
                  <div className="font-bold text-xl text-[#1a1a6e] font-display">K&T Showroom</div>
                  <div className="text-gray-500 text-xs">Công ty TNHH K&T Showroom</div>
                  <div className="text-gray-400 text-xs">MST: 0312345678 · ĐT: 1800 9999</div>
                </div>
              </div>
              <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-900 font-display mt-4">
                HỢP ĐỒNG THUÊ XE Ô TÔ
              </h2>
              <p className="text-gray-500 text-sm mt-2">Số hợp đồng: <strong>{contractNo}</strong></p>
              <p className="text-gray-500 text-sm">
                Ngày lập: {today.getDate()}/{today.getMonth() + 1}/{today.getFullYear()}
              </p>
            </div>

            {/* Legal basis */}
            <div className="mb-6 text-sm text-gray-600 leading-relaxed italic">
              <p>Căn cứ Bộ luật Dân sự nước Cộng hoà Xã hội Chủ nghĩa Việt Nam năm 2015;</p>
              <p>Căn cứ Luật Thương mại Việt Nam và các văn bản hướng dẫn thi hành;</p>
              <p>Căn cứ nhu cầu và khả năng của hai bên;</p>
              <p>Hai bên cùng thống nhất ký kết hợp đồng này với các điều khoản dưới đây:</p>
            </div>

            {/* Parties */}
            <div className="mb-6">
              <h3 className="font-bold text-base uppercase tracking-wider text-[#1a1a6e] border-b border-gray-200 pb-2 mb-4">
                Điều 1. Thông Tin Các Bên
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 border border-gray-200">
                  <p className="font-bold text-sm text-[#1a1a6e] mb-3 uppercase tracking-wider">Bên A — Bên Cho Thuê</p>
                  <p className="text-sm"><strong>Tên:</strong> Công ty TNHH K&T Showroom</p>
                  <p className="text-sm"><strong>MST:</strong> 0312345678</p>
                  <p className="text-sm"><strong>Địa chỉ:</strong> 123 Đường Nguyễn Huệ, Quận 1, TP.HCM</p>
                  <p className="text-sm"><strong>ĐT:</strong> 1800 9999</p>
                  <p className="text-sm"><strong>Email:</strong> contract@ktshowroom.vn</p>
                  <p className="text-sm mt-2"><strong>Đại diện:</strong> Đại diện K&T Showroom — Giám đốc</p>
                </div>
                <div className="bg-gray-50 p-4 border border-gray-200">
                  <p className="font-bold text-sm text-[#1a1a6e] mb-3 uppercase tracking-wider">Bên B — Bên Thuê</p>
                  <p className="text-sm"><strong>Họ tên:</strong> {customerInfo.fullName || "___________________"}</p>
                  <p className="text-sm"><strong>CCCD:</strong> {customerInfo.idNumber || "___________________"}</p>
                  <p className="text-sm"><strong>ĐT:</strong> {customerInfo.phone || "___________________"}</p>
                  <p className="text-sm"><strong>Email:</strong> {customerInfo.email || "___________________"}</p>
                  <p className="text-sm"><strong>Địa chỉ:</strong> {customerInfo.address || "___________________"}</p>
                  <p className="text-sm"><strong>GPLX:</strong> {customerInfo.driverLicense || "___________________"}</p>
                </div>
              </div>
            </div>

            {/* Vehicle info */}
            <div className="mb-6">
              <h3 className="font-bold text-base uppercase tracking-wider text-[#1a1a6e] border-b border-gray-200 pb-2 mb-4">
                Điều 2. Thông Tin Xe
              </h3>
              <table className="w-full text-sm border-collapse">
                <tbody>
                  {[
                    ["Tên xe", car.name],
                    ["Thương hiệu / Model", `${car.brand} ${car.model}`],
                    ["Năm sản xuất", car.year.toString()],
                    ["Màu xe", car.color || car.colors?.[0]?.name || "Tiêu chuẩn"],
                    ["Động cơ", car.engine],
                    ["Hộp số", car.transmission],
                    ["Nhiên liệu", car.fuel],
                    ["Số chỗ ngồi", `${car.seats} chỗ`],
                  ].map(([k, v]) => (
                    <tr key={k} className="border-b border-gray-100">
                      <td className="py-2 pr-4 text-gray-500 w-1/3">{k}</td>
                      <td className="py-2 font-medium">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Financial terms */}
            <div className="mb-6">
              <h3 className="font-bold text-base uppercase tracking-wider text-[#1a1a6e] border-b border-gray-200 pb-2 mb-4">
                Điều 3. Giá Trị Hợp Đồng & Thanh Toán
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-gray-100 py-2">
                  <span className="text-gray-500">Thời gian thuê</span>
                  <span className="font-semibold">{customerInfo.rentDays} ngày ({customerInfo.startDate} → {endDate})</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 py-2">
                  <span className="text-gray-500">Đơn giá thuê / ngày</span>
                  <span className="font-semibold">{car.rentPriceDay.toLocaleString("vi-VN")} ₫</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 py-2">
                  <span className="text-gray-500">Tiền thuê xe</span>
                  <span className="font-semibold">{rentTotal.toLocaleString("vi-VN")} ₫</span>
                </div>
                {selectedServices.length > 0 && (
                  <>
                    <div className="pt-2 pb-1 text-gray-500 font-semibold">Dịch vụ bổ sung</div>
                    {selectedServices.map((s) => (
                      <div key={s.id} className="flex justify-between border-b border-gray-100 py-1.5 pl-3 text-[13px]">
                        <span className="text-gray-500">{s.name}</span>
                        <span className="font-medium">{s.price > 0 ? `${s.price.toLocaleString("vi-VN")} ₫` : "Miễn phí"}</span>
                      </div>
                    ))}
                    <div className="flex justify-between border-b border-gray-100 py-2">
                      <span className="text-gray-500">Cộng dịch vụ</span>
                      <span className="font-semibold">{serviceTotal.toLocaleString("vi-VN")} ₫</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between border-b border-gray-100 py-2">
                  <span className="text-gray-500">Tiền đặt cọc (hoàn lại sau khi trả xe)</span>
                  <span className="font-semibold text-orange-600">{car.deposit > 0 ? `${car.deposit.toLocaleString("vi-VN")} ₫` : '0 ₫'}</span>
                </div>
              </div>
              <div className="flex justify-between font-bold text-gray-900 border-t border-gray-900 pt-4 mt-2">
                <span>Tổng phải thanh toán ngay</span>
                <div className="text-right">
                  <span>{(totalPrice + car.deposit).toLocaleString("vi-VN")} ₫</span>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="mb-6">
              <h3 className="font-bold text-base uppercase tracking-wider text-[#1a1a6e] border-b border-gray-200 pb-2 mb-4">
                Điều 4. Điều Khoản & Điều Kiện
              </h3>
              <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
                <p><strong>4.1.</strong> Hai bên cam kết thực hiện đúng và đầy đủ các nghĩa vụ đã thỏa thuận trong hợp đồng này.</p>
                <p><strong>4.2.</strong> Bên B không được tự ý chuyển nhượng quyền sử dụng xe cho bên thứ ba khi chưa có sự đồng ý bằng văn bản của Bên A.</p>
                <p><strong>4.3.</strong> Bên B chịu trách nhiệm về mọi thiệt hại phát sinh do lỗi chủ quan của mình trong thời gian thuê xe.</p>
                <p><strong>4.4.</strong> Mọi tranh chấp phát sinh sẽ được giải quyết trước tiên bằng thương lượng, nếu không thành sẽ đưa ra Tòa án nhân dân TP.HCM giải quyết.</p>
                <p><strong>4.5.</strong> Hợp đồng này có hiệu lực kể từ ngày cả hai bên ký và đóng dấu xác nhận.</p>
                <p><strong>4.6.</strong> Hợp đồng được lập thành 02 bản gốc, mỗi bên giữ 01 bản có giá trị pháp lý như nhau.</p>
              </div>
            </div>

            {/* Signatures */}
            <div className="border-t-2 border-gray-900 pt-6 mt-8">
              <div className="grid grid-cols-2 gap-8 text-center text-sm">
                <div>
                  <p className="font-bold uppercase tracking-wider text-gray-700 mb-1">Bên A — Đại diện bên cho thuê</p>
                  <p className="text-gray-500 text-xs mb-4">(Ký, ghi rõ họ tên, đóng dấu)</p>
                  <div className="h-24 border border-gray-200 flex items-center justify-center relative bg-gray-50">
                    {/* Seller signature — pre-signed */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* Decorative signature */}
                        <svg width="140" height="60" viewBox="0 0 140 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 45 Q20 10 35 30 Q50 50 65 25 Q80 5 95 28 Q110 50 130 20" stroke="#1a1a6e" strokeWidth="2" strokeLinecap="round" fill="none"/>
                          <path d="M15 50 Q40 48 65 50 Q90 52 120 48" stroke="#1a1a6e" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                        </svg>
                        {/* Company seal */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-40">
                          <div className="w-20 h-20 rounded-full border-4 border-[#c00] flex items-center justify-center" style={{borderStyle: 'double'}}>
                            <div className="text-center">
                              <div className="text-[#c00] font-bold text-[7px] uppercase leading-tight">K&T</div>
                              <div className="text-[#c00] font-bold text-[5px] uppercase leading-tight">SHOWROOM</div>
                              <div className="w-8 h-px bg-[#c00] my-0.5 mx-auto" />
                              <div className="text-[#c00] font-bold text-[5px] uppercase leading-tight">TP.HCM</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-700 mt-2">Đại diện K&T Showroom</p>
                  <p className="text-gray-400 text-xs">Giám đốc</p>
                </div>

                <div>
                  <p className="font-bold uppercase tracking-wider text-gray-700 mb-1">Bên B — Bên thuê</p>
                  <p className="text-gray-500 text-xs mb-4">(Ký, ghi rõ họ tên)</p>
                  <div
                    className="h-24 border border-gray-200 flex items-center justify-center relative overflow-hidden"
                    style={{ background: buyerSig ? "white" : "#f9fafb" }}
                  >
                    {buyerSig ? (
                      <img src={buyerSig} alt="Chữ ký" className="max-h-full max-w-full object-contain" />
                    ) : (
                      <span className="text-gray-300 text-sm italic">Chưa ký</span>
                    )}
                  </div>
                  <p className="font-semibold text-gray-700 mt-2">{customerInfo.fullName || "___________________"}</p>
                  <p className="text-gray-400 text-xs">Khách hàng</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          {step === "contract" && (
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={() => setStep("form")}
                className="flex-1 py-4 border border-gray-200 text-gray-600 text-sm font-semibold tracking-widest uppercase hover:border-white/40 transition-all"
              >
                ← Quay lại
              </button>
              <button
                onClick={() => setSigningFor("buyer")}
                className="flex-1 py-4 bg-[#1a1a6e] text-gray-900 text-sm font-bold tracking-widest uppercase hover:bg-[#2a2a8e] transition-all flex items-center justify-center gap-2"
              >
                ✍ Ký Hợp Đồng
              </button>
            </div>
          )}

          {step === "done" && (
            <div className="text-center mb-12">
              <div className="bg-green-950 border border-green-700 p-6 mb-6">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="text-green-400 font-bold text-xl mb-2">Hợp đồng đã được ký thành công!</h3>
                <p className="text-green-600 text-sm">Cả hai bên đã xác nhận. Vui lòng tiến hành thanh toán đặt cọc để hoàn tất.</p>
              </div>
              <button
                onClick={() =>
                  onNavigate("payment", car.id, {
                    contractNo,
                    customerInfo,
                    totalPrice,
                    rentTotal,
                    serviceTotal,
                    services: selectedServices.map((s) => ({ madv: s.id, ten: s.name, gia: s.price })),
                    deposit: car.deposit,
                    rentDays: customerInfo.rentDays,
                  })
                }
                className="px-12 py-4 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)] text-white text-sm font-bold tracking-widest uppercase hover:bg-[#ff3366] transition-all"
              >
                Tiến Hành Thanh Toán →
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
