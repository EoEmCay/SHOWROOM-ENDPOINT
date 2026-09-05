import { formatPrice, categoryLabels } from "../data/cars";
import { useCars } from "../components/CarsContext";

interface LandingProps {
  onNavigate: (page: string, carId?: string) => void;
}

export default function Landing({ onNavigate }: LandingProps) {
  const { cars } = useCars();
  const featuredCars = cars.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      {/* Hero */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Deep gradient base - navy to crimson */}
        <div className="absolute inset-0" style={{background:"linear-gradient(135deg,#020818 0%,#0a0f2e 30%,#1a0520 60%,#2d0010 85%,#1a000a 100%)"}} />
        {/* Animated grid mesh */}
        <div className="absolute inset-0 opacity-[0.18]" style={{
          backgroundImage:"linear-gradient(rgba(255,0,60,0.35) 1px,transparent 1px),linear-gradient(90deg,rgba(255,0,60,0.35) 1px,transparent 1px)",
          backgroundSize:"60px 60px",
          maskImage:"radial-gradient(ellipse 90% 90% at 50% 50%,black 20%,transparent 100%)"
        }} />
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none opacity-20" style={{background:"radial-gradient(circle,rgba(30,80,220,0.9) 0%,transparent 70%)",filter:"blur(55px)"}} />
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 rounded-full pointer-events-none opacity-30" style={{background:"radial-gradient(circle,rgba(255,0,60,1) 0%,transparent 70%)",filter:"blur(50px)"}} />
        <div className="absolute top-8 right-8 w-56 h-56 rounded-full pointer-events-none opacity-15" style={{background:"radial-gradient(circle,rgba(120,40,200,0.8) 0%,transparent 70%)",filter:"blur(60px)"}} />
        {/* Scanline texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.15) 2px,rgba(255,255,255,0.15) 4px)"}} />

        {/* Main content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text column */}
          <div>
            <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-[#ff003c]/30 bg-[#ff003c]/10 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#ff003c] animate-ping" style={{animationDuration:"1.5s"}} />
              <span className="text-[#ff003c] text-xs font-semibold tracking-[0.2em] uppercase">Premium Automotive — Since 2009</span>
            </div>

            <h1 className="font-display text-5xl lg:text-7xl font-black leading-[1.05] mb-6 tracking-tight">
              <span className="block text-white">Đẳng Cấp</span>
              <span className="block" style={{
                background:"linear-gradient(90deg,#ff003c,#ff7040,#ff003c)",
                backgroundSize:"200% auto",
                WebkitBackgroundClip:"text",
                WebkitTextFillColor:"transparent",
                backgroundClip:"text",
                animation:"shimmer 3s linear infinite",
                filter:"drop-shadow(0 0 18px rgba(255,0,60,0.5))"
              }}>Trên Từng</span>
              <span className="block text-white">Cung Đường</span>
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-16" style={{background:"linear-gradient(90deg,#ff003c,transparent)"}} />
              <span className="text-gray-400 text-xs tracking-widest uppercase">Luxury Car Rental</span>
            </div>

            <p className="text-gray-300 text-base lg:text-lg leading-relaxed mb-10 max-w-md">
              Trải nghiệm bộ sưu tập xe siêu sang từ{" "}
              <span className="text-[#ff003c] font-semibold">Ferrari</span>,{" "}
              <span className="text-[#ff003c] font-semibold">Lamborghini</span>,{" "}
              <span className="text-[#ff003c] font-semibold">Bentley</span>{" "}
              — mang đến cảm giác đẳng cấp thực sự trên mọi cung đường.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={() => onNavigate("rent")}
                className="group relative px-8 py-4 overflow-hidden font-bold text-sm tracking-widest uppercase text-white transition-all duration-300 hover:scale-105"
                style={{background:"linear-gradient(135deg,#ff003c,#cc0030)",boxShadow:"0 0 30px rgba(255,0,60,0.5),inset 0 1px 0 rgba(255,255,255,0.15)"}}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  🚗 Thuê Xe Ngay
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <button
                onClick={() => onNavigate("rent")}
                className="px-8 py-4 font-semibold text-sm tracking-widest uppercase text-white/80 hover:text-white border border-white/20 hover:border-[#ff003c]/60 backdrop-blur-sm transition-all duration-300 hover:bg-[#ff003c]/10"
              >
                Xem Danh Sách Xe →
              </button>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex -space-x-2">
                {["NMT","TBP","LHP","PTV"].map((a,i)=>(
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-[#ff003c]/50 flex items-center justify-center text-[9px] font-bold text-white" style={{background:`hsl(${i*45+200},55%,22%)`}}>{a}</div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">{[...Array(5)].map((_,i)=><span key={i} className="text-[#ff003c] text-xs">★</span>)}</div>
                <p className="text-gray-400 text-xs">10,000+ khách hàng tin dùng</p>
              </div>
            </div>
          </div>

          {/* Right: Floating car */}
          <div className="hidden lg:flex items-center justify-center relative h-[460px]">
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[480px] h-20 rounded-full" style={{background:"radial-gradient(ellipse,rgba(255,0,60,0.45) 0%,transparent 70%)",filter:"blur(18px)"}} />
            <div className="relative" style={{filter:"drop-shadow(0 20px 50px rgba(255,0,60,0.45)) drop-shadow(0 0 30px rgba(255,0,60,0.2))",animation:"float 6s ease-in-out infinite"}}>
              <img
                src="https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=900&h=550&fit=crop&auto=format"
                alt="Luxury Car"
                className="w-full max-w-[560px] object-contain select-none"
                draggable="false"
                style={{maskImage:"radial-gradient(ellipse 95% 90% at 50% 55%,black 50%,transparent 100%)"}}
              />
            </div>
            <div className="absolute top-8 right-2 px-4 py-3 rounded-2xl border border-white/10 backdrop-blur-md" style={{background:"rgba(255,255,255,0.05)"}}>
              <p className="text-[#ff003c] text-xl font-bold" style={{textShadow:"0 0 12px rgba(255,0,60,0.6)"}}>670 HP</p>
              <p className="text-gray-400 text-xs">Ferrari 488 GTB</p>
            </div>
            <div className="absolute bottom-12 left-2 px-4 py-3 rounded-2xl border border-white/10 backdrop-blur-md" style={{background:"rgba(255,255,255,0.05)"}}>
              <p className="text-gray-300 text-sm font-semibold">0 → 100 km/h</p>
              <p className="text-[#ff003c] font-bold text-lg" style={{textShadow:"0 0 12px rgba(255,0,60,0.6)"}}>3.0 giây</p>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 backdrop-blur-md" style={{background:"rgba(5,10,30,0.75)"}}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {value:"500+",label:"Phương tiện",icon:"🚗"},
              {value:"15+",label:"Năm kinh nghiệm",icon:"🏆"},
              {value:"10,000+",label:"Khách hàng tin dùng",icon:"👥"},
              {value:"24/7",label:"Hỗ trợ khách hàng",icon:"📞"},
            ].map((s)=>(
              <div key={s.label} className="flex items-center gap-3">
                <span className="text-xl">{s.icon}</span>
                <div>
                  <div className="font-display text-xl font-bold text-[#ff003c]" style={{textShadow:"0 0 12px rgba(255,0,60,0.5)"}}>{s.value}</div>
                  <div className="text-gray-400 text-xs">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes shimmer{0%{background-position:0% center}100%{background-position:200% center}}
          @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
        `}</style>
      </section>

      {/* Features */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)]" />
            <span className="text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] text-sm font-medium tracking-widest uppercase">Tại sao chọn chúng tôi</span>
            <div className="h-px w-12 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)]" />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900">Dịch Vụ Xuất Sắc</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "🏆",
              title: "Xe Chính Hãng 100%",
              desc: "Toàn bộ xe trong showroom đều có giấy tờ chính hãng, kiểm định đầy đủ và bảo hành rõ ràng.",
            },
            {
              icon: "📝",
              title: "Hợp Đồng Minh Bạch",
              desc: "Hợp đồng điện tử đầy đủ điều khoản, chữ ký số và con dấu pháp lý. Không phát sinh chi phí ẩn.",
            },
            {
              icon: "🚗",
              title: "Giao Xe Tận Nơi",
              desc: "Dịch vụ giao xe miễn phí trong bán kính 30km. Đội ngũ tài xế chuyên nghiệp, đúng giờ.",
            },
          ].map((f) => (
            <div key={f.title} className="bg-white border border-gray-200 p-8 hover:border-[#ff003c] shadow-[0_0_10px_rgba(255,0,60,0.3)]/50 transition-all duration-300 group">
              <div className="text-4xl mb-6">{f.icon}</div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-3 group-hover:text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] transition-colors">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-24 px-6 lg:px-12 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)]" />
                <span className="text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] text-sm font-medium tracking-widest uppercase">Bộ sưu tập nổi bật</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">Xe Nổi Bật</h2>
            </div>
            <button onClick={() => onNavigate("rent")} className="text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] text-sm font-medium tracking-wider uppercase hover:text-white transition-colors flex items-center gap-2">
              Xem tất cả <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6 lg:px-12 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600&h=600&fit=crop&auto=format')`,
          }}
        />
        <div className="absolute inset-0 bg-white/75" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Trải Nghiệm Đỉnh Cao<br />
            <span className="text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)]">Ngay Hôm Nay</span>
          </h2>
          <p className="text-gray-700 text-lg mb-10">
            Liên hệ ngay để được tư vấn miễn phí và xem xe trực tiếp tại showroom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => onNavigate("rent")} className="px-10 py-4 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)] text-white font-bold text-sm tracking-widest uppercase hover:bg-[#ff3366] transition-all duration-300">
              Thuê Xe Ngay
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)]" />
            <span className="text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] text-sm font-medium tracking-widest uppercase">Khách hàng nói gì</span>
            <div className="h-px w-12 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)]" />
          </div>
          <h2 className="font-display text-4xl font-bold text-gray-900">Đánh Giá Khách Hàng</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Nguyễn Minh Tuấn",
              role: "CEO — TechViet Corp",
              review: "Thuê Bentley Continental GT cho sự kiện doanh nghiệp. Xe hoàn hảo, dịch vụ chuyên nghiệp. Hợp đồng rõ ràng, không phát sinh chi phí.",
              rating: 5,
              avatar: "NMT",
            },
            {
              name: "Trần Thị Bích Phương",
              role: "Giám đốc Marketing",
              review: "Mua Mazda6 tại đây, quy trình nhanh gọn. Hợp đồng điện tử tiện lợi, ký tay trực tiếp trên app. Sẽ giới thiệu cho bạn bè.",
              rating: 5,
              avatar: "TBP",
            },
            {
              name: "Lê Hoàng Phúc",
              role: "Doanh nhân",
              review: "Thuê Ferrari 488 GTB — trải nghiệm không thể nào quên. Đội ngũ tư vấn am hiểu, hỗ trợ 24/7. Sẽ quay lại!",
              rating: 5,
              avatar: "LHP",
            },
          ].map((t) => (
            <div key={t.name} className="bg-white border border-gray-200 p-8">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] text-sm">★</span>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 text-sm italic">"{t.review}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)] flex items-center justify-center text-black font-bold text-xs">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CarCard({ car, onNavigate }: { car: any; onNavigate: (p: string, id?: string) => void }) {
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
      className="group bg-white border border-gray-200 overflow-hidden hover:border-[#ff003c] shadow-[0_0_10px_rgba(255,0,60,0.3)]/50 hover:shadow-[0_6px_24px_rgba(255,0,60,0.18)] transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff003c]/50"
    >
      <div className="relative overflow-hidden h-52 bg-gray-100">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span
            className="text-xs font-semibold px-3 py-1 uppercase tracking-wider"
            style={{
              backgroundColor: "rgba(0,0,0,0.7)",
              color: "#ff003c",
              border: "1px solid rgba(201,162,39,0.4)",
            }}
          >
            {categoryLabels[car.category as keyof typeof categoryLabels]}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-gray-900 mb-1 group-hover:text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] transition-colors hover:underline">
          {car.name}
        </h3>
        <p className="text-gray-500 text-xs mb-4">{car.engine} · {car.transmission}</p>
        <div className="flex items-end justify-between mb-5">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Giá thuê/ngày</div>
            <div className="text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] font-bold text-xl">{formatPrice(car.rentPriceDay)} ₫</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">{car.power}</div>
            <div className="text-xs text-gray-500">{car.acceleration}</div>
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate("detail", car.id); }}
          className="w-full py-3 bg-transparent border border-[#ff003c] shadow-[0_0_10px_rgba(255,0,60,0.3)]/50 text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] text-xs font-semibold tracking-widest uppercase hover:bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)] hover:text-black transition-all duration-300"
        >
          Xem Chi Tiết
        </button>
      </div>
    </div>
  );
}
