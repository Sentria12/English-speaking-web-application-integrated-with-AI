// ==================== TRẠNG THÁI CHUNG ====================
const isLoggedIn = localStorage.getItem("aesp_logged_in") === "true";
let currentPackage = localStorage.getItem("aesp_package") || null;
let currentTopic = "";

// ==================== KIỂM TRA ĐĂNG NHẬP ====================
function requireLogin() {
  if (!isLoggedIn) {
    alert("Bạn cần đăng nhập trước!");
    window.location.href = "index.html";
  }
}

// ==================== ĐĂNG XUẤT ====================
function logout() {
  if (confirm("Đăng xuất nhé?")) {
    localStorage.removeItem("aesp_logged_in");
    window.location.href = "index.html";
  }
}

// ==================== USER DATA ====================
let users = JSON.parse(localStorage.getItem("aesp_users")) || [];

// ==================== PROGRESS DATA ====================
let userProgress = JSON.parse(localStorage.getItem("aesp_progress")) || {
  overallScore: 35,
  pronunciation: 60,
  grammarVocab: 55,
  fluency: 50,
  streak: 1,
  practiceCount: 0,
  totalMinutes: 10,
  newWords: 30,
  lastPracticeDate: null,
};

// ==================== SAVE ====================
function saveProgress() {
  localStorage.setItem("aesp_progress", JSON.stringify(userProgress));
}

// ==================== INDEX.HTML (LOGIN & REGISTER) ====================
if (document.getElementById("login-form")) {
  const loginTab = document.getElementById("login-tab");
  const registerTab = document.getElementById("register-tab");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const authTitle = document.getElementById("auth-title");

  // --- LOGIC CHUYỂN ĐỔI TAB ---
  if (loginTab && registerTab) {
    loginTab.addEventListener("click", () => {
      loginTab.classList.add("tab-active");
      registerTab.classList.remove("tab-active");
      loginForm.classList.remove("hidden");
      registerForm.classList.add("hidden");
      authTitle.textContent = "Chào mừng trở lại";
    });

    registerTab.addEventListener("click", () => {
      registerTab.classList.add("tab-active");
      loginTab.classList.remove("tab-active");
      registerForm.classList.remove("hidden");
      loginForm.classList.add("hidden");
      authTitle.textContent = "Tạo tài khoản mới";
    });
  }

  // --- XỬ LÝ ĐĂNG NHẬP ---
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value;

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("aesp_logged_in", "true");
      alert(`Chào mừng ${username}!`);
      window.location.href = "dashboard.html"; // Chuyển đến trang chủ sau khi đăng nhập
    } else {
      document.getElementById("auth-error").textContent =
        "Sai tên đăng nhập hoặc mật khẩu!";
    }
  });

  // --- XỬ LÝ ĐĂNG KÝ ---
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("reg-username").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value;
    const confirm = document.getElementById("reg-confirm").value;

    if (users.find((u) => u.username === username)) {
      alert("Tên đăng nhập đã tồn tại!");
      return;
    }
    if (password !== confirm || password.length < 6) {
      alert("Mật khẩu không khớp hoặc quá ngắn (tối thiểu 6 ký tự)!");
      return;
    }

    users.push({ username, email, password });
    localStorage.setItem("aesp_users", JSON.stringify(users));
    alert("Đăng ký thành công! Hãy đăng nhập nhé.");

    // Tự động chuyển về tab Đăng nhập sau khi đăng ký xong
    loginTab.click();
  });
}

// ==================== CÁC PHẦN KHÁC (GIỮ NGUYÊN) ====================

// --- UPDATE UI DASHBOARD ---
function updateProgressDisplay() {
  const scoreEl = document.getElementById("progress-score");
  const labelEl = document.getElementById("progress-label");
  if (!scoreEl || !labelEl) return;
  scoreEl.textContent = userProgress.overallScore + "%";
  const levels = ["Beginner", "Intermediate", "Advanced", "Fluent"];
  const level =
    userProgress.overallScore < 40
      ? levels[0]
      : userProgress.overallScore < 70
      ? levels[1]
      : userProgress.overallScore < 90
      ? levels[2]
      : levels[3];
  labelEl.textContent = "Trình độ: " + level;
}

// --- ASSESSMENT ---
if (document.getElementById("start-assessment")) {
  requireLogin();
  document.getElementById("start-assessment").addEventListener("click", () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Trình duyệt không hỗ trợ mic!");
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      const score = Math.floor(Math.random() * 30) + 50;
      document.getElementById(
        "assessment-feedback"
      ).innerHTML = `<strong>Bạn nói:</strong> ${transcript}<br><strong>Điểm:</strong> ${score}%`;
      userProgress.overallScore = Math.round(
        (userProgress.overallScore + score) / 2
      );
      saveProgress();
    };
    recognition.start();
  });
}

// --- PACKAGES ---
if (document.querySelector(".btn-package")) {
  requireLogin();
  document.querySelectorAll(".btn-package").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentPackage = btn.dataset.package;
      localStorage.setItem("aesp_package", currentPackage);
      alert(`Đã chọn gói ${currentPackage.toUpperCase()}`);
    });
  });
}
