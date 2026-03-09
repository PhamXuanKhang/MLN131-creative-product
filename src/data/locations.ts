export interface Battle {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  description: string;
  image: string;
  date?: string;
}

export interface Campaign {
  id: number;
  year: number;
  name: string;
  coordinates: { lat: number; lng: number };
  description: string;
  image: string;
  significance: string;
  battles: Battle[];
}

export const campaigns: Campaign[] = [
  {
    id: 1,
    year: 1960,
    name: "Phong trào Đồng Khởi",
    coordinates: { lat: 10.2326, lng: 106.3758 },
    description:
      "Phong trào Đồng Khởi (1959-1960) là cuộc nổi dậy đồng loạt của nhân dân miền Nam chống lại chính quyền Ngô Đình Diệm. Bắt đầu từ Bến Tre, phong trào nhanh chóng lan rộng khắp Nam Bộ, đánh dấu bước chuyển từ đấu tranh chính trị sang kết hợp đấu tranh chính trị với đấu tranh vũ trang.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/NLF_flag.svg/800px-NLF_flag.svg.png",
    significance:
      "Làm sụp đổ bộ máy kìm kẹp của Mỹ-Diệm ở nông thôn, giải phóng nhiều vùng rộng lớn, dẫn đến việc thành lập Mặt trận Dân tộc Giải phóng miền Nam (20/12/1960).",
    battles: [
      {
        id: "dk-mocay",
        name: "Khởi nghĩa Mỏ Cày",
        coordinates: { lat: 10.0833, lng: 106.3667 },
        description:
          "Ngày 17/1/1960, hàng vạn nhân dân Mỏ Cày (Bến Tre) đồng loạt nổi dậy dưới sự lãnh đạo của bà Nguyễn Thị Định. Lực lượng khởi nghĩa tấn công các đồn bốt, giải phóng nhiều xã, mở đầu cho phong trào Đồng Khởi lan rộng khắp miền Nam.",
        image: "",
        date: "17/01/1960",
      },
      {
        id: "dk-giongTrom",
        name: "Nổi dậy Giồng Trôm",
        coordinates: { lat: 10.1667, lng: 106.4833 },
        description:
          "Nhân dân Giồng Trôm đồng loạt nổi dậy phá ấp chiến lược, diệt ác ôn, phá thế kìm kẹp. Phong trào ở Giồng Trôm là một trong những điểm sáng tiêu biểu của Đồng Khởi Bến Tre.",
        image: "",
        date: "01/1960",
      },
      {
        id: "dk-chauThanh",
        name: "Khởi nghĩa Châu Thành",
        coordinates: { lat: 10.2667, lng: 106.3333 },
        description:
          "Nhân dân huyện Châu Thành nổi dậy phá vỡ bộ máy chính quyền cơ sở của Diệm, giải phóng nhiều ấp, xã. Cuộc khởi nghĩa tạo thành thế liên hoàn với Mỏ Cày và Giồng Trôm, biến Bến Tre thành 'quê hương Đồng Khởi'.",
        image: "",
        date: "01/1960",
      },
    ],
  },
  {
    id: 2,
    year: 1968,
    name: "Tổng tiến công Tết Mậu Thân",
    coordinates: { lat: 13.5, lng: 107.0 },
    description:
      "Cuộc Tổng tiến công và nổi dậy Tết Mậu Thân 1968 là cuộc tiến công chiến lược đồng loạt vào hầu hết các thành phố, thị xã và căn cứ quân sự trên toàn miền Nam. Đây là bước ngoặt chiến lược quan trọng nhất của cuộc kháng chiến chống Mỹ.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/TetOffensiveMap.png/800px-TetOffensiveMap.png",
    significance:
      "Làm phá sản chiến lược 'Chiến tranh cục bộ' của Mỹ, buộc Mỹ phải xuống thang chiến tranh, ngừng ném bom miền Bắc, chấp nhận đàm phán tại Paris. Tổng thống Johnson tuyên bố không tái tranh cử.",
    battles: [
      {
        id: "mt-saigon",
        name: "Trận Sài Gòn - Gia Định",
        coordinates: { lat: 10.7769, lng: 106.7009 },
        description:
          "Đêm 30 Tết (31/1/1968), quân giải phóng đồng loạt tấn công vào Sài Gòn: Dinh Độc Lập, Tòa Đại sứ Mỹ, Đài Phát thanh, Bộ Tổng Tham mưu, sân bay Tân Sơn Nhất. Biệt động thành lập chiến công vang dội khi đánh vào tận Đại sứ quán Mỹ.",
        image: "",
        date: "31/01/1968",
      },
      {
        id: "mt-hue",
        name: "Trận Huế",
        coordinates: { lat: 16.4637, lng: 107.5909 },
        description:
          "Quân giải phóng chiếm được Thành nội Huế và treo cờ Mặt trận trên Kỳ đài suốt 25 ngày. Trận Huế là trận đánh đô thị kéo dài và ác liệt nhất trong Tết Mậu Thân, gây tổn thất nặng cho cả hai bên.",
        image: "",
        date: "31/01 - 25/02/1968",
      },
      {
        id: "mt-kheSanh",
        name: "Trận Khe Sanh",
        coordinates: { lat: 16.6167, lng: 106.7333 },
        description:
          "Quân Giải phóng bao vây căn cứ Khe Sanh (Quảng Trị) suốt 77 ngày đêm, thu hút và giam chân một lực lượng lớn quân Mỹ-VNCH, tạo điều kiện cho cuộc tổng tiến công trên toàn miền Nam. Trận chiến được ví như 'Điện Biên Phủ thứ hai'.",
        image: "",
        date: "21/01 - 09/04/1968",
      },
      {
        id: "mt-danang",
        name: "Trận Đà Nẵng",
        coordinates: { lat: 16.0544, lng: 108.2022 },
        description:
          "Quân giải phóng tấn công vào các căn cứ quân sự Mỹ tại Đà Nẵng - căn cứ không quân lớn nhất của Mỹ ở miền Nam. Cuộc tấn công gây thiệt hại đáng kể cho hệ thống phòng thủ của liên quân Mỹ-VNCH.",
        image: "",
        date: "31/01/1968",
      },
      {
        id: "mt-bienHoa",
        name: "Trận Biên Hòa",
        coordinates: { lat: 10.9454, lng: 106.8243 },
        description:
          "Quân giải phóng tấn công căn cứ không quân Biên Hòa - một trong những sân bay quân sự lớn nhất Đông Nam Á, phá hủy nhiều máy bay và cơ sở vật chất. Trận đánh chứng minh không có nơi nào ở miền Nam là an toàn đối với quân Mỹ.",
        image: "",
        date: "31/01/1968",
      },
    ],
  },
  {
    id: 3,
    year: 1972,
    name: "Chiến dịch Xuân - Hè 1972",
    coordinates: { lat: 14.5, lng: 107.5 },
    description:
      "Chiến dịch Xuân - Hè 1972 (còn gọi là Chiến dịch Nguyễn Huệ / Easter Offensive) là cuộc tiến công chiến lược lớn nhất kể từ Tết Mậu Thân. Quân Giải phóng mở ba hướng tiến công đồng thời: Quảng Trị, Tây Nguyên (Kontum), và Đông Nam Bộ (An Lộc).",
    image: "",
    significance:
      "Giải phóng Quảng Trị, chứng minh sức mạnh quân đội miền Bắc sau khi Mỹ rút quân, buộc Mỹ phải ký Hiệp định Paris (27/1/1973), rút hết quân khỏi miền Nam.",
    battles: [
      {
        id: "xh-quangTri",
        name: "Trận Quảng Trị",
        coordinates: { lat: 16.75, lng: 107.1833 },
        description:
          "Ngày 30/3/1972, quân Giải phóng vượt sông Bến Hải, tấn công Quảng Trị. Ngày 1/5/1972, giải phóng hoàn toàn tỉnh Quảng Trị. Trận 'Thành cổ Quảng Trị' 81 ngày đêm (từ tháng 6) trở thành biểu tượng huyền thoại của sự hy sinh anh dũng.",
        image: "",
        date: "30/03 - 16/09/1972",
      },
      {
        id: "xh-anLoc",
        name: "Trận An Lộc",
        coordinates: { lat: 11.5333, lng: 106.6167 },
        description:
          "Quân Giải phóng bao vây và tấn công thị xã An Lộc (Bình Long) suốt 66 ngày. Trận đánh diễn ra vô cùng ác liệt, Mỹ phải sử dụng B-52 ném bom rải thảm để giải vây.",
        image: "",
        date: "04 - 07/1972",
      },
      {
        id: "xh-kontum",
        name: "Trận Kontum",
        coordinates: { lat: 14.35, lng: 108.0 },
        description:
          "Hướng Tây Nguyên, quân Giải phóng tấn công Kontum nhằm chia cắt miền Nam. Trận đánh diễn ra quyết liệt, quân ta chiếm được Đắk Tô - Tân Cảnh, tiến đến vòng ngoài thị xã Kontum.",
        image: "",
        date: "04 - 06/1972",
      },
    ],
  },
  {
    id: 4,
    year: 1975,
    name: "Chiến dịch Tây Nguyên",
    coordinates: { lat: 12.6833, lng: 108.05 },
    description:
      "Chiến dịch Tây Nguyên (tháng 3/1975) là chiến dịch mở màn của cuộc Tổng tiến công mùa Xuân 1975. Với đòn đánh bất ngờ vào Buôn Ma Thuột, chiến dịch đã làm rung chuyển toàn bộ hệ thống phòng thủ Tây Nguyên của VNCH, dẫn đến sự sụp đổ dây chuyền.",
    image: "",
    significance:
      "Giải phóng toàn bộ Tây Nguyên, gây ra cuộc rút chạy hỗn loạn của VNCH trên Đường 7B ('Đoàn quân di tản'), tạo thế và lực cho Chiến dịch Hồ Chí Minh.",
    battles: [
      {
        id: "tn-buonMaThuot",
        name: "Trận Buôn Ma Thuột",
        coordinates: { lat: 12.6833, lng: 108.05 },
        description:
          "Ngày 10/3/1975, quân Giải phóng bất ngờ tấn công Buôn Ma Thuột - thủ phủ tỉnh Đắk Lắk. Chỉ trong 32 giờ, ta đã làm chủ hoàn toàn thị xã. Đây là trận then chốt quyết định mở toang cánh cửa Tây Nguyên.",
        image: "",
        date: "10/03/1975",
      },
      {
        id: "tn-pleiku",
        name: "Rút chạy khỏi Pleiku",
        coordinates: { lat: 13.9833, lng: 108.0167 },
        description:
          "Sau khi mất Buôn Ma Thuột, Nguyễn Văn Thiệu ra lệnh rút quân khỏi Pleiku và Kontum theo Đường 7B. Cuộc rút lui biến thành cuộc tháo chạy hỗn loạn, quân Giải phóng truy kích tiêu diệt hầu hết lực lượng.",
        image: "",
        date: "15 - 25/03/1975",
      },
      {
        id: "tn-kontum75",
        name: "Giải phóng Kontum",
        coordinates: { lat: 14.35, lng: 108.0 },
        description:
          "Sau khi lệnh rút quân từ Tây Nguyên được ban hành, quân giải phóng nhanh chóng tiến vào giải phóng Kontum mà hầu như không gặp kháng cự đáng kể. Kontum được giải phóng ngày 16/3/1975.",
        image: "",
        date: "16/03/1975",
      },
    ],
  },
  {
    id: 5,
    year: 1975,
    name: "Chiến dịch Hồ Chí Minh",
    coordinates: { lat: 10.7769, lng: 106.7009 },
    description:
      "Chiến dịch Hồ Chí Minh (26/4 - 30/4/1975) là chiến dịch cuối cùng và lớn nhất trong cuộc kháng chiến chống Mỹ. Với 5 cánh quân từ các hướng tiến vào Sài Gòn, chiến dịch kết thúc bằng sự kiện xe tăng húc đổ cổng Dinh Độc Lập lúc 11h30 ngày 30/4/1975.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Fall_of_Saigon_map.png/800px-Fall_of_Saigon_map.png",
    significance:
      "Giải phóng hoàn toàn miền Nam, thống nhất đất nước, kết thúc 21 năm kháng chiến chống Mỹ và 117 năm chống thực dân, đế quốc. Ghi dấu son chói lọi trong lịch sử dân tộc Việt Nam.",
    battles: [
      {
        id: "hcm-xuanLoc",
        name: "Trận Xuân Lộc",
        coordinates: { lat: 10.95, lng: 107.2333 },
        description:
          "Trận Xuân Lộc (9-21/4/1975) được gọi là 'cánh cửa thép' bảo vệ Sài Gòn. Sư đoàn 18 VNCH của tướng Lê Minh Đảo chống cự quyết liệt. Sau 12 ngày chiến đấu, quân Giải phóng đập tan 'cánh cửa thép', mở đường tiến vào Sài Gòn.",
        image: "",
        date: "09 - 21/04/1975",
      },
      {
        id: "hcm-phanRang",
        name: "Trận Phan Rang",
        coordinates: { lat: 11.5833, lng: 108.9833 },
        description:
          "Ngày 16/4/1975, quân Giải phóng tấn công Phan Rang - tuyến phòng thủ cuối cùng của VNCH ở miền Trung. Trung tướng Nguyễn Vĩnh Nghi bị bắt sống. Phan Rang thất thủ đánh dấu sự sụp đổ hoàn toàn của VNCH ở miền Trung.",
        image: "",
        date: "16/04/1975",
      },
      {
        id: "hcm-dinhDocLap",
        name: "Trận Dinh Độc Lập",
        coordinates: { lat: 10.7769, lng: 106.695 },
        description:
          "Lúc 10h45 ngày 30/4/1975, xe tăng T-54 số hiệu 843 húc đổ cổng Dinh Độc Lập. Trung úy Bùi Quang Thận cắm cờ Mặt trận trên nóc Dinh. Tổng thống Dương Văn Minh tuyên bố đầu hàng vô điều kiện lúc 11h30, kết thúc cuộc chiến.",
        image: "",
        date: "30/04/1975",
      },
    ],
  },
];
