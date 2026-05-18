// Bật/Tắt Menu Start
function toggleStart() {
    const startMenu = document.getElementById('start-menu');
    startMenu.classList.toggle('active');
}

// Mở ứng dụng
function openApp(appId) {
    const win = document.getElementById(`win-${appId}`);
    if (win) {
        win.style.display = 'flex';
    }
}

// Đóng ứng dụng
function closeApp(appId) {
    const win = document.getElementById(`win-${appId}`);
    if (win) {
        win.style.display = 'none';
    }
}
