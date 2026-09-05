const fs = require('fs');

const path = 'd:\\XayDungWeb\\FINAL\\src\\pages\\Landing.tsx';
let content = fs.readFileSync(path, 'utf8');

const idx = content.indexOf('{/* Hero */}');
const endIdx = content.indexOf('{/* Features */}');

if (idx > -1 && endIdx > -1) {
  const newHero = `{/* Hero */}
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
              <span className="block text-white">\u0110\u1eb3ng C\u1ea5p</span>
              <span className="block" style={{
                background:"linear-gradient(90deg,#ff003c,#ff7040,#ff003c)",
                backgroundSize:"200% auto",
                WebkitBackgroundClip:"text",
                WebkitTextFillColor:"transparent",
                backgroundClip:"text",
                animation:"shimmer 3s linear infinite",
                filter:"drop-shadow(0 0 18px rgba(255,0,60,0.5))"
              }}>Tr\u00ean T\u1eebng</span>
              <span className="block text-white">Cung \u0110\u01b0\u1eddng</span>
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-16" style={{background:"linear-gradient(90deg,#ff003c,transparent)"}} />
              <span className="text-gray-400 text-xs tracking-widest uppercase">Luxury Car Rental</span>
            </div>

            <p className="text-gray-300 text-base lg:text-lg leading-relaxed mb-10 max-w-md">
              Tr\u1ea3i nghi\u1ec7m b\u1ed9 s\u01b0u t\u1eadp xe si\u00eau sang t\u1eeb{" "}
              <span className="text-[#ff003c] font-semibold">Ferrari</span>,{" "}
              <span className="text-[#ff003c] font-semibold">Lamborghini</span>,{" "}
              <span className="text-[#ff003c] font-semibold">Bentley</span>{" "}
              \u2014 mang \u0111\u1ebfn c\u1ea3m gi\u00e1c \u0111\u1eb3ng c\u1ea5p th\u1ef1c s\u1ef1 tr\u00ean m\u1ecdi cung \u0111\u01b0\u1eddng.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={() => onNavigate("rent")}
                className="group relative px-8 py-4 overflow-hidden font-bold text-sm tracking-widest uppercase text-white transition-all duration-300 hover:scale-105"
                style={{background:"linear-gradient(135deg,#ff003c,#cc0030)",boxShadow:"0 0 30px rgba(255,0,60,0.5),inset 0 1px 0 rgba(255,255,255,0.15)"}}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  \uD83D\uDE97 Thu\u00ea Xe Ngay
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <button
                onClick={() => onNavigate("rent")}
                className="px-8 py-4 font-semibold text-sm tracking-widest uppercase text-white/80 hover:text-white border border-white/20 hover:border-[#ff003c]/60 backdrop-blur-sm transition-all duration-300 hover:bg-[#ff003c]/10"
              >
                Xem Danh S\u00e1ch Xe \u2192
              </button>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex -space-x-2">
                {["NMT","TBP","LHP","PTV"].map((a,i)=>(
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-[#ff003c]/50 flex items-center justify-center text-[9px] font-bold text-white" style={{background:\`hsl(\${i*45+200},55%,22%)\`}}>{a}</div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">{[...Array(5)].map((_,i)=><span key={i} className="text-[#ff003c] text-xs">\u2605</span>)}</div>
                <p className="text-gray-400 text-xs">10,000+ kh\u00e1ch h\u00e0ng tin d\u00f9ng</p>
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
              <p className="text-gray-300 text-sm font-semibold">0 \u2192 100 km/h</p>
              <p className="text-[#ff003c] font-bold text-lg" style={{textShadow:"0 0 12px rgba(255,0,60,0.6)"}}>3.0 gi\u00e2y</p>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 backdrop-blur-md" style={{background:"rgba(5,10,30,0.75)"}}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {value:"500+",label:"Xe trong kho",icon:"\uD83D\uDE97"},
              {value:"15+",label:"N\u0103m kinh nghi\u1ec7m",icon:"\uD83C\uDFC6"},
              {value:"10,000+",label:"Kh\u00e1ch h\u00e0ng tin d\u00f9ng",icon:"\uD83D\uDC65"},
              {value:"24/7",label:"H\u1ed7 tr\u1ee3 kh\u00e1ch h\u00e0ng",icon:"\uD83D\uDCDE"},
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

        <style>{\`
          @keyframes shimmer{0%{background-position:0% center}100%{background-position:200% center}}
          @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
        \`}</style>
      </section>

      `;

  const newContent = content.substring(0, idx) + newHero + content.substring(endIdx);
  fs.writeFileSync(path, newContent, 'utf8');
  console.log('SUCCESS');
} else {
  console.log('NOT FOUND. idx=' + idx + ' endIdx=' + endIdx);
}
