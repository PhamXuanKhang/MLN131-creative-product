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
]
