import React, { useEffect, useState } from "react";
import Chatbox from "./components/chatbox";
import Landing from "./pages/Landing";
import CarList from "./pages/CarList";
import CarDetail from "./pages/CarDetail";
import Contract from "./pages/Contract";
import Payment from "./pages/Payment";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
import { useUser } from "./components/UserContext";

type Page =
  | "home"
  | "rent"
  | "detail"
  | "contract"
  | "payment"
  | "contact"
  | "login"
  | "register"
  | "orders"
  | "admin";

interface AppState {
  page: Page;
  carId?: string;
  extra?: any;
}

const PAGES: Page[] = [
  "home", "rent", "detail", "contract", "payment", "contact", "login", "register", "orders", "admin",
];

function pageFromHash(): Page {
  const h = window.location.hash.replace(/^#\/?/, "") as Page;
  return PAGES.includes(h) ? h : "home";
}

export default function App() {
  const { user, isLoggedIn, isAdmin, logout } = useUser();
  const [state, setState] = useState<AppState>(() => ({ page: pageFromHash() }));
  const [history, setHistory] = useState<AppState[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (page: string, carId?: string, extra?: any) => {
    if (state.page !== "home" || state.carId || state.extra) {
      setHistory([...history, state]);
    }
    setState({ page: page as Page, carId, extra });
    setMenuOpen(false);
    if (window.location.hash.replace(/^#\/?/, "") !== page) {
      window.location.hash = page === "home" ? "" : page;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onHash = () => {
      const p = pageFromHash();
      setState((s) => (s.page === p ? s : { page: p }));
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const goBack = () => {
    if (history.length > 0) {
      const newHistory = [...history];
      const previousState = newHistory.pop();
      if (previousState) {
        setState(previousState);
        setHistory(newHistory);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const renderPage = () => {
    switch (state.page) {
      case "home":
        return <Landing onNavigate={navigate} />;
      case "rent":
        return <CarList onNavigate={(p, id) => {
          if (p === "contract") setState({ page: "contract", carId: id });
          else if (p === "detail") setState({ page: "detail", carId: id });
          else navigate(p, id);
        }} />;
      case "detail":
        return (
          <CarDetail
            carId={state.carId!}
            onNavigate={(p, id) => {
              if (p === "contract") setState({ page: "contract", carId: id || state.carId });
              else navigate(p, id);
            }}
          />
        );
      case "contract":
        return (
          <Contract
            carId={state.carId!}
            onNavigate={(p, id, extra) => {
              if (p === "payment") setState({ page: "payment", carId: id || state.carId, extra });
              else if (p === "detail") setState({ page: "detail", carId: id || state.carId });
              else navigate(p, id);
            }}
          />
        );
      case "payment":
        return (
          <Payment
            carId={state.carId!}
            extra={state.extra}
            onNavigate={navigate}
          />
        );
      case "contact":
        return <Contact onNavigate={navigate} />;
      case "login":
        return <Login onNavigate={navigate} carId={state.carId} />;
          case "register":
      return <Register onNavigate={navigate} carId={state.carId} />;
    
    case "orders":
      return <Orders onNavigate={navigate} />;

    case "admin":
      return <Admin onNavigate={navigate} />;

    default:
      return <Landing onNavigate={navigate} />;

    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          {/* Back Button */}
          {history.length > 0 && (
            <button
              onClick={goBack}
              className="mr-4 p-2 hover:bg-white/10 rounded transition-colors text-gray-900"
              title="Quay lại"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
          )}
          {/* Logo */}
          <button
            onClick={() => navigate("home")}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)] flex items-center justify-center">
              <span className="text-black font-bold text-sm font-display">KT</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-display text-gray-900 font-bold text-base leading-none">K&T Showroom</div>
              <div className="text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] text-[9px] tracking-widest uppercase leading-none mt-0.5">Luxury Cars</div>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate("home")}
              className={`text-sm font-medium tracking-wider uppercase transition-colors ${state.page === "home" ? "text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)]" : "text-gray-600 hover:text-gray-900"}`}
            >
              Trang chủ
            </button>
            <button
              onClick={() => navigate("rent")}
              className={`text-sm font-medium tracking-wider uppercase transition-colors ${state.page === "rent" ? "text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)]" : "text-gray-600 hover:text-gray-900"}`}
            >
              Thuê Xe
            </button>
            <button
              onClick={() => navigate("contact")}
              className={`text-sm font-medium tracking-wider uppercase transition-colors ${state.page === "contact" ? "text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)]" : "text-gray-600 hover:text-gray-900"}`}
            >
              Liên Hệ
            </button>
          </div>

          {/* CTA + mobile menu */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
          <div className="hidden sm:block relative group">
            {/* Phần hiển thị mặc định trên Navbar */}
            <div className="flex items-center gap-1 text-gray-700 text-sm font-semibold cursor-pointer py-2">
              <span>Chào, {user?.fullName.split(' ').pop()}</span>
              <span className="text-[10px] text-gray-400 group-hover:rotate-180 transition-transform duration-200">▼</span>
            </div>
            
            {/* Menu ẩn thả xuống - Tự động hiện khi hover vào khối group nhờ class group-hover:block */}
            <ul className="absolute right-0 top-full mt-1 bg-[#1a1a1d] border border-[#ff003c] rounded-lg shadow-xl min-width-[180px] w-44 py-1 list-none z-[1000] hidden group-hover:block">
              {isAdmin && (
                <>
                  <li>
                    <button
                      onClick={() => navigate("admin")}
                      className="w-full text-left text-gray-200 hover:bg-[#ff003c] hover:text-white px-4 py-2.5 text-xs font-medium transition-colors flex items-center gap-2"
                    >
                      🛠️ Trang quản trị
                    </button>
                  </li>
                  <li className="h-[1px] bg-gray-800 my-1"></li>
                </>
              )}
              <li>
                <button
                  onClick={() => navigate("orders")}
                  className="w-full text-left text-gray-200 hover:bg-[#ff003c] hover:text-white px-4 py-2.5 text-xs font-medium transition-colors flex items-center gap-2"
                >
                  📋 Đơn thuê của tôi
                </button>
              </li>
              <li className="h-[1px] bg-gray-800 my-1"></li>
              <li>
                <button 
                  onClick={logout}
                  className="w-full text-left text-gray-200 hover:bg-[#ff003c] hover:text-white px-4 py-2.5 text-xs font-medium transition-colors flex items-center gap-2"
                >
                  🚪 Đăng xuất
                </button>
              </li>
            </ul>
          </div>
        ) : (

              <button
                onClick={() => navigate("login")}
                className="hidden sm:block px-4 py-2 text-gray-900 border border-gray-300 text-xs font-bold tracking-widest uppercase hover:bg-gray-50 transition-all"
              >
                Đăng nhập
              </button>
            )}
            <a
              href="tel:18009999"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#ff3366] transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>1800 9999</span>
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
            >
              <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4">
            {isLoggedIn ? (
              <div className="py-2 border-b border-gray-100 mb-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 text-sm font-bold">Chào, {user?.fullName}</span>
                  <button onClick={logout} className="text-[#ff003c] text-xs font-semibold uppercase">Đăng xuất</button>
                </div>
                {isAdmin && (
                  <button onClick={() => navigate("admin")} className="block text-gray-700 text-sm font-medium uppercase">🛠️ Trang quản trị</button>
                )}
                <button onClick={() => navigate("orders")} className="block text-gray-700 text-sm font-medium uppercase">📋 Đơn thuê của tôi</button>
              </div>
            ) : (
              <div className="flex gap-2 mb-2">
                <button onClick={() => navigate("login")} className="flex-1 py-2 text-gray-900 border border-gray-300 text-xs font-bold uppercase text-center">Đăng nhập</button>
                <button onClick={() => navigate("register")} className="flex-1 py-2 bg-[#ff003c] text-white text-xs font-bold uppercase text-center">Đăng ký</button>
              </div>
            )}
            {[
              { label: "Trang chủ", page: "home" },
              { label: "Thuê Xe", page: "rent" },
              { label: "Liên Hệ", page: "contact" },
            ].map((item) => (
              <button
                key={item.page}
                onClick={() => navigate(item.page)}
                className="block w-full text-left text-gray-700 text-sm font-medium tracking-wider uppercase hover:text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] transition-colors py-2"
              >
                {item.label}
              </button>
            ))}
            <a href="tel:18009999" className="flex items-center gap-2 text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] text-sm font-bold tracking-wider uppercase py-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>1800 9999</span>
            </a>
          </div>
        )}
      </nav>

      {/* Page content with top padding for navbar */}
      <div className="pt-16">
        {renderPage()}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)] flex items-center justify-center">
                  <span className="text-black font-bold text-sm font-display">KT</span>
                </div>
                <div>
                  <div className="font-display text-gray-900 font-bold">K&T Showroom</div>
                  <div className="text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] text-[9px] tracking-widest uppercase">Premium Car Showroom</div>
                </div>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Đơn vị hàng đầu trong lĩnh vực mua bán và cho thuê xe cao cấp tại Việt Nam từ năm 2009.
              </p>
            </div>
            <div>
              <h4 className="text-gray-800 font-semibold text-xs uppercase tracking-widest mb-4">Dịch vụ</h4>
              <ul className="space-y-2 text-gray-500 text-xs">
                <li><button onClick={() => navigate("rent")} className="hover:text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] transition-colors">Thuê xe</button></li>
                <li className="hover:text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] transition-colors cursor-pointer">Bảo dưỡng xe</li>
                <li className="hover:text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] transition-colors cursor-pointer">Tư vấn thuê xe</li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-800 font-semibold text-xs uppercase tracking-widest mb-4">Liên hệ</h4>
              <ul className="space-y-2 text-gray-500 text-xs">
                <li>📍 123 Nguyễn Huệ, Quận 1, TP.HCM</li>
                <li className="flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span>1800 9999 (Miễn phí)</span>
                </li>
                <li>✉ info@ktshowroom.vn</li>
                <li>🕐 T2-CN: 8:00 - 20:00</li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-800 font-semibold text-xs uppercase tracking-widest mb-4">Chứng nhận</h4>
              <div className="space-y-2 text-gray-500 text-xs">
                <p>MST: 0312345678</p>
                <p>Giấy phép KD: 01/GP-BCT</p>
                <p>ISO 9001:2015 Certified</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs">© 2024 K&T Showroom. All rights reserved.</p>
            <p className="text-gray-400 text-xs">Thiết kế & phát triển bởi K&T Showroom Tech Team</p>
          </div>
        </div>
      </footer>
      <Chatbox />
    </div>
  );
}
