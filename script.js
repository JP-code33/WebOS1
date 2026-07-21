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

function generateCalendar() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0 = January, 1 = February, etc.
    const todayDate = now.getDate();

    // 🚀 FIX: This array translates the month integer digits into actual text lines!
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    // Selects your text header placeholder inside the HTML code
    const headerTitle = document.getElementById("calendar-month-year");
    if (headerTitle) {
        // 🚀 INJECTS THE LIVE VALUES: This forces it to print "July 2026" on your card!
        headerTitle.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }

    const grid = document.getElementById("calendar-grid");
    if (!grid) return;
    grid.innerHTML = ""; // Clear out previous cache frames before building cells

    // Generate Weekday Headers Row labels
    const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    dayNames.forEach(day => {
        const cell = document.createElement("div");
        cell.className = "calendar-day-name";
        cell.textContent = day;
        grid.appendChild(cell);
    });

    // Calculate calendar start offsets for month alignment spacing
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    for (let i = 0; i < firstDayIndex; i++) {
        const emptyCell = document.createElement("div");
        grid.appendChild(emptyCell);
    }

    // Calculate maximum active day numeric cells inside this specific month month
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Loop-build the individual date cell blocks onto the grid canvas
    for (let day = 1; day <= totalDays; day++) {
        const dateCell = document.createElement("div");
        dateCell.className = "calendar-date-cell";
        dateCell.textContent = day;

        // Flags today's current numeric date string with the high-contrast blue badge!
        if (day === todayDate) {
            dateCell.className += " calendar-today";
        }

        grid.appendChild(dateCell);
    }
}
// Run the execution macro engine on startup
generateCalendar();


document.querySelectorAll('.window-header').forEach(header => {
    header.addEventListener('mousedown', function(e) {
        // Prevent moving the window if clicking the close dots
        if (e.target.classList.contains('dot')) return;
        
        const win = header.parentElement;
        
        // Calculate initial click tracking offsets
        let shiftX = e.clientX - win.getBoundingClientRect().left;
        let shiftY = e.clientY - win.getBoundingClientRect().top;

        // Automatically bring the clicked window card to the front layer focus
        document.querySelectorAll('.window-card').forEach(w => w.style.zIndex = 10);
        win.style.zIndex = 1000;

        function moveAt(clientX, clientY) {
            win.style.left = clientX - shiftX + 'px';
            win.style.top = clientY - shiftY + 'px';
        }

        function onMouseMove(e) { 
            moveAt(e.clientX, e.clientY); 
        }

        // Listen for mouse movements across the full desktop canvas
        document.addEventListener('mousemove', onMouseMove);

        // Safely unhooks mouse tracker loops upon finger button release
        document.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', onMouseMove);
        }, { once: true });
    });

    header.ondragstart = function() { return false; };
});
