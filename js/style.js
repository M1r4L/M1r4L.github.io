document.addEventListener('DOMContentLoaded', function () {

    const themeSwitcher = document.getElementById('themeToggle');
    const body = document.body;

        function setTheme(themeName) {
            body.setAttribute('data-theme', themeName);
            localStorage.setItem('theme', themeName);
        }

    themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme') || 'light';
            const themes = ['light', 'dark'];
            const currentIndex = themes.indexOf(currentTheme);
            const nextIndex = (currentIndex + 1) % themes.length;
            setTheme(themes[nextIndex]);
        });

            const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            setTheme('light');
        }
        
    });