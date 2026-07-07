# Âm thanh — public/audio/

Bỏ file mp3 vào đây với đúng tên dưới; app tự nhận, không cần sửa code
(đăng ký ở `src/shared/AudioManager/audioManager.ts → initSounds()`).
Thiếu file nào thì hiệu ứng đó im lặng, không lỗi.

| File | Dùng cho |
|---|---|
| `click.mp3` | Click nút (Opening CTA) |
| `paper.mp3` | Bung card giấy dó (Vietnam) |
| `film.mp3` | Film transition khi đổi phòng |
| `ambient-world.mp3` | Nhạc nền phòng Thế giới (loop) |
| `ambient-vietnam.mp3` | Nhạc nền phòng Việt Nam (loop) |

Gợi ý: chọn nguồn CC0/royalty-free (Pixabay, freesound), ambient nên ≤1MB
(nén ~96kbps mono là đủ), hiệu ứng ngắn <100kB.
