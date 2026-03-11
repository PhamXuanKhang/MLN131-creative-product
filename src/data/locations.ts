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
  // ============================================================
  // 1. Phong trào Đồng Khởi (1959–1960)
  // ============================================================
  {
    id: 1,
    year: 1960,
    name: "Phong trào Đồng Khởi",
    coordinates: { lat: 10.2326, lng: 106.3758 },
    description:
      "Phong trào Đồng khởi (1959–1960) là bước phát triển quan trọng của cách mạng miền Nam, đánh dấu sự chuyển biến từ đấu tranh chính trị sang kết hợp đấu tranh chính trị với đấu tranh vũ trang. Trước sự đàn áp khốc liệt của chính quyền Ngô Đình Diệm, nhân dân nhiều địa phương đã nổi dậy phá bỏ bộ máy kìm kẹp, giành quyền làm chủ ở nông thôn. Phong trào bùng nổ mạnh ở Bến Tre rồi nhanh chóng lan rộng ra khắp Nam Bộ và một số khu vực Trung Trung Bộ.",
    image:
      "https://dinhnghia.com.vn/wp-content/uploads/2022/08/phong-trao-dong-khoi-1959-1960-nguyen-nhan-dien-bien-y-nghia-3.jpg",
    significance:
      "Phong trào Đồng khởi làm lung lay hệ thống chính quyền cơ sở của chính quyền Sài Gòn ở nhiều vùng nông thôn, mở rộng vùng giải phóng và phát triển lực lượng cách mạng. Đồng thời tạo điều kiện cho sự ra đời của Mặt trận Dân tộc Giải phóng miền Nam Việt Nam vào ngày 20/12/1960, góp phần làm thay đổi cục diện cách mạng ở miền Nam.",
    battles: [
      {
        id: "dk-trabong",
        name: "Trà Bồng - Khởi đầu phong trào",
        coordinates: { lat: 15.205, lng: 108.533 },
        description:
          "Khu vực Trà Bồng và miền tây tỉnh Quảng Ngãi là một trong những nơi nổ ra các cuộc nổi dậy sớm, góp phần mở đầu cho phong trào Đồng khởi ở miền Nam. Tháng 8/1959, nhân dân Trà Bồng cùng lực lượng cách mạng đã đứng lên chống lại chính quyền Sài Gòn, phá bỏ nhiều cơ sở kìm kẹp ở địa phương. Đến cuối năm 1959, phong trào tiếp tục lan sang các vùng lân cận, tạo tiền đề quan trọng cho làn sóng đấu tranh rộng khắp. Sang năm 1960, Trà Bồng được xem là một trong những điểm khởi đầu tiêu biểu của phong trào Đồng khởi.",
        image:
          "https://baotanglichsu.vn/DataFiles/2019/10/News/thang%2010%20nam%202019/net%20dac%20sac%20phong%20trao%20dong%20khoi/1.jpg",
        date: "08/1959 – 1960",
      },
      {
        id: "dk-bentre",
        name: "Bến Tre - Phong trào bùng nổ mạnh mẽ",
        coordinates: { lat: 10.243, lng: 106.375 },
        description:
          "Bến Tre là nơi phong trào Đồng khởi bùng nổ mạnh mẽ và tiêu biểu nhất. Ngày 17/1/1960, nhân dân huyện Mỏ Cày đồng loạt nổi dậy phá vỡ bộ máy chính quyền cơ sở của chính quyền Sài Gòn. Từ ngày 18 đến 25/1/1960, phong trào nhanh chóng lan rộng ra nhiều xã trong tỉnh với hình thức kết hợp đấu tranh chính trị và vũ trang tự vệ, bao vây đồn bốt và giải tán bộ máy kìm kẹp ở nông thôn. Đến cuối tháng 1/1960, nhiều vùng nông thôn ở Bến Tre đã giành được quyền làm chủ, tạo khí thế cách mạng lan rộng ra toàn miền Nam.",
        image:
          "https://images.hcmcpv.org.vn/res/news/2021/01/17-01-2021-phat-huy-tinh-than-dong-khoi-trong-xay-dung-dat-nuoc-hom-nay-55418D43.jpg",
        date: "17/01/1960 – cuối 01/1960",
      },
      {
        id: "dk-tayninh",
        name: "Tây Ninh - Phong trào lan rộng khắp miền Nam",
        coordinates: { lat: 11.3104, lng: 106.0983 },
        description:
          "Sau khi phong trào Đồng khởi bùng nổ ở Bến Tre, nhiều địa phương khác ở Nam Bộ đã hưởng ứng mạnh mẽ, trong đó có Tây Ninh. Đầu năm 1960, nhân dân nhiều xã trong tỉnh đã nổi dậy phá ấp chiến lược, đấu tranh chống lại bộ máy chính quyền cơ sở của chính quyền Sài Gòn. Trong suốt năm 1960, nhiều ấp chiến lược bị phá bỏ và lực lượng cách mạng từng bước mở rộng vùng hoạt động. Đến cuối năm 1960, phong trào tại Tây Ninh đã góp phần làm suy yếu hệ thống kiểm soát của chính quyền Sài Gòn ở khu vực Đông Nam Bộ.",
        image:
          "https://special.vietnamplus.vn/wp-content/uploads/2021/03/ttxvn0901hc-1578582218-8-2048x1373.jpg",
        date: "1960",
      },
    ],
  },

  // ============================================================
  // 2. Chiến thắng Vạn Tường (1965)
  // ============================================================
  {
    id: 2,
    year: 1965,
    name: "Chiến thắng Vạn Tường",
    coordinates: { lat: 15.394, lng: 108.704 },
    description:
      "Tháng 8 năm 1965, tại Vạn Tường (Quảng Ngãi), quân và dân ta đã giành thắng lợi lớn trước cuộc hành quân quy mô lớn đầu tiên của quân đội Mỹ tại miền Nam Việt Nam. Đây là trận đánh đánh dấu sự đối đầu trực tiếp giữa lực lượng cách mạng và quân viễn chinh Mỹ trong giai đoạn 'Chiến tranh cục bộ'. Mỹ huy động hàng nghìn quân cùng xe tăng, pháo binh và không quân với mục tiêu tiêu diệt lực lượng chủ lực của ta. Tuy nhiên, bằng chiến thuật linh hoạt, bám sát địa hình và phát huy thế trận chiến tranh nhân dân, quân giải phóng đã gây cho đối phương nhiều tổn thất nặng nề.",
    image:
      "https://quangngai.gov.vn/upload/2006516/fck/ntmthien/2025_08_12_09_06_501.jpg",
    significance:
      "Chiến thắng Vạn Tường chứng minh quân đội Mỹ không phải lực lượng 'bất bại', củng cố niềm tin chiến đấu của quân dân cả nước và mở đầu cao trào 'Tìm Mỹ mà đánh, lùng ngụy mà diệt' trong kháng chiến chống Mỹ.",
    battles: [
      {
        id: "vt-binhson",
        name: "Bình Sơn – Trung tâm trận đánh",
        coordinates: { lat: 15.311, lng: 108.764 },
        description:
          "Khu vực Bình Sơn là nơi diễn ra những trận giao tranh ác liệt nhất của trận Vạn Tường. Với địa hình làng mạc xen kẽ đồi núi, quân giải phóng đã tổ chức nhiều trận phục kích và đánh gần hiệu quả. Trung đoàn 1 (Ba Gia) phối hợp với lực lượng dân quân du kích địa phương xây dựng hệ thống hầm hào, bãi mìn và chướng ngại vật để chặn bước tiến của quân Mỹ. Trong ngày 18/8/1965, quân Mỹ tiến công từ nhiều hướng với xe tăng, pháo binh và trực thăng yểm trợ, nhưng vấp phải sự kháng cự quyết liệt của quân ta, khiến kế hoạch hợp điểm của đối phương bị phá vỡ và chịu nhiều tổn thất.",
        image:
          "https://tinhdoan.quangngai.gov.vn/items/images/img_16529.jpg",
        date: "18/08/1965",
      },
      {
        id: "vt-chulai",
        name: "Đường bộ – Chu Lai",
        coordinates: { lat: 15.401, lng: 108.706 },
        description:
          "Chu Lai là căn cứ quân sự lớn của Mỹ tại Quảng Ngãi, nơi đặt sân bay, hậu cần và lực lượng lính thủy đánh bộ từ năm 1965. Trước trận Vạn Tường, từ căn cứ này, quân Mỹ tập kết lực lượng và tổ chức cuộc hành quân Starlite nhằm tấn công vào khu vực Vạn Tường. Sáng 18/8/1965, các đơn vị lính thủy đánh bộ từ Chu Lai tiến quân bằng đường bộ và trực thăng để bao vây lực lượng Quân giải phóng, nhưng đã gặp phải sự chống trả quyết liệt từ các đơn vị phòng ngự của ta.",
        image:
          "https://tinhdoan.quangngai.gov.vn/items/images/img_16522.jpg",
        date: "05/1965 – 18/08/1965",
      },
      {
        id: "vt-bientuong",
        name: "Đường thủy – Bãi biển Vạn Tường",
        coordinates: { lat: 15.395, lng: 108.739 },
        description:
          "Bãi biển Vạn Tường là hướng tiến công quan trọng của quân Mỹ trong trận đánh. Từ ngoài khơi, các tàu chiến và tàu đổ bộ thuộc Hạm đội 7 đã pháo kích khu vực ven biển và đưa lính thủy đánh bộ cùng nhiều vũ khí hiện đại vào bờ. Mục tiêu của hướng tấn công này là nhanh chóng chiếm lĩnh khu vực ven biển để phối hợp với các mũi tiến công khác. Tuy nhiên, quân giải phóng đã tận dụng địa hình và hệ thống công sự để tổ chức đánh gần, hạn chế ưu thế hỏa lực của đối phương và gây nhiều thiệt hại cho quân Mỹ.",
        image:
          "https://nguonluc.com.vn/uploads/images/2023/07/26/tausanbay4-1690365977.jpg",
        date: "17/08/1965 – 18/08/1965",
      },
      {
        id: "vt-tructhang",
        name: "Đường không – Khu vực phía tây nam Vạn Tường",
        coordinates: { lat: 15.37, lng: 108.71 },
        description:
          "Khu vực phía tây nam Vạn Tường là nơi quân Mỹ sử dụng hơn 100 trực thăng để đổ bộ lực lượng từ trên không xuống các bãi đất trống và điểm cao. Mục tiêu là nhanh chóng đưa lính thủy đánh bộ vào sâu trong đất liền nhằm bao vây và chia cắt lực lượng Trung đoàn 1 của Quân giải phóng. Tuy được yểm trợ mạnh bởi máy bay và pháo binh, các đợt đổ bộ vẫn gặp phải sự phản công quyết liệt của quân ta, khiến nhiều trực thăng bị bắn hạ hoặc hư hại và việc triển khai đội hình của quân Mỹ gặp nhiều khó khăn.",
        image:
          "https://tinhdoan.quangngai.gov.vn/items/images/img_16525.jpg",
        date: "18/08/1965",
      },
    ],
  },

  // ============================================================
  // 3. Tổng tiến công Tết Mậu Thân (1968)
  // ============================================================
  {
    id: 3,
    year: 1968,
    name: "Tổng tiến công Tết Mậu Thân",
    coordinates: { lat: 14.0583, lng: 108.2772 },
    description:
      "Cuộc Tổng tiến công và nổi dậy Tết Mậu Thân 1968 là sự kiện có ý nghĩa bước ngoặt trong cuộc kháng chiến chống Mỹ. Đêm 30 rạng sáng 31/1/1968, quân và dân ta đồng loạt tiến công vào hơn 100 đô thị và căn cứ quân sự trên toàn miền Nam, trong đó có Sài Gòn, Huế, Đà Nẵng. Mục tiêu chiến lược của ta là giáng đòn mạnh vào ý chí xâm lược của Mỹ, làm lung lay bộ máy chính quyền Sài Gòn, tạo chuyển biến quyết định cho chiến tranh. Dù chịu tổn thất lớn về lực lượng, cuộc tổng tiến công đã gây chấn động mạnh mẽ dư luận Mỹ và thế giới. Lần đầu tiên chiến tranh lan rộng vào trung tâm các đô thị lớn, kể cả cơ quan đầu não của chính quyền Sài Gòn. Thắng lợi lớn nhất của Mậu Thân 1968 là thắng lợi về chiến lược và chính trị: Mỹ buộc phải tuyên bố \"phi Mỹ hóa chiến tranh\", chấp nhận đàm phán tại Paris và từng bước xuống thang chiến tranh.",
    image:
      "https://file-dangcongsan.nhandan.vn/DATA/0/2019/10/04_nhan_dan_3008_300a2-16_48_13_973.jpg",
    significance:
      "Làm phá sản chiến lược 'Chiến tranh cục bộ' của Mỹ, buộc Mỹ phải xuống thang chiến tranh, ngừng ném bom miền Bắc, chấp nhận đàm phán tại Paris. Tổng thống Johnson tuyên bố không tái tranh cử.",
    battles: [
      {
        id: "mt-saigon",
        name: "Sài Gòn",
        coordinates: { lat: 10.8231, lng: 106.6297 },
        description:
          "Sài Gòn là trung tâm chính trị, quân sự và kinh tế quan trọng của chính quyền Việt Nam Cộng hòa, đồng thời là nơi tập trung nhiều cơ quan đầu não của Mỹ tại miền Nam. Trong cuộc Tổng tiến công và nổi dậy Tết Mậu Thân 1968, lực lượng cách mạng đã bất ngờ tiến công vào nhiều mục tiêu trọng yếu như Dinh Độc Lập, sân bay Tân Sơn Nhất, đài phát thanh và các cơ quan quân sự. Đêm 30 rạng sáng 31/1/1968, các cuộc tấn công đồng loạt nổ ra trong nội đô, trong đó có trận đánh lớn tại sân bay Tân Sơn Nhất. Những trận giao tranh ác liệt đã gây chấn động lớn đối với quân đội Mỹ và chính quyền Sài Gòn trước khi họ phản công và giành lại phần lớn quyền kiểm soát thành phố vào đầu tháng 2/1968.",
        image:
          "https://cdn.tienphong.vn/images/bdfc554ea35983ad68a96e0050b6e2cbca723bc7e4029629049931db53ff9e4e1850007d863fb3ed50b6b1db75b9fc2b822588453e9ddf4d792470bb0622c88105745bf6a6c78ab0f8d083733f2f2d61/mau-than-7646.jpg.webp",
        date: "31/01/1968",
      },
      {
        id: "mt-hue",
        name: "Huế",
        coordinates: { lat: 16.4637, lng: 107.5909 },
        description:
          "Huế là một trong những chiến trường ác liệt và kéo dài nhất trong cuộc Tổng tiến công Tết Mậu Thân 1968. Với vị trí chiến lược quan trọng ở miền Trung và là trung tâm văn hóa – chính trị lớn của miền Nam, thành phố này trở thành mục tiêu quan trọng của lực lượng cách mạng. Ngày 31/1/1968, lực lượng cách mạng tiến công và nhanh chóng chiếm giữ nhiều khu vực, đặc biệt là Kinh thành Huế. Trong suốt tháng 2/1968, giao tranh diễn ra dữ dội giữa lực lượng cách mạng với quân đội Mỹ và quân Sài Gòn. Đến ngày 24/2/1968, quân Mỹ và quân Sài Gòn mới tái chiếm phần lớn thành phố sau nhiều tuần chiến đấu ác liệt.",
        image:
          "https://camau.gov.vn/Datafiles/camau-gov-vn/wps/wcm/connect/f5bb3f25-eff5-42e8-9be8-1a43cc735e7c/1/32-jpg-3fmod-3dajperes-26amp-3bcvid-3d.png",
        date: "31/01 – 25/02/1968",
      },
      {
        id: "mt-DaNang",
        name: "Đà Nẵng",
        coordinates: { lat: 16.0544, lng: 108.2022 },
        description:
          "Đà Nẵng là căn cứ quân sự lớn của Mỹ tại miền Trung Việt Nam, nơi tập trung nhiều lực lượng không quân, hải quân và lính thủy đánh bộ. Rạng sáng ngày 31/1/1968, trong cuộc Tổng tiến công Tết Mậu Thân, lực lượng cách mạng đã tiến công vào các căn cứ quân sự, sân bay và các vị trí phòng thủ quanh thành phố nhằm làm suy yếu sức mạnh quân sự của Mỹ. Từ ngày 1 đến 5/2/1968, giao tranh diễn ra ở nhiều khu vực xung quanh Đà Nẵng. Mặc dù lực lượng cách mạng không chiếm được thành phố, các cuộc tấn công bất ngờ đã làm gián đoạn hoạt động quân sự của đối phương và buộc quân Mỹ tăng cường phòng thủ tại căn cứ chiến lược này.",
        image:
          "https://imgnvsk.vnanet.vn/MediaUpload/Content/2024/02/16/vna-potal-55-nam-tong-tien-cong-va-noi-day-xuan-mau-than-1968-buoc-ngoat-quyet-dinh-trong-cuoc-khang-chien-chong-my-cuu-nuoc-654546930-11-47-4016-15-33-22.jpeg",
        date: "31/01/1968 – đầu 02/1968",
      },
      {
        id: "mt-ToaDaisuHoaKy",
        name: "Tòa Đại sứ Hoa Kỳ tại Sài Gòn",
        coordinates: { lat: 10.7842, lng: 106.702 },
        description:
          "Tòa Đại sứ Hoa Kỳ tại Sài Gòn là biểu tượng cho sự hiện diện và ảnh hưởng của Mỹ tại miền Nam Việt Nam. Trong rạng sáng ngày 31/1/1968, một đơn vị đặc công của lực lượng cách mạng đã bất ngờ tấn công và đột nhập vào khuôn viên tòa đại sứ ngay trong đêm giao thừa Tết Mậu Thân. Mặc dù sau vài giờ giao tranh lực lượng Mỹ đã kiểm soát lại khu vực, cuộc tấn công vẫn gây chấn động mạnh vì cho thấy ngay cả những cơ quan được bảo vệ nghiêm ngặt nhất của Mỹ cũng có thể bị tấn công. Hình ảnh và thông tin về sự kiện nhanh chóng được truyền thông quốc tế đưa tin rộng rãi, tạo ảnh hưởng lớn đến dư luận thế giới.",
        image:
          "https://media.vietnamplus.vn/images/7255a701687d11cb8c6bbc58a6c807857e79975a32971b450677122ea9c9ccb1e0ae63d9f409d75e638f6f52260e67936db0f086767bf8c374bff428b0cc9374/ttxvnmau_than23.jpg",
        date: "31/01/1968",
      },
    ],
  },

  // ============================================================
  // 4. Chiến dịch Đường 9 – Nam Lào (1971)
  // ============================================================
  {
    id: 4,
    year: 1971,
    name: "Chiến dịch Đường 9 – Nam Lào (Lam Sơn 719)",
    coordinates: { lat: 16.6, lng: 106.5 },
    description:
      "Chiến dịch phản công của quân và dân ta đánh bại cuộc hành quân Lam Sơn 719 của liên quân Mỹ - VNCH nhằm cắt đứt đường mòn Hồ Chí Minh tại Nam Lào.",
    image:
      "https://thuviennguyenvanhuong.vn/wp-content/uploads/2023/02/ToughLao3.jpg",
    significance:
      "Đập tan chiến lược 'Việt Nam hóa chiến tranh', bảo vệ hành lang vận tải chiến lược Đường Hồ Chí Minh, tạo tiền đề cho các thắng lợi tiếp theo.",
    battles: [
      {
        id: "duong9-khe-sanh",
        name: "Khe Sanh – Căn cứ xuất phát (Dewey Canyon II)",
        coordinates: { lat: 16.63, lng: 106.73 },
        description:
          "Quân Mỹ tái lập căn cứ Khe Sanh (huyện Hướng Hóa, Quảng Trị) làm bàn đạp hậu cần, sửa sân bay, lập kho tiếp tế và trận địa pháo để hỗ trợ VNCH tiến sang Lào. Căn cứ liên tục bị quân giải phóng pháo kích, gây khó khăn tiếp tế. Sau chiến dịch, Mỹ rút bỏ hoàn toàn.",
        image:
          "https://biaarma.com/cpanel/resources/events/719-000001-AR5J-4D39D5_n.jpg",
        date: "01/1971 – 03/1971",
      },
      {
        id: "duong9-truc-chinh",
        name: "Trục Đường 9 – Bản Đông (Trận địa chính)",
        coordinates: { lat: 16.55, lng: 106.3 },
        description:
          "Quân VNCH tiến theo Đường 9 qua vùng rừng núi Trường Sơn với xe tăng, pháo hạng nặng, được không quân và pháo binh Mỹ yểm trợ. Quân Giải phóng tổ chức hiệp đồng binh chủng (bộ binh, xe tăng, pháo cao xạ), vây lấn và tiêu diệt từng cứ điểm trên các điểm cao. Liên quân thiệt hại nặng nề xe tăng và trực thăng.",
        image:
          "https://2.bp.blogspot.com/-uv77UXL4eXw/VHM2f8vi40I/AAAAAAACAac/lX4Jp1tS0u0/s1600/07%2B-%2BPfYawZo.jpg",
        date: "08/02 – 24/03/1971",
      },
      {
        id: "duong9-se-pon",
        name: "Sê Pôn – Mục tiêu cuối cùng",
        coordinates: { lat: 16.55, lng: 105.93 },
        description:
          "Quân VNCH dùng trực thăng đổ bộ chiếm Sê Pôn mang tính biểu tượng, nhưng chỉ trụ được vài ngày trong vòng vây. Cuộc rút lui từ Sê Pôn và Bản Đông biến thành tháo chạy hỗn loạn dưới sức ép của các sư đoàn quân giải phóng. Mục tiêu phá hủy kho tàng chiến lược tại Sê Pôn thất bại hoàn toàn.",
        image: "",
        date: "03/1971",
      },
    ],
  },

  // ============================================================
  // 5. Chiến dịch Trị – Thiên (1972)
  // ============================================================
  {
    id: 5,
    year: 1972,
    name: "Chiến dịch Trị – Thiên (1972)",
    coordinates: { lat: 16.75, lng: 107.18 },
    description:
      "Chiến dịch tiến công chiến lược của quân và dân ta tại mặt trận Trị – Thiên, giải phóng tỉnh Quảng Trị và uy hiếp trực tiếp cố đô Huế, góp phần tạo bước ngoặt quan trọng trên bàn đàm phán Paris.",
    image:
      "https://i.ytimg.com/vi/WwPxHM9rk8E/maxresdefault.jpg",
    significance:
      "Giải phóng hoàn toàn tỉnh Quảng Trị, giam chân lực lượng dự bị chiến lược của địch, tạo thế có lợi cho đàm phán Hiệp định Paris 1973.",
    battles: [
      {
        id: "tri-thien-thanh-co-quang-tri",
        name: "81 ngày đêm Thành cổ Quảng Trị",
        coordinates: { lat: 16.81, lng: 107.1 },
        description:
          "Sau khi lực lượng cách mạng giải phóng Quảng Trị tháng 5/1972, quân Mỹ – VNCH mở cuộc phản công lớn tái chiếm khu vực. Các đơn vị phòng thủ chiến đấu liên tục 81 ngày đêm dưới bom đạn dày đặc của không quân và pháo binh Mỹ. Trận chiến kết thúc ngày 16/9/1972 khi lực lượng phòng thủ rút khỏi thành cổ, trở thành biểu tượng của tinh thần chiến đấu kiên cường.",
        image:
          "https://www.asiakingtravel.com/cuploads/files/Battle1-Quang-Tri-Citadel.jpg",
        date: "28/06 – 16/09/1972",
      },
      {
        id: "tri-thien-dong-ha",
        name: "Đông Hà",
        coordinates: { lat: 16.84, lng: 107.09 },
        description:
          "Đông Hà là trung tâm giao thông chiến lược của Quảng Trị, nơi giao nhau các tuyến đường huyết mạch quan trọng. Các lực lượng tham chiến tập trung giành quyền kiểm soát Đông Hà nhằm chi phối toàn bộ tuyến vận chuyển và hậu cần chiến lược, ảnh hưởng lớn đến khả năng kiểm soát chiến trường của các bên.",
        image: "",
        date: "1972",
      },
      {
        id: "tri-thien-cua-viet",
        name: "Cửa Việt",
        coordinates: { lat: 16.88, lng: 107.2 },
        description:
          "Cửa Việt là cảng biển lớn của khu vực Quảng Trị, đóng vai trò then chốt trong tiếp vận quân sự đường biển. Việc giành quyền kiểm soát cảng Cửa Việt có ý nghĩa chiến lược lớn, trực tiếp ảnh hưởng đến khả năng tiếp tế và duy trì lực lượng của quân đội VNCH trên toàn mặt trận Quảng Trị.",
        image:
          "https://mediafile.qdnd.vn/filesdata/280x220/images/2022/1/28/quan-doi-ta-tien-vao-thanh-noi-hue-tet-mau-than-1968.jpg",
        date: "1972",
      },
      {
        id: "tri-thien-my-chanh",
        name: "Tuyến phòng thủ sông Mỹ Chánh",
        coordinates: { lat: 16.68, lng: 107.18 },
        description:
          "Sau khi giải phóng Quảng Trị, quân ta tiến công xuống phía Nam, đập tan tuyến phòng thủ vòng ngoài của địch tại sông Mỹ Chánh (Thừa Thiên – Huế), giải phóng các huyện Phong Điền, Quảng Điền. Chiến thắng tại tuyến sông Mỹ Chánh mở toang cánh cửa tiến về Huế.",
        image: "",
        date: "05/1972 – 1973",
      },
      {
        id: "tri-thien-hue",
        name: "Cửa ngõ Huế",
        coordinates: { lat: 16.46, lng: 107.59 },
        description:
          "Quân giải phóng áp sát trực tiếp cố đô Huế sau khi chọc thủng tuyến sông Mỹ Chánh, tạo thế uy hiếp chiến lược. Địch buộc phải dồn toàn bộ lực lượng dự bị chiến lược vào mặt trận này, tạo điều kiện thuận lợi cho các mặt trận khác trên toàn miền Nam phối hợp tiến công đồng loạt.",
        image:
          "https://mediafile.qdnd.vn/filesdata/280x220/images/2022/1/28/quan-doi-ta-tien-vao-thanh-noi-hue-tet-mau-than-1968.jpg",
        date: "05/1972 – 1973",
      },
    ],
  },

  // ============================================================
  // 6. Chiến dịch Xuân - Hè 1972
  // ============================================================
  {
    id: 6,
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
        date: "30/03 – 16/09/1972",
      },
      {
        id: "xh-anLoc",
        name: "Trận An Lộc",
        coordinates: { lat: 11.5333, lng: 106.6167 },
        description:
          "Quân Giải phóng bao vây và tấn công thị xã An Lộc (Bình Long) suốt 66 ngày. Trận đánh diễn ra vô cùng ác liệt, Mỹ phải sử dụng B-52 ném bom rải thảm để giải vây.",
        image: "",
        date: "04 – 07/1972",
      },
      {
        id: "xh-kontum",
        name: "Trận Kontum",
        coordinates: { lat: 14.35, lng: 108.0 },
        description:
          "Hướng Tây Nguyên, quân Giải phóng tấn công Kontum nhằm chia cắt miền Nam. Trận đánh diễn ra quyết liệt, quân ta chiếm được Đắk Tô - Tân Cảnh, tiến đến vòng ngoài thị xã Kontum.",
        image: "",
        date: "04 – 06/1972",
      },
    ],
  },

  // ============================================================
  // 7. Điện Biên Phủ trên không (12/1972)
  // ============================================================
  {
    id: 7,
    year: 1972,
    name: "Điện Biên Phủ trên không",
    coordinates: { lat: 21.0285, lng: 105.8542 },
    description:
      "Xuất phát từ sự bế tắc trên bàn đàm phán Paris, Tổng thống Nixon muốn dùng sức mạnh hủy diệt của 'pháo đài bay' B-52 Stratofortress để ép miền Bắc Việt Nam ký kết các điều khoản có lợi cho Mỹ và xoa dịu chính quyền Sài Gòn. Với ý đồ đưa miền Bắc 'về thời kỳ đồ đá' và giải tỏa áp lực từ phong trào phản chiến trong nước, tối ngày 18/12/1972, Mỹ đã bất ngờ mở chiến dịch Linebacker II, trút bom xuống Hà Nội và Hải Phòng nhằm đè bẹp ý chí kháng chiến của nhân dân ta bằng một 'canh bạc quân sự' cuối cùng. Chiến dịch kéo dài từ đêm 18/12 đến ngày 30/12/1972.",
    image:
      "http://redsvn.net/wp-content/uploads/2018/01/Nixon-Kissinger.jpg",
    significance:
      "Đập tan cuộc tập kích chiến lược B-52, buộc Mỹ ký Hiệp định Paris 1973, mở đường cho sự nghiệp giải phóng hoàn toàn miền Nam. Chiến thắng này còn mang ý nghĩa quốc tế sâu sắc, là lần đầu tiên quân đội một nước thuộc địa đánh bại một cường quốc thực dân phương Tây trong trận dàn quân quy mô lớn. Nó trở thành nguồn cảm hứng mạnh mẽ cho phong trào giải phóng dân tộc toàn thế giới, đặc biệt là tại châu Phi.",
    battles: [
      {
        id: "dbphk-khamthien",
        name: "Khâm Thiên",
        coordinates: { lat: 21.0195, lng: 105.8411 },
        description:
          "Trở thành ký ức kinh hoàng nhất khi Mỹ cho máy bay B-52 rải thảm dọc toàn bộ khu phố Khâm Thiên – một khu vực dân cư đông đúc. Chỉ trong vài phút, bom đạn đã san phẳng gần như hoàn toàn dãy phố dài hơn 1km, phá hủy hàng nghìn ngôi nhà và các công trình công cộng. Trận ném bom này đã khiến 287 người thiệt mạng và hàng trăm người khác bị thương, trong đó có rất nhiều cụ già, phụ nữ và trẻ em. Hình ảnh 'Đài tưởng niệm Khâm Thiên' với bức tượng người mẹ ôm con chết lặng giữa đổ nát vẫn là minh chứng sống động cho sự tàn khốc này.",
        image:
          "https://i.ytimg.com/vi/YzWzuGUhqm8/maxresdefault.jpg",
        date: "Đêm 26/12/1972",
      },
      {
        id: "dbphk-noibai",
        name: "Sân bay Nội Bài",
        coordinates: { lat: 21.2187, lng: 105.8042 },
        description:
          "Khi đó thường được gọi là sân bay Đa Phúc, là một trong những mục tiêu bị đánh phá ác liệt nhất nhằm tê liệt khả năng đánh chặn của không quân ta. Mỹ đã huy động nhiều đợt tầng tầng lớp lớp máy bay ném bom để cày xới các đường băng, nhà ga và hệ thống hang hầm trú ẩn của máy bay tiêm kích MiG. Sự tàn phá gây áp lực cực lớn lên lực lượng hậu cần, kỹ thuật phải làm việc xuyên đêm dưới mưa bom để khôi phục đường băng. Dù bị đánh phá tơi tả, đây vẫn là nơi xuất kích của những 'cánh én bạc' quả cảm lên tiêu diệt B-52.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Boeing_B-52_dropping_bombs.jpg/1280px-Boeing_B-52_dropping_bombs.jpg",
        date: "18/12 – 30/12/1972",
      },
      {
        id: "dbphk-haiphong",
        name: "Hải Phòng",
        coordinates: { lat: 20.8449, lng: 106.6881 },
        description:
          "Là cửa ngõ giao thương quan trọng nhất của miền Bắc, trở thành mục tiêu tàn phá hàng đầu bên cạnh Hà Nội. Mỹ dùng B-52 rải thảm các khu công nghiệp, bến cảng, kho tàng và kết hợp thả thủy lôi phong tỏa cảng biển. Các khu vực dân cư như Thượng Lý, Máy Tơ bị trúng bom hạng nặng, gây thương vong lớn cho dân thường. Sự tàn phá mang tính chất tổng lực nhằm tiêu diệt nguồn lực kinh tế và cắt đứt mọi nguồn viện trợ quốc tế qua đường biển.",
        image:
          "https://cdn-i.vtcnews.vn/resize/ma/upload/2022/12/23/my-danh-bom-hai-phong-16-4-1972-05283813.jpg",
        date: "18/12 – 30/12/1972",
      },
    ],
  },

  // ============================================================
  // 8. Chiến dịch Tây Nguyên (03/1975)
  // ============================================================
  {
    id: 8,
    year: 1975,
    name: "Chiến dịch Tây Nguyên",
    coordinates: { lat: 12.6667, lng: 108.05 },
    description:
      "Chiến dịch Tây Nguyên (3/1975) mở màn cho Tổng tiến công và nổi dậy mùa Xuân 1975. Tây Nguyên được chọn làm hướng tiến công chiến lược vì có vị trí quân sự quan trọng, kiểm soát các tuyến giao thông giữa miền Trung và Nam Bộ. Ngày 10/3/1975, quân giải phóng bất ngờ tiến công Buôn Ma Thuột, nhanh chóng phá vỡ hệ thống phòng thủ của quân đội Sài Gòn tại khu vực. Sau thất bại này, quân đội Sài Gòn buộc phải rút khỏi Pleiku và Kon Tum, khiến toàn bộ Tây Nguyên nhanh chóng được giải phóng.",
    image:
      "https://daklakmuseum.vn/baotangdaklak/imgs/174081405783552.jpeg",
    significance:
      "Chiến thắng Tây Nguyên trở thành bước ngoặt chiến lược của cuộc kháng chiến chống Mỹ, mở đường cho các chiến dịch Huế – Đà Nẵng và Chiến dịch Hồ Chí Minh, tiến tới giải phóng hoàn toàn miền Nam vào ngày 30/4/1975.",
    battles: [
      {
        id: "taynguyen-buonmathuot",
        name: "Buôn Ma Thuột – Trận đánh quyết định",
        coordinates: { lat: 12.6667, lng: 108.05 },
        description:
          "Rạng sáng ngày 10/3/1975, quân giải phóng bất ngờ mở cuộc tiến công vào thị xã Buôn Ma Thuột – mục tiêu chiến lược quan trọng nhất của Chiến dịch Tây Nguyên. Các lực lượng đặc công, pháo binh và xe tăng phối hợp tấn công nhiều mục tiêu trọng yếu như sân bay Hòa Bình, kho Mai Hắc Đế và căn cứ của Sư đoàn 23 quân đội Sài Gòn. Sau nhiều giờ chiến đấu ác liệt trong các ngày 10–11/3, hệ thống phòng thủ của đối phương dần bị phá vỡ. Đến ngày 17/3/1975, toàn bộ thị xã Buôn Ma Thuột được giải phóng, tạo bước ngoặt chiến lược cho chiến dịch và làm sụp đổ hệ thống phòng thủ của quân đội Sài Gòn tại Tây Nguyên.",
        image:
          "https://media.vov.vn/sites/default/files/styles/large/public/2025-02/%C4%90a%CC%81nh%20chie%CC%82%CC%81m%20nga%CC%83%206%20thi%CC%A3%20xa%CC%83%20Buo%CC%82n%20Ma%20Thuo%CC%A3%CC%82t%20trong%20chie%CC%82%CC%81n%20di%CC%A3ch%20Xua%CC%82n%201975_0.jpg",
        date: "10/3/1975 – 17/3/1975",
      },
      {
        id: "taynguyen-pleiku",
        name: "Pleiku – Tuyến phòng thủ chiến lược sụp đổ",
        coordinates: { lat: 13.9833, lng: 108.0 },
        description:
          "Sau thất bại tại Buôn Ma Thuột, hệ thống phòng thủ của quân đội Sài Gòn tại Pleiku nhanh chóng rơi vào tình trạng hoảng loạn và bị cô lập. Trong các ngày 10–15/3/1975, quân giải phóng gia tăng sức ép quân sự quanh khu vực, khiến tình hình phòng thủ ngày càng suy yếu. Trước nguy cơ bị bao vây và tiêu diệt, ngày 16/3/1975 chính quyền Sài Gòn buộc phải ra lệnh rút quân khỏi Pleiku để bảo toàn lực lượng. Tuy nhiên, cuộc rút lui diễn ra trong hỗn loạn và đến ngày 17/3/1975, Pleiku được giải phóng, khiến hệ thống phòng thủ của đối phương tại Tây Nguyên tiếp tục sụp đổ.",
        image:
          "https://special.nhandan.vn/Duluanphuongtayvechiendichtaynguyen/assets/yk7E0OFtPv/chiendichtaynguyen-9-874x549-1-874x549.jpg",
        date: "10/3/1975 – 17/3/1975",
      },
      {
        id: "taynguyen-kontum",
        name: "Kon Tum – Mắt xích cuối cùng của phòng tuyến Tây Nguyên",
        coordinates: { lat: 14.35, lng: 108.0 },
        description:
          "Kon Tum là một vị trí quân sự quan trọng của quân đội Sài Gòn tại Tây Nguyên, nằm trên các tuyến giao thông chiến lược nối cao nguyên với miền Trung. Đầu tháng 3/1975, quân giải phóng tiến công và bao vây các vị trí quanh khu vực này, đồng thời cắt đứt các tuyến tiếp tế của đối phương. Sau thất bại tại Buôn Ma Thuột và Pleiku, lực lượng quân đội Sài Gòn tại Kon Tum rơi vào thế bị cô lập và tinh thần chiến đấu suy giảm. Trước nguy cơ bị bao vây, trong các ngày 16–17/3/1975 quân đội Sài Gòn buộc phải rút lui khỏi khu vực. Đến ngày 17/3/1975, Kon Tum được giải phóng, đánh dấu sự sụp đổ hoàn toàn của hệ thống phòng thủ của quân đội Sài Gòn tại Tây Nguyên.",
        image:
          "https://baotuyenquang.com.vn/file/4028eaa4679b32c401679c0c74382a7e/032025/1_20250317082500.jpg",
        date: "03/1975",
      },
    ],
  },

  // ============================================================
  // 9. Chiến dịch Huế – Đà Nẵng (03/1975)
  // ============================================================
  {
    id: 9,
    year: 1975,
    name: "Chiến dịch Huế – Đà Nẵng",
    coordinates: { lat: 16.0544, lng: 108.2022 },
    description:
      "Chiến dịch Huế – Đà Nẵng là một trong những chiến dịch lớn của Tổng tiến công và nổi dậy mùa Xuân năm 1975, diễn ra tại khu vực miền Trung Việt Nam. Sau thắng lợi của Chiến dịch Tây Nguyên, quân giải phóng nhanh chóng mở các đợt tiến công vào hệ thống phòng thủ của quân đội Sài Gòn tại khu vực Trị – Thiên và Quảng Nam – Đà Nẵng. Với các mũi tiến công nhanh và mạnh, quân giải phóng lần lượt giải phóng nhiều địa bàn quan trọng, trong đó có Huế, Tam Kỳ và cuối cùng là Đà Nẵng – căn cứ quân sự lớn nhất của đối phương ở miền Trung. Chiến dịch kết thúc thắng lợi vào ngày 29/3/1975, đánh dấu sự sụp đổ hoàn toàn của hệ thống phòng thủ của quân đội Sài Gòn tại khu vực miền Trung.",
    image:
      "https://cdn.nhandan.vn/images/22f099ca8bc7ae81aa2a8d3416a84bf8c077298dcec0d06192eab1a0be9ff9b773788f344325da4cce7343006295b363069068eaf6528db853ca3059e723ffedce8814482b7007f2e4626000259e5a7fdc0ca7def67bab94885ec312600084f57c5548edf8497a7cfcbd1f880caab688/25-3-1975-chien-dich-hue-da-nang-820-7636-1772-6926.jpg.webp",
    significance:
      "Chiến thắng của Chiến dịch Huế – Đà Nẵng đã làm tan rã lực lượng quân đội Sài Gòn tại miền Trung, giải phóng một vùng lãnh thổ rộng lớn và tạo ra bước chuyển quan trọng về cục diện chiến tranh. Thắng lợi này mở ra thời cơ thuận lợi để quân giải phóng tiếp tục tiến công vào miền Nam, góp phần quyết định vào thắng lợi của Chiến dịch Hồ Chí Minh, tiến tới giải phóng hoàn toàn miền Nam và thống nhất đất nước.",
    battles: [
      {
        id: "hue-1975",
        name: "Huế - Giải phóng cố đô",
        coordinates: { lat: 16.4637, lng: 107.5909 },
        description:
          "Huế là trung tâm chính trị, văn hóa quan trọng của miền Trung và là một trong những vị trí phòng thủ lớn của quân đội Sài Gòn. Sau thắng lợi của Chiến dịch Tây Nguyên, hệ thống phòng thủ của đối phương tại khu vực Trị – Thiên rơi vào tình trạng rối loạn. Từ ngày 21/3/1975, quân giải phóng bắt đầu mở các đợt tiến công vào các tuyến phòng thủ của quân đội Sài Gòn tại Thừa Thiên Huế. Trong các ngày 24–25/3/1975, các lực lượng cách mạng nhanh chóng bao vây thành phố, đánh chiếm nhiều vị trí quan trọng và cắt đứt các tuyến giao thông chiến lược. Trước sức ép mạnh mẽ của các mũi tiến công, quân đội Sài Gòn rút chạy khỏi thành phố. Đến ngày 26/3/1975, Huế được hoàn toàn giải phóng.",
        image:
          "https://cdn.nhandan.vn/images/22f099ca8bc7ae81aa2a8d3416a84bf8c077298dcec0d06192eab1a0be9ff9b773788f344325da4cce7343006295b363069068eaf6528db853ca3059e723ffedce8814482b7007f2e4626000259e5a7fdc0ca7def67bab94885ec312600084f57c5548edf8497a7cfcbd1f880caab688/25-3-1975-chien-dich-hue-da-nang-820-7636-1772-6926.jpg.webp",
        date: "21/3/1975 – 26/3/1975",
      },
      {
        id: "tamky-1975",
        name: "Tam Kỳ - Phá vỡ tuyến phòng thủ Quảng Tín",
        coordinates: { lat: 15.5736, lng: 108.474 },
        description:
          "Tam Kỳ là tỉnh lỵ của tỉnh Quảng Tín (nay thuộc tỉnh Quảng Nam), nằm trên tuyến giao thông chiến lược nối Huế và Đà Nẵng, giữ vai trò quan trọng trong hệ thống phòng thủ của quân đội Sài Gòn tại miền Trung. Ngày 23/3/1975, quân giải phóng bắt đầu tiến công vào các vị trí phòng thủ quanh Tam Kỳ. Đến 24/3/1975, các đơn vị chủ lực phối hợp với lực lượng địa phương đồng loạt tiến công vào trung tâm thị xã. Trước sức tấn công mạnh mẽ của quân giải phóng, quân đội Sài Gòn nhanh chóng tan rã và rút chạy. Cùng ngày, Tam Kỳ được giải phóng, góp phần làm suy yếu nghiêm trọng tuyến phòng thủ của quân đội Sài Gòn tại miền Trung.",
        image:
          "https://cdn.nhandan.vn/images/1ef398c4e2fb4bf07980a2ded785b3ef73a88e9b2f4f2c5189fca0705a91f675ff2ae8bf529e27c6a4b6fc80950404e0d7bdae8c6445ba0eba5642cc1b36243b078ccf93a0cb713e95a8d087260d44535cb18016cf5fb3ab19751f8b5f35ec14/24-3-1975-chien-dich-hue-da-nang-1866-7859-3623-8206.jpg",
        date: "24/3/1975",
      },
      {
        id: "danang-1975",
        name: "Đà Nẵng - Căn cứ quân sự lớn nhất miền Trung",
        coordinates: { lat: 16.0544, lng: 108.2022 },
        description:
          "Đà Nẵng là căn cứ quân sự lớn nhất của quân đội Sài Gòn tại miền Trung và từng là căn cứ quân sự quan trọng của Mỹ trong chiến tranh Việt Nam. Sau khi Huế được giải phóng, Đà Nẵng trở thành vị trí phòng thủ cuối cùng của quân đội Sài Gòn tại khu vực miền Trung. Ngày 26/3/1975, quân giải phóng bắt đầu áp sát thành phố từ nhiều hướng, đe dọa bao vây toàn bộ Đà Nẵng. Đến 28/3/1975, quân ta phá vỡ hệ thống phòng thủ vòng ngoài của đối phương. Sáng 29/3/1975, pháo binh tập trung bắn vào các mục tiêu quan trọng như sân bay Đà Nẵng, cảng Sơn Trà và sân bay Nước Mặn. Sau đó, các đơn vị bộ binh và xe tăng đồng loạt tiến công từ nhiều hướng, nhanh chóng làm chủ các vị trí chiến lược trong thành phố. Đến 17 giờ 30 phút ngày 29/3/1975, thành phố Đà Nẵng được hoàn toàn giải phóng.",
        image:
          "https://imgnvsk.vnanet.vn/MediaUpload/Content/2025/03/18/1218-8-9-3.jpg",
        date: "26/3/1975 – 29/3/1975",
      },
    ],
  },

  // ============================================================
  // 10. Chiến dịch Hồ Chí Minh (04/1975)
  // ============================================================
  {
    id: 10,
    year: 1975,
    name: "Chiến dịch Hồ Chí Minh",
    coordinates: { lat: 10.8231, lng: 106.6297 },
    description:
      "Sau các thắng lợi tại Tây Nguyên và Huế – Đà Nẵng, cục diện chiến trường miền Nam chuyển biến có lợi cho cách mạng. Ngày 14/4/1975, Bộ Chính trị quyết định mở Chiến dịch Hồ Chí Minh nhằm giải phóng Sài Gòn – Gia Định trong thời gian ngắn nhất. Từ ngày 26/4 đến ngày 30/4/1975, quân giải phóng tiến công vào Sài Gòn từ năm hướng, đánh chiếm các mục tiêu quân sự và cơ quan đầu não của chính quyền Sài Gòn, nhanh chóng phá vỡ hệ thống phòng thủ của đối phương. Chiến dịch kết thúc bằng sự kiện xe tăng húc đổ cổng Dinh Độc Lập lúc 11h30 ngày 30/4/1975.",
    image:
      "https://lh3.googleusercontent.com/d/13bQQjlfEXzVpTSkLPnZ2rwrfu7BVWzgl",
    significance:
      "Sáng 30/4/1975, quân giải phóng tiến vào trung tâm Sài Gòn; lúc 11 giờ 30 phút, xe tăng tiến vào Dinh Độc Lập, Tổng thống Dương Văn Minh tuyên bố đầu hàng vô điều kiện. Chiến dịch toàn thắng, kết thúc cuộc kháng chiến chống Mỹ, giải phóng hoàn toàn miền Nam và thống nhất đất nước, kết thúc 21 năm kháng chiến chống Mỹ và 117 năm chống thực dân, đế quốc. Ghi dấu son chói lọi trong lịch sử dân tộc Việt Nam.",
    battles: [
      {
        id: "HCM-XuanLoc",
        name: "Trận Xuân Lộc",
        coordinates: { lat: 10.9289, lng: 107.2422 },
        description:
          "Xuân Lộc được mệnh danh là \"cánh cửa thép\" bảo vệ Sài Gòn từ phía Đông. Tại đây, quân đội Sài Gòn tập trung các lực lượng mạnh như lữ đoàn dù và sư đoàn bộ binh để cố thủ. Trước tình hình đó, quân ta chuyển từ chiến thuật đánh trực diện sang bao vây, chia cắt và cô lập Xuân Lộc. Ngày 21/4/1975, phòng tuyến Xuân Lộc bị phá vỡ; cùng ngày, Tổng thống Nguyễn Văn Thiệu tuyên bố từ chức và rời khỏi Việt Nam, mở toang \"cánh cửa\" để các quân đoàn chủ lực tiến vào giải phóng Sài Gòn.",
        image:
          "https://lh3.googleusercontent.com/d/1qTtl5sD06stK6VJ4uFwsgF_bOvTbeJKO",
        date: "09/04 – 21/04/1975",
      },
      {
        id: "HCM-CauSaiGon",
        name: "Cầu Sài Gòn",
        coordinates: { lat: 10.8023, lng: 106.7401 },
        description:
          "Cầu Sài Gòn là chốt chặn huyết mạch cuối cùng trên hướng Đông Bắc để tiến vào nội đô Sài Gòn. Tại đây, quân đội Sài Gòn thiết lập một \"lá chắn thép\" với xe tăng, tàu chiến dưới sông và hỏa lực mạnh từ các tòa nhà cao tầng nhằm phong tỏa mặt cầu. Đội hình xe tăng của Lữ đoàn 203, với các xe dẫn đầu 843 và 390, phối hợp cùng bộ binh Sư đoàn 304 tiến công quyết liệt, tiêu diệt các ổ đề kháng tại đầu cầu. Kết quả, quân ta đập tan tuyến phòng thủ cuối cùng của địch ở cửa ngõ phía Đông, làm chủ cây cầu và mở đường cho cánh quân tiến thẳng vào Dinh Độc Lập.",
        image:
          "https://lh3.googleusercontent.com/d/1XD-eg9UZaOakHLm5qVWRcVThssSCtHGZ",
        date: "30/04/1975",
      },
      {
        id: "HCM-TanSonNhat&BoTongthammuunguy",
        name: "Tân Sơn Nhất & Bộ Tổng tham mưu ngụy",
        coordinates: { lat: 10.8188, lng: 106.6519 },
        description:
          "Sân bay Tân Sơn Nhất là điểm quyết chiến quan trọng ở cửa ngõ Tây Bắc Sài Gòn trong giai đoạn cuối của chiến dịch. Tại đây, Sư đoàn 10 (thuộc Quân đoàn 3) tiến công mạnh nhằm làm tê liệt hoàn toàn hệ thống không vận của đối phương. Pháo binh ta bắn cấp tập vào sân bay, phá hủy các đường băng; đồng thời các mũi tiến công khác đánh chiếm Bộ Tổng tham mưu Quân lực Việt Nam Cộng hòa – cơ quan đầu não chỉ huy quân đội Sài Gòn. Quân ta nhanh chóng làm chủ các mục tiêu trọng yếu như đường băng, kho xăng dầu và Bộ tư lệnh Không quân. Kết quả, toàn bộ hệ thống hàng không của địch bị tê liệt; kế hoạch di tản bằng máy bay cánh cố định của Mỹ thất bại, buộc họ phải chuyển sang cuộc di tản bằng trực thăng hỗn loạn từ các nóc nhà trong thành phố.",
        image:
          "https://lh3.googleusercontent.com/d/1ShKDHO9T-xkw_CLSySgyT0Ggmvo9Bot-",
        date: "30/04/1975",
      },
      {
        id: "HCM-DinhDocLap",
        name: "Dinh Độc Lập",
        coordinates: { lat: 10.777, lng: 106.6953 },
        description:
          "Dinh Độc Lập là cơ quan đầu não cao nhất của chính quyền Sài Gòn và cũng là điểm hội tụ cuối cùng của năm cánh quân giải phóng trong Chiến dịch Hồ Chí Minh, nơi chứng kiến sự sụp đổ hoàn toàn của chế độ cũ. Lúc 10h45 ngày 30/4/1975, xe tăng 843 do đại đội trưởng Bùi Quang Thận chỉ huy húc vào cổng phụ nhưng bị kẹt lại; ngay sau đó xe tăng 390 do trưởng xe Vũ Đăng Toàn điều khiển đã húc đổ cổng chính và tiến thẳng vào sân dinh. Đến 11h30, Bùi Quang Thận hạ lá cờ của chính quyền Sài Gòn và cắm lá cờ Giải phóng trên nóc dinh; cùng thời điểm đó tại Đài Phát thanh Sài Gòn, Tổng thống Dương Văn Minh tuyên bố đầu hàng vô điều kiện. Sự kiện này đánh dấu thắng lợi hoàn toàn của Chiến dịch Hồ Chí Minh, Sài Gòn được tiếp quản gần như nguyên vẹn, chấm dứt 21 năm kháng chiến chống Mỹ và mở ra kỷ nguyên mới: non sông liền một dải, đất nước bước vào thời kỳ độc lập, thống nhất và cùng tiến lên chủ nghĩa xã hội.",
        image:
          "https://lh3.googleusercontent.com/d/1gVDP6ak8z4Voqx2yLOSf1a1sWIHBkUQ6",
        date: "30/04/1975",
      },
    ],
  },
];
