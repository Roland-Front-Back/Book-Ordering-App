document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme
    if (savedTheme === 'dark' || (savedTheme === null && prefersDarkMode)) {
        body.classList.add('dark-mode');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        // Save theme preference
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });

    // Optional: Handle system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
        body.classList.toggle('dark-mode', e.matches);
        localStorage.setItem('theme', e.matches ? 'dark' : 'light');
    });
});