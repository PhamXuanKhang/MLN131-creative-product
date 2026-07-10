/**
 * Câu hỏi PLACEHOLDER — giữ khung Quiz chạy được trong khi nhóm soạn nội dung
 * thật (giai đoạn cuối). Nội dung là data thuần, thay không đụng code.
 */
import type { QuizQuestion } from '@/types/events'

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Tác phẩm "Tuyên ngôn của Đảng Cộng sản" được công bố lần đầu vào thời gian nào?',
    options: ['Tháng 2/1848', 'Tháng 9/1864', 'Tháng 3/1871', 'Tháng 11/1917'],
    correctIndex: 0,
    explanation:
      'Tuyên ngôn của Đảng Cộng sản do C. Mác và Ph. Ăngghen soạn thảo, công bố tháng 2/1848 tại London — đánh dấu sự ra đời của chủ nghĩa xã hội khoa học.',
    eventSlug: 'tac-pham-tuyen-ngon-cua-dang-cong-san-do-c-mac-va-ph',
  },
  {
    id: 2,
    question: 'Cách mạng Tháng Mười Nga thành công vào năm nào?',
    options: ['1905', '1917', '1919', '1922'],
    correctIndex: 1,
    explanation:
      'Cách mạng Tháng Mười Nga (1917) dẫn đến sự ra đời của Nhà nước Xôviết — nhà nước xã hội chủ nghĩa đầu tiên trên thế giới.',
    eventSlug: 'cach-mang-thang-muoi-nga-thanh-cong-dan-den-su-ra-doi-cua',
  },
  {
    id: 3,
    question: 'Đại hội nào của Đảng Cộng sản Việt Nam khởi xướng công cuộc Đổi mới?',
    options: ['Đại hội IV (1976)', 'Đại hội V (1982)', 'Đại hội VI (1986)', 'Đại hội VII (1991)'],
    correctIndex: 2,
    explanation:
      'Đại hội VI (12/1986) đề ra đường lối Đổi mới toàn diện, trước hết là đổi mới tư duy kinh tế.',
    eventSlug: 'dai-hoi-lan-thu-vi-cua-dang-khoi-xuong-cong-cuoc-doi-moi',
  },
  {
    id: 4,
    question: 'Quốc tế I (Hội Liên hiệp Lao động Quốc tế) được thành lập vào năm nào?',
    options: ['1848', '1864', '1871', '1889'],
    correctIndex: 1,
    explanation:
      'Quốc tế I được thành lập ngày 28/9/1864 tại London nhằm đoàn kết và lãnh đạo phong trào công nhân quốc tế.',
    eventSlug: 'quoc-te-i-hoi-lien-hiep-lao-dong-quoc-te-duoc-thanh-lap',
  },
  {
    id: 5,
    question: 'Công xã Paris tồn tại trong khoảng thời gian nào?',
    options: ['18/3/1871 - 28/5/1871', '1/5/1871 - 30/6/1871', '18/3/1864 - 28/5/1864', '1/1/1871 - 18/3/1871'],
    correctIndex: 0,
    explanation:
      'Công xã Paris tồn tại từ ngày 18/3 đến 28/5/1871, là nhà nước kiểu mới đầu tiên của giai cấp công nhân.',
    eventSlug: 'cong-xa-paris-ton-tai-tu-ngay-18-thang-3-den-28-thang-5-nam-1871',
  },
  {
    id: 6,
    question: 'Tập I của bộ "Tư bản" do C. Mác biên soạn được xuất bản lần đầu vào năm nào?',
    options: ['1848', '1864', '1867', '1875'],
    correctIndex: 2,
    explanation:
      'Năm 1867, tập I của bộ Tư bản được xuất bản, đặt nền móng cho kinh tế chính trị học Mác-xít.',
    eventSlug: 'tap-i-cua-bo-tu-ban-duoc-xuat-ban-lan-dau-nam-1867',
  },
  {
    id: 7,
    question: 'Phong trào Hiến chương diễn ra tại quốc gia nào?',
    options: ['Pháp', 'Đức', 'Nga', 'Anh'],
    correctIndex: 3,
    explanation:
      'Phong trào Hiến chương diễn ra ở Anh từ năm 1836 đến năm 1848, là phong trào chính trị rộng lớn đầu tiên của giai cấp công nhân.',
    eventSlug: 'phong-trao-hien-chuong-dien-ra-tai-anh',
  },
  {
    id: 8,
    question: 'Cuộc khởi nghĩa của công nhân dệt ở thành phố Lyon (Pháp) lần thứ nhất nổ ra vào năm nào?',
    options: ['1825', '1831', '1844', '1848'],
    correctIndex: 1,
    explanation:
      'Năm 1831, công nhân dệt Lyon nổi dậy đấu tranh chống sự bóc lột của giai cấp tư sản.',
    eventSlug: 'cuoc-khoi-nghia-cua-cong-nhan-det-lyon-lan-thu-nhat',
  },
  {
    id: 9,
    question: 'Khẩu hiệu nổi tiếng của công nhân Lyon là gì?',
    options: [
      'Tự do - Bình đẳng - Bác ái',
      'Lao động là vinh quang',
      'Sống trong lao động hoặc chết trong chiến đấu',
      'Tất cả quyền lực về tay nhân dân'
    ],
    correctIndex: 2,
    explanation:
      'Khẩu hiệu "Sống trong lao động hoặc chết trong chiến đấu" thể hiện tinh thần đấu tranh quyết liệt của công nhân Lyon.',
    eventSlug: 'khau-hieu-song-trong-lao-dong-hoac-chet-trong-chien-dau',
  },
  {
    id: 10,
    question: 'Cuộc nổi dậy của công nhân dệt ở Xilêđi (Đức) diễn ra vào năm nào?',
    options: ['1831', '1834', '1844', '1848'],
    correctIndex: 2,
    explanation:
      'Tháng 6 năm 1844, công nhân dệt ở Xilêđi (Đức) đã nổi dậy chống lại sự áp bức và bóc lột.',
    eventSlug: 'cuoc-noi-day-cua-cong-nhan-det-xiledi-duc-nam-1844',
  },
  {
    id: 11,
    question: 'Tác phẩm "Làm gì?" của V.I. Lênin được xuất bản vào năm nào?',
    options: ['1898', '1902', '1905', '1917'],
    correctIndex: 1,
    explanation:
      'Tác phẩm "Làm gì?" (1902) khẳng định vai trò của đảng cách mạng kiểu mới của giai cấp công nhân.',
    eventSlug: 'tac-pham-lam-gi-cua-v-i-lenin-nam-1902',
  },
  {
    id: 12,
    question: 'Sự kiện nào đánh dấu sự ra đời của nhà nước xã hội chủ nghĩa đầu tiên trên thế giới?',
    options: [
      'Công xã Paris năm 1871',
      'Thành lập Quốc tế I năm 1864',
      'Cách mạng Tháng Mười Nga năm 1917',
      'Thành lập Liên Xô năm 1922'
    ],
    correctIndex: 2,
    explanation:
      'Thắng lợi của Cách mạng Tháng Mười Nga năm 1917 đã đưa giai cấp công nhân lên nắm chính quyền và mở ra thời đại mới trong lịch sử nhân loại.',
    eventSlug: 'cach-mang-thang-muoi-nga-va-su-ra-doi-nha-nuoc-xa-hoi-chu-nghia',
  },
  {
    id: 13,
    question: 'Tác phẩm "Phê phán cương lĩnh Gôta" của C. Mác được viết vào năm nào?',
    options: ['1867', '1871', '1875', '1883'],
    correctIndex: 2,
    explanation:
      'Tác phẩm được viết năm 1875 nhằm phê phán những quan điểm sai lầm trong cương lĩnh của Đảng Công nhân Đức.',
    eventSlug: 'phe-phan-cuong-linh-gota-nam-1875',
  },
  {
    id: 14,
    question: 'Liên bang Cộng hòa Xã hội Chủ nghĩa Xô viết (Liên Xô) được thành lập vào năm nào?',
    options: ['1917', '1919', '1922', '1924'],
    correctIndex: 2,
    explanation:
      'Ngày 30/12/1922, Liên bang Cộng hòa Xã hội Chủ nghĩa Xô viết chính thức được thành lập.',
    eventSlug: 'lien-xo-duoc-thanh-lap-nam-1922',
  },
  {
    id: 15,
    question: 'Ai là người cùng với C. Mác sáng lập chủ nghĩa xã hội khoa học?',
    options: [
      'V.I. Lênin',
      'Ph. Ăngghen',
      'R. Ô-oen',
      'Xanh Xi-mông'
    ],
    correctIndex: 1,
    explanation:
      'Ph. Ăngghen là cộng sự thân thiết của C. Mác và cùng sáng lập chủ nghĩa xã hội khoa học.',
    eventSlug: 'ph-angghen-cung-c-mac-sang-lap-chu-nghia-xa-hoi-khoa-hoc',
  },
]
