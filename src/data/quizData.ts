import type { QuizQuestion } from '@/types'

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Phong trào Đồng Khởi bắt đầu từ tỉnh nào?',
    options: ['Long An', 'Bến Tre', 'Tây Ninh', 'Đồng Nai'],
    correctIndex: 1,
    explanation:
      'Phong trào Đồng Khởi bắt đầu từ Bến Tre vào ngày 17/1/1960, dưới sự lãnh đạo của bà Nguyễn Thị Định.',
    campaignId: 1,
  },
  {
    id: 2,
    question: 'Mặt trận Dân tộc Giải phóng miền Nam Việt Nam được thành lập vào ngày nào?',
    options: ['17/01/1960', '20/12/1960', '31/01/1968', '30/04/1975'],
    correctIndex: 1,
    explanation:
      'Mặt trận Dân tộc Giải phóng miền Nam Việt Nam được thành lập ngày 20/12/1960, sau thắng lợi của phong trào Đồng Khởi.',
    campaignId: 1,
  },
  {
    id: 3,
    question:
      'Trong cuộc Tổng tiến công Tết Mậu Thân 1968, cờ Mặt trận được treo trên Kỳ đài Huế trong bao nhiêu ngày?',
    options: ['10 ngày', '25 ngày', '30 ngày', '45 ngày'],
    correctIndex: 1,
    explanation:
      'Quân giải phóng chiếm được Thành nội Huế và treo cờ Mặt trận trên Kỳ đài suốt 25 ngày (31/01 - 25/02/1968).',
    campaignId: 3,
  },
  {
    id: 4,
    question: 'Trận Khe Sanh kéo dài bao nhiêu ngày đêm?',
    options: ['50 ngày đêm', '56 ngày đêm', '66 ngày đêm', '77 ngày đêm'],
    correctIndex: 3,
    explanation:
      'Quân Giải phóng bao vây căn cứ Khe Sanh (Quảng Trị) suốt 77 ngày đêm (21/01 - 09/04/1968).',
    campaignId: 3,
  },
  {
    id: 5,
    question:
      'Cuộc Tổng tiến công Tết Mậu Thân 1968 buộc Tổng thống Mỹ nào tuyên bố không tái tranh cử?',
    options: ['Richard Nixon', 'John F. Kennedy', 'Lyndon B. Johnson', 'Gerald Ford'],
    correctIndex: 2,
    explanation:
      "Cuộc Tổng tiến công Tết Mậu Thân đã làm phá sản chiến lược 'Chiến tranh cục bộ', buộc Tổng thống Lyndon B. Johnson tuyên bố không tái tranh cử.",
    campaignId: 3,
  },
  {
    id: 6,
    question:
      "Trong Chiến dịch Xuân - Hè 1972, trận 'Thành cổ Quảng Trị' kéo dài bao nhiêu ngày đêm?",
    options: ['56 ngày đêm', '66 ngày đêm', '77 ngày đêm', '81 ngày đêm'],
    correctIndex: 3,
    explanation:
      "Trận 'Thành cổ Quảng Trị' kéo dài 81 ngày đêm (từ tháng 6/1972) và trở thành biểu tượng huyền thoại của sự hy sinh anh dũng.",
    campaignId: 5,
  },
  {
    id: 7,
    question: 'Hiệp định Paris được ký kết vào ngày nào, buộc Mỹ rút quân khỏi miền Nam?',
    options: ['27/01/1972', '27/01/1973', '30/04/1975', '02/09/1975'],
    correctIndex: 1,
    explanation:
      'Hiệp định Paris được ký ngày 27/01/1973, buộc Mỹ phải rút hết quân khỏi miền Nam Việt Nam.',
    campaignId: 7,
  },
  {
    id: 8,
    question: 'Chiến dịch Tây Nguyên mở màn bằng trận đánh nào?',
    options: ['Trận Pleiku', 'Trận Kontum', 'Trận Buôn Ma Thuột', 'Trận Đắk Tô'],
    correctIndex: 2,
    explanation:
      'Ngày 10/3/1975, quân Giải phóng bất ngờ tấn công Buôn Ma Thuột, chỉ trong 32 giờ đã làm chủ hoàn toàn thị xã.',
    campaignId: 8,
  },
  {
    id: 9,
    question: 'Cuộc rút chạy hỗn loạn của quân VNCH trên Đường 7B diễn ra sau sự kiện nào?',
    options: ['Mất Huế', 'Mất Buôn Ma Thuột', 'Mất Đà Nẵng', 'Mất Xuân Lộc'],
    correctIndex: 1,
    explanation:
      'Sau khi mất Buôn Ma Thuột, Nguyễn Văn Thiệu ra lệnh rút quân khỏi Pleiku và Kontum theo Đường 7B, biến thành cuộc tháo chạy hỗn loạn.',
    campaignId: 8,
  },
  {
    id: 10,
    question: 'Trận Xuân Lộc được gọi là gì trong hệ thống phòng thủ Sài Gòn?',
    options: ["'Lá chắn thép'", "'Cánh cửa thép'", "'Bức tường thép'", "'Pháo đài thép'"],
    correctIndex: 1,
    explanation:
      "Trận Xuân Lộc (9-21/4/1975) được gọi là 'cánh cửa thép' bảo vệ Sài Gòn. Sau 12 ngày chiến đấu, quân Giải phóng đập tan tuyến phòng thủ này.",
    campaignId: 10,
  },
  {
    id: 11,
    question: 'Xe tăng nào húc đổ cổng Dinh Độc Lập ngày 30/4/1975?',
    options: ['T-54 số hiệu 390', 'T-54 số hiệu 843', 'T-59 số hiệu 390', 'T-59 số hiệu 843'],
    correctIndex: 1,
    explanation:
      'Lúc 10h45 ngày 30/4/1975, xe tăng T-54 số hiệu 843 húc đổ cổng Dinh Độc Lập. Trung úy Bùi Quang Thận cắm cờ trên nóc Dinh.',
    campaignId: 10,
  },
  {
    id: 12,
    question: 'Tổng thống VNCH nào tuyên bố đầu hàng vô điều kiện ngày 30/4/1975?',
    options: ['Nguyễn Văn Thiệu', 'Trần Văn Hương', 'Dương Văn Minh', 'Nguyễn Cao Kỳ'],
    correctIndex: 2,
    explanation:
      'Tổng thống Dương Văn Minh tuyên bố đầu hàng vô điều kiện lúc 11h30 ngày 30/4/1975, kết thúc cuộc chiến.',
    campaignId: 10,
  },
  {
    id: 13,
    question: 'Chiến dịch Hồ Chí Minh tiến vào Sài Gòn bằng bao nhiêu cánh quân?',
    options: ['3 cánh quân', '4 cánh quân', '5 cánh quân', '6 cánh quân'],
    correctIndex: 2,
    explanation:
      'Chiến dịch Hồ Chí Minh (26/4 - 30/4/1975) với 5 cánh quân từ các hướng đồng loạt tiến vào Sài Gòn.',
    campaignId: 10,
  },
  {
    id: 14,
    question: 'Ai là người lãnh đạo cuộc khởi nghĩa Mỏ Cày (Bến Tre) năm 1960?',
    options: ['Bà Nguyễn Thị Định', 'Bà Nguyễn Thị Bình', 'Ông Võ Văn Kiệt', 'Ông Lê Duẩn'],
    correctIndex: 0,
    explanation:
      'Ngày 17/1/1960, hàng vạn nhân dân Mỏ Cày (Bến Tre) đồng loạt nổi dậy dưới sự lãnh đạo của bà Nguyễn Thị Định.',
    campaignId: 1,
  },
  {
    id: 15,
    question: 'Chiến dịch Xuân - Hè 1972 mở bao nhiêu hướng tiến công đồng thời?',
    options: ['2 hướng', '3 hướng', '4 hướng', '5 hướng'],
    correctIndex: 1,
    explanation:
      'Chiến dịch Xuân - Hè 1972 mở 3 hướng tiến công đồng thời: Quảng Trị, Tây Nguyên (Kontum), và Đông Nam Bộ (An Lộc).',
    campaignId: 6,
  },
]
