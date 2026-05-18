// HÀM MỞ CỬA SỔ ỨNG DỤNG
function openWindow(id) {
    const win = document.getElementById(`win-${id}`);
    if (win) {
        win.style.display = 'flex';
        focusWindow(win);
    }
}

// HÀM ĐÓNG CỬA SỔ
function closeWindow(id) {
    const win = document.getElementById(`win-${id}`);
    if (win) {
        win.style.display = 'none';
    }
}

// BẬT / TẮT MENU START
function toggleStartMenu() {
    const menu = document.getElementById('start-menu');
    menu.classList.toggle('active');
}

// ĐƯA CỬA SỔ ĐANG CLICK LÊN TRÊN CÙNG (Z-INDEX)
function focusWindow(clickedWindow) {
    document.querySelectorAll('.window-os').forEach(win => {
        win.style.zIndex = '10';
    });
    clickedWindow.style.zIndex = '100';
}

// ĐỒNG HỒ HỆ THỐNG TRÊN TASKBAR
function runClock() {
    const clockEl = document.getElementById('live-clock');
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    clockEl.innerText = `${hours}:${minutes} ${ampm}`;
}
setInterval(runClock, 1000);
runClock();

// TÍNH NĂNG KÉO THẢ CỬA SỔ (DRAG AND DROP CHUẨN OS)
document.querySelectorAll('.window-os').forEach(win => {
    const header = win.querySelector('.window-header');
    
    win.addEventListener('mousedown', () => focusWindow(win));

    header.onmousedown = function(e) {
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

// TỰ ĐỘNG ĐÓNG MENU START KHI BẤM RA NGOÀI MÀN HÌNH
document.addEventListener('click', function(event) {
    const menu = document.getElementById('start-menu');
    const startBtn = document.querySelector('.start-trigger');
    
    if (!menu.contains(event.target) && !startBtn.contains(event.target)) {
        menu.classList.remove('active');
    }
});
