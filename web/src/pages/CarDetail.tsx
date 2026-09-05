import { useState, useEffect } from "react";
import { formatPrice, categoryLabels } from "../data/cars";
import { useCars } from "../components/CarsContext";
import { useUser } from "../components/UserContext";

interface CarDetailProps {
  carId: string;
  onNavigate: (page: string, carId?: string) => void;
}

export default function CarDetail({ carId, onNavigate }: CarDetailProps) {
  const { isLoggedIn } = useUser();
  const { cars } = useCars();
  const car = cars.find((c) => c.id === carId);
  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState<"specs" | "features" | "terms">("specs");
  const [showTestDrive, setShowTestDrive] = useState(false);
  const [td, setTd] = useState({ name: "", phone: "", date: "", note: "" });
  const [tdSent, setTdSent] = useState(false);

  // 🟢 MỖI KHI ĐỔI MÀU XE, TỰ ĐỘNG RESET ẢNH CHÍNH VỀ TẤM ĐẦU TIÊN CỦA MÀU ĐÓ
  useEffect(() => {
    setActiveImg(0);
  }, [activeColorIdx]);

  if (!car) {
    return (
      <div className="min-h-screen bg-[#f4f6f8] flex items-center justify-center text-gray-600">
        Xe không tồn tại.
      </div>
    );
  }

  // 💡 Cấu hình mảng ảnh thông minh: Ưu tiên mảng ảnh của màu đang chọn, tiếp theo là mảng ảnh phụ, cuối cùng là ảnh đại diện
  const hasColors = car.colors && car.colors.length > 0;
  const currentImages = hasColors && car.colors[activeColorIdx]?.images 
    ? car.colors[activeColorIdx].images 
    : (car.images && car.images.length > 0 ? car.images : [car.image]);

  return (
    <div className="min-h-screen bg-[#f4f6f8] pb-20">
      {/* Modal đăng ký lái thử */}
      {showTestDrive && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowTestDrive(false)}
        >
          <div className="bg-white w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            {tdSent ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-2">Đã gửi đăng ký lái thử</h3>
                <p className="text-gray-500 text-sm mb-5">
                  Nhân viên K&T Showroom sẽ liên hệ xác nhận lịch trong vòng 24 giờ.
                </p>
                <button
                  onClick={() => {
                    setShowTestDrive(false);
                    setTdSent(false);
                    setTd({ name: "", phone: "", date: "", note: "" });
                  }}
                  className="px-6 py-3 bg-[#ff003c] text-white text-xs font-bold tracking-widest uppercase"
                >
                  Đóng
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-display text-xl font-bold text-gray-900">Đăng ký lái thử</h3>
                  <button
                    onClick={() => setShowTestDrive(false)}
                    className="text-gray-400 hover:text-gray-700 text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>
                <p className="text-gray-500 text-sm mb-5">{car.name} · {car.year}</p>
                <form onSubmit={(e) => { e.preventDefault(); setTdSent(true); }} className="space-y-4">
                  <input
                    required
                    value={td.name}
                    onChange={(e) => setTd({ ...td, name: e.target.value })}
                    placeholder="Họ và tên *"
                    className="w-full bg-[#f4f6f8] border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#ff003c]"
                  />
                  <input
                    required
                    type="tel"
                    value={td.phone}
                    onChange={(e) => setTd({ ...td, phone: e.target.value })}
                    placeholder="Số điện thoại *"
                    className="w-full bg-[#f4f6f8] border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#ff003c]"
                  />
                  <input
                    required
                    type="datetime-local"
                    value={td.date}
                    onChange={(e) => setTd({ ...td, date: e.target.value })}
                    className="w-full bg-[#f4f6f8] border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#ff003c]"
                  />
                  <textarea
                    value={td.note}
                    onChange={(e) => setTd({ ...td, note: e.target.value })}
                    placeholder="Ghi chú (tùy chọn)"
                    rows={3}
                    className="w-full bg-[#f4f6f8] border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#ff003c] resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#ff3366] transition-all"
                  >
                    Gửi đăng ký
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-4">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <button onClick={() => onNavigate("home")} className="hover:text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] transition-colors">Trang chủ</button>
          <span>/</span>
          <button onClick={() => onNavigate("rent")} className="hover:text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] transition-colors">
            Thuê xe
          </button>
          <span>/</span>
          <span className="text-gray-600">{car.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <div className="relative overflow-hidden bg-gray-100 mb-4 h-80 lg:h-96 rounded-xl shadow-sm">
              <img
                src={currentImages[activeImg] || car.image}
                alt={car.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="text-xs font-semibold px-3 py-1 bg-white/70 text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] border border-[#ff003c] shadow-[0_0_10px_rgba(255,0,60,0.3)]/40 uppercase tracking-wider">
                  {categoryLabels[car.category as keyof typeof categoryLabels] || car.category}
                </span>
              </div>
            </div>
            {currentImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {currentImages.map((img: any, i: any) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`flex-shrink-0 w-24 h-16 overflow-hidden border-2 rounded-lg transition-all duration-200 ${
                      i === activeImg ? "border-[#ff003c] shadow-[0_0_10px_rgba(255,0,60,0.3)] scale-95" : "border-gray-200 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 mb-2">{car.name}</h1>
            <p className="text-gray-600 text-sm mb-6">{car.year} · {car.fuel} {!hasColors && car.color ? `· Màu ${car.color}` : ''}</p>

            <p className="text-gray-700 leading-relaxed mb-6 text-sm">{car.description || "Chưa có mô tả chi tiết cho chiếc xe này."}</p>

            {/* Color Selection (Chỉ hiện nút bấm chọn màu nếu xe có mảng dữ liệu car.colors) */}
            {hasColors && (
              <div className="mb-8">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                  Màu sắc: <span className="text-gray-900 font-semibold">{car.colors[activeColorIdx]?.name}</span>
                </div>
                <div className="flex gap-3">
                  {car.colors?.map((color: any, idx: any) => (
                    <button
                      key={idx}
                      onClick={() => setActiveColorIdx(idx)} // 🟢 BẤM VÀO ĐÂY: Ảnh chính phía trên sẽ tự nhảy sang bộ ảnh của màu này nhờ useEffect
                      className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                        idx === activeColorIdx ? "border-[#ff003c] scale-110 shadow-[0_0_10px_rgba(255,0,60,0.3)]" : "border-gray-300 hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Price */}
            <div className="bg-white border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Giá thuê / ngày</div>
                  <div className="font-display text-3xl font-bold text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)]">{formatPrice(car.rentPriceDay)} ₫</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Đặt cọc</div>
                  <div className="text-gray-900 font-semibold">{car.deposit > 0 ? `${formatPrice(car.deposit)} ₫` : 'Miễn phí'}</div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-3 mb-8">
              <div className={`w-2 h-2 rounded-full ${car.available ? "bg-green-400" : "bg-red-400"}`} />
              <span className={`text-sm font-medium ${car.available ? "text-green-400" : "text-red-400"}`}>
                {car.available ? "Sẵn sàng" : "Hiện không còn trống"}
              </span>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate("rent")}
                className="flex-1 py-4 border border-gray-200 text-gray-700 text-sm font-semibold tracking-widest uppercase hover:border-[#ff003c] hover:text-[#ff003c] transition-all duration-300"
              >
                ← Quay lại
              </button>
              {car.available && (
                <>
                  <button
                    onClick={() => setShowTestDrive(true)}
                    className="flex-1 py-4 bg-gray-900 text-white text-sm font-bold tracking-widest uppercase hover:bg-gray-800 transition-all duration-300"
                  >
                    Đăng Ký Lái Thử
                  </button>
                  <button
                    onClick={() => {
                      if (isLoggedIn) {
                        onNavigate("contract", car.id);
                      } else {
                        onNavigate("login", car.id);
                      }
                    }}
                    className="flex-1 py-4 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)] text-white text-sm font-bold tracking-widest uppercase hover:bg-[#ff3366] transition-all duration-300"
                  >
                    Thuê Ngay
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8">
            {(["specs", "features", "terms"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-semibold tracking-wider uppercase transition-all duration-200 relative ${
                  activeTab === tab ? "text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)]" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "specs" ? "Thông số kỹ thuật" : tab === "features" ? "Trang bị" : "Điều kiện"}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Nội dung tab */}
        <div className="pb-20">
          {activeTab === "specs" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              {([
                ["Hãng xe", car.brand],
                ["Dòng xe", car.model],
                ["Năm sản xuất", String(car.year)],
                ["Kiểu dáng", (categoryLabels as Record<string, string>)[car.category] || car.category],
                ["Số chỗ ngồi", `${car.seats} chỗ`],
                ["Nhiên liệu", car.fuel],
                ["Hộp số", car.transmission],
                ["Động cơ", car.engine],
                ["Công suất tối đa", car.power],
                ["Mô-men xoắn", car.torque],
                ["Tăng tốc 0–100 km/h", car.acceleration],
                ["Tốc độ tối đa", car.topSpeed],
                ["Mức tiêu thụ", car.consumption],
                ["Màu sắc", (car.colors?.map((x: any) => x.name).join(", ")) || car.color],
              ] as [string, string][]).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-3 border-b border-gray-100 text-sm">
                  <span className="text-gray-500">{k}</span>
                  <span className="text-gray-900 font-medium text-right">{v}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "features" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {car.features && car.features.length > 0 ? (
                car.features.map((f: string) => (
                  <div key={f} className="flex items-center gap-3 bg-white border border-gray-200 p-4 text-sm text-gray-700">
                    <span className="text-[#ff003c] font-bold">✓</span>
                    {f}
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">Chưa cập nhật trang bị cho xe này.</p>
              )}
            </div>
          )}

          {activeTab === "terms" && (
            <ul className="space-y-3 text-sm text-gray-700 max-w-3xl">
              {[
                "Xuất trình CCCD gắn chip còn hiệu lực và Giấy phép lái xe hợp lệ (hạng B1 trở lên với ô tô, A1 trở lên với xe máy).",
                "Đặt cọc bằng tiền mặt / chuyển khoản theo mức niêm yết của từng xe; hoàn lại sau khi trả xe nguyên trạng.",
                "Thanh toán đủ phí thuê khi nhận xe. Nhiên liệu trả đúng mức lúc nhận.",
                "Không dùng xe sai mục đích: đua xe, cầm cố, chở hàng cấm, đi vào vùng ngập lụt.",
                "Phí quá giờ 100.000₫/giờ; quá 5 giờ tính thêm 1 ngày thuê.",
                "Giới hạn 300 km/ngày, vượt quá phụ thu 5.000₫/km.",
              ].map((t, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-[#ff003c] font-bold">{i + 1}.</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
