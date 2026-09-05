import { useEffect, useState } from "react";
import { formatPrice, categoryLabels, categoryColors, CarCategory } from "../data/cars";
import { useCars } from "../components/CarsContext";

export type VehicleType = "car" | "motorbike"; // 🟢 Thêm dòng này để định nghĩa VehicleType

interface CarListProps {

  onNavigate: (page: string, carId?: string) => void;
}

const carCategories: CarCategory[] = ["economy", "sedan", "suv", "luxury", "supercar"];
const motorbikeCategories: string[] = ["scooter", "manual", "electric"]; // 🟢 Sửa CarCategory[] thành string[]

export default function CarList({ onNavigate }: CarListProps) {
  const { cars, reload } = useCars();
  // Luôn tải lại danh mục khi mở trang thuê xe (thấy ngay xe admin vừa thêm)
  useEffect(() => {
    reload();
  }, [reload]);
  const [activeVehicleType, setActiveVehicleType] = useState<VehicleType>("car");
  const [selectedCategory, setSelectedCategory] = useState<CarCategory | "all">("all");
  const [sortBy, setSortBy] = useState<"price_asc" | "price_desc" | "name">("price_asc");
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000000]);
  const [selectedFuel, setSelectedFuel] = useState<string[]>([]);
  const [selectedTransmission, setSelectedTransmission] = useState<string[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const currentCategories = activeVehicleType === "car" ? carCategories : motorbikeCategories;

  const filtered = cars
    .filter((c) => c.vehicleType === activeVehicleType)
    .filter((c) => selectedCategory === "all" || c.category === selectedCategory)
    .filter(
      (c) =>
        search === "" ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.brand.toLowerCase().includes(search.toLowerCase())
    )
    .filter((c) => c.rentPriceDay >= priceRange[0] && c.rentPriceDay <= priceRange[1])
    .filter((c) => selectedFuel.length === 0 || selectedFuel.some(f => c.fuel.includes(f)))
    .filter((c) => selectedTransmission.length === 0 || selectedTransmission.includes(c.transmission))
    .filter((c) => selectedSeats.length === 0 || selectedSeats.includes(c.seats))
    .sort((a, b) => {
      if (sortBy === "price_asc") return a.rentPriceDay - b.rentPriceDay;
      if (sortBy === "price_desc") return b.rentPriceDay - a.rentPriceDay;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="min-h-screen bg-[#f4f6f8] pb-20">
      {/* Hero Section - Top */}
      <div className="relative bg-gradient-to-b from-white via-white to-[#f4f6f8] py-20 px-6 lg:px-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5" style={{background:"radial-gradient(circle,#ff003c,transparent)"}} />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full opacity-5" style={{background:"radial-gradient(circle,#1a1a6e,transparent)"}} />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-[#ff003c]/5 border border-[#ff003c]/20 rounded-full">
            <span className="text-[#ff003c] text-xs font-semibold tracking-widest uppercase">Danh Mục Cho Thuê</span>
          </div>

          <div className="mb-8 max-w-3xl">
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Bộ Sưu Tập Xe <span className="text-[#ff003c]">Sang Trọng</span>
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Hơn 500 chiếc xe chất lượng cao từ các hãng hàng đầu. Chọn xe yêu thích, đặt cọc, và bắt đầu hành trình của bạn chỉ trong vài bước đơn giản.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-2xl">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-lg bg-[#ff003c]/10 flex items-center justify-center">
                <span className="text-[#ff003c] font-bold text-lg">500+</span>
              </div>
              <div className="mt-2 text-center">
                <div className="text-gray-900 font-semibold text-sm">Xe Sẵn Có</div>
                <div className="text-gray-500 text-xs">Cập nhật liên tục</div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-lg bg-[#1a1a6e]/10 flex items-center justify-center">
                <span className="text-[#1a1a6e] font-bold text-lg">5⭐</span>
              </div>
              <div className="mt-2 text-center">
                <div className="text-gray-900 font-semibold text-sm">Đánh Giá Cao</div>
                <div className="text-gray-500 text-xs">10,000+ khách</div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-bold text-lg">24/7</span>
              </div>
              <div className="mt-2 text-center">
                <div className="text-gray-900 font-semibold text-sm">Hỗ Trợ</div>
                <div className="text-gray-500 text-xs">Luôn sẵn sàng</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Vehicle Type Tabs */}
        <div className="flex justify-center -mt-8 relative z-30 mb-8">
          <div className="bg-white p-1 rounded-full shadow-lg border border-gray-200 flex">
            <button
              onClick={() => {
                setActiveVehicleType("car");
                setSelectedCategory("all");
              }}
              className={`px-8 py-3 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 ${
                activeVehicleType === "car"
                  ? "bg-[#ff003c] text-white shadow-[0_0_15px_rgba(255,0,60,0.5)]"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              🚗 Ô Tô
            </button>
            <button
              onClick={() => {
                setActiveVehicleType("motorbike");
                setSelectedCategory("all");
              }}
              className={`px-8 py-3 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 ${
                activeVehicleType === "motorbike"
                  ? "bg-[#ff003c] text-white shadow-[0_0_15px_rgba(255,0,60,0.5)]"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              🏍️ Xe Máy
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8 relative z-20">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
            <div className="flex-1 min-w-64">
              <input
                type="text"
                placeholder="Tìm kiếm xe..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-gray-200 text-gray-900 px-4 py-3 text-sm focus:outline-none focus:border-[#ff003c] shadow-[0_0_10px_rgba(255,0,60,0.3)] transition-colors placeholder-gray-400"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-gray-200 text-gray-900 px-4 py-3 text-sm focus:outline-none focus:border-[#ff003c] shadow-[0_0_10px_rgba(255,0,60,0.3)] cursor-pointer"
            >
              <option value="price_asc">Giá tăng dần</option>
              <option value="price_desc">Giá giảm dần</option>
              <option value="name">Theo tên</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-5 py-3 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)] text-white text-xs font-semibold tracking-widest uppercase hover:bg-[#ff3366] transition-all flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586V4z"/>
              </svg>
              Bộ lọc ({[selectedFuel.length, selectedTransmission.length, selectedSeats.length, priceRange[0] > 0 || priceRange[1] < 30000000 ? 1 : 0].reduce((a, b) => a + b, 0)})
            </button>
          </div>

          {/* Advanced Filters Panel - In Place */}
          {showFilters && (
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
                {/* Price Range */}
                <div>
                  <h3 className="text-gray-900 font-semibold text-sm mb-4 uppercase tracking-wider">Khoảng Giá</h3>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="30000000"
                      step="1000000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="30000000"
                      step="1000000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full"
                    />
                    <div className="text-gray-700 text-xs font-semibold">
                      {formatPrice(priceRange[0])} ₫ - {formatPrice(priceRange[1])} ₫
                    </div>
                  </div>
                </div>

                {/* Fuel Type */}
                <div>
                  <h3 className="text-gray-900 font-semibold text-sm mb-4 uppercase tracking-wider">Nhiên Liệu</h3>
                  <div className="space-y-2">
                    {["Xăng", "Diesel", "Hybrid (Xăng + Điện)"].map((fuel) => (
                      <label key={fuel} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedFuel.includes(fuel)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedFuel([...selectedFuel, fuel]);
                            } else {
                              setSelectedFuel(selectedFuel.filter(f => f !== fuel));
                            }
                          }}
                          className="w-4 h-4 text-[#ff003c] border-gray-300 rounded cursor-pointer"
                        />
                        <span className="text-gray-700 text-xs">{fuel}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Transmission */}
                <div>
                  <h3 className="text-gray-900 font-semibold text-sm mb-4 uppercase tracking-wider">Hộp Số</h3>
                  <div className="space-y-2">
                    {["Tự động CVT", "Tự động 6 cấp", "Tự động Steptronic 8 cấp", "9G-TRONIC", "Tiptronic S 8 cấp", "Ly hợp kép 7 cấp", "Ly hợp kép 8 cấp"].map((trans) => (
                      <label key={trans} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedTransmission.includes(trans)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedTransmission([...selectedTransmission, trans]);
                            } else {
                              setSelectedTransmission(selectedTransmission.filter(t => t !== trans));
                            }
                          }}
                          className="w-4 h-4 text-[#ff003c] border-gray-300 rounded cursor-pointer"
                        />
                        <span className="text-gray-700 text-xs">{trans}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Number of Seats */}
                <div>
                  <h3 className="text-gray-900 font-semibold text-sm mb-4 uppercase tracking-wider">Số Ghế</h3>
                  <div className="space-y-2">
                    {[2, 4, 5, 7].map((seats) => (
                      <label key={seats} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedSeats.includes(seats)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedSeats([...selectedSeats, seats]);
                            } else {
                              setSelectedSeats(selectedSeats.filter(s => s !== seats));
                            }
                          }}
                          className="w-4 h-4 text-[#ff003c] border-gray-300 rounded cursor-pointer"
                        />
                        <span className="text-gray-700 text-xs">{seats} Ghế</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reset & Apply */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedFuel([]);
                    setSelectedTransmission([]);
                    setSelectedSeats([]);
                    setPriceRange([0, 30000000]);
                  }}
                  className="px-6 py-2 border border-gray-200 text-gray-700 text-xs font-semibold tracking-widest uppercase hover:border-[#ff003c] hover:text-[#ff003c] transition-all"
                >
                  Đặt Lại
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-6 py-2 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)] text-white text-xs font-semibold tracking-widest uppercase hover:bg-[#ff3366] transition-all"
                >
                  Đóng Bộ Lọc
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap mb-10">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-5 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-200 ${
              selectedCategory === "all"
                ? "bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)] text-white"
                : "border border-gray-200 text-gray-600 hover:border-[#ff003c] shadow-[0_0_10px_rgba(255,0,60,0.3)] hover:text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)]"
            }`}
          >
            Tất cả
          </button>
          {currentCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as any)}
              className={`px-5 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)] text-white"
                  : "border border-gray-200 text-gray-600 hover:border-[#ff003c] shadow-[0_0_10px_rgba(255,0,60,0.3)] hover:text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)]"
              }`}
            >
              {(categoryLabels as Record<string, string>)[cat] || cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="text-gray-500 text-sm mb-8">
          Tìm thấy <span className="text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] font-semibold">{filtered.length}</span> xe
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <div className="text-6xl mb-4">🚗</div>
            <p>Không tìm thấy xe phù hợp</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((car) => (
              <CarCard key={car.id} car={car} onNavigate={onNavigate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CarCard({ car, onNavigate }: { car: any; onNavigate: (p: string, id?: string) => void }) {
  const price = car.rentPriceDay;
  const goDetail = () => onNavigate("detail", car.id);

  return (
    <div
      onClick={goDetail}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          goDetail();
        }
      }}
      title={`Xem chi tiết ${car.name}`}
      className="group bg-white border border-gray-200 overflow-hidden hover:border-[#ff003c] shadow-[0_0_10px_rgba(255,0,60,0.3)]/50 hover:shadow-[0_6px_24px_rgba(255,0,60,0.18)] transition-all duration-300 flex flex-col cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff003c]/50"
    >
      <div className="relative overflow-hidden h-56 bg-gray-100">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className="text-xs font-semibold px-3 py-1 uppercase tracking-wider"
            style={{
              backgroundColor: "rgba(0,0,0,0.75)",
              color: categoryColors[car.category as keyof typeof categoryColors],
              border: `1px solid ${categoryColors[car.category as keyof typeof categoryColors]}44`,
            }}
          >
            {categoryLabels[car.category as keyof typeof categoryLabels]}
          </span>
        </div>
        {!car.available && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-gray-800 font-bold text-sm tracking-widest uppercase border border-white/30 px-4 py-2">
              Không còn trống
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-display text-xl font-bold text-gray-900 group-hover:text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] transition-colors leading-tight hover:underline">
              {car.name}
            </h3>
            <p className="text-gray-500 text-xs mt-1">{car.year} • {car.color || (car.colors && car.colors[0]?.name) || "Tiêu chuẩn"}</p>
          </div>
        </div>

        {/* Specs mini */}
        <div className="grid grid-cols-3 gap-3 mb-5 py-4 border-y border-gray-200">
          {[
            { label: "Động cơ", value: car.engine.split(" ")[0] },
            { label: "Công suất", value: car.power },
            { label: "0-100km/h", value: car.acceleration.split(" ")[0] + "s" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-gray-900 font-semibold text-xs">{s.value}</div>
              <div className="text-gray-400 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex items-end justify-between mb-5 flex-1">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              Giá thuê/ngày
            </div>
            <div className="text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] font-bold text-2xl font-display">{formatPrice(price)} ₫</div>
            <div className="text-gray-400 text-xs mt-1">Đặt cọc: {car.deposit > 0 ? `${formatPrice(car.deposit)} ₫` : 'Miễn phí'}</div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate("detail", car.id); }}
            className="flex-1 py-3 border border-[#ff003c] shadow-[0_0_10px_rgba(255,0,60,0.3)]/50 text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] text-xs font-semibold tracking-widest uppercase hover:bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)] hover:text-black transition-all duration-300"
          >
            Chi Tiết
          </button>
          {car.available && (
            <button
              onClick={(e) => { e.stopPropagation(); onNavigate("contract", car.id); }}
              className="flex-1 py-3 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)] text-white text-xs font-semibold tracking-widest uppercase hover:bg-[#ff3366] transition-all duration-300"
            >
              Thuê Ngay
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
