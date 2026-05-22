// 1. CHẠY HIỆU ỨNG KHỞI ĐỘNG (BOOT SCREEN) TRONG 2.5 GIÂY
setTimeout(() => {
    document.getElementById('boot-screen').classList.remove('active');
    document.getElementById('lock-screen').classList.add('active');
    updateClock();
}, 2500);

// 2. MỞ KHÓA MÀN HÌNH KHÓA ĐỂ VÀO KHUNG LOGIN
function unlockSystem() {
    document.querySelector('.lock-content').style.transform = 'translateY(-100px)';
    document.querySelector('.lock-content').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('.lock-content').style.display = 'none';
        document.querySelector('.login-card').style.display = 'block';
    }, 300);
}

// 3. ĐĂNG NHẬP THÀNH CÔNG VÀO DESKTOP
function submitLogin() {
    document.getElementById('lock-screen').classList.remove('active');
    document.getElementById('desktop-screen').classList.add('active');
}

// Cho phép bấm phím Enter để đăng nhập nhanh
document.getElementById('password-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submitLogin();
});

// 4. ĐIỀU KHIỂN CỬA SỔ CHUẨN WINDOWS
function openWindow(id) {
    const win = document.getElementById(`win-${id}`);
    win.style.display = 'flex';
    focusWindow(win);
}

function closeWindow(id) {
    document.getElementById(`win-${id}`).style.display = 'none';
}

function toggleStart() {
    document.getElementById('start-menu').classList.toggle('active');
}

// Đưa cửa sổ vừa click lên lớp trên cùng
function focusWindow(activeWin) {
    document.querySelectorAll('.window').forEach(win => win.style.zIndex = '10');
    activeWin.style.zIndex = '100';
}

// 5. TÍNH NĂNG DRAG & DROP (KÉO THẢ CỬA SỔ MƯỢT MÀ)
document.querySelectorAll('.window').forEach(win => {
    const header = win.querySelector('.window-header');
    win.addEventListener('mousedown', () => focusWindow(win));

    header.onmousedown = function(e) {
        if(e.target.classList.contains('win-controls') || e.target.closest('.win-controls')) return;
        e.preventDefault();
        let pos1 = 0, pos2 = 0, pos3 = e.clientX, pos4 = e.clientY;
        
        document.onmousemove = function(e) {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            win.style.top = (win.offsetTop - pos2) + "px";
            win.style.left = (win.offsetLeft - pos1) + "px";
        };
        
        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
});

// Tự động đóng Start Menu khi nhấp ngoài vùng trống
document.addEventListener('click', (e) => {
    const startMenu = document.getElementById('start-menu');
    const startBtn = document.querySelector('.tb-icon');
    if(!startMenu.contains(e.target) && !startBtn.contains(e.target)) {
        startMenu.classList.remove('active');
    }
});

// 6. CẬP NHẬT THỜI GIAN ĐỒNG HỒ THẬT
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    
    // Đồng hồ Desktop
    document.getElementById('desktop-clock').innerText = `${hours}:${minutes} ${ampm}`;
    
    // Đồng hồ màn hình khóa
    document.getElementById('lock-time').innerText = `${now.getHours() < 10 ? '0'+now.getHours() : now.getHours()}:${minutes}`;
    
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    document.getElementById('lock-date').innerText = now.toLocaleDateString('vi-VN', options);
}
setInterval(updateClock, 1000);
updateClock();
