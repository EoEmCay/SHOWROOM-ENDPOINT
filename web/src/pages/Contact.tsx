import { useState } from "react";

interface ContactProps {
  onNavigate: (page: string) => void;
}

export default function Contact({ onNavigate }: ContactProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ fullName: "", email: "", phone: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const isFormValid = formData.fullName && formData.email && formData.phone && formData.subject && formData.message;

  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      {/* Hero Section - Professional & Elegant */}
      <section className="relative py-20 px-6 lg:px-12 overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e]">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-[0.08]" style={{background:"radial-gradient(circle,#ff003c,transparent)"}} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-[0.08]" style={{background:"radial-gradient(circle,#1a1a6e,transparent)"}} />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            {/* Small badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-[#ff003c]/10 border border-[#ff003c]/30 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff003c]" />
              <span className="text-[#ff003c] text-xs font-semibold tracking-widest uppercase">Chúng Tôi Lắng Nghe</span>
            </div>

            {/* Main heading */}
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Liên Hệ <span className="text-[#ff003c]">K&T Showroom</span>
            </h1>

            {/* Description */}
            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
              Có bất kỳ câu hỏi nào về dịch vụ thuê xe? Cần tư vấn chọn xe phù hợp? Hay muốn chia sẻ trải nghiệm của bạn? Hãy gửi tin nhắn hoặc gọi cho chúng tôi — đội ngũ chuyên gia sẵn sàng hỗ trợ 24/7.
            </p>

            {/* Quick contact options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <a
                href="tel:18009999"
                className="group flex items-center justify-center gap-3 px-6 py-4 bg-[#ff003c] text-white rounded-lg hover:bg-[#ff3366] transition-all hover:shadow-[0_0_20px_rgba(255,0,60,0.4)]"
              >
                <span className="text-2xl">📞</span>
                <div className="text-left">
                  <div className="text-xs text-white/80 uppercase tracking-wider">Gọi Ngay</div>
                  <div className="font-bold">1800 9999</div>
                </div>
              </a>

              <a
                href="mailto:info@ktshowroom.vn"
                className="group flex items-center justify-center gap-3 px-6 py-4 border-2 border-[#ff003c]/30 text-white rounded-lg hover:border-[#ff003c] hover:bg-[#ff003c]/5 transition-all"
              >
                <span className="text-2xl">✉️</span>
                <div className="text-left">
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Email</div>
                  <div className="font-bold">info@ktshowroom.vn</div>
                </div>
              </a>

              <div className="flex items-center justify-center gap-3 px-6 py-4 border-2 border-[#1a1a6e]/30 text-white rounded-lg">
                <span className="text-2xl">🕐</span>
                <div className="text-left">
                  <div className="text-xs text-gray-400 uppercase tracking-wider">24/7</div>
                  <div className="font-bold">Hỗ Trợ</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-around text-center">
            <div>
              <div className="text-[#ff003c] font-display font-bold text-3xl mb-1">2h</div>
              <p className="text-gray-400 text-sm uppercase tracking-wider">Trả lời Email</p>
            </div>
            <div>
              <div className="text-[#ff003c] font-display font-bold text-3xl mb-1">10,000+</div>
              <p className="text-gray-400 text-sm uppercase tracking-wider">Khách Hài Lòng</p>
            </div>
            <div>
              <div className="text-[#ff003c] font-display font-bold text-3xl mb-1">100%</div>
              <p className="text-gray-400 text-sm uppercase tracking-wider">Tư Vấn Miễn Phí</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Gửi Tin Nhắn Cho Chúng Tôi</h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-semibold">✅ Tin nhắn đã được gửi thành công!</p>
                  <p className="text-green-600 text-sm mt-1">Chúng tôi sẽ liên hệ lại với bạn trong vòng 24 giờ.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-2">Họ và tên *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Nguyễn Văn A"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#ff003c] focus:ring-1 focus:ring-[#ff003c] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#ff003c] focus:ring-1 focus:ring-[#ff003c] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-2">Số điện thoại *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0901234567"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#ff003c] focus:ring-1 focus:ring-[#ff003c] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-2">Chủ đề *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#ff003c] focus:ring-1 focus:ring-[#ff003c] transition-all appearance-none cursor-pointer bg-white"
                    >
                      <option value="">-- Chọn chủ đề --</option>
                      <option value="rental">Thuê xe</option>
                      <option value="purchase">Mua bán xe</option>
                      <option value="maintenance">Bảo dưỡng</option>
                      <option value="complaint">Khiếu nại/Góp ý</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold text-sm mb-2">Nội dung tin nhắn *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hãy cho chúng tôi biết điều gì đó..."
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#ff003c] focus:ring-1 focus:ring-[#ff003c] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid || loading}
                  className="w-full py-4 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)] text-white font-bold text-sm tracking-widest uppercase rounded-lg hover:bg-[#ff3366] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Đang gửi..." : "Gửi Tin Nhắn"}
                </button>
              </form>

              <p className="text-gray-500 text-xs mt-4 text-center">
                Chúng tôi cam kết bảo mật thông tin cá nhân của bạn.
              </p>
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Info Card 1 - Address */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[#ff003c]">
              <h3 className="font-display text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">📍</span> Địa chỉ
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                123 Nguyễn Huệ<br />
                Quận 1, TP. Hồ Chí Minh<br />
                Việt Nam
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff003c] text-xs font-semibold mt-3 inline-block hover:underline"
              >
                Xem trên bản đồ →
              </a>
            </div>

            {/* Info Card 2 - Phone */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[#1a1a6e]">
              <h3 className="font-display text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">📞</span> Điện Thoại
              </h3>
              <div className="space-y-2">
                <a href="tel:18009999" className="text-gray-700 font-semibold text-base hover:text-[#ff003c] transition-colors">
                  1800 9999
                </a>
                <p className="text-gray-500 text-xs">(Miễn phí)</p>
                <p className="text-gray-600 text-xs">Hỗ trợ 24/7</p>
              </div>
            </div>

            {/* Info Card 3 - Email */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[#ff003c]">
              <h3 className="font-display text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">✉</span> Email
              </h3>
              <a href="mailto:info@ktshowroom.vn" className="text-[#ff003c] font-semibold text-sm hover:underline">
                info@ktshowroom.vn
              </a>
              <p className="text-gray-500 text-xs mt-2">Trả lời trong 2 giờ</p>
            </div>

            {/* Info Card 4 - Hours */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[#1a1a6e]">
              <h3 className="font-display text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">🕐</span> Giờ Làm Việc
              </h3>
              <div className="space-y-1 text-sm">
                <p className="text-gray-700"><strong>Thứ 2 - Chủ nhật:</strong></p>
                <p className="text-gray-600">8:00 - 20:00</p>
                <p className="text-gray-500 text-xs mt-2">*Tết Âm lịch: 9:00 - 17:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-3">Vị Trí Showroom</h2>
            <p className="text-gray-600">Ghé thăm showroom của chúng tôi tại trung tâm TP. Hồ Chí Minh</p>
          </div>

          {/* Map Placeholder */}
          <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden shadow-lg border-2 border-[#ff003c]/30">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              title="K&T Showroom Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4816869270743!2d106.69659431533806!3d10.776926892328392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4376c11d81%3A0x3ee19f627a2b760!2s123%20Nguyen%20Hue%20St!5e0!3m2!1sen!2s!4v1234567890"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 lg:px-12 bg-[#f4f6f8]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)]" />
              <span className="text-[#ff003c] drop-shadow-[0_0_8px_rgba(255,0,60,0.4)] text-sm font-medium tracking-widest uppercase">
                Câu hỏi thường gặp
              </span>
              <div className="h-px w-12 bg-[#ff003c] shadow-[0_0_15px_rgba(255,0,60,0.5)]" />
            </div>
            <h2 className="font-display text-3xl font-bold text-gray-900">Những Câu Hỏi Phổ Biến</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Thời gian phản hồi của bạn như thế nào?",
                a: "Chúng tôi cam kết trả lời email trong vòng 2 giờ và cuộc gọi điện thoại được tiếp nhận 24/7."
              },
              {
                q: "Có thể thuê xe qua điện thoại được không?",
                a: "Có, bạn có thể gọi 1800 9999 để tư vấn và đặt thuê xe. Hoặc sử dụng ứng dụng web để đặt trực tuyến."
              },
              {
                q: "Bạn có hỗ trợ giao xe không?",
                a: "Có, chúng tôi cung cấp dịch vụ giao xe miễn phí trong bán kính 30km từ showroom."
              },
              {
                q: "Quá trình thanh toán như thế nào?",
                a: "Bạn có thể thanh toán qua chuyển khoản ngân hàng, thẻ tín dụng hoặc tiền mặt tại showroom."
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-gray-900 mb-2 text-base">{item.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#ff003c] to-[#ff7040] p-12 rounded-lg text-center shadow-2xl">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Cần Hỗ Trợ Ngay?</h2>
          <p className="text-white/90 text-lg mb-8">Gọi cho chúng tôi ngay hoặc dùng form trên để yêu cầu tư vấn miễn phí</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:18009999"
              className="px-8 py-4 bg-white text-[#ff003c] font-bold text-sm tracking-widest uppercase rounded-lg hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-2"
            >
              <span>📞</span> Gọi Ngay
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-8 py-4 border-2 border-white text-white font-bold text-sm tracking-widest uppercase rounded-lg hover:bg-white/10 transition-all"
            >
              ← Quay lại Form
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
