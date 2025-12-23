import { useState } from 'react'

const Assessment = () => {
  const [feedback, setFeedback] = useState('')

  return (
    <>
      <h2>Đánh Giá Trình Độ Ban Đầu</h2>
      <div className="prompt-box">
        <p>Hãy nói rõ ràng câu sau vào micro:</p>
        <p className="prompt-text">Please introduce yourself and tell me about your hobbies.</p>
      </div>
      <button className="btn-primary" onClick={() => setFeedback('Đánh giá hoàn tất! Trình độ Beginner (mock).')}>
        <i className="fas fa-microphone"></i> Bắt đầu ghi âm
      </button>
      {feedback && <div className="feedback-box">{feedback}</div>}
    </>
  )
}

export default Assessment