# Tab Audio Capture Extension

## Giới thiệu
Đây là một Chrome Extension cho phép ghi âm và xử lý âm thanh từ tab đang hoạt động trên trình duyệt Chrome. Extension này không chỉ ghi âm mà còn có khả năng xử lý và phân tích âm thanh theo thời gian thực.

## Tính năng chính
- Ghi âm tab đang hoạt động trên Chrome
- Phân tích âm thanh theo thời gian thực (Real-time audio analysis)
- Truyền dữ liệu âm thanh qua WebSocket
- Xuất file âm thanh dạng .webm
- Hiển thị trực quan dữ liệu âm thanh thông qua Web Audio API

## Cách hoạt động
1. **Ghi âm tab:**
   - Sử dụng Chrome Tab Capture API để thu âm thanh từ tab
   - Dữ liệu được ghi lại thông qua MediaRecorder API

2. **Xử lý âm thanh:**
   - Sử dụng Web Audio API để xử lý âm thanh
   - Chuyển đổi dữ liệu âm thanh từ Float32 sang Int16
   - Phân tích tần số âm thanh qua AnalyserNode

3. **Truyền dữ liệu:**
   - Kết nối với server qua WebSocket
   - Gửi dữ liệu âm thanh đã được xử lý theo thời gian thực
   - Đính kèm metadata về tần số lấy mẫu

4. **Lưu trữ:**
   - Lưu file âm thanh dạng .webm
   - Tự động tải xuống khi dừng ghi âm

## Yêu cầu kỹ thuật
- Chrome Browser
- Quyền truy cập tab (tabCapture permission)
- WebSocket server (mặc định kết nối tới ws://172.29.209.***:****)

## Cách sử dụng
1. Click nút "Start Record" để bắt đầu ghi âm
2. Extension sẽ tự động:
   - Ghi âm tab hiện tại
   - Phân tích và gửi dữ liệu âm thanh
   - Hiển thị thông tin về dữ liệu âm thanh trong console
3. Click nút "Stop Record" để dừng ghi âm
4. File âm thanh sẽ tự động được tải xuống

## Lưu ý
- Đảm bảo có kết nối internet ổn định khi sử dụng tính năng WebSocket
- Cần cấp quyền truy cập tab cho extension
- Chỉ hoạt động với các tab không bị hạn chế bởi Chrome (như Chrome Web Store)
