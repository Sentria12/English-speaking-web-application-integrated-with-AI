import { useState } from 'react'

const Practice = () => {
  const [started, setStarted] = useState(false)

  return (
    <>
      <h2>Luyện Nói Với AI</h2>
      <div className="topic-selector">
        <select id="topic-select">
          <option value="">Chọn chủ đề</option>
          <option value="daily">Cuộc sống hàng ngày</option>
          <option value="travel">Du lịch</option>
          <option value="business">Kinh doanh</option>
          <option value="healthcare">Y tế</option>
        </select>
        <button className="btn-primary" onClick={() => setStarted(true)}>Bắt đầu</button>
      </div>
      {started && (
        <div className="practice-chat">
          <div className="chat-messages"></div>
          <div className="chat-input">
            <button className="btn-speak">
              <i className="fas fa-microphone"></i> Nói ngay
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Practice