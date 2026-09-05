const fs = require('fs');
const path = require('path');
const https = require('https');

function downloadImage(url, dest) {
  if (fs.existsSync(dest)) return Promise.resolve(dest);
  
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        downloadImage(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error("Failed to download " + url + ": " + response.statusCode));
        return;
      }
      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(dest);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const carsData = [
  // Existing 9 Cars
  {
    id: "toyota-vios-2024",
    name: "Toyota Vios 2024", brand: "Toyota", model: "Vios", year: 2024,
    vehicleType: "car", category: "economy", rentPriceDay: 800000, deposit: 5000000,
    fuel: "Xăng", transmission: "Tự động CVT", seats: 5, engine: "1.5L Dual VVT-i",
    power: "106 mã lực", torque: "140 Nm", acceleration: "11.0s", topSpeed: "170 km/h", consumption: "5.8L/100km",
    description: "Toyota Vios 2024 mang đến thiết kế hoàn toàn mới, trẻ trung và góc cạnh hơn. Xe được trang bị hệ thống an toàn TSS, màn hình giải trí 9 inch hỗ trợ Apple CarPlay/Android Auto. Không gian rộng rãi, tiết kiệm nhiên liệu, là lựa chọn số 1 cho gia đình và công việc.",
    features: ["Cảnh báo tiền va chạm", "Cảnh báo lệch làn", "Màn hình 9-inch", "Điều hòa tự động", "Camera lùi"],
    available: true,
    colorVariants: [
      { name: "Trắng", hex: "#ffffff", query: "white toyota sedan" },
      { name: "Đỏ", hex: "#ff0000", query: "red toyota car" },
    ]
  },
  {
    id: "honda-city-2024",
    name: "Honda City 2024", brand: "Honda", model: "City", year: 2024,
    vehicleType: "car", category: "sedan", rentPriceDay: 900000, deposit: 6000000,
    fuel: "Xăng", transmission: "Tự động CVT", seats: 5, engine: "1.5L i-VTEC",
    power: "119 mã lực", torque: "145 Nm", acceleration: "10.5s", topSpeed: "180 km/h", consumption: "5.6L/100km",
    description: "Honda City RS sở hữu kiểu dáng thể thao, động cơ mạnh mẽ nhất phân khúc. Tích hợp gói an toàn Honda SENSING, lẫy chuyển số trên vô lăng mang lại cảm giác lái phấn khích.",
    features: ["Honda SENSING", "Đề nổ từ xa", "Lẫy chuyển số", "Màn hình 8-inch", "Cửa gió điều hòa sau"],
    available: true,
    colorVariants: [
      { name: "Đỏ", hex: "#cc0000", query: "red honda city sedan" },
      { name: "Trắng", hex: "#ffffff", query: "white honda sedan" }
    ]
  },
  {
    id: "mazda6-2024",
    name: "Mazda6 2024", brand: "Mazda", model: "6", year: 2024,
    vehicleType: "car", category: "sedan", rentPriceDay: 1200000, deposit: 10000000,
    fuel: "Xăng", transmission: "Tự động 6 cấp", seats: 5, engine: "2.0L SkyActiv-G",
    power: "154 mã lực", torque: "200 Nm", acceleration: "9.5s", topSpeed: "210 km/h", consumption: "6.5L/100km",
    description: "Mazda6 mang ngôn ngữ thiết kế KODO tinh tế và sang trọng. Nội thất bọc da Nappa cao cấp, hệ thống 11 loa Bose và gói an toàn i-Activsense mang đến trải nghiệm đẳng cấp.",
    features: ["Da Nappa", "11 Loa Bose", "i-Activsense", "HUD", "Cửa sổ trời"],
    available: true,
    colorVariants: [
      { name: "Đỏ Pha Lê", hex: "#a30000", query: "red mazda 6" },
      { name: "Xám", hex: "#555555", query: "grey mazda sedan" }
    ]
  },
  {
    id: "bmw-530i-2024",
    name: "BMW 530i M Sport", brand: "BMW", model: "530i", year: 2024,
    vehicleType: "car", category: "luxury", rentPriceDay: 3500000, deposit: 30000000,
    fuel: "Xăng lai điện (Mild Hybrid)", transmission: "Tự động 8 cấp Steptronic", seats: 5, engine: "2.0L TwinPower Turbo",
    power: "252 mã lực", torque: "350 Nm", acceleration: "6.4s", topSpeed: "250 km/h", consumption: "6.3L/100km",
    description: "BMW 530i M Sport là biểu tượng của sự kết hợp hoàn hảo giữa thể thao và sang trọng. Sở hữu thiết kế góc cạnh, lưới tản nhiệt Iconic Glow phát sáng, nội thất pha lê tinh xảo và công nghệ tự lái tiên tiến.",
    features: ["M Sport Package", "Lưới tản nhiệt phát sáng", "Nội thất Pha lê CraftedClarity", "Harman Kardon 16 loa", "Hỗ trợ đỗ xe tự động 3D"],
    available: true,
    colorVariants: [
      { name: "Đen", hex: "#000000", query: "black bmw 5 series" },
      { name: "Trắng", hex: "#ffffff", query: "white bmw sedan" }
    ]
  },
  {
    id: "mercedes-gle450-2024",
    name: "Mercedes-Benz GLE 450", brand: "Mercedes-Benz", model: "GLE", year: 2024,
    vehicleType: "car", category: "suv", rentPriceDay: 4000000, deposit: 40000000,
    fuel: "Xăng lai điện (EQ Boost)", transmission: "Tự động 9 cấp 9G-TRONIC", seats: 7, engine: "3.0L I6 Turbo",
    power: "367 (+22) mã lực", torque: "500 Nm", acceleration: "5.7s", topSpeed: "250 km/h", consumption: "9.2L/100km",
    description: "Chiếc SUV hạng sang cỡ trung mạnh mẽ với thiết kế bề thế, cụm đèn MULTIBEAM LED thông minh. Không gian 7 chỗ rộng rãi, hệ thống treo khí nén AIRMATIC êm ái như thảm bay.",
    features: ["Hệ dẫn động 4MATIC", "Treo khí nén AIRMATIC", "Loa Burmester 13 loa", "MBUX 2.0", "Massage ghế trước"],
    available: true,
    colorVariants: [
      { name: "Trắng Xương", hex: "#f0f0f0", query: "white mercedes gle suv" },
      { name: "Đen", hex: "#111111", query: "black mercedes suv" }
    ]
  },
  {
    id: "porsche-cayenne-s-2024",
    name: "Porsche Cayenne S", brand: "Porsche", model: "Cayenne", year: 2024,
    vehicleType: "car", category: "luxury", rentPriceDay: 6000000, deposit: 80000000,
    fuel: "Xăng", transmission: "Tự động 8 cấp Tiptronic S", seats: 5, engine: "4.0L V8 Twin-Turbo",
    power: "474 mã lực", torque: "600 Nm", acceleration: "4.7s", topSpeed: "273 km/h", consumption: "12.4L/100km",
    description: "Cayenne S 2024 đánh dấu sự trở lại của động cơ V8 mạnh mẽ. Một chiếc SUV thể thao thực thụ với khoang lái Porsche Driver Experience kỹ thuật số, mang lại cảm giác lái mãnh liệt nhưng vẫn vô cùng sang trọng.",
    features: ["Động cơ V8", "Màn hình hành khách 10.9-inch", "Đèn HD Matrix LED", "Sport Chrono", "Hệ thống treo PASM"],
    available: true,
    colorVariants: [
      { name: "Xám Ánh Kim", hex: "#666666", query: "grey porsche cayenne" },
      { name: "Trắng", hex: "#ffffff", query: "white porsche suv" }
    ]
  },
  {
    id: "ferrari-488-gtb",
    name: "Ferrari 488 GTB", brand: "Ferrari", model: "488", year: 2022,
    vehicleType: "car", category: "supercar", rentPriceDay: 25000000, deposit: 300000000,
    fuel: "Xăng", transmission: "Tự động 7 cấp ly hợp kép", seats: 2, engine: "3.9L V8 Twin-Turbo",
    power: "670 mã lực", torque: "760 Nm", acceleration: "3.0s", topSpeed: "330 km/h", consumption: "11.4L/100km",
    description: "Biểu tượng siêu xe thể thao Ý với động cơ V8 đặt giữa. Ferrari 488 GTB sở hữu tính khí động học hoàn hảo, âm thanh ống xả rền vang và khả năng tăng tốc bứt phá làm say đắm bất kỳ tay lái nào.",
    features: ["Khí động học chủ động", "Phanh gốm Carbon", "Side Slip Control 2", "Vô lăng carbon LED", "Ghế đua Daytona"],
    available: true,
    colorVariants: [
      { name: "Đỏ Rosso Corsa", hex: "#cc0000", query: "red ferrari 488" },
      { name: "Vàng", hex: "#ffcc00", query: "yellow ferrari" }
    ]
  },
  {
    id: "lamborghini-huracan-evo",
    name: "Lamborghini Huracán EVO", brand: "Lamborghini", model: "Huracan", year: 2023,
    vehicleType: "car", category: "supercar", rentPriceDay: 30000000, deposit: 400000000,
    fuel: "Xăng", transmission: "Tự động 7 cấp LDF", seats: 2, engine: "5.2L V10 Hút khí tự nhiên",
    power: "640 mã lực", torque: "600 Nm", acceleration: "2.9s", topSpeed: "325 km/h", consumption: "13.7L/100km",
    description: "Siêu bò Huracán EVO giữ lại khối động cơ V10 hút khí tự nhiên danh tiếng, kết hợp hệ thống đánh lái 4 bánh và hệ thống khí động học ALA, tạo ra một cỗ máy đường phố hoang dã và đầy phấn khích.",
    features: ["Động cơ V10 NA", "LDVI (Hệ thống điều khiển động học)", "Đánh lái 4 bánh", "Nội thất Alcantara", "Chế độ lái Corsa"],
    available: true,
    colorVariants: [
      { name: "Xanh Mantis", hex: "#00ff00", query: "green lamborghini huracan" },
      { name: "Cam", hex: "#ff6600", query: "orange lamborghini" }
    ]
  },
  {
    id: "bentley-continental-gt",
    name: "Bentley Continental GT", brand: "Bentley", model: "Continental", year: 2023,
    vehicleType: "car", category: "luxury", rentPriceDay: 20000000, deposit: 250000000,
    fuel: "Xăng", transmission: "Tự động 8 cấp ly hợp kép", seats: 4, engine: "4.0L V8 Twin-Turbo",
    power: "542 mã lực", torque: "770 Nm", acceleration: "4.0s", topSpeed: "318 km/h", consumption: "11.3L/100km",
    description: "Đỉnh cao của dòng xe Grand Tourer. Bentley Continental GT kết hợp hoàn hảo giữa hiệu suất của một siêu xe và sự sang trọng tột bậc của một chiếc xe siêu sang, với khoang cabin ốp gỗ và da thủ công.",
    features: ["Màn hình xoay Bentley Rotating Display", "Naim for Bentley 2200W", "Da bò đực Bắc Âu", "Đèn pha pha lê", "Treo khí nén 3 buồng"],
    available: true,
    colorVariants: [
      { name: "Đen Onyx", hex: "#0a0a0a", query: "black bentley continental" },
      { name: "Trắng Băng", hex: "#f0f8ff", query: "white bentley continental" }
    ]
  },
  // 10 NEW MOTORBIKES
  {
    id: "honda-wave-alpha",
    name: "Honda Wave Alpha", brand: "Honda", model: "Wave Alpha", year: 2024,
    vehicleType: "motorbike", category: "manual", rentPriceDay: 150000, deposit: 1000000,
    fuel: "Xăng", transmission: "Số tròn 4 cấp", seats: 2, engine: "110cc",
    power: "8.2 mã lực", torque: "8.4 Nm", acceleration: "N/A", topSpeed: "90 km/h", consumption: "1.9L/100km",
    description: "Dòng xe số quốc dân, bền bỉ, tiết kiệm nhiên liệu, phù hợp đi lại hàng ngày trong phố.",
    features: ["Khóa cơ", "Đèn Halogen", "Cốp nhỏ"],
    available: true,
    colorVariants: [
      { name: "Trắng", hex: "#ffffff", query: "white honda wave alpha" },
      { name: "Đỏ", hex: "#cc0000", query: "red honda wave alpha" },
      { name: "Xanh", hex: "#0000ff", query: "blue honda wave alpha" }
    ]
  },
  {
    id: "honda-air-blade-125",
    name: "Honda Air Blade 125", brand: "Honda", model: "Air Blade", year: 2024,
    vehicleType: "motorbike", category: "scooter", rentPriceDay: 200000, deposit: 2000000,
    fuel: "Xăng", transmission: "Vô cấp CVT", seats: 2, engine: "125cc eSP+",
    power: "11.9 mã lực", torque: "11.3 Nm", acceleration: "N/A", topSpeed: "100 km/h", consumption: "2.26L/100km",
    description: "Mẫu xe tay ga thể thao bán chạy nhất của Honda, trang bị động cơ eSP+ mượt mà và khóa thông minh Smartkey.",
    features: ["Khóa Smartkey", "Đèn LED", "Cổng sạc USB", "Cốp rộng 22.7L"],
    available: true,
    colorVariants: [
      { name: "Đen", hex: "#000000", query: "black honda air blade" },
      { name: "Bạc", hex: "#c0c0c0", query: "silver honda air blade" }
    ]
  },
  {
    id: "vinfast-evo200",
    name: "VinFast Evo200", brand: "VinFast", model: "Evo200", year: 2024,
    vehicleType: "motorbike", category: "electric", rentPriceDay: 180000, deposit: 2000000,
    fuel: "Điện", transmission: "Tự động", seats: 2, engine: "Pin LFP 3.5 kWh",
    power: "2500W", torque: "N/A", acceleration: "N/A", topSpeed: "70 km/h", consumption: "205 km/lần sạc",
    description: "Xe máy điện thông minh, kiểu dáng thanh lịch Châu Âu, quãng đường di chuyển xa lên đến 205km.",
    features: ["Đèn LED", "Pin LFP", "Kết nối App VinFast", "Chống nước IP67"],
    available: true,
    colorVariants: [
      { name: "Vàng", hex: "#ffcc00", query: "yellow vinfast evo200" },
      { name: "Trắng", hex: "#ffffff", query: "white vinfast evo200" }
    ]
  },
  {
    id: "honda-sh-150i",
    name: "Honda SH 150i", brand: "Honda", model: "SH", year: 2024,
    vehicleType: "motorbike", category: "scooter", rentPriceDay: 350000, deposit: 10000000,
    fuel: "Xăng", transmission: "Vô cấp CVT", seats: 2, engine: "150cc eSP+",
    power: "16.6 mã lực", torque: "14.8 Nm", acceleration: "N/A", topSpeed: "115 km/h", consumption: "2.24L/100km",
    description: "Biểu tượng xe tay ga cao cấp tại Việt Nam, sang trọng, đẳng cấp với phanh ABS an toàn.",
    features: ["Phanh ABS", "Kết nối Bluetooth", "Smartkey", "Đèn full LED"],
    available: true,
    colorVariants: [
      { name: "Trắng", hex: "#ffffff", query: "white honda sh" },
      { name: "Đỏ", hex: "#cc0000", query: "red honda sh" }
    ]
  },
  {
    id: "yamaha-exciter-155",
    name: "Yamaha Exciter 155 VVA", brand: "Yamaha", model: "Exciter", year: 2024,
    vehicleType: "motorbike", category: "manual", rentPriceDay: 250000, deposit: 3000000,
    fuel: "Xăng", transmission: "Côn tay 6 cấp", seats: 2, engine: "155cc VVA",
    power: "17.7 mã lực", torque: "14.4 Nm", acceleration: "N/A", topSpeed: "125 km/h", consumption: "2.09L/100km",
    description: "Vua đường phố, thiết kế thể thao underbone, khối động cơ VVA mạnh mẽ, côn tay 6 cấp phấn khích.",
    features: ["Van biến thiên VVA", "Khóa Smartkey", "Ly hợp chống trượt Slipper Clutch", "Cổng sạc 12V"],
    available: true,
    colorVariants: [
      { name: "Xanh GP", hex: "#0000cc", query: "blue yamaha exciter" },
      { name: "Đen", hex: "#000000", query: "black yamaha exciter" }
    ]
  },
  {
    id: "yamaha-nvx-155",
    name: "Yamaha NVX 155 VVA", brand: "Yamaha", model: "NVX", year: 2024,
    vehicleType: "motorbike", category: "scooter", rentPriceDay: 220000, deposit: 3000000,
    fuel: "Xăng", transmission: "Vô cấp CVT", seats: 2, engine: "155cc VVA",
    power: "15.4 mã lực", torque: "13.9 Nm", acceleration: "N/A", topSpeed: "115 km/h", consumption: "2.19L/100km",
    description: "Maxi-scooter nam tính, cốp siêu rộng 25L, ứng dụng Y-Connect kết nối điện thoại.",
    features: ["Y-Connect", "Phanh ABS", "Khóa Smartkey", "Màn hình LCD"],
    available: true,
    colorVariants: [
      { name: "Cam", hex: "#ff6600", query: "orange yamaha nvx" },
      { name: "Xám", hex: "#888888", query: "grey yamaha nvx" }
    ]
  },
  {
    id: "honda-vision",
    name: "Honda Vision", brand: "Honda", model: "Vision", year: 2024,
    vehicleType: "motorbike", category: "scooter", rentPriceDay: 180000, deposit: 2000000,
    fuel: "Xăng", transmission: "Vô cấp CVT", seats: 2, engine: "110cc eSP",
    power: "8.8 mã lực", torque: "9.2 Nm", acceleration: "N/A", topSpeed: "95 km/h", consumption: "1.85L/100km",
    description: "Mẫu xe tay ga nhỏ gọn, nhẹ nhàng, bán chạy nhất Việt Nam, phù hợp với phái nữ.",
    features: ["Khóa Smartkey", "Idling Stop", "Khung dập hàn laser eSAF", "Cốp 16L"],
    available: true,
    colorVariants: [
      { name: "Đỏ", hex: "#cc0000", query: "red honda vision" },
      { name: "Xanh Nhám", hex: "#003366", query: "blue honda vision" }
    ]
  },
  {
    id: "vinfast-feliz-s",
    name: "VinFast Feliz S", brand: "VinFast", model: "Feliz S", year: 2024,
    vehicleType: "motorbike", category: "electric", rentPriceDay: 190000, deposit: 2000000,
    fuel: "Điện", transmission: "Tự động", seats: 2, engine: "Pin LFP",
    power: "3000W", torque: "N/A", acceleration: "N/A", topSpeed: "78 km/h", consumption: "198 km/lần sạc",
    description: "Xe máy điện với cốp rộng 25L, khả năng leo dốc tốt, động cơ mạnh mẽ.",
    features: ["Pin LFP", "Cốp 25L", "Chống nước IP67", "Khóa từ"],
    available: true,
    colorVariants: [
      { name: "Xanh Rêu", hex: "#4b5320", query: "green vinfast feliz" },
      { name: "Đen", hex: "#000000", query: "black vinfast feliz" }
    ]
  },
  {
    id: "piaggio-vespa-sprint",
    name: "Piaggio Vespa Sprint", brand: "Piaggio", model: "Vespa", year: 2024,
    vehicleType: "motorbike", category: "scooter", rentPriceDay: 300000, deposit: 5000000,
    fuel: "Xăng", transmission: "Vô cấp CVT", seats: 2, engine: "125cc i-get",
    power: "10.6 mã lực", torque: "10.4 Nm", acceleration: "N/A", topSpeed: "100 km/h", consumption: "2.5L/100km",
    description: "Vẻ đẹp vượt thời gian mang phong cách Ý, đèn pha vuông thể thao, động cơ i-get êm ái.",
    features: ["Phanh ABS", "Động cơ i-get", "Cổng sạc USB", "Đèn pha LED"],
    available: true,
    colorVariants: [
      { name: "Vàng", hex: "#ffcc00", query: "yellow vespa sprint" },
      { name: "Trắng", hex: "#ffffff", query: "white vespa sprint" }
    ]
  },
  {
    id: "honda-winner-x",
    name: "Honda Winner X", brand: "Honda", model: "Winner X", year: 2024,
    vehicleType: "motorbike", category: "manual", rentPriceDay: 230000, deposit: 3000000,
    fuel: "Xăng", transmission: "Côn tay 6 cấp", seats: 2, engine: "150cc DOHC",
    power: "15.4 mã lực", torque: "13.5 Nm", acceleration: "N/A", topSpeed: "120 km/h", consumption: "1.99L/100km",
    description: "Thiết kế khí động học sắc nét, động cơ DOHC 6 cấp số, trang bị phanh ABS an toàn tối đa.",
    features: ["Phanh ABS", "Động cơ DOHC", "Xích có phớt O-ring", "Khóa Smartkey"],
    available: true,
    colorVariants: [
      { name: "Đỏ Đen", hex: "#880000", query: "red honda winner x" },
      { name: "Xanh", hex: "#0000ff", query: "blue honda winner x" }
    ]
  }
];

