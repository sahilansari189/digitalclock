// script.js

document.addEventListener('DOMContentLoaded', () => {
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const periodElement = document.getElementById('period');
    const dateElement = document.getElementById('date');
    const formatSwitch = document.getElementById('formatSwitch');
    const toggleButton = document.getElementById('toggleButton');
    let is24HourFormat = false;
    let clockInterval;

    function updateTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const day = now.getDate();
        const month = now.getMonth() + 1; // Months are zero-based
        const year = now.getFullYear();

        let period = '';

        if (!is24HourFormat) {
            period = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            periodElement.style.display = 'inline';
        } else {
            periodElement.style.display = 'none';
        }

        hoursElement.textContent = String(hours).padStart(2, '0');
        minutesElement.textContent = String(minutes).padStart(2, '0');
        secondsElement.textContent = String(seconds).padStart(2, '0');
        periodElement.textContent = period;
        dateElement.textContent = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
    }

    function startClock() {
        clockInterval = setInterval(updateTime, 1000);
        updateTime(); // Initial call to display time immediately
    }

    function stopClock() {
        clearInterval(clockInterval);
    }

    formatSwitch.addEventListener('change', () => {
        is24HourFormat = formatSwitch.checked;
        updateTime();
    });

    toggleButton.addEventListener('click', () => {
        if (toggleButton.textContent === 'Turn Off') {
            stopClock();
            toggleButton.textContent = 'Turn On';
        } else {
            startClock();
            toggleButton.textContent = 'Turn Off';
        }
    });

    startClock(); // Start the clock when the page loads
});
