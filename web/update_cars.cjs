const fs = require('fs');
const path = require('path');
const db = require('./database.cjs'); // Đảm bảo đúng file kết nối của bạn

const sqlQuery = "SELECT * FROM xe"; // Tên bảng 'xe' trong phpMyAdmin của bạn

db.query(sqlQuery, (err, results) => {
  if (err) {
    console.error("❌ Lỗi khi lấy dữ liệu từ MySQL XAMPP:", err);
    db.end();
    return;
  }

  const processedCars = results.map(car => {
    return {
      id: String(car.MAXE || car.id || "unknown"),
      name: car.TENXE || car.name || "Tên xe mẫu",
      vehicleType: (car.LOAIXE && (car.LOAIXE.toLowerCase().includes('scooter') || car.LOAIXE.toLowerCase().includes('manual') || car.LOAIXE.toLowerCase().includes('electric'))) ? "motorbike" : "car",
      brand: car.brand || "VinFast",
      model: car.TENXE ? car.TENXE.split(' ')[1] || "VF" : (car.model || ""),
      year: 2024,
      category: car.LOAIXE && car.LOAIXE.toLowerCase().includes('scooter') ? "scooter" : 
          car.LOAIXE && car.LOAIXE.toLowerCase().includes('manual') ? "manual" : 
          car.LOAIXE && car.LOAIXE.toLowerCase().includes('electric') ? "electric" : 
          car.LOAIXE && car.LOAIXE.toLowerCase().includes('suv') ? "suv" : "sedan",
      rentPriceDay: Number(car.GIATHEONGAY || car.rentPriceDay || 0),
      deposit: Number(car.TIENDATCOC || car.deposit || 0),
      image: car.HINHANH ? (car.HINHANH.startsWith("/") ? car.HINHANH : `/images/cars/${car.HINHANH}`) : "/images/cars/default.png",
      images: car.HINHANH ? [car.HINHANH.startsWith("/") ? car.HINHANH : `/images/cars/${car.HINHANH}`] : [],
      color: car.MAU || car.color || "Đen",
      fuel: car.LOAIXE && car.LOAIXE.toLowerCase().includes('điện') ? "Điện" : "Xăng",
      transmission: "Tự động",
      seats: car.LOAIXE && car.LOAIXE.includes('5') ? 5 : 7,
      engine: "Động cơ điện/xăng",
      power: "150 hp",
      torque: "240 Nm",
      acceleration: "8.5s",
      topSpeed: "180 km/h",
      consumption: "0L/100km",
      description: car.MOTA || car.description || "Mô tả chi tiết về xe.",
      features: ["Apple CarPlay", "Bản đồ dẫn đường", "Camera lùi"],
      available: car.TRANGTHAIXE === "Sẵn sàng" || car.available === true
    };
  });

  // Khởi tạo nội dung file sạch sẽ từ đầu (Xóa bỏ hoàn toàn mảng cũ bị lỗi)
  const fileContent = `export type CarCategory = "economy" | "sedan" | "suv" | "luxury" | "supercar";

export interface Car {
  id: string;
  name: string;
  vehicleType: string;
  brand: string;
  model: string;
  year: number;
  category: CarCategory;
  rentPriceDay: number;
  deposit: number;
  image: string;
  images: string[];
  color: string;
  fuel: string;
  transmission: string;
  seats: number;
  engine: string;
  power: string;
  torque: string;
  acceleration: string;
  topSpeed: string;
  consumption: string;
  description: string;
  features: string[];
  available: boolean;
}

export const cars: Car[] = [
  {
    id: "toyota-vios-2024",
    name: "Toyota Vios 2024",
    brand: "Toyota",
    model: "Vios",
    year: 2024,
    category: "economy",
    rentPriceDay: 800000,
    deposit: 5000000,
    image: "/images/cars/toyota_vios_2024_left_1787641310828.png",
    images: [
      "/images/cars/toyota_vios_2024_left_1787641310828.png",
      "/images/cars/toyota_vios_2024_front_1787641127844.png",
      "/images/cars/toyota_vios_2024_right_1787641330865.png",
      "/images/cars/toyota_vios_2024_back_1787641291953.png",
      "/images/cars/toyota_vios_2024_interior_1787641398760.png",
    ],
    color: "Trắng ngọc trai",
    fuel: "Xăng",
    transmission: "Tự động CVT",
    seats: 5,
    engine: "1.5L Dual VVT-i",
    power: "107 mã lực",
    torque: "140 Nm",
    acceleration: "11.2 giây",
    topSpeed: "175 km/h",
    consumption: "5.5L/100km",
    description: "Toyota Vios 2024 - Lựa chọn hoàn hảo cho di chuyển đô thị. Thiết kế hiện đại, tiết kiệm nhiên liệu.",
    features: ["Apple CarPlay", "Camera lùi 360°", "Điều hòa tự động"],
    available: true,
  },
  {
    id: "honda-city-2024",
    name: "Honda City 2024",
    brand: "Honda",
    model: "City",
    year: 2024,
    category: "economy",
    rentPriceDay: 900000,
    deposit: 5000000,
    image: "/images/cars/honda_city_2024_left_1787643486159.png",
    images: [
      "/images/cars/honda_city_2024_left_1787643486159.png",
      "/images/cars/honda_city_2024_front_1787643405298.png",
      "/images/cars/honda_city_2024_right_1787643500730.png",
      "/images/cars/honda_city_2024_back_1787643467360.png",
      "/images/cars/honda_city_2024_interior_1787643588997.png",
    ],
    color: "Đỏ",
    fuel: "Xăng",
    transmission: "Tự động CVT",
    seats: 5,
    engine: "1.5L DOHC i-VTEC",
    power: "121 mã lực",
    torque: "145 Nm",
    acceleration: "10.8 giây",
    topSpeed: "185 km/h",
    consumption: "5.8L/100km",
    description: "Honda City 2024 với công nghệ Honda SENSING tiên tiến, mang lại trải nghiệm lái xe an toàn và thú vị.",
    features: ["Honda SENSING", "LaneWatch", "Apple CarPlay", "Cửa sổ trời"],
    available: true,
  },
  {
    id: "mazda6-2024",
    name: "Mazda6 2024",
    brand: "Mazda",
    model: "6",
    year: 2024,
    category: "sedan",
    rentPriceDay: 1500000,
    deposit: 8000000,
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=500&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=500&fit=crop&auto=format",
      "/images/cars/mazda6_2024_front_1787643633522.png",
      "https://images.unsplash.com/photo-1553440569-bfc106d75554?w=800&h=500&fit=crop&auto=format",
      "/images/cars/mazda6_2024_back_1787643715515.png",
      "/images/cars/mazda6_2024_interior_1787643774032.png",
    ],
    color: "Bạc",
    fuel: "Xăng",
    transmission: "Tự động 6 cấp",
    seats: 5,
    engine: "2.0L SKYACTIV-G",
    power: "165 mã lực",
    torque: "213 Nm",
    acceleration: "8.9 giây",
    topSpeed: "210 km/h",
    consumption: "6.9L/100km",
    description: "Mazda6 2024 - Sedan hạng D với thiết kế KODO đẳng cấp.",
    features: ["Nappa leather", "GVC Plus", "HUD", "Bose Premium Audio"],
    available: true,
  },
  {
    id: "bmw-530i-msport",
    name: "BMW 530i M Sport",
    brand: "BMW",
    model: "530i M Sport",
    year: 2024,
    category: "luxury",
    rentPriceDay: 5000000,
    deposit: 30000000,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=500&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=500&fit=crop&auto=format",
    ],
    color: "Đen",
    fuel: "Xăng",
    transmission: "Tự động Steptronic 8 cấp",
    seats: 5,
    engine: "2.0L TwinPower Turbo",
    power: "252 mã lực",
    torque: "350 Nm",
    acceleration: "6.1 giây",
    topSpeed: "250 km/h",
    consumption: "7.1L/100km",
    description: "BMW 530i M Sport - Thiết kế mạnh mẽ, sang trọng.",
    features: ["BMW iDrive 8", "M Sport Package", "Harman Kardon", "HUD"],
    available: true,
  },
  {
    id: "mercedes-gle-450",
    name: "Mercedes-Benz GLE 450",
    brand: "Mercedes-Benz",
    model: "GLE 450",
    year: 2024,
    category: "suv",
    rentPriceDay: 5500000,
    deposit: 30000000,
    image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&h=500&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1605515298946-d062f2e9dc53?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=500&fit=crop&auto=format"
    ],
    color: "Trắng",
    fuel: "Hybrid (Xăng + Điện)",
    transmission: "9G-TRONIC",
    seats: 7,
    engine: "3.0L I6",
    power: "367 mã lực",
    torque: "500 Nm",
    acceleration: "5.7 giây",
    topSpeed: "250 km/h",
    consumption: "8.5L/100km",
    description: "Mercedes-Benz GLE 450 4MATIC SUV hạng sang với công nghệ EQ Boost.",
    features: ["MBUX", "Burmester 13 loa", "Cửa hít", "Cam 360", "Ghế massage"],
    available: true,
  },
  {
    id: "porsche-cayenne-s",
    name: "Porsche Cayenne S",
    brand: "Porsche",
    model: "Cayenne S",
    year: 2024,
    category: "suv",
    rentPriceDay: 8000000,
    deposit: 50000000,
    image: "https://images.unsplash.com/photo-1503376713210-67c4be4da2eb?w=800&h=500&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1503376713210-67c4be4da2eb?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1503376713210-67c4be4da2eb?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1563720225101-1e967201b1b1?w=800&h=500&fit=crop&auto=format"
    ],
    color: "Đen",
    fuel: "Xăng",
    transmission: "Tiptronic S 8 cấp",
    seats: 5,
    engine: "2.9L V6 Twin-Turbo",
    power: "440 mã lực",
    torque: "550 Nm",
    acceleration: "5.2 giây",
    topSpeed: "265 km/h",
    consumption: "9.5L/100km",
    description: "Porsche Cayenne S kết hợp hoàn hảo giữa xe thể thao và SUV sang trọng.",
    features: ["Porsche Advanced Cockpit", "BOSE Surround Sound", "PDLS Plus", "Sport Chrono"],
    available: true,
  },
  {
    id: "ferrari-488-gtb",
    name: "Ferrari 488 GTB",
    brand: "Ferrari",
    model: "488 GTB",
    year: 2024,
    category: "supercar",
    rentPriceDay: 25000000,
    deposit: 100000000,
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&h=500&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1515569067071-ec3b51335dd0?w=800&h=500&fit=crop&auto=format"
    ],
    color: "Đỏ Rosso Corsa",
    fuel: "Xăng",
    transmission: "Ly hợp kép 7 cấp",
    seats: 2,
    engine: "3.9L V8 Twin-Turbo",
    power: "670 mã lực",
    torque: "760 Nm",
    acceleration: "3.0 giây",
    topSpeed: "330 km/h",
    consumption: "11.4L/100km",
    description: "Ferrari 488 GTB mang đến trải nghiệm lái xe thuần khiết và tốc độ chóng mặt.",
    features: ["Carbon Fiber Interior", "F1 Traction Control", "Launch Control", "Ceramic Brakes"],
    available: true,
  },
  {
    id: "lambo-huracan-evo",
    name: "Lamborghini Huracán EVO",
    brand: "Lamborghini",
    model: "Huracán EVO",
    year: 2024,
    category: "supercar",
    rentPriceDay: 30000000,
    deposit: 150000000,
    image: "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=800&h=500&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1627454819213-9a3d4fba7349?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=800&h=500&fit=crop&auto=format"
    ],
    color: "Cam",
    fuel: "Xăng",
    transmission: "Ly hợp kép 7 cấp",
    seats: 2,
    engine: "5.2L V10",
    power: "640 mã lực",
    torque: "600 Nm",
    acceleration: "2.9 giây",
    topSpeed: "325 km/h",
    consumption: "13.7L/100km",
    description: "Lamborghini Huracán EVO với động cơ V10 hút khí tự nhiên và thiết kế đậm chất khí động học.",
    features: ["LDVI System", "Carbon Ceramic Brakes", "Alcantara Interior", "Lifting System"],
    available: true,
  },
  {
    id: "bentley-continental-gt",
    name: "Bentley Continental GT",
    brand: "Bentley",
    model: "Continental GT",
    year: 2024,
    category: "luxury",
    rentPriceDay: 20000000,
    deposit: 100000000,
    image: "https://images.unsplash.com/photo-1600705663738-f9b870e28f2c?w=800&h=500&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1600705663738-f9b870e28f2c?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1606016159991-dde6293cbaf7?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1600705663738-f9b870e28f2c?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1549420042-4fdb23e80800?w=800&h=500&fit=crop&auto=format"
    ],
    color: "Trắng kim cương",
    fuel: "Xăng",
    transmission: "Ly hợp kép 8 cấp",
    seats: 4,
    engine: "4.0L V8 Twin-Turbo",
    power: "550 mã lực",
    torque: "770 Nm",
    acceleration: "4.0 giây",
    topSpeed: "318 km/h",
    consumption: "11.2L/100km",
    description: "Bentley Continental GT kết hợp giữa hiệu năng mạnh mẽ và sự sang trọng tuyệt đối.",
    features: ["Naim Audio", "Mulliner Driving Spec", "Rotating Display", "Massaging Seats"],
    available: true,
  }
];

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN").format(price);
};

export const categoryLabels: Record<CarCategory, string> = {
  economy: "Phổ thông",
  sedan: "Sedan Hạng D",
  suv: "SUV Đa Dụng",
  luxury: "Sang trọng",
  supercar: "Siêu xe",
};

export const categoryColors: Record<CarCategory, string> = {
  economy: "#4ade80",
  sedan: "#60a5fa",
  suv: "#a78bfa",
  luxury: "#ff003c",
  supercar: "#f87171",
};
export const cars: Car[] = ${JSON.stringify(processedCars, null, 2)};
`;

  const outputPath = path.join(__dirname, 'src', 'data', 'cars.ts');

  // Ghi đè toàn bộ dữ liệu mới sạch sẽ vào file cars.ts
  fs.writeFile(outputPath, fileContent, 'utf8', (writeErr) => {
    if (writeErr) {
      console.error("❌ Lỗi cập nhật file cars.ts:", writeErr);
    } else {
      console.log("==> ✅ Đã dọn sạch file cũ và đồng bộ biến 'cars' mới thành công!");
    }
    db.end();
  });
});