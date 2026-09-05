import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  time: string;
}

export default function Chatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Xin chào! Mình là CarBot 🤖 — trợ lý ảo của hệ thống thuê xe. Mình có thể giúp gì cho hành trình của bạn? Thử bấm các gợi ý bên dưới hoặc hỏi mình nhé!",
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Danh sách các nút gợi ý bấm nhanh (Quick Replies) giống như hình mẫu của bạn
  const quickReplies = [
    { text: "💵 Giá thuê xe Honda", value: "honda" },
    { text: "🚘 Thủ tục thuê xe", value: "thutuc" },
    { text: "📍 Địa chỉ cửa hàng", value: "diachi" },
    { text: "📞 Liên hệ hỗ trợ", value: "lienhe" }
  ];

  // Tự động cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Hàm xử lý câu trả lời thông minh tự động (Mô phỏng AI)
  const getBotResponse = (userInput: string): string => {
    const text = userInput.toLowerCase();
    
    // 1. Kiểm tra từ khóa về Xe Honda hoặc Giá cả
    if (text.includes('honda') || text.includes('giá') || text.includes('gia')) {
      return "Dòng xe Honda City 2024 bên mình hiện có giá thuê là 800.000đ/ngày đó bạn. Xe chạy mượt mà, tiết kiệm nhiên liệu cực kỳ!";
    }
    
    // 2. Kiểm tra từ khóa về Thủ tục
    if (text.includes('thủ tục') || text.includes('thu tuc')) {
      return "Thủ tục thuê xe rất đơn giản ạ! Bạn chỉ cần chuẩn bị: CCCD gắn chíp, Bằng lái xe hạng B2 trở lên (gốc) và một khoản tài sản thế chấp (hoặc tiền mặt 10-15 triệu).";
    }
    
    // 3. Kiểm tra từ khóa về Địa chỉ / Cửa hàng
    if (text.includes('địa chỉ') || text.includes('dia chi') || text.includes('cửa hàng')) {
      return "Cửa hàng của bên mình mở cửa từ 7h00 - 21h00 tại số 123 Đường xe hơi, Quận 1, TP. Hồ Chí Minh. Rất hân hạnh được đón tiếp bạn!";
    }
    
    // 4. Kiểm tra từ khóa về Liên hệ / Hỗ trợ
    if (text.includes('liên hệ') || text.includes('lien he') || text.includes('hỗ trợ') || text.includes('ho tro')) {
      return "Bạn có thể gọi trực tiếp vào hotline: 1900.xxxx hoặc để lại số điện thoại tại đây, nhân viên tư vấn sẽ liên hệ lại bạn ngay trong 5 phút để hỗ trợ nhé!";
    }
    
    // Câu trả lời mặc định nếu không khớp từ khóa nào ở trên
    return "Cảm ơn bạn đã nhắn tin! Hiện tại mình đang được cập nhật thêm dữ liệu. Bạn có thể gọi hotline 1900.xxxx để được hỗ trợ nhanh nhất nhé!";
  };


  // Hàm xử lý khi gửi tin nhắn
  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // 1. Thêm tin nhắn của User vào khung chat
    const userMessage: Message = {
      id: Date.now(),
      text: textToSend,
      sender: 'user',
      time: currentTime
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // 2. Bot suy nghĩ và trả lời sau 1 giây
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: getBotResponse(textToSend),
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      
      {/* Nút bấm mở Chatbox AI dạng tròn gọn gàng */}
    {!isOpen && (
    <button 
        onClick={() => setIsOpen(true)}
        className="bg-teal-600 hover:bg-teal-700 hover:scale-110 text-white w-14 h-14 rounded-full shadow-lg transition duration-300 flex items-center justify-center text-2xl"
        title="Chat với AI"
    >
        🤖
    </button>
    )}


      {/* Khung Giao Diện Chatbox chính */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[550px] bg-slate-900 border border-slate-700 rounded-2xl flex flex-col shadow-2xl text-white overflow-hidden">
          {/* Header */}
          <div className="bg-slate-800 p-4 flex items-center justify-between border-b border-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <h3 className="font-semibold text-teal-400">Trợ lý ảo CarBot</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white text-xl">×</button>
          </div>

          {/* Vùng hiển thị nội dung tin nhắn */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-teal-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-100 rounded-tl-none'}`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.time}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Các nút bấm gợi ý (Quick Replies) y hệt mẫu */}
          <div className="p-2 bg-slate-900 flex flex-wrap gap-1.5 border-t border-slate-800">
            {quickReplies.map((reply, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(reply.text)}
                className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-full transition duration-200"
              >
                {reply.text}
              </button>
            ))}
          </div>

          {/* Ô nhập tin nhắn phía dưới cùng */}
          <div className="p-3 bg-slate-800 flex gap-2 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Nhập câu hỏi của bạn..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-teal-500"
            />
            <button 
              onClick={() => handleSend(input)}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
