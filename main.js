document.addEventListener('DOMContentLoaded', () => {
    // Add any lightweight Vanilla JS logic here
    // The CSS keyframes handle the stagger animations, so this file is mostly empty now!
    
    // We can add a simple hover effect to pills if needed
    const pills = document.querySelectorAll('.pill');
    pills.forEach(pill => {
        pill.addEventListener('mouseenter', () => {
            pill.style.transform = 'translateY(-2px)';
        });
        pill.addEventListener('mouseleave', () => {
            pill.style.transform = 'translateY(0)';
        });
    });

    // Form logic mock
    const form = document.querySelector('.contact-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.form-button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'Transmission Sent...';
            btn.style.background = 'linear-gradient(135deg, #39ff14 0%, #00f0ff 100%)';
            
            setTimeout(() => {
                form.reset();
                btn.innerHTML = originalText;
                btn.style.background = '';
            }, 3000);
        });
    }
});
