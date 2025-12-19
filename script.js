// ==================== TRẠNG THÁI & DỮ LIỆU ====================
let isLoggedIn = false;
let currentPackage = null;
let currentTopic = '';

// Mock tiến bộ
let userProgress = JSON.parse(localStorage.getItem('aesp_progress')) || {
    overallScore: 35,
    pronunciation: 60,
    grammarVocab: 55,
    fluency: 50,
    streak: 1,
    practiceCount: 0,
    totalMinutes: 10,
    newWords: 30,
    lastPracticeDate: null
};

// Cập nhật streak
let today = new Date().toISOString().split('T')[0];
if (userProgress.lastPracticeDate !== today) {
    if (userProgress.lastPracticeDate === new Date(Date.now() - 86400000).toISOString().split('T')[0]) {
        userProgress.streak++;
    } else if (userProgress.lastPracticeDate) {
        userProgress.streak = 1;
    }
    userProgress.lastPracticeDate = today;
}

// ==================== DOM ====================
const authSection = document.getElementById('auth-section');
const dashboard = document.getElementById('dashboard');
const logoutBtn = document.getElementById('logout-btn');
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.main-content > section.card');

// Users
let users = JSON.parse(localStorage.getItem('aesp_users')) || [];

// ==================== HÀM CHUNG ====================
function showDashboard() {
    authSection.classList.add('hidden');
    dashboard.classList.remove('hidden');
    logoutBtn.classList.remove('hidden');
    updateProgressDisplay();
    updateReportDisplay();

    const hash = window.location.hash.substring(1) || 'assessment';
    showSection(hash);
}

function hideDashboard() {
    authSection.classList.remove('hidden');
    dashboard.classList.add('hidden');
    logoutBtn.classList.add('hidden');
}

