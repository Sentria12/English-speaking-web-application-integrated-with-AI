const Progress = () => {
  return (
    <>
      <h2>Tiến Độ Học Tập</h2>
      <div className="progress-overview">
        <div className="progress-circle">
          <svg viewBox="0 0 36 36" className="circular-chart">
            <path
              className="circle-bg"
              d="M18 2.0845 a 15.9155 15.9155 0 1 1 0 31.831 a 15.9155 15.9155 0 1 1 0 -31.831"
            />
            <path
              className="circle-progress"
              d="M18 2.0845 a 15.9155 15.9155 0 1 1 0 31.831 a 15.9155 15.9155 0 1 1 0 -31.831"
            />
            <text x="18" y="20.35" className="percentage"></text>
          </svg>
        </div>
      </div>
    </>
  );
};

export default Progress;
