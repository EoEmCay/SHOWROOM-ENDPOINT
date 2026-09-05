export type CarCategory = "economy" | "sedan" | "suv" | "luxury" | "supercar";

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

export const oldcars: any[] = [
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
export const cars: any[] = [
  {
    "id": "X001",
    "name": "VinFast VF8",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "VF8",
    "year": 2024,
    "category": "suv",
    "rentPriceDay": 1200000,
    "deposit": 5000000,
    "image": "/images/cars/porsche_cayenne.png",
    "images": [
      "/images/cars/porsche_cayenne.png"
    ],
    "color": "Đen",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 5,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Xe điện thông minh, rộng rãi, công nghệ hiện đại",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "X002",
    "name": "Toyota Camry",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "Camry",
    "year": 2024,
    "category": "sedan",
    "rentPriceDay": 1500000,
    "deposit": 10000000,
    "image": "/images/cars/bmw_530i.png",
    "images": [
      "/images/cars/bmw_530i.png",
      "/images/cars/bmw_530i_den.png"
    ],
    "color": "Trắng",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 5,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Xe sang trọng, lịch lãm, thích hợp gặp đối tác",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "X003",
    "name": "Honda City",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "City",
    "year": 2024,
    "category": "sedan",
    "rentPriceDay": 700000,
    "deposit": 3000000,
    "image": "/images/cars/honda_city_trang.png",
    "images": [
      "/images/cars/honda_city_trang.png",
      "/images/cars/honda_city_2024_front.png",
      "/images/cars/honda_city_2024_left.png",
      "/images/cars/honda_city_2024_right.png",
      "/images/cars/honda_city_2024_back.png",
      "/images/cars/honda_city_2024_interior.png"
    ],
    "color": "Đỏ",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 5,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Xe phân khúc B tiết kiệm nhiên liệu, dễ lái trong phố",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": false
  },
  {
    "id": "X004",
    "name": "Hyundai SantaFe",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "SantaFe",
    "year": 2024,
    "category": "suv",
    "rentPriceDay": 1400000,
    "deposit": 8000000,
    "image": "/images/cars/porsche_trang.png",
    "images": [
      "/images/cars/porsche_trang.png"
    ],
    "color": "Vàng cát",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 7,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Xe gia đình 7 chỗ máy dầu mạnh mẽ, nội thất tiện nghi",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "X005",
    "name": "Mazda CX-5",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "CX-5",
    "year": 2024,
    "category": "sedan",
    "rentPriceDay": 1000000,
    "deposit": 5000000,
    "image": "/images/cars/mazda_6_xam.png",
    "images": [
      "/images/cars/mazda_6_xam.png",
      "/images/cars/mazda6_2024_front.png"
    ],
    "color": "Xám",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 5,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Thiết kế Kodo trẻ trung, trang bị nhiều tính năng an toàn",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": false
  },
  {
    "id": "X006",
    "name": "Ford Ranger Wildtrak",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "Ranger",
    "year": 2024,
    "category": "sedan",
    "rentPriceDay": 1100000,
    "deposit": 5000000,
    "image": "/images/cars/porsche_cayenne.png",
    "images": [
      "/images/cars/porsche_cayenne.png"
    ],
    "color": "Cam",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 5,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Xe bán tải đa dụng, gầm cao vượt địa hình tốt",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "X007",
    "name": "Mitsubishi Xpander",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "Xpander",
    "year": 2024,
    "category": "sedan",
    "rentPriceDay": 800000,
    "deposit": 3000000,
    "image": "/images/cars/mercedes_gle_trang.png",
    "images": [
      "/images/cars/mercedes_gle_trang.png"
    ],
    "color": "Bạc",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 7,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Xe 7 chỗ quốc dân, rộng rãi cho cả gia đình đi du lịch",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": false
  },
  {
    "id": "X008",
    "name": "Kia Morning",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "Morning",
    "year": 2024,
    "category": "sedan",
    "rentPriceDay": 500000,
    "deposit": 2000000,
    "image": "/images/cars/vios_do.png",
    "images": [
      "/images/cars/vios_do.png"
    ],
    "color": "Trắng",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 7,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Xe nhỏ gọn, di chuyển linh hoạt, giá thuê hạt dẻ",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "X009",
    "name": "VinFast VF9",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "VF9",
    "year": 2024,
    "category": "suv",
    "rentPriceDay": 2000000,
    "deposit": 15000000,
    "image": "/images/cars/mercedes_benz_450.png",
    "images": [
      "/images/cars/mercedes_benz_450.png"
    ],
    "color": "Xanh dương",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 7,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Chủ tịch xe điện, cực kỳ rộng rãi và đẳng cấp",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "X010",
    "name": "Toyota Vios",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "Vios",
    "year": 2024,
    "category": "sedan",
    "rentPriceDay": 650000,
    "deposit": 3000000,
    "image": "/images/cars/toyota_vios_2024_front_1787641127844.png",
    "images": [
      "/images/cars/toyota_vios_2024_front_1787641127844.png",
      "/images/cars/toyota-vios-right.png",
      "/images/cars/toyota_vios_2024_back.png",
      "/images/cars/toyota-vios-interior.png"
    ],
    "color": "Vàng cát",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 5,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Xe bền bỉ, điều hòa mát sâu, tiết kiệm xăng",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "X011",
    "name": "Hyundai Accent",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "Accent",
    "year": 2024,
    "category": "sedan",
    "rentPriceDay": 700000,
    "deposit": 3000000,
    "image": "/images/cars/bmw_530i_den.png",
    "images": [
      "/images/cars/bmw_530i_den.png"
    ],
    "color": "Đen",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 5,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Option phong phú, kiểu dáng thể thao trẻ trung",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": false
  },
  {
    "id": "X012",
    "name": "Mazda 3",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "3",
    "year": 2024,
    "category": "sedan",
    "rentPriceDay": 850000,
    "deposit": 4000000,
    "image": "/images/cars/mazda_6_do.png",
    "images": [
      "/images/cars/mazda_6_do.png"
    ],
    "color": "Đỏ",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 5,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Nội thất tiệm cận xe sang, cách âm tốt",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "X013",
    "name": "Kia Seltos",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "Seltos",
    "year": 2024,
    "category": "suv",
    "rentPriceDay": 900000,
    "deposit": 4000000,
    "image": "/images/cars/porsche_trang.png",
    "images": [
      "/images/cars/porsche_trang.png"
    ],
    "color": "Trắng nóc đen",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 5,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Gầm cao đô thị thời trang, không gian thoải mái",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "X014",
    "name": "Ford Everest",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "Everest",
    "year": 2024,
    "category": "suv",
    "rentPriceDay": 1600000,
    "deposit": 10000000,
    "image": "/images/cars/bentley_den.png",
    "images": [
      "/images/cars/bentley_den.png"
    ],
    "color": "Đen",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 7,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Cơ bắp Mỹ, đi đường trường cực đầm và chắc chắn",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "X015",
    "name": "Toyota Fortuner",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "Fortuner",
    "year": 2024,
    "category": "suv",
    "rentPriceDay": 1300000,
    "deposit": 7000000,
    "image": "/images/cars/porsche_cayenne.png",
    "images": [
      "/images/cars/porsche_cayenne.png"
    ],
    "color": "Bạc",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 7,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Xe gầm cao máy dầu bền bỉ thách thức mọi cung đường",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": false
  },
  {
    "id": "X016",
    "name": "VinFast VF6",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "VF6",
    "year": 2024,
    "category": "suv",
    "rentPriceDay": 950000,
    "deposit": 4000000,
    "image": "/images/cars/mazda6_2024_back.png",
    "images": [
      "/images/cars/mazda6_2024_back.png"
    ],
    "color": "Xám",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 5,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Xe điện cỡ B năng động, gia tốc tốt",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "X017",
    "name": "Honda CR-V",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "CR-V",
    "year": 2024,
    "category": "suv",
    "rentPriceDay": 1300000,
    "deposit": 7000000,
    "image": "/images/cars/mercedes_gle_trang.png",
    "images": [
      "/images/cars/mercedes_gle_trang.png"
    ],
    "color": "Trắng",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 7,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Xe gia đình cao cấp, vận hành êm ái, an toàn cao",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": false
  },
  {
    "id": "X018",
    "name": "Hyundai Tucson",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "Tucson",
    "year": 2024,
    "category": "suv",
    "rentPriceDay": 1100000,
    "deposit": 5000000,
    "image": "/images/cars/bentley_gt.png",
    "images": [
      "/images/cars/bentley_gt.png"
    ],
    "color": "Đỏ",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 5,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Thiết kế tương lai, khoảng trống ngồi chân rộng rãi",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "X019",
    "name": "Suzuki XL7",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "XL7",
    "year": 2024,
    "category": "sedan",
    "rentPriceDay": 800000,
    "deposit": 3000000,
    "image": "/images/cars/mercedes_benz_450.png",
    "images": [
      "/images/cars/mercedes_benz_450.png"
    ],
    "color": "Khaki",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 7,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Xe nhập khẩu nguyên chiếc, thực dụng và tiết kiệm",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "X020",
    "name": "VinFast VF5",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "VF5",
    "year": 2024,
    "category": "suv",
    "rentPriceDay": 700000,
    "deposit": 3000000,
    "image": "/images/cars/toyota-vios-right.png",
    "images": [
      "/images/cars/toyota-vios-right.png"
    ],
    "color": "Xanh VinFast",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 5,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Xe điện đô thị nhỏ gọn, chi phí vận hành siêu rẻ",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "X021",
    "name": "Toyota Innova Cross",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "Innova",
    "year": 2024,
    "category": "sedan",
    "rentPriceDay": 1200000,
    "deposit": 5000000,
    "image": "/images/cars/mercedes_gle_trang.png",
    "images": [
      "/images/cars/mercedes_gle_trang.png"
    ],
    "color": "Trắng",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 7,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Thế hệ mới khung gầm liền khối cực êm, rộng rãi",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": false
  },
  {
    "id": "X022",
    "name": "Kia Carnival",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "Carnival",
    "year": 2024,
    "category": "sedan",
    "rentPriceDay": 2500000,
    "deposit": 20000000,
    "image": "/images/cars/bentley_den.png",
    "images": [
      "/images/cars/bentley_den.png"
    ],
    "color": "Đen",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 7,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Chuyên cơ mặt đất, ghế thương gia, siêu rộng rãi",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "X023",
    "name": "BMW 320i",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "320i",
    "year": 2024,
    "category": "sedan",
    "rentPriceDay": 2800000,
    "deposit": 30000000,
    "image": "/images/cars/bmw_530i.png",
    "images": [
      "/images/cars/bmw_530i.png",
      "/images/cars/bmw_530i_den.png"
    ],
    "color": "Trắng",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 5,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Xe sang thể thao cảm giác lái phấn khích",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "X024",
    "name": "Mercedes C200",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "C200",
    "year": 2024,
    "category": "sedan",
    "rentPriceDay": 3000000,
    "deposit": 30000000,
    "image": "/images/cars/mercedes_benz_450.png",
    "images": [
      "/images/cars/mercedes_benz_450.png"
    ],
    "color": "Đen",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 5,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Đẳng cấp doanh nhân, nội thất đèn led rực rỡ",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "X025",
    "name": "Hyundai Custin",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "Custin",
    "year": 2024,
    "category": "sedan",
    "rentPriceDay": 1400000,
    "deposit": 8000000,
    "image": "/images/cars/porsche_trang.png",
    "images": [
      "/images/cars/porsche_trang.png"
    ],
    "color": "Bạc",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 7,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Cửa lùa tự động tiện lợi, ghế có chế độ thư giãn",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": false
  },
  {
    "id": "X026",
    "name": "Mazda 6",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "6",
    "year": 2024,
    "category": "sedan",
    "rentPriceDay": 1100000,
    "deposit": 5000000,
    "image": "/images/cars/mazda6_2024_front.png",
    "images": [
      "/images/cars/mazda6_2024_front.png",
      "/images/cars/mazda6_2024_back.png",
      "/images/cars/mazda6_2024_interior.png",
      "/images/cars/mazda_6_do.png"
    ],
    "color": "Trắng",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 5,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Sedan hạng D lịch lãm, đi đầm chắc",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "X027",
    "name": "Ford Territory",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "Territory",
    "year": 2024,
    "category": "suv",
    "rentPriceDay": 1000000,
    "deposit": 5000000,
    "image": "/images/cars/porsche_cayenne.png",
    "images": [
      "/images/cars/porsche_cayenne.png"
    ],
    "color": "Trắng",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 5,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Nội thất toàn màn hình lớn, siêu rộng trong phân khúc",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "X028",
    "name": "Toyota Raize",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "Raize",
    "year": 2024,
    "category": "suv",
    "rentPriceDay": 700000,
    "deposit": 3000000,
    "image": "/images/cars/honda_city_2024_right.png",
    "images": [
      "/images/cars/honda_city_2024_right.png"
    ],
    "color": "Đỏ nóc đen",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 5,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Xe gầm cao cỡ nhỏ phù hợp cho gia đình trẻ",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "X029",
    "name": "Honda Civic",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "Civic",
    "year": 2024,
    "category": "sedan",
    "rentPriceDay": 1000000,
    "deposit": 5000000,
    "image": "/images/cars/honda_city_2024_front.png",
    "images": [
      "/images/cars/honda_city_2024_front.png"
    ],
    "color": "Xám",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 5,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Kiểu dáng sedan thể thao bản lĩnh, lái hay",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": false
  },
  {
    "id": "X030",
    "name": "VinFast VF7",
    "vehicleType": "car",
    "brand": "VinFast",
    "model": "VF7",
    "year": 2024,
    "category": "suv",
    "rentPriceDay": 1400000,
    "deposit": 8000000,
    "image": "/images/cars/porsche_trang.png",
    "images": [
      "/images/cars/porsche_trang.png"
    ],
    "color": "Xanh hỏa long",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 5,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Thiết kế phi thuyền cực ngầu, tăng tốc xé gió",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "XM001",
    "name": "Honda Vision 2024",
    "vehicleType": "motorbike",
    "brand": "VinFast",
    "model": "Vision",
    "year": 2024,
    "category": "scooter",
    "rentPriceDay": 150000,
    "deposit": 1000000,
    "image": "/images/motobike/airblade_den.png",
    "images": [
      "/images/motobike/airblade_den.png"
    ],
    "color": "Trắng",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 7,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Xe ga quốc dân, tiết kiệm xăng, chạy êm.",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "XM002",
    "name": "Honda SH 160i",
    "vehicleType": "motorbike",
    "brand": "VinFast",
    "model": "SH",
    "year": 2024,
    "category": "scooter",
    "rentPriceDay": 350000,
    "deposit": 3000000,
    "image": "/images/motobike/sh_trang.png",
    "images": [
      "/images/motobike/sh_trang.png",
      "/images/motobike/sh_do.png"
    ],
    "color": "Đen mờ",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 7,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Xe ga cao cấp, sang trọng, động cơ mạnh mẽ.",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "XM003",
    "name": "Yamaha Grande",
    "vehicleType": "motorbike",
    "brand": "VinFast",
    "model": "Grande",
    "year": 2024,
    "category": "scooter",
    "rentPriceDay": 160000,
    "deposit": 1000000,
    "image": "/images/motobike/nvx_cam.png",
    "images": [
      "/images/motobike/nvx_cam.png"
    ],
    "color": "Đỏ mận",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 7,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Kiểu dáng thời trang, cốp rộng, thích hợp cho nữ.",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "XM004",
    "name": "Honda Air Blade 160",
    "vehicleType": "motorbike",
    "brand": "VinFast",
    "model": "Air",
    "year": 2024,
    "category": "scooter",
    "rentPriceDay": 200000,
    "deposit": 1500000,
    "image": "/images/motobike/airblade_bac.png",
    "images": [
      "/images/motobike/airblade_bac.png",
      "/images/motobike/airblade_den.png"
    ],
    "color": "Xám xi măng",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 7,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Thiết kế thể thao, nam tính, vận hành đầm chắc.",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "XM005",
    "name": "Yamaha Exciter 155",
    "vehicleType": "motorbike",
    "brand": "VinFast",
    "model": "Exciter",
    "year": 2024,
    "category": "manual",
    "rentPriceDay": 180000,
    "deposit": 1500000,
    "image": "/images/motobike/ex_xanh.png",
    "images": [
      "/images/motobike/ex_xanh.png",
      "/images/motobike/ex_den.png"
    ],
    "color": "Xanh GP",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 7,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Xe côn tay mạnh mẽ, trải nghiệm lái phấn khích.",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "XM006",
    "name": "Honda Winner X v4",
    "vehicleType": "motorbike",
    "brand": "VinFast",
    "model": "Winner",
    "year": 2024,
    "category": "manual",
    "rentPriceDay": 170000,
    "deposit": 1500000,
    "image": "/images/motobike/ex_den.png",
    "images": [
      "/images/motobike/ex_den.png"
    ],
    "color": "Đỏ đen",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 7,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Xe côn tay thể thao, phanh ABS an toàn.",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "XM007",
    "name": "Honda Wave Alpha",
    "vehicleType": "motorbike",
    "brand": "VinFast",
    "model": "Wave",
    "year": 2024,
    "category": "manual",
    "rentPriceDay": 100000,
    "deposit": 500000,
    "image": "/images/motobike/wave_xanh.png",
    "images": [
      "/images/motobike/wave_xanh.png",
      "/images/motobike/wave_do.png",
      "/images/motobike/wave_trang.png"
    ],
    "color": "Xanh nhớt",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 7,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Xe số bền bỉ, tiết kiệm xăng tối đa, dễ chạy.",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "XM008",
    "name": "Yamaha Sirius FI",
    "vehicleType": "motorbike",
    "brand": "VinFast",
    "model": "Sirius",
    "year": 2024,
    "category": "manual",
    "rentPriceDay": 110000,
    "deposit": 500000,
    "image": "/images/motobike/wave_trang.png",
    "images": [
      "/images/motobike/wave_trang.png"
    ],
    "color": "Trắng đen",
    "fuel": "Xăng",
    "transmission": "Tự động",
    "seats": 7,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Xe số nhỏ gọn, tăng tốc mượt mà.",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "XM009",
    "name": "VinFast Evo 200",
    "vehicleType": "motorbike",
    "brand": "VinFast",
    "model": "Evo",
    "year": 2024,
    "category": "electric",
    "rentPriceDay": 120000,
    "deposit": 1000000,
    "image": "/images/motobike/vinfast_vang.png",
    "images": [
      "/images/motobike/vinfast_vang.png"
    ],
    "color": "Vàng",
    "fuel": "Điện",
    "transmission": "Tự động",
    "seats": 7,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Xe máy điện thông minh, di chuyển linh hoạt.",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  },
  {
    "id": "XM010",
    "name": "VinFast Feliz S",
    "vehicleType": "motorbike",
    "brand": "VinFast",
    "model": "Feliz",
    "year": 2024,
    "category": "electric",
    "rentPriceDay": 150000,
    "deposit": 1500000,
    "image": "/images/motobike/vinfast_trang.png",
    "images": [
      "/images/motobike/vinfast_trang.png"
    ],
    "color": "Xanh rêu",
    "fuel": "Điện",
    "transmission": "Tự động",
    "seats": 7,
    "engine": "Động cơ điện/xăng",
    "power": "150 hp",
    "torque": "240 Nm",
    "acceleration": "8.5s",
    "topSpeed": "180 km/h",
    "consumption": "0L/100km",
    "description": "Xe điện công suất lớn, cốp rộng, đi chuyển xa.",
    "features": [
      "Apple CarPlay",
      "Bản đồ dẫn đường",
      "Camera lùi"
    ],
    "available": true
  }
];

/* ================================================================
 * BỔ SUNG: thông số kỹ thuật thật + danh sách màu sắc cho từng xe.
 * Áp dụng ngay khi import module (ghi đè các giá trị placeholder
 * "150 hp / 240 Nm / 8.5s..." ở mảng phía trên).
 * ================================================================ */

export interface CarColor {
  name: string;
  hex: string;
  images: string[];
}

const COLOR_HEX: Record<string, string> = {
  "Đen ánh": "#1c1c1e", "Đen nhám": "#232326", "Đen mờ": "#26262a", "Đen": "#1c1c1e",
  "Đỏ đen": "#35201f", "Đỏ nóc đen": "#8f2b26",
  "Trắng ngọc trai": "#eef1f4", "Trắng": "#eef1f4", "Trắng đen": "#dfe2e6", "Trắng nóc đen": "#e4e7ea",
  "Bạc kim": "#c6c9cc", "Bạc": "#c6c9cc",
  "Xám titan": "#7f8286", "Xám lông chuột": "#6b6e72", "Xám": "#84878b",
  "Đỏ Rosso": "#c1272d", "Đỏ đô": "#7c1f2b", "Đỏ": "#c1272d",
  "Cam năng lượng": "#e35a1c", "Cam": "#e35a1c",
  "Vàng cát": "#cdb78d", "Vàng gold": "#d4af37", "Vàng": "#f2b21a",
  "Xanh dương": "#1560bd", "Xanh dương đậm": "#16407a", "Xanh navy": "#22304a", "Xanh ngọc": "#1f8a8a",
  "Xanh rêu": "#59663a", "Xanh mint": "#7fc8a9", "Xanh GP": "#1a73c2", "Xanh nhớt": "#4f7a27", "Xanh xám": "#5a6b73",
  "Nâu cà phê": "#5b4636",
  "Đen bóng": "#1a1a1d", "Xám thể thao": "#6b6e72", "Xám bạc": "#b7babd",
  "Trắng ngà": "#f0ede6", "Trắng bạc": "#e7e9ec", "Đỏ đấu": "#b32235", "Đỏ nhám": "#8f2b26",
  "Cam đen": "#b8461e", "Vàng nâu": "#b98a3a",
};

type ColorOpt = [string, string[]?];
interface CarSpec {
  fuel?: string;
  transmission: string;
  seats: number;
  engine: string;
  power: string;
  torque: string;
  acceleration: string;
  topSpeed: string;
  consumption: string;
  features: string[];
  colors: ColorOpt[];
}

const F_ECO = ["Apple CarPlay / Android Auto", "Camera lùi", "Điều hòa tự động", "Cảm biến lùi", "Kết nối Bluetooth", "Khởi động nút bấm"];
const F_MID = ['Màn hình cảm ứng 8-10"', "Camera 360°", "Cruise Control", "Cảnh báo điểm mù", "Cửa sổ trời", "Ghế bọc da"];
const F_LUX = ["Đồng hồ kỹ thuật số", "Âm thanh cao cấp", "Ghế chỉnh điện & nhớ vị trí", "Đèn LED Matrix", "Head-up Display", "Cửa hít"];
const F_EV = ["Trợ lý ảo ViVi", "ADAS Level 2", "Sạc nhanh DC", "Phanh tái sinh", "Cảnh báo lệch làn", "Cập nhật OTA"];
const F_MOTO = ["Khóa Smartkey", "Phanh ABS / CBS", "Cốp rộng", "Đèn LED toàn bộ", "Đồng hồ LCD", "Cổng sạc USB"];

const CAR_SPECS: Record<string, CarSpec> = {
  X001: { fuel: "Điện", transmission: "1 cấp (xe điện)", seats: 5, engine: "2 mô-tơ điện", power: "349 mã lực", torque: "500 Nm", acceleration: "5.9 giây", topSpeed: "200 km/h", consumption: "24.2 kWh/100km", features: F_EV, colors: [["Đen ánh", ["/images/cars/porsche_cayenne.png"]], ["Trắng ngọc trai", ["/images/cars/porsche_trang.png"]], ["Xám titan"]] },
  X002: { transmission: "Tự động 8 cấp", seats: 5, engine: "2.5L Dynamic Force", power: "209 mã lực", torque: "250 Nm", acceleration: "8.4 giây", topSpeed: "210 km/h", consumption: "6.8L/100km", features: F_MID, colors: [["Trắng ngọc trai", ["/images/cars/bmw_530i.png"]], ["Đen ánh", ["/images/cars/bmw_530i_den.png"]], ["Bạc kim"]] },
  X003: { transmission: "Tự động CVT", seats: 5, engine: "1.5L DOHC i-VTEC", power: "119 mã lực", torque: "145 Nm", acceleration: "10.5 giây", topSpeed: "190 km/h", consumption: "5.8L/100km", features: F_ECO, colors: [["Đỏ Rosso"], ["Trắng ngọc trai", ["/images/cars/honda_city_trang.png"]], ["Xám lông chuột"]] },
  X004: { fuel: "Dầu", transmission: "Tự động 8 cấp", seats: 7, engine: "2.2L CRDi Diesel", power: "202 mã lực", torque: "440 Nm", acceleration: "9.3 giây", topSpeed: "203 km/h", consumption: "7.1L/100km", features: F_MID, colors: [["Vàng cát", ["/images/cars/porsche_trang.png"]], ["Đen ánh", ["/images/cars/porsche_cayenne.png"]], ["Xanh navy"]] },
  X005: { transmission: "Tự động 6 cấp", seats: 5, engine: "2.0L SkyActiv-G", power: "154 mã lực", torque: "200 Nm", acceleration: "10.4 giây", topSpeed: "190 km/h", consumption: "6.9L/100km", features: F_MID, colors: [["Xám lông chuột", ["/images/cars/mazda_6_xam.png"]], ["Đỏ đô", ["/images/cars/mazda_6_do.png"]], ["Trắng ngọc trai", ["/images/cars/mazda6_2024_front.png"]]] },
  X006: { fuel: "Dầu", transmission: "Tự động 10 cấp", seats: 5, engine: "2.0L Bi-Turbo Diesel", power: "207 mã lực", torque: "500 Nm", acceleration: "10.5 giây", topSpeed: "175 km/h", consumption: "7.6L/100km", features: F_MID, colors: [["Cam năng lượng", ["/images/cars/porsche_cayenne.png"]], ["Bạc kim", ["/images/cars/porsche_trang.png"]], ["Xanh rêu"]] },
  X007: { transmission: "Tự động 4 cấp", seats: 7, engine: "1.5L MIVEC", power: "104 mã lực", torque: "141 Nm", acceleration: "12.8 giây", topSpeed: "170 km/h", consumption: "6.5L/100km", features: F_ECO, colors: [["Bạc kim", ["/images/cars/mercedes_gle_trang.png"]], ["Đen ánh", ["/images/cars/mercedes_benz_450.png"]], ["Nâu cà phê"]] },
  X008: { transmission: "Tự động 4 cấp", seats: 5, engine: "1.25L Kappa", power: "83 mã lực", torque: "120 Nm", acceleration: "13.8 giây", topSpeed: "161 km/h", consumption: "5.4L/100km", features: F_ECO, colors: [["Trắng ngọc trai", ["/images/cars/toyota_vios_2024_front_1787641127844.png"]], ["Đỏ Rosso", ["/images/cars/vios_do.png"]], ["Xanh mint"]] },
  X009: { fuel: "Điện", transmission: "1 cấp (xe điện)", seats: 7, engine: "2 mô-tơ điện", power: "402 mã lực", torque: "620 Nm", acceleration: "6.5 giây", topSpeed: "200 km/h", consumption: "26 kWh/100km", features: F_EV, colors: [["Xanh navy", ["/images/cars/mercedes_benz_450.png"]], ["Trắng ngọc trai", ["/images/cars/mercedes_gle_trang.png"]], ["Đen ánh"]] },
  X010: { transmission: "Tự động CVT", seats: 5, engine: "1.5L Dual VVT-i", power: "107 mã lực", torque: "140 Nm", acceleration: "11.2 giây", topSpeed: "175 km/h", consumption: "5.5L/100km", features: F_ECO, colors: [["Vàng cát"], ["Đỏ Rosso", ["/images/cars/vios_do.png"]], ["Bạc kim"]] },
  X011: { transmission: "Tự động 6 cấp", seats: 5, engine: "1.4L MPI", power: "100 mã lực", torque: "132 Nm", acceleration: "12.0 giây", topSpeed: "180 km/h", consumption: "5.6L/100km", features: F_ECO, colors: [["Đen ánh", ["/images/cars/bmw_530i_den.png"]], ["Trắng ngọc trai", ["/images/cars/bmw_530i.png"]], ["Đỏ đô"]] },
  X012: { transmission: "Tự động 6 cấp", seats: 5, engine: "1.5L SkyActiv-G", power: "121 mã lực", torque: "153 Nm", acceleration: "10.9 giây", topSpeed: "190 km/h", consumption: "5.9L/100km", features: F_MID, colors: [["Đỏ Rosso", ["/images/cars/mazda_6_do.png"]], ["Xám lông chuột", ["/images/cars/mazda_6_xam.png"]], ["Xanh dương"]] },
  X013: { transmission: "Tự động 7 cấp ly hợp kép", seats: 5, engine: "1.4L T-GDI Turbo", power: "138 mã lực", torque: "242 Nm", acceleration: "9.6 giây", topSpeed: "185 km/h", consumption: "6.4L/100km", features: F_MID, colors: [["Trắng nóc đen", ["/images/cars/porsche_trang.png"]], ["Đen ánh", ["/images/cars/porsche_cayenne.png"]], ["Cam năng lượng"]] },
  X014: { fuel: "Dầu", transmission: "Tự động 10 cấp", seats: 7, engine: "2.0L Bi-Turbo Diesel", power: "207 mã lực", torque: "500 Nm", acceleration: "10.9 giây", topSpeed: "180 km/h", consumption: "7.6L/100km", features: F_MID, colors: [["Đen ánh", ["/images/cars/bentley_den.png"]], ["Bạc kim", ["/images/cars/bentley_gt.png"]], ["Xanh navy"]] },
  X015: { fuel: "Dầu", transmission: "Tự động 6 cấp", seats: 7, engine: "2.4L Turbo Diesel", power: "148 mã lực", torque: "400 Nm", acceleration: "12.0 giây", topSpeed: "175 km/h", consumption: "8.0L/100km", features: F_MID, colors: [["Bạc kim", ["/images/cars/porsche_cayenne.png"]], ["Trắng ngọc trai", ["/images/cars/porsche_trang.png"]], ["Nâu cà phê"]] },
  X016: { fuel: "Điện", transmission: "1 cấp (xe điện)", seats: 5, engine: "1 mô-tơ điện", power: "201 mã lực", torque: "310 Nm", acceleration: "8.9 giây", topSpeed: "160 km/h", consumption: "17 kWh/100km", features: F_EV, colors: [["Xám titan", ["/images/cars/mazda6_2024_back.png"]], ["Đỏ đô", ["/images/cars/mazda_6_do.png"]], ["Xanh ngọc"]] },
  X017: { transmission: "Tự động CVT", seats: 7, engine: "1.5L VTEC Turbo", power: "188 mã lực", torque: "240 Nm", acceleration: "9.5 giây", topSpeed: "195 km/h", consumption: "6.9L/100km", features: F_MID, colors: [["Trắng ngọc trai", ["/images/cars/mercedes_gle_trang.png"]], ["Đen ánh", ["/images/cars/mercedes_benz_450.png"]], ["Xám lông chuột"]] },
  X018: { transmission: "Tự động 6 cấp", seats: 5, engine: "2.0L Nu MPI", power: "154 mã lực", torque: "192 Nm", acceleration: "11.2 giây", topSpeed: "185 km/h", consumption: "7.0L/100km", features: F_MID, colors: [["Đỏ Rosso", ["/images/cars/bentley_gt.png"]], ["Đen ánh", ["/images/cars/bentley_den.png"]], ["Bạc kim"]] },
  X019: { transmission: "Tự động 4 cấp", seats: 7, engine: "1.5L K15B", power: "104 mã lực", torque: "138 Nm", acceleration: "13.0 giây", topSpeed: "170 km/h", consumption: "6.8L/100km", features: F_ECO, colors: [["Nâu cà phê", ["/images/cars/mercedes_benz_450.png"]], ["Trắng ngọc trai", ["/images/cars/mercedes_gle_trang.png"]], ["Xám titan"]] },
  X020: { fuel: "Điện", transmission: "1 cấp (xe điện)", seats: 5, engine: "1 mô-tơ điện", power: "134 mã lực", torque: "135 Nm", acceleration: "10.0 giây", topSpeed: "150 km/h", consumption: "14 kWh/100km", features: F_EV, colors: [["Xanh dương", ["/images/cars/toyota-vios-right.png"]], ["Đỏ Rosso", ["/images/cars/vios_do.png"]], ["Trắng ngọc trai"]] },
  X021: { fuel: "Hybrid (Xăng + Điện)", transmission: "Tự động CVT", seats: 7, engine: "2.0L Hybrid", power: "184 mã lực", torque: "188 Nm", acceleration: "9.8 giây", topSpeed: "180 km/h", consumption: "5.0L/100km", features: F_MID, colors: [["Trắng ngọc trai", ["/images/cars/mercedes_gle_trang.png"]], ["Bạc kim", ["/images/cars/mercedes_benz_450.png"]], ["Đen ánh"]] },
  X022: { fuel: "Dầu", transmission: "Tự động 8 cấp", seats: 7, engine: "2.2L CRDi Diesel", power: "199 mã lực", torque: "440 Nm", acceleration: "9.4 giây", topSpeed: "190 km/h", consumption: "7.3L/100km", features: F_LUX, colors: [["Đen ánh", ["/images/cars/bentley_den.png"]], ["Trắng ngọc trai", ["/images/cars/bentley_gt.png"]], ["Xám titan"]] },
  X023: { transmission: "Tự động 8 cấp Steptronic", seats: 5, engine: "2.0L TwinPower Turbo", power: "184 mã lực", torque: "300 Nm", acceleration: "7.1 giây", topSpeed: "235 km/h", consumption: "6.3L/100km", features: F_LUX, colors: [["Trắng ngọc trai", ["/images/cars/bmw_530i.png"]], ["Đen ánh", ["/images/cars/bmw_530i_den.png"]], ["Xanh navy"]] },
  X024: { fuel: "Mild Hybrid (Xăng)", transmission: "Tự động 9G-TRONIC", seats: 5, engine: "1.5L Turbo + EQ Boost", power: "204 mã lực", torque: "300 Nm", acceleration: "7.3 giây", topSpeed: "246 km/h", consumption: "6.6L/100km", features: F_LUX, colors: [["Đen ánh", ["/images/cars/mercedes_benz_450.png"]], ["Trắng ngọc trai", ["/images/cars/mercedes_gle_trang.png"]], ["Bạc kim"]] },
  X025: { transmission: "Tự động 7 cấp ly hợp kép", seats: 7, engine: "1.5L T-GDi Turbo", power: "170 mã lực", torque: "253 Nm", acceleration: "10.5 giây", topSpeed: "180 km/h", consumption: "7.0L/100km", features: F_MID, colors: [["Bạc kim", ["/images/cars/porsche_trang.png"]], ["Đen ánh", ["/images/cars/porsche_cayenne.png"]], ["Nâu cà phê"]] },
  X026: { transmission: "Tự động 6 cấp", seats: 5, engine: "2.0L SkyActiv-G", power: "153 mã lực", torque: "200 Nm", acceleration: "10.6 giây", topSpeed: "195 km/h", consumption: "6.8L/100km", features: F_MID, colors: [["Trắng ngọc trai", ["/images/cars/mazda6_2024_front.png", "/images/cars/mazda6_2024_back.png", "/images/cars/mazda6_2024_interior.png"]], ["Đỏ Rosso", ["/images/cars/mazda_6_do.png"]], ["Xám lông chuột", ["/images/cars/mazda_6_xam.png"]]] },
  X027: { transmission: "Tự động 7 cấp ly hợp kép", seats: 5, engine: "1.5L EcoBoost Turbo", power: "158 mã lực", torque: "243 Nm", acceleration: "10.0 giây", topSpeed: "190 km/h", consumption: "7.0L/100km", features: F_MID, colors: [["Trắng ngọc trai", ["/images/cars/porsche_trang.png"]], ["Đen ánh", ["/images/cars/porsche_cayenne.png"]], ["Xanh rêu"]] },
  X028: { transmission: "Tự động CVT", seats: 5, engine: "1.0L Turbo", power: "98 mã lực", torque: "140 Nm", acceleration: "11.5 giây", topSpeed: "170 km/h", consumption: "5.3L/100km", features: F_ECO, colors: [["Đỏ nóc đen", ["/images/cars/honda_city_2024_right.png"]], ["Trắng ngọc trai", ["/images/cars/honda_city_trang.png"]], ["Vàng gold"]] },
  X029: { transmission: "Tự động CVT", seats: 5, engine: "1.5L VTEC Turbo", power: "178 mã lực", torque: "240 Nm", acceleration: "8.2 giây", topSpeed: "200 km/h", consumption: "6.2L/100km", features: F_MID, colors: [["Xám lông chuột", ["/images/cars/honda_city_2024_front.png"]], ["Trắng ngọc trai", ["/images/cars/honda_city_trang.png"]], ["Đỏ đô"]] },
  X030: { fuel: "Điện", transmission: "1 cấp (xe điện)", seats: 5, engine: "2 mô-tơ điện", power: "348 mã lực", torque: "500 Nm", acceleration: "5.8 giây", topSpeed: "180 km/h", consumption: "19 kWh/100km", features: F_EV, colors: [["Xanh ngọc", ["/images/cars/porsche_trang.png"]], ["Đen ánh", ["/images/cars/porsche_cayenne.png"]], ["Cam năng lượng"]] },

  XM001: { transmission: "Tự động (CVT)", seats: 2, engine: "110cc eSP", power: "8.9 mã lực", torque: "9.3 Nm", acceleration: "—", topSpeed: "85 km/h", consumption: "1.8L/100km", features: F_MOTO, colors: [["Đen nhám", ["/images/motobike/airblade_den.png"]], ["Xám bạc", ["/images/motobike/airblade_bac.png"]], ["Đỏ đấu"]] },
  XM002: { transmission: "Tự động (CVT)", seats: 2, engine: "160cc eSP+", power: "15.5 mã lực", torque: "15 Nm", acceleration: "—", topSpeed: "110 km/h", consumption: "2.1L/100km", features: F_MOTO, colors: [["Trắng ngà", ["/images/motobike/sh_trang.png"]], ["Đỏ đấu", ["/images/motobike/sh_do.png"]], ["Đen bóng"]] },
  XM003: { transmission: "Tự động (CVT)", seats: 2, engine: "125cc Blue Core Hybrid", power: "9.0 mã lực", torque: "10.4 Nm", acceleration: "—", topSpeed: "95 km/h", consumption: "1.7L/100km", features: F_MOTO, colors: [["Cam đen", ["/images/motobike/nvx_cam.png"]], ["Xám thể thao", ["/images/motobike/nvx_xam.png"]], ["Nâu cà phê"]] },
  XM004: { transmission: "Tự động (CVT)", seats: 2, engine: "160cc eSP+", power: "15.0 mã lực", torque: "13.8 Nm", acceleration: "—", topSpeed: "108 km/h", consumption: "2.0L/100km", features: F_MOTO, colors: [["Xám bạc", ["/images/motobike/airblade_bac.png"]], ["Đen nhám", ["/images/motobike/airblade_den.png"]], ["Xanh dương đậm"]] },
  XM005: { transmission: "Côn tay 6 cấp", seats: 2, engine: "155cc VVA", power: "17.7 mã lực", torque: "14.4 Nm", acceleration: "—", topSpeed: "120 km/h", consumption: "2.1L/100km", features: F_MOTO, colors: [["Xanh GP", ["/images/motobike/ex_xanh.png"]], ["Đen bóng", ["/images/motobike/ex_den.png"]], ["Đỏ nhám"]] },
  XM006: { transmission: "Côn tay 6 cấp", seats: 2, engine: "150cc DOHC", power: "15.8 mã lực", torque: "13.5 Nm", acceleration: "—", topSpeed: "115 km/h", consumption: "2.0L/100km", features: F_MOTO, colors: [["Đỏ đen", ["/images/motobike/ex_den.png"]], ["Xanh xám", ["/images/motobike/ex_xanh.png"]], ["Đen nhám"]] },
  XM007: { transmission: "Số sàn 4 cấp", seats: 2, engine: "110cc", power: "8.4 mã lực", torque: "8.7 Nm", acceleration: "—", topSpeed: "90 km/h", consumption: "1.5L/100km", features: F_MOTO, colors: [["Xanh nhớt", ["/images/motobike/wave_xanh.png"]], ["Đỏ đấu", ["/images/motobike/wave_do.png"]], ["Trắng bạc", ["/images/motobike/wave_trang.png"]]] },
  XM008: { transmission: "Số sàn 4 cấp", seats: 2, engine: "115cc", power: "9.0 mã lực", torque: "9.5 Nm", acceleration: "—", topSpeed: "95 km/h", consumption: "1.65L/100km", features: F_MOTO, colors: [["Trắng bạc", ["/images/motobike/wave_trang.png"]], ["Đỏ nhám", ["/images/motobike/wave_do.png"]], ["Xanh dương đậm"]] },
  XM009: { fuel: "Điện", transmission: "Tự động", seats: 2, engine: "Mô-tơ điện 3.0 kW", power: "~4 mã lực", torque: "110 Nm (tại bánh)", acceleration: "—", topSpeed: "70 km/h", consumption: "1.5 kWh/100km", features: F_MOTO, colors: [["Vàng nâu", ["/images/motobike/vinfast_vang.png"]], ["Trắng ngà", ["/images/motobike/vinfast_trang.png"]], ["Xám thể thao"]] },
  XM010: { fuel: "Điện", transmission: "Tự động", seats: 2, engine: "Mô-tơ điện 3.5 kW", power: "~4.7 mã lực", torque: "120 Nm (tại bánh)", acceleration: "—", topSpeed: "78 km/h", consumption: "1.6 kWh/100km", features: F_MOTO, colors: [["Trắng ngà", ["/images/motobike/vinfast_trang.png"]], ["Vàng cát", ["/images/motobike/vinfast_vang.png"]], ["Xanh rêu"]] },
};

for (const c of cars as any[]) {
  const s = CAR_SPECS[c.id];
  if (!s) continue;
  if (s.fuel) c.fuel = s.fuel;
  c.transmission = s.transmission;
  c.seats = s.seats;
  c.engine = s.engine;
  c.power = s.power;
  c.torque = s.torque;
  c.acceleration = s.acceleration;
  c.topSpeed = s.topSpeed;
  c.consumption = s.consumption;
  c.features = s.features;
  c.colors = s.colors.map(([name, imgs]): CarColor => ({
    name,
    hex: COLOR_HEX[name] || "#6b7280",
    images: imgs && imgs.length ? imgs : c.images,
  }));
  c.color = c.colors[0].name;
  c.image = c.colors[0].images[0] || c.image;
}

/* =========================================================================
 *  Trộn dữ liệu xe từ API (/api/cars → bảng `xe`) với dữ liệu tĩnh ở trên.
 *  - Xe có sẵn trong file này: lấy thông số/màu/ảnh từ đây, còn giá / tồn
 *    kho / tên / mô tả thì ưu tiên bản mới nhất trong CSDL.
 *  - Xe mới do admin thêm (chưa có trong file): sinh khung mặc định.
 * ========================================================================= */

interface DbCar {
  id: string;
  name: string;
  type: string;
  phanLoai?: string;
  color: string;
  plate?: string;
  status: string;
  rentPriceDay: number;
  deposit: number;
  image: string | null;
  description: string | null;
}

const FALLBACK_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='100%25' height='100%25' fill='%231a1a1d'/%3E%3Ctext x='50%25' y='50%25' fill='%23999' font-family='sans-serif' font-size='42' text-anchor='middle' dominant-baseline='middle'%3EK%26T Car%3C/text%3E%3C/svg%3E";

export function mergeDbCars(dbCars: DbCar[]): any[] {
  return dbCars.map((db) => {
    const available = db.status === "Sẵn sàng";
    const seed = (cars as any[]).find((c) => c.id === db.id);
    if (seed) {
      return {
        ...seed,
        name: db.name || seed.name,
        rentPriceDay: Number(db.rentPriceDay) || seed.rentPriceDay,
        deposit: Number(db.deposit) || seed.deposit,
        description: db.description || seed.description,
        color: db.color || seed.color,
        available,
      };
    }

    const img = db.image || FALLBACK_IMG;
    const t = (db.type || "").toLowerCase();
    // Ưu tiên phân loại admin chọn (cột PHANLOAI); nếu thiếu thì đoán từ "loại xe".
    const carHint = /chỗ|sedan|suv|mpv|cuv|hatchback|bán tải|coupe|ô ?tô|crossover|pickup/.test(t);
    const motoHint = /xe ga|xe số|xe điện|xe máy|scooter|manual|electric|mô ?tô|tay ga|côn tay/.test(t);
    const isMoto =
      db.phanLoai === "xemay" ? true : db.phanLoai === "oto" ? false : motoHint && !carHint;
    const parts = (db.name || "").trim().split(/\s+/);
    return {
      id: db.id,
      name: db.name || db.id,
      vehicleType: isMoto ? "motorbike" : "car",
      brand: parts[0] || "Khác",
      model: parts.slice(1).join(" ") || (db.name || db.id),
      year: 2024,
      category: isMoto
        ? /điện|electric/.test(t)
          ? "electric"
          : /số|manual|côn tay/.test(t)
            ? "manual"
            : "scooter"
        : /suv|cuv|crossover|offroad|địa hình|gầm cao|bán tải|pickup|7 chỗ/.test(t)
          ? "suv"
          : "sedan",
      rentPriceDay: Number(db.rentPriceDay) || 0,
      deposit: Number(db.deposit) || 0,
      image: img,
      images: [img],
      color: db.color || "Tiêu chuẩn",
      colors: [{ name: db.color || "Tiêu chuẩn", hex: "#6b7280", images: [img] }],
      fuel: "Xăng",
      transmission: "Tự động",
      seats: isMoto ? 2 : 5,
      engine: "—",
      power: "—",
      torque: "—",
      acceleration: "—",
      topSpeed: "—",
      consumption: "—",
      description: db.description || "Xe mới cập nhật, thông số đang chờ bổ sung.",
      features: [],
      available,
    };
  });
}

/** Gọi API danh mục xe; trả về danh sách đã trộn, hoặc mảng tĩnh nếu API lỗi. */
export async function fetchCars(): Promise<any[]> {
  try {
    const res = await fetch("/api/cars");
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    const list = Array.isArray(data?.cars) ? data.cars : [];
    return list.length ? mergeDbCars(list) : (cars as any[]);
  } catch {
    return cars as any[];
  }
}
