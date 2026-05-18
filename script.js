// Quản lý Đóng / Mở cửa sổ
function openWindow(id) {
    const win = document.getElementById(`win-${id}`);
    if (win) {
        win.style.display = 'flex';
        bringToFront(win);
    }
}

function closeWindow(id) {
    const win = document.getElementById(`win-${id}`);
    if (win) {
        win.style.display = 'none';
    }
}

// Bật/Tắt Menu Start
function toggleStartMenu() {
    const menu = document.getElementById('start-menu');
    menu.classList.toggle('active');
}

// Hàm đưa cửa sổ đang click lên trên cùng (Xử lý z-index)
function bringToFront(clickedWindow) {
    document.querySelectorAll('.window').forEach(win => {
        win.style.zIndex = '10';
    });
    clickedWindow.style.zIndex = '100';
}

// ĐỒNG HỒ HỆ THỐNG
function updateClock() {
    const clockEl = document.getElementById('clock');
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // Định dạng 12 giờ
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    clockEl.innerText = `${hours}:${minutes} ${ampm}`;
}
setInterval(updateClock, 1000);
updateClock();

// TÍNH NĂNG KÉO THẢ CỬA SỔ (DRAG AND DROP)
document.querySelectorAll('.window').forEach(win => {
    const header = win.querySelector('.window-header');
    
    win.addEventListener('mousedown', () => bringToFront(win));

    header.onmousedown = function(e) {
        e.preventDefault();
        
        let pos1 = 0, pos2 = 0, pos3 = e.clientX, pos4 = e.clientY;
        
        document.onmousemove = function(e) {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            
            // Tính toán vị trí mới của cửa sổ
            win.style.top = (win.offsetTop - pos2) + "px";
            win.style.left = (win.offsetLeft - pos1) + "px";
        };
        
        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
});
