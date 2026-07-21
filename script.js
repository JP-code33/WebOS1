function updateClock() {
    const now = new Date();
    

    const dateStr = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
    

    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    
    const clockElement = document.querySelector("#top-bar .right-text");
    if (clockElement) {
        clockElement.textContent = `${dateStr}, ${timeStr}`;
    }
}


setInterval(updateClock, 1000);
updateClock();

function toggleWin(id) {
    const win = document.getElementById(id);
    if (win){
        win.classList.toggle('hidden');
    }

}

const header = document.querySelector('.window-header');
if (header) {
    header.addEventListener('mousedown', function(e) {
        
        if (e.target.classList.contains('dot')) return;
        
        const win = header.parentElement;
        
        
        let shiftX = e.clientX - win.getBoundingClientRect().left;
        let shiftY = e.clientY - win.getBoundingClientRect().top;

        function moveAt(clientX, clientY) {
            win.style.left = clientX - shiftX + 'px';
            win.style.top = clientY - shiftY + 'px';
        }

        function onMouseMove(e) { 
            moveAt(e.clientX, e.clientY); 
        }

     
        document.addEventListener('mousemove', onMouseMove);

        
        document.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', onMouseMove);
        }, { once: true });
    });

    header.ondragstart = function() { return false; };
}
