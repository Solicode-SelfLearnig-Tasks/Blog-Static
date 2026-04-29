/**
 * AlgoWire Admin — Core Logic
 */

(function() {
    // 1. Auth Guard (Immediate check before DOM loads to prevent flash)
    const isAdmin = localStorage.getItem('algowire-admin');
    const isLoginPage = window.location.pathname.endsWith('login.html');

    if (!isAdmin && !isLoginPage) {
        window.location.href = 'login.html';
        return;
    }

    if (isAdmin && isLoginPage) {
        window.location.href = 'dashboard.html';
        return;
    }

    document.addEventListener('DOMContentLoaded', () => {
        // 2. Theme Management
        const html = document.documentElement;
        const savedTheme = localStorage.getItem('algowire-theme') || 'dark';
        html.setAttribute('data-theme', savedTheme);

        // 3. Logout Logic
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm('Are you sure you want to logout?')) {
                    localStorage.removeItem('algowire-admin');
                    window.location.href = 'login.html';
                }
            });
        }

        // 4. Common Table Actions (Delete confirmation)
        document.querySelectorAll('.btn--delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
                    e.preventDefault();
                }
            });
        });

        // 5. Active Nav Link (Fallback)
        const currentPath = window.location.pathname.split('/').pop();
        document.querySelectorAll('.admin-nav a').forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });
})();
