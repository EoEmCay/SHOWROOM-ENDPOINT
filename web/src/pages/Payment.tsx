import { useState, useEffect } from "react";
import { formatPrice } from "../data/cars";
import { useCars } from "../components/CarsContext";
import { createOrder } from "../lib/api";

interface RentalTimerState {
  keyPickedUp: boolean;
  pickupTime: number | null;
  rentalHours: number;
  totalSeconds: number;
  elapsedSeconds: number;
  isOverdue: boolean;
  overdueHours: number;
  lateFee: number;
}

interface PaymentProps {
  carId: string;
  extra: {
    contractNo: string;
    customerInfo: any;
    totalPrice: number;
    deposit: number;
    rentDays?: number;
  };
  onNavigate: (page: string) => void;
}

function LiveMap({ car }: { car: any }) {
  const [position, setPosition] = useState({ lat: 10.7769, lng: 106.6966 });
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => ({
        lat: prev.lat + (Math.random() - 0.2) * 0.0005,
        lng: prev.lng + (Math.random() - 0.2) * 0.0005
      }));
      setSpeed(Math.floor(Math.random() * 40 + 20)); // Random speed between 20-60 km/h
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 mb-8 relative h-96">
      {/* Mock Map Background */}
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><path d=%22M0 20 L 100 20 M 0 40 L 100 40 M 0 60 L 100 60 M 0 80 L 100 80 M 20 0 L 20 100 M 40 0 L 40 100 M 60 0 L 60 100 M 80 0 L 80 100%22 stroke=%22%234b5563%22 stroke-width=%220.5%22 fill=%22none%22/></svg>')" }}></div>
      
      {/* Radar sweeping effect */}
      <div className="absolute inset-0 rounded-full border border-green-500/20 opacity-50 scale-150 animate-[spin_4s_linear_infinite]" style={{ background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(34, 197, 94, 0.2) 360deg)' }}></div>

      {/* Car Marker */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
        <div className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded mb-1 whitespace-nowrap shadow-[0_0_10px_rgba(34,197,94,0.5)]">
          {car?.name} • {speed} km/h
        </div>
        <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-[0_0_15px_rgba(34,197,94,0.8)] relative">
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping"></div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur border border-gray-700 p-4 rounded text-white text-xs flex justify-between items-center z-10">
        <div>
          <p className="text-gray-400 mb-1 uppercase tracking-wider">Tọa độ trực tiếp (GPS)</p>
          <p className="font-mono text-green-400 font-bold">{position.lat.toFixed(6)}°N, {position.lng.toFixed(6)}°E</p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 mb-1 uppercase tracking-wider">Trạng thái kết nối</p>
          <p className="text-green-400 font-bold flex items-center gap-1 justify-end">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Đã kết nối Server
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Payment({ carId, extra, onNavigate }: PaymentProps) {
  const { cars } = useCars();
  const car = cars.find((c) => c.id === carId);
  const [copied, setCopied] = useState<string | null>(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [countdown, setCountdown] = useState(900);
  const [submitting, setSubmitting] = useState(false);
  const [orderCode, setOrderCode] = useState<string | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);

  const { contractNo, customerInfo, totalPrice, rentTotal, serviceTotal, services, deposit, rentDays } =
    extra as any;
  const orderServices: { madv: string; ten: string; gia: number }[] = services || [];

  const confirmPayment = async () => {
    setSubmitting(true);
    setOrderError(null);
    try {
      const res = await createOrder({
        carId,
        customer: {
          fullName: customerInfo.fullName,
          idNumber: customerInfo.idNumber,
          phone: customerInfo.phone,
          email: customerInfo.email,
          address: customerInfo.address,
          driverLicense: customerInfo.driverLicense,
        },
        startDate: customerInfo.startDate,
        rentDays: rentDays || customerInfo.rentDays || 1,
        rentTotal: rentTotal ?? totalPrice,
        deposit,
        contractNo,
        paymentMethod: deposit > 0 ? "Chuyển khoản" : "Tiền mặt",
        paid: true,
        services: orderServices.map((s) => ({ madv: s.madv, soLuong: 1 })),
      });
      setOrderCode(res.maDatXe);
      setPaymentConfirmed(true);
    } catch (e: any) {
      setOrderError(e?.message || "Không lưu được đơn thuê. Kiểm tra backend PHP đã chạy chưa.");
    } finally {
      setSubmitting(false);
    }
  };

  // Calculate rental duration in seconds
  const rentalHours = Math.round((rentDays || 1) * 24);
  const totalRentalSeconds = (rentDays || 1) * 24 * 3600;

  const [rentalTimer, setRentalTimer] = useState<RentalTimerState>({
    keyPickedUp: false,
    pickupTime: null,
    rentalHours,
    totalSeconds: totalRentalSeconds,
    elapsedSeconds: 0,
    isOverdue: false,
    overdueHours: 0,
    lateFee: 0,
  });

  const bankInfo = {
    bank: "Techcombank",
    accountNumber: "30068889999",
    accountName: "K&T SHOWROOM",
    branch: "Techcombank",
    amount: deposit,
    transferContent: `DAT COC ${contractNo} ${car?.name || ""}`.trim(),
    qrCode: `https://img.vietqr.io/image/TCB-30068889999-compact2.jpg?amount=${deposit}&addInfo=DAT+COC+${contractNo}+${car?.name?.replace(/\s+/g, "+") || ""}&accountName=KT+SHOWROOM`,
  };

  useEffect(() => {
    if (paymentConfirmed) return;
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [paymentConfirmed]);

  useEffect(() => {
    if (!paymentConfirmed || !rentalTimer.keyPickedUp) return;

    const timer = setInterval(() => {
      setRentalTimer((prev) => {
        const newElapsed = prev.elapsedSeconds + 1;
        const isOverdue = newElapsed > prev.totalSeconds;
        const overdueSeconds = isOverdue ? newElapsed - prev.totalSeconds : 0;
        const overdueHours = Math.ceil(overdueSeconds / 3600);
        const lateFee = overdueHours * 100000;

        return {
          ...prev,
          elapsedSeconds: newElapsed,
          isOverdue,
          overdueHours,
          lateFee,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [paymentConfirmed, rentalTimer.keyPickedUp])

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(field);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  if (!car) return null;

  return (
    <div className="min-h-screen bg-[#f4f6f8] pb-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-12 pt-12">
        {!paymentConfirmed ? (
          <>
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)]" />
                <span className="text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] text-sm font-medium tracking-widest uppercase">Thanh toán</span>
                <div className="h-px w-12 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)]" />
              </div>
              <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">Đặt Cọc Để Xác Nhận</h1>
              <p className="text-gray-600 text-sm">Mã hợp đồng: <span className="text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] font-semibold">{contractNo}</span></p>
            </div>

            {/* Countdown */}
            <div className="bg-orange-950 border border-orange-700 p-4 flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="text-orange-400 text-xl">⏱</div>
                <div>
                  <p className="text-orange-300 text-sm font-semibold">Thời gian giữ xe</p>
                  <p className="text-orange-500 text-xs">Vui lòng hoàn tất trong thời gian quy định</p>
                </div>
              </div>
              <div className="text-orange-400 font-bold text-2xl font-display">
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </div>
            </div>

            {/* Order summary */}
            <div className="bg-white border border-gray-200 p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Thông tin đặt hàng</h3>
              <div className="flex gap-4 mb-4">
                <img src={car.image} alt={car.name} className="w-20 h-14 object-cover flex-shrink-0" />
                <div>
                  <p className="text-gray-900 font-semibold">{car.name}</p>
                  <div className="text-gray-500 text-sm">{car.year} • {car.color || car.colors?.[0]?.name || "Tiêu chuẩn"}</div>
                  <p className="text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] text-sm font-semibold mt-1">
                    {`${extra.totalPrice.toLocaleString("vi-VN")} ₫ tổng`}
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Khách hàng</span>
                  <span>{customerInfo.fullName}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Số điện thoại</span>
                  <span>{customerInfo.phone}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Tiền thuê xe</span>
                  <span>{(rentTotal ?? totalPrice).toLocaleString("vi-VN")} ₫</span>
                </div>
                {orderServices.length > 0 && (
                  <div className="mb-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Dịch vụ bổ sung ({orderServices.length})</span>
                      <span>{(serviceTotal || 0).toLocaleString("vi-VN")} ₫</span>
                    </div>
                    {orderServices.map((s) => (
                      <div key={s.madv} className="flex justify-between text-xs text-gray-400 pl-3">
                        <span>{s.ten}</span>
                        <span>{s.gia > 0 ? `${s.gia.toLocaleString("vi-VN")} ₫` : "Miễn phí"}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex justify-between text-sm text-gray-700 font-semibold mb-2 pt-2 border-t border-gray-100">
                  <span>Tổng giá trị đơn</span>
                  <span>{extra.totalPrice.toLocaleString("vi-VN")} ₫</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] pt-2 border-t border-gray-200">
                  <span>Tiền đặt cọc cần chuyển</span>
                  <span>{deposit > 0 ? `${deposit.toLocaleString("vi-VN")} ₫` : 'Miễn phí'}</span>
                </div>
              </div>
            </div>

            {deposit > 0 ? (
              <div className="bg-white border border-gray-200 p-6 lg:p-8 mb-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                  <div className="w-10 h-10 bg-[#007b4f] rounded flex items-center justify-center">
                    <span className="text-gray-900 font-bold text-xs">VCB</span>
                  </div>
                  <div>
                    <p className="font-bold text-[#007b4f]">{bankInfo.bank}</p>
                    <p className="text-gray-400 text-xs">{bankInfo.branch}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div className="space-y-4">
                    {[
                      { label: "Số tài khoản", value: bankInfo.accountNumber, copyKey: "account" },
                      { label: "Tên tài khoản", value: bankInfo.accountName, copyKey: "name" },
                      { label: "Số tiền", value: `${deposit.toLocaleString("vi-VN")} ₫`, copyKey: "amount" },
                      { label: "Nội dung chuyển khoản", value: bankInfo.transferContent, copyKey: "content" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start justify-between gap-4 py-3 border-b border-gray-100">
                        <div className="flex-1">
                          <p className="text-gray-400 text-xs mb-1">{item.label}</p>
                          <p className="text-gray-900 font-semibold text-sm">{item.value}</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(item.value, item.copyKey)}
                          className="flex-shrink-0 text-xs px-3 py-1.5 border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-[#1a1a6e] transition-colors"
                        >
                          {copied === item.copyKey ? "✓ Đã sao chép" : "Sao chép"}
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* QR Code */}
                  <div className="flex flex-col items-center">
                    <div className="w-48 h-48 bg-white border-2 border-gray-300 flex items-center justify-center mb-3 overflow-hidden">
                      <img
                        src={bankInfo.qrCode}
                        alt="QR Code Thanh Toán"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = '<div class="text-center p-4"><div class="text-2xl mb-2">📱</div><div class="text-xs text-gray-400">QR Code</div></div>';
                        }}
                      />
                    </div>
                    <p className="text-gray-600 text-xs text-center font-semibold">Techcombank</p>
                    <p className="text-gray-500 text-xs text-center mt-1">Quét mã để thanh toán ngay</p>
                    <p className="text-gray-700 text-sm font-bold mt-2">{deposit.toLocaleString("vi-VN")}₫</p>
                    <p className="text-gray-500 text-xs text-center mt-1">{car?.name}</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-100">
                  <p className="text-blue-700 text-xs font-semibold mb-1">⚠ Lưu ý quan trọng</p>
                  <p className="text-blue-600 text-xs leading-relaxed">
                    Vui lòng nhập chính xác nội dung chuyển khoản <strong>"{bankInfo.transferContent}"</strong> để hệ thống tự động xác nhận.
                    Sau khi chuyển khoản thành công, nhân viên sẽ liên hệ xác nhận trong vòng 30 phút.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 p-8 mb-8 text-center">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Miễn phí đặt cọc</h3>
                <p className="text-gray-600 text-sm">Đơn đặt xe của bạn đã được ghi nhận. Vui lòng bấm xác nhận bên dưới để hoàn tất quá trình thuê xe.</p>
              </div>
            )}

            {orderError && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 mb-3 rounded">
                {orderError}
              </div>
            )}
            <button
              onClick={confirmPayment}
              disabled={submitting}
              className="w-full py-5 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)] text-white text-sm font-bold tracking-widest uppercase hover:bg-[#ff3366] transition-all disabled:opacity-50"
            >
              {submitting
                ? "Đang xử lý…"
                : deposit > 0
                  ? "Tôi Đã Chuyển Khoản Xong"
                  : "Xác Nhận Đặt Xe"}
            </button>

            <button
              onClick={() => onNavigate("home")}
              className="w-full mt-3 py-4 border border-gray-200 text-gray-500 text-sm font-semibold tracking-widest uppercase hover:text-gray-700 transition-all"
            >
              Về Trang Chủ
            </button>
          </>
        ) : (
          /* Rental mode - Map and countdown */
          <div>
            {!rentalTimer.keyPickedUp ? (
              <>
                <div className="text-center mb-8">
                  <h1 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-2">🎉 Thanh Toán Thành Công!</h1>
                  {orderCode && (
                    <p className="text-gray-700 text-sm mb-1">
                      Mã đơn thuê: <span className="text-[#ff003c] font-bold">{orderCode}</span> · đã lưu vào hệ thống
                    </p>
                  )}
                  <p className="text-gray-600">Đến showroom để lấy chìa khóa và nhận xe</p>
                </div>

                {/* Map Section */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
                  {/* Simulated Map */}
                  <div className="bg-gradient-to-b from-blue-900 to-blue-800 p-6 h-80 relative">
                    <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><path d=%22M0 50 Q 25 25, 50 50 T 100 50%22 stroke=%22white%22 fill=%22none%22/></svg>')"}}>
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="text-center">
                        <h2 className="text-gray-900 font-bold text-xl mb-1">📍 Vị Trí Showroom</h2>
                        <p className="text-blue-100 text-sm">123 Nguyễn Huệ, Quận 1, TP.HCM</p>
                        <p className="text-blue-200 text-xs mt-1">Tọa độ: 10.7769°N, 106.6966°E</p>
                      </div>
                      <div className="text-center">
                        <div className="inline-block bg-white/20 backdrop-blur px-4 py-3 rounded-lg">
                          <p className="text-gray-900 font-semibold text-lg">🚗 {car?.name}</p>
                          <p className="text-blue-100 text-xs mt-1">Đang chờ tại Showroom</p>
                          <p className="text-blue-200 text-xs">Hãng: {car?.brand}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Key Location Info */}
                  <div className="p-6 space-y-4 border-t border-gray-200">
                    <div className="bg-[#f4f6f8] p-4 rounded border border-[#ff003c] shadow-[0_0_10px_rgba(255,0,60,0.3)]/30">
                      <p className="text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] font-semibold mb-2">🔑 Vị Trí Lấy Chìa Khóa</p>
                      <p className="text-gray-800 text-sm">Lầu 3 - Phòng 301, K&T Showroom</p>
                      <p className="text-gray-600 text-xs mt-2">Nhân viên sẽ hướng dẫn bạn lấy chìa khóa và thủ tục bàn giao</p>
                    </div>
                    <div className="bg-[#f4f6f8] p-4 rounded border border-blue-500/30">
                      <p className="text-blue-400 font-semibold mb-2">⏱️ Thời Gian Thuê</p>
                      <p className="text-gray-900 text-sm font-display">
                        {rentalHours} giờ ({rentDays && rentDays >= 1 ? Math.floor(rentDays) : (rentalHours / 24).toFixed(1)}{rentDays && rentDays >= 1 ? " ngày" : ""})
                      </p>
                      <p className="text-gray-600 text-xs mt-2">Phí phạt quá hạn: 100.000₫/giờ</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setRentalTimer({ ...rentalTimer, keyPickedUp: true, pickupTime: Date.now() })}
                  className="w-full py-5 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)] text-white text-sm font-bold tracking-widest uppercase hover:bg-[#ff3366] transition-all mb-3"
                >
                  🔑 Tôi Đã Lấy Chìa Khóa
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={() => onNavigate("orders")}
                    className="flex-1 py-4 border border-[#ff003c] text-[#ff003c] text-sm font-semibold tracking-widest uppercase hover:bg-[#ff003c]/5 transition-all"
                  >
                    Đơn Thuê Của Tôi
                  </button>
                  <button
                    onClick={() => onNavigate("home")}
                    className="flex-1 py-4 border border-gray-200 text-gray-500 text-sm font-semibold tracking-widest uppercase hover:text-gray-700 transition-all"
                  >
                    Về Trang Chủ
                  </button>
                </div>
              </>
            ) : (
              /* Countdown Timer after key pickup */
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <h1 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 text-center uppercase tracking-wider">Live Tracking</h1>
                </div>
                <p className="text-gray-600 text-center mb-6 text-sm">Hệ thống đang theo dõi lộ trình xe của bạn</p>

                <LiveMap car={car} />

                {/* Main Timer */}
                <div className={`bg-gradient-to-r ${rentalTimer.isOverdue ? "from-red-950 to-red-900" : "from-green-950 to-green-900"} border ${rentalTimer.isOverdue ? "border-red-700" : "border-green-700"} rounded-lg p-8 mb-8`}>
                  <div className="text-center mb-6">
                    <p className={`text-sm font-medium mb-4 ${rentalTimer.isOverdue ? "text-red-300" : "text-green-300"}`}>
                      {rentalTimer.isOverdue ? "⚠️ ĐÃ QUÁHẠN" : "✅ TRONG THỜI GIAN"}
                    </p>
                    <div className={`font-display text-6xl font-bold ${rentalTimer.isOverdue ? "text-red-400" : "text-green-400"}`}>
                      {String(Math.floor((rentalTimer.totalSeconds - rentalTimer.elapsedSeconds) / 3600)).padStart(2, "0")}:
                      {String(Math.floor(((rentalTimer.totalSeconds - rentalTimer.elapsedSeconds) % 3600) / 60)).padStart(2, "0")}:
                      {String((rentalTimer.totalSeconds - rentalTimer.elapsedSeconds) % 60).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div className={rentalTimer.isOverdue ? "text-red-200" : "text-green-200"}>
                      <p className="text-xs opacity-70 mb-1">Thời hạn</p>
                      <p className="font-semibold">
                        {rentDays && rentDays >= 1 ? `${Math.floor(rentDays)}d` : `${rentalHours}h`}
                      </p>
                    </div>
                    <div className={rentalTimer.isOverdue ? "text-red-200" : "text-green-200"}>
                      <p className="text-xs opacity-70 mb-1">Đã dùng</p>
                      <p className="font-semibold">{Math.floor(rentalTimer.elapsedSeconds / 3600)}h {Math.floor((rentalTimer.elapsedSeconds % 3600) / 60)}m</p>
                    </div>
                    <div className={rentalTimer.isOverdue ? "text-red-200" : "text-green-200"}>
                      <p className="text-xs opacity-70 mb-1">Còn lại</p>
                      <p className="font-semibold">{Math.max(0, Math.ceil((rentalTimer.totalSeconds - rentalTimer.elapsedSeconds) / 3600))}h</p>
                    </div>
                  </div>
                </div>

                {/* Late Fee Section */}
                {rentalTimer.isOverdue && (
                  <div className="bg-red-950 border border-red-700 rounded-lg p-6 mb-8">
                    <h3 className="text-red-300 font-bold text-lg mb-4">💰 Phí Quá Hạn</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-red-200">Quá hạn</span>
                        <span className="text-red-400 font-semibold">{rentalTimer.overdueHours} giờ</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-red-200">Giá/giờ</span>
                        <span className="text-red-400 font-semibold">100.000₫</span>
                      </div>
                      <div className="border-t border-red-700 pt-3 flex justify-between">
                        <span className="text-red-300 font-bold">Tổng phí phạt</span>
                        <span className="text-red-300 font-display text-2xl">{rentalTimer.lateFee.toLocaleString("vi-VN")}₫</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Car Info */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                  <p className="text-gray-600 text-xs uppercase mb-4">Thông Tin Xe</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Xe</span>
                      <span className="text-gray-900 font-semibold">{car?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Màu</span>
                      Màu sắc: <span className="font-semibold text-gray-900">{car.color || car.colors?.[0]?.name || "Tiêu chuẩn"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Khách hàng</span>
                      <span className="text-gray-900">{customerInfo.fullName}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate("home")}
                  className="w-full py-4 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)] text-white text-sm font-bold tracking-widest uppercase hover:bg-[#ff3366] transition-all"
                >
                  ✅ Hoàn Thành & Về Trang Chủ
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
