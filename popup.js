let mediaRecorder;
let recordedChunks = [];
let audioContext;
let audioSource;
let analyser;

document.getElementById('startRecord').addEventListener('click', async () => {
  const startButton = document.getElementById('startRecord');
  const stopButton = document.getElementById('stopRecord');
  
  try {
    const stream = await new Promise((resolve, reject) => {
      chrome.tabCapture.capture({
        audio: true,
        video: false
      }, (stream) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(stream);
        }
      });
    });
    
    // Thêm xử lý audio realtime
    audioContext = new AudioContext();
    audioSource = audioContext.createMediaStreamSource(stream);
    
    // Tạo analyser node để đọc dữ liệu âm thanh
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    // Kết nối source -> analyser -> destination
    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);
    
    // Hàm để đọc và hiển thị dữ liệu âm thanh
    function getAudioData() {
      analyser.getByteTimeDomainData(dataArray);
      console.log('Audio Data:', Array.from(dataArray));
      requestAnimationFrame(getAudioData);
    }
    
    // Bắt đầu đọc dữ liệu
    getAudioData();
    
    // Tiếp tục ghi âm như bình thường
    mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
        console.log("Chunk mới:", event.data.size, "bytes");
        console.log("Tổng số chunks:", recordedChunks.length);
      } else {
        console.log("Nhận được chunk rỗng");
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'tab-audio.webm';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      recordedChunks = [];
    };

    mediaRecorder.start();
    startButton.disabled = true;
    stopButton.disabled = false;
  } catch (err) {
    console.error('Lỗi khi ghi âm:', err);
  }
});

document.getElementById('stopRecord').addEventListener('click', () => {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    // Dừng audio context khi dừng ghi âm
    if (audioContext) {
      audioSource.disconnect();
      audioContext.close();
    }
    document.getElementById('startRecord').disabled = false;
    document.getElementById('stopRecord').disabled = true;
  }
}); 