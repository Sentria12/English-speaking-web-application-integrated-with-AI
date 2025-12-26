import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";

const InitialAssessment = () => {
  const { completeAssessment } = useAuth();
  const navigate = useNavigate();

  const handleComplete = () => {
    alert("Đánh giá hoàn tất! Chào mừng bạn đến với AESP.");
    completeAssessment();
    navigate("/dashboard/packages");
  };

  return (
    <div className="container" style={{ maxWidth: "800px", marginTop: "80px" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5em", color: "white" }}>
          Đánh Giá Trình Độ Ban Đầu
        </h1>
        <p
          style={{
            fontSize: "1.3em",
            color: "white",
            opacity: 0.9,
            marginTop: "20px",
          }}
        >
          Hãy nói rõ ràng câu sau vào micro để AI đánh giá trình độ của bạn:
        </p>
        <p
          className="prompt-text"
          style={{
            fontSize: "1.6em",
            fontStyle: "italic",
            color: "#ffd89b",
            margin: "30px 0",
          }}
        >
          Please introduce yourself and tell me about your hobbies.
        </p>
      </div>

      <button
        className="btn-primary-large"
        onClick={handleComplete}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <i className="fas fa-microphone"></i> Bắt đầu ghi âm
      </button>

      <p
        style={{
          color: "white",
          opacity: 0.8,
          marginTop: "40px",
          textAlign: "center",
        }}
      >
        Sau khi hoàn thành, bạn sẽ được chuyển đến lộ trình học cá nhân hóa.
      </p>
    </div>
  );
};

export default InitialAssessment;
