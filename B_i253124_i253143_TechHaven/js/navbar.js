document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.nav-toggle');
    const navLeft = document.querySelector('.nav-left');

    if (!toggle || !navLeft) return;

    toggle.addEventListener('click', function () {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', String(!expanded));
        navLeft.classList.toggle('open');
    });

    // close on esc
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            toggle.setAttribute('aria-expanded', 'false');
            navLeft.classList.remove('open');
        }
    });

    // close when clicking outside on small screens
    document.addEventListener('click', function (e) {
        if (!navLeft.classList.contains('open')) return;
        const isInside = navLeft.contains(e.target) || toggle.contains(e.target);
        if (!isInside) {
            toggle.setAttribute('aria-expanded', 'false');
            navLeft.classList.remove('open');
        }
    });
});
