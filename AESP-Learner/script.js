// ==================== TRẠNG THÁI & DỮ LIỆU ====================
let isLoggedIn = false;
let currentPackage = null;

// Mock tiến độ
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

let today = new Date().toISOString().split('T')[0];
if (userProgress.lastPracticeDate !== today) {
    if (userProgress.lastPracticeDate === new Date(Date.now() - 86400000).toISOString().split('T')[0]) {
        userProgress.streak++;
    } else if (userProgress.lastPracticeDate) {
        userProgress.streak = 1;
    }
    userProgress.lastPracticeDate = today;
}

// Users
let users = JSON.parse(localStorage.getItem('aesp_users')) || [];

// ==================== AUTH ====================
if (document.getElementById('login-tab')) {
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const authTitle = document.getElementById('auth-title');
    const authError = document.getElementById('auth-error');
    const authSuccess = document.getElementById('auth-success');

    function showLoginTab() {
        loginTab.classList.add('tab-active');
        registerTab.classList.remove('tab-active');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        authTitle.textContent = 'Chào mừng trở lại';
        authError.textContent = '';
        authSuccess.classList.add('hidden');
    }

    function showRegisterTab() {
        registerTab.classList.add('tab-active');
        loginTab.classList.remove('tab-active');
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        authTitle.textContent = 'Tạo tài khoản mới';
        authError.textContent = '';
        authSuccess.classList.add('hidden');
    }

    loginTab.addEventListener('click', showLoginTab);
    registerTab.addEventListener('click', showRegisterTab);

    // Default show login
    showLoginTab();

    // Đăng ký - Ở lại trang, chuyển tab Đăng nhập + điền username
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('reg-username').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-password').value;
        const confirm = document.getElementById('reg-confirm').value;

        if (users.find(u => u.username === username)) {
            authError.textContent = 'Tên đăng nhập đã tồn tại!';
            return;
        }
        if (password !== confirm) {
            authError.textContent = 'Mật khẩu xác nhận không khớp!';
            return;
        }
        if (password.length < 6) {
            authError.textContent = 'Mật khẩu phải ít nhất 6 ký tự!';
            return;
        }

        users.push({ username, email, password });
        localStorage.setItem('aesp_users', JSON.stringify(users));

        authSuccess.textContent = 'Đăng ký thành công! Hãy đăng nhập để tiếp tục.';
        authSuccess.classList.remove('hidden');
        authError.textContent = '';

        setTimeout(() => {
            showLoginTab();
            document.getElementById('login-username').value = username;
            document.getElementById('login-password').focus();
            authSuccess.classList.add('hidden');
        }, 1500);
    });

    // Đăng nhập
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;

        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            window.location.href = 'dashboard.html';
        } else {
            authError.textContent = 'Sai tên đăng nhập hoặc mật khẩu!';
        }
    });
}

// Icon mắt hoạt động (cho tất cả trang)
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', () => {
        const target = document.getElementById(icon.dataset.target);
        if (target) {
            if (target.type === 'password') {
                target.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                target.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        }
    });
});

// Đăng xuất
if (document.getElementById('logout-btn')) {
    document.getElementById('logout-btn').addEventListener('click', () => {
        if (confirm('Đăng xuất nhé?')) {
            window.location.href = 'index.html';
        }
    });
}

// ==================== DASHBOARD LOAD SECTION (tách file) ====================
if (document.getElementById('content-area')) {
    const contentArea = document.getElementById('content-area');
    const navItems = document.querySelectorAll('.nav-item');

    const sectionFiles = {
        assessment: 'assessment.html',
        packages: 'packages.html',
        practice: 'practice.html',
        progress: 'progress.html',
        reports: 'reports.html'
    };

    function loadSection(sectionKey) {
        const file = sectionFiles[sectionKey];
        if (!file) return;

        fetch(file)
            .then(response => response.ok ? response.text() : Promise.reject(response.status))
            .then(html => {
                contentArea.innerHTML = html;
                navItems.forEach(i => i.classList.remove('active'));
                document.querySelector(`a[href="#${sectionKey}"]`).classList.add('active');
                attachSectionEvents();
            })
            .catch(err => {
                contentArea.innerHTML = `<p style="text-align:center;color:red;padding:100px;">Lỗi load ${file}<br>Chạy bằng Live Server (VS Code) để fetch hoạt động!</p>`;
            });
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionKey = item.getAttribute('href').substring(1);
            loadSection(sectionKey);
            history.pushState(null, '', '#' + sectionKey);
        });
    });

    // Load from hash or default
    const hash = window.location.hash.substring(1) || 'assessment';
    loadSection(hash);

    window.addEventListener('popstate', () => {
        const hash = window.location.hash.substring(1) || 'assessment';
        loadSection(hash);
    });

    function attachSectionEvents() {
        // Assessment
        const startAssessment = document.getElementById('start-assessment');
        if (startAssessment) {
            startAssessment.onclick = () => {
                const feedback = document.getElementById('assessment-feedback');
                if (feedback) {
                    feedback.classList.remove('hidden');
                    feedback.innerHTML = '<p style="color:green;">Đánh giá hoàn tất! Trình độ Beginner (mock).</p>';
                }
            };
        }

        // Packages
        document.querySelectorAll('.btn-package').forEach(btn => {
            btn.onclick = () => {
                currentPackage = btn.dataset.package;
                const status = document.getElementById('purchase-status');
                if (status) status.textContent = `Đã chọn gói ${currentPackage.toUpperCase()} thành công! 🎉`;
            };
        });

        // Practice
        const startPractice = document.getElementById('start-practice');
        if (startPractice) {
            startPractice.onclick = () => {
                const area = document.getElementById('practice-area');
                if (area) area.classList.remove('hidden');
            };
        }

        const speakBtn = document.getElementById('speak-btn');
        if (speakBtn) {
            speakBtn.onclick = () => {
                alert('Bắt đầu ghi âm luyện nói (mock)');
            };
        }

        // Progress
        const refreshProgress = document.getElementById('refresh-progress');
        if (refreshProgress) {
            refreshProgress.onclick = () => {
                userProgress.overallScore = Math.min(100, userProgress.overallScore + 5);
                const scoreEl = document.getElementById('progress-score');
                if (scoreEl) scoreEl.textContent = userProgress.overallScore + '%';
                const circle = document.querySelector('.circle-progress');
                if (circle) circle.setAttribute('stroke-dasharray', `${userProgress.overallScore}, 100`);
            };
        }

        // Reports
        const generateReport = document.getElementById('generate-report');
        if (generateReport) {
            generateReport.onclick = () => {
                alert('Tải báo cáo PDF (mock)');
            };
        }
    }
}