async function generateDataAndImages() {
  const publicDir = path.join('d:', 'XayDungWeb', 'FINAL', 'public');
  const basePicDir = path.join(publicDir, 'Pictures');
  ensureDir(basePicDir);

  let finalCarsList = [];

  for (let c = 0; c < carsData.length; c++) {
    const car = carsData[c];
    const parentFolder = car.vehicleType === 'car' ? 'Cars' : 'Motorbike';
    const brandDir = path.join(basePicDir, parentFolder, car.brand);
    const modelStr = car.model.replace(/\s+/g, '_') + "_" + car.year;
    const modelDir = path.join(brandDir, modelStr);
    ensureDir(modelDir);

    let finalColors = [];
    let mainImageUrl = "";

    for (let i = 0; i < car.colorVariants.length; i++) {
      const cv = car.colorVariants[i];
      const encodedQuery = encodeURIComponent(cv.query);
      const url = "https://source.unsplash.com/1600x900/?" + encodedQuery + ",auto";
      const fileName = cv.name.replace(/\s+/g, '_').toLowerCase() + ".jpg";
      const dest = path.join(modelDir, fileName);
      
      console.log("Downloading " + cv.name + " for " + car.name + "...");
      
      try {
        await downloadImage(url, dest);
        const relativePath = "/Pictures/" + parentFolder + "/" + car.brand + "/" + modelStr + "/" + fileName;
        
        finalColors.push({
          name: cv.name,
          hex: cv.hex,
          images: [relativePath]
        });

        if (i === 0) mainImageUrl = relativePath;
      } catch (err) {
        console.error("Error downloading:", err.message);
        // Fallback
        const fallbackUrl = "https://via.placeholder.com/1600x900/" + cv.hex.replace('#','') + "/ffffff?text=" + encodeURIComponent(car.name);
        finalColors.push({
          name: cv.name,
          hex: cv.hex,
          images: [fallbackUrl]
        });
        if (i === 0) mainImageUrl = fallbackUrl;
      }
    }

    const finalCar = Object.assign({}, car);
    delete finalCar.colorVariants;
    finalCar.image = mainImageUrl;
    finalCar.colors = finalColors;
    
    finalCarsList.push(finalCar);
  }

  const tsContent = 'export type VehicleType = "car" | "motorbike";\n' +
'export type CarCategory = "economy" | "sedan" | "suv" | "luxury" | "supercar" | "scooter" | "manual" | "electric";\n\n' +
'export interface Car {\n' +
'  id: string;\n' +
'  name: string;\n' +
'  brand: string;\n' +
'  model: string;\n' +
'  year: number;\n' +
'  vehicleType: VehicleType;\n' +
'  category: CarCategory;\n' +
'  rentPriceDay: number;\n' +
'  deposit: number;\n' +
'  image: string;\n' +
'  colors: {\n' +
'    name: string;\n' +
'    hex: string;\n' +
'    images: string[];\n' +
'  }[];\n' +
'  fuel: string;\n' +
'  transmission: string;\n' +
'  seats: number;\n' +
'  engine: string;\n' +
'  power: string;\n' +
'  torque: string;\n' +
'  acceleration: string;\n' +
'  topSpeed: string;\n' +
'  consumption: string;\n' +
'  description: string;\n' +
'  features: string[];\n' +
'  available: boolean;\n' +
'}\n\n' +
'export const cars: Car[] = ' + JSON.stringify(finalCarsList, null, 2) + ';\n\n' +
'export const categoryLabels: Record<CarCategory, string> = {\n' +
'  economy: "Phổ thông",\n' +
'  sedan: "Sedan Hạng Sang",\n' +
'  suv: "SUV Cao Cấp",\n' +
'  luxury: "Siêu Sang",\n' +
'  supercar: "Siêu Xe Thể Thao",\n' +
'  scooter: "Xe Tay Ga",\n' +
'  manual: "Xe Số / Côn Tay",\n' +
'  electric: "Xe Máy Điện"\n' +
'};\n\n' +
'export const categoryColors: Record<CarCategory, string> = {\n' +
'  economy: "#6B7280",\n' +
'  sedan: "#3B82F6",\n' +
'  suv: "#10B981",\n' +
'  luxury: "#8B5CF6",\n' +
'  supercar: "#EF4444",\n' +
'  scooter: "#F59E0B",\n' +
'  manual: "#3B82F6",\n' +
'  electric: "#10B981"\n' +
'};\n\n' +
'export const formatPrice = (price: number) => {\n' +
'  return price.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ".");\n' +
'};\n';

  fs.writeFileSync(path.join('d:', 'XayDungWeb', 'FINAL', 'src', 'data', 'cars.ts'), tsContent, 'utf8');
  console.log("Data generated successfully!");
}

generateDataAndImages();