function showSection(id) {
    sections.forEach(sec => sec.classList.add('hidden'));
    const target = document.getElementById(id) || document.getElementById('assessment');
    target.classList.remove('hidden');

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${id}`) item.classList.add('active');
    });

    window.location.hash = id;
}

function saveProgress() {
    localStorage.setItem('aesp_progress', JSON.stringify(userProgress));
}

function updateProgressDisplay() {
    document.getElementById('progress-score').textContent = userProgress.overallScore + '%';
    document.querySelector('.circle-progress').setAttribute('stroke-dasharray', `${userProgress.overallScore}, 100`);

    const levels = ['Beginner', 'Intermediate', 'Advanced', 'Fluent'];
    const levelIndex = userProgress.overallScore < 40 ? 0 : userProgress.overallScore < 70 ? 1 : userProgress.overallScore < 90 ? 2 : 3;
    document.getElementById('progress-label').textContent = 'Trình độ: ' + levels[levelIndex];
}

function updateReportDisplay() {
    const pron = Math.max(30, Math.min(98, userProgress.pronunciation + Math.floor(Math.random() * 10) - 5));
    const gram = Math.max(30, Math.min(98, userProgress.grammarVocab + Math.floor(Math.random() * 8) - 4));
    const flu = Math.max(30, Math.min(98, userProgress.fluency + Math.floor(Math.random() * 12) - 6));

    const bigScores = document.querySelectorAll('.big-score');
    if (bigScores.length >= 3) {
        bigScores[0].textContent = pron + '%';
        bigScores[1].textContent = gram + '%';
        bigScores[2].textContent = flu + '%';
    }
}

// ==================== AUTH - ĐĂNG KÝ & ĐĂNG NHẬP (KHÔNG ĐƠ) ====================
document.getElementById('login-tab').addEventListener('click', () => {
    document.getElementById('login-tab').classList.add('tab-active');
    document.getElementById('register-tab').classList.remove('tab-active');
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('auth-title').textContent = 'Chào mừng trở lại';
    document.getElementById('auth-error').textContent = '';
    document.getElementById('auth-success').classList.add('hidden');
});

document.getElementById('register-tab').addEventListener('click', () => {
    document.getElementById('register-tab').classList.add('tab-active');
    document.getElementById('login-tab').classList.remove('tab-active');
    document.getElementById('register-form').classList.remove('hidden');
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('auth-title').textContent = 'Tạo tài khoản mới';
    document.getElementById('auth-error').textContent = '';
    document.getElementById('auth-success').classList.add('hidden');
});

// ĐĂNG KÝ (đã fix - không đơ)
document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('reg-username').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirm = document.getElementById('reg-confirm').value;

    if (users.find(u => u.username === username)) {
        document.getElementById('auth-error').textContent = 'Tên đăng nhập đã tồn tại!';
        return;
    }
    if (password !== confirm) {
        document.getElementById('auth-error').textContent = 'Mật khẩu xác nhận không khớp!';
        return;
    }
    if (password.length < 6) {
        document.getElementById('auth-error').textContent = 'Mật khẩu phải ít nhất 6 ký tự!';
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem('aesp_users', JSON.stringify(users));

    document.getElementById('auth-success').textContent = 'Đăng ký thành công! Đang chuyển sang đăng nhập...';
    document.getElementById('auth-success').classList.remove('hidden');
    document.getElementById('auth-error').textContent = '';

    setTimeout(() => {
        document.getElementById('login-tab').click();
        document.getElementById('login-username').value = username;
    }, 1500);
});

// ĐĂNG NHẬP
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        isLoggedIn = true;
        document.getElementById('auth-error').textContent = '';
        showDashboard();
        showSection('assessment');
        alert(`Chào mừng ${username}! Bắt đầu luyện nói thôi nào 🎉`);
    } else {
        document.getElementById('auth-error').textContent = 'Sai tên đăng nhập hoặc mật khẩu!';
    }
});

// Đăng xuất
logoutBtn.addEventListener('click', () => {
    if (confirm('Đăng xuất nhé?')) {
        isLoggedIn = false;
        hideDashboard();
        document.getElementById('login-form').reset();
        document.getElementById('auth-error').textContent = '';
        document.getElementById('auth-success').classList.add('hidden');
    }
});

// ==================== SIDEBAR & HASH ====================
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href').substring(1);
        showSection(targetId);
    });
});

window.addEventListener('hashchange', () => {
    if (isLoggedIn) {
        const hash = window.location.hash.substring(1) || 'assessment';
        showSection(hash);
    }
});

// ==================== CÁC CHỨC NĂNG KHÁC ====================
// Assessment (AI khắt khe)
document.getElementById('start-assessment').addEventListener('click', () => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        alert('Dùng Chrome/Edge để hỗ trợ mic tốt nhất!');
        return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onstart = () => {
        document.getElementById('assessment-feedback').innerHTML = '<strong>Đang lắng nghe... Nói đầy đủ nhé!</strong>';
        document.getElementById('assessment-feedback').classList.remove('hidden');
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        let score = 50;
        let feedback = "";

        const wordCount = transcript.split(' ').length;
        const hasIntro = transcript.includes('my name') || transcript.includes('i am') || transcript.includes("i'm");
        const hasHobbies = transcript.includes('hobb') || transcript.includes('like') || transcript.includes('enjoy') || transcript.includes('love');

        if (wordCount < 10) {
            score -= 30;
            feedback += "Câu trả lời quá ngắn. Hãy nói dài hơn! 😅<br>";
        }
        if (wordCount > 30) score += 15;

        if (!hasIntro) {
            score -= 20;
            feedback += "Bạn chưa giới thiệu bản thân.<br>";
        }
        if (!hasHobbies) {
            score -= 20;
            feedback += "Bạn chưa nói về sở thích.<br>";
        }

        if (transcript.includes('hello') && wordCount < 20) {
            score -= 25;
            feedback += "Chỉ lặp 'hello' thì chưa đủ! Trả lời đúng câu hỏi nhé 😉<br>";
        }

        score = Math.max(20, Math.min(95, score + Math.floor(Math.random() * 20)));

        const level = score < 50 ? 'Beginner' : score < 70 ? 'Intermediate' : score < 85 ? 'Advanced' : 'Fluent';

        document.getElementById('assessment-feedback').innerHTML = `
            <strong>Bạn nói:</strong> "${transcript}"<br><br>
            <strong>Điểm:</strong> ${score}% | <strong>Trình độ:</strong> ${level}<br><br>
            <strong>Phản hồi AI:</strong><br>${feedback || "Rất tốt! Tiếp tục phát huy! 🎉"}
        `;

        userProgress.pronunciation = Math.round((userProgress.pronunciation + score) / 2);
        userProgress.overallScore = Math.round((userProgress.overallScore + score * 0.7) / 1.7);
        saveProgress();
        updateProgressDisplay();
        updateReportDisplay();
    };

    recognition.onerror = () => {
        document.getElementById('assessment-feedback').textContent = 'Lỗi mic. Thử lại!';
    };

    recognition.start();
});

// Practice, Progress, Report, Package (giữ nguyên từ trước)
document.getElementById('start-practice').addEventListener('click', () => {
    const topic = document.getElementById('topic-select').value;
    if (!topic) return alert('Chọn chủ đề!');
    if (!currentPackage) return alert('Mua gói dịch vụ trước!');
    currentTopic = topic;
    document.getElementById('practice-area').classList.remove('hidden');
    document.getElementById('conversation').innerHTML = `<p class="ai">AI: Xin chào! Hãy kể về <strong>${topic}</strong> bằng tiếng Anh nhé. Tôi đang nghe đây! 🎧</p>`;
});

document.getElementById('speak-btn').addEventListener('click', () => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        const wordCount = transcript.split(' ').length;
        let score = 60;

        const topicKeywords = {
            daily: ['day', 'morning', 'work', 'eat', 'sleep', 'family'],
            travel: ['travel', 'trip', 'visit', 'country', 'hotel', 'plane'],
            business: ['work', 'meeting', 'company', 'project', 'client', 'email'],
            healthcare: ['health', 'doctor', 'hospital', 'medicine', 'exercise', 'diet']
        };

        const keywords = topicKeywords[currentTopic] || [];
        const matched = keywords.filter(k => transcript.includes(k)).length;

        if (wordCount < 15) score -= 25;
        if (matched < 2) score -= 20;
        if (matched > 4) score += 15;
        if (wordCount > 40) score += 10;

        score = Math.max(30, Math.min(98, score + Math.floor(Math.random() * 15)));

        const convo = document.getElementById('conversation');
        convo.innerHTML += `<p class="user">Bạn: ${transcript}</p>`;
        convo.innerHTML += `<p class="ai">AI: Hay lắm! Điểm: <strong>${score}%</strong>. ${
            score < 60 ? 'Cần luyện thêm từ vựng chủ đề này!' :
            score < 80 ? 'Tốt rồi, nhưng hãy nói dài hơn!' :
            'Xuất sắc! Giọng rất tự nhiên 🎉'
        }</p>`;
        convo.scrollTop = convo.scrollHeight;

        const suggList = document.getElementById('suggestion-list');
        suggList.innerHTML = `
            <li>You could say: "In my opinion..."</li>
            <li>Try: "For example..."</li>
            <li>Advanced: "As far as I'm concerned..."</li>
        `;
        document.getElementById('suggestions').classList.remove('hidden');

        userProgress.practiceCount++;
        userProgress.totalMinutes += 5;
        userProgress.newWords += Math.floor(Math.random() * 10) + 3;
        userProgress.fluency = Math.round((userProgress.fluency + score) / 2);
        userProgress.grammarVocab = Math.round((userProgress.grammarVocab + score * 0.9) / 1.9);
        userProgress.overallScore = Math.min(98, userProgress.overallScore + 2);

        saveProgress();
        updateProgressDisplay();
        updateReportDisplay();
    };

    recognition.start();
});

document.getElementById('refresh-progress').addEventListener('click', () => {
    updateProgressDisplay();
});

document.getElementById('generate-report').addEventListener('click', () => {
    updateReportDisplay();
});

document.querySelectorAll('.btn-package').forEach(btn => {
    btn.addEventListener('click', () => {
        currentPackage = btn.dataset.package;
        document.getElementById('purchase-status').textContent = `Đã chọn gói ${currentPackage.toUpperCase()} thành công!`;
    });
});