const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
});

navItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

function createBinaryRain() {
    const binaryBackground = document.getElementById('binaryBackground');
    const chars = '01';
    
    for (let i = 0; i < 60; i++) {
        const binaryDigit = document.createElement('div');
        binaryDigit.className = 'binary-digit';
        binaryDigit.textContent = chars[Math.floor(Math.random() * chars.length)];
        binaryDigit.style.left = `${Math.random() * 100}%`;
        binaryDigit.style.animationDuration = `${Math.random() * 8 + 6}s`;
        binaryDigit.style.animationDelay = `${Math.random() * 3}s`;
        binaryDigit.style.fontSize = `${Math.random() * 8 + 10}px`;
        binaryDigit.style.opacity = Math.random() * 0.3 + 0.1;
        binaryBackground.appendChild(binaryDigit);
    }
}

function animateMotherboard() {
    const components = document.querySelectorAll('.cpu, .ram, .gpu, .storage');
    
    components.forEach(comp => {
        comp.style.animation = `pulse 2s infinite alternate`;
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { opacity: 0.5; box-shadow: 0 0 5px rgba(0, 102, 255, 0.3); }
            100% { opacity: 1; box-shadow: 0 0 20px rgba(0, 102, 255, 0.7); }
        }
    `;
    document.head.appendChild(style);
}

document.getElementById('emailLink').addEventListener('click', function(e) {
    e.preventDefault();
    const user = 'gabrielsilva69057';
    const domain = 'gmail';
    const tld = 'com';
    window.location.href = `mailto:${user}@${domain}.${tld}`;
});

document.getElementById('whatsappLink').addEventListener('click', function(e) {
    e.preventDefault();
    const phone = '5592993325803'; // Substitua pelo seu número
    const message = 'Olá Gabriel, vi seu portfólio e gostaria de conversar sobre...';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
});

// Skill tags animation
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Initialize
window.addEventListener('load', () => {
    createBinaryRain();
    animateMotherboard();
    
    // Add typing effect to hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 60);
        }
    }
    
    // Start typing effect
    setTimeout(typeWriter, 800);
    
    // Animate project cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply animation to cards
    document.querySelectorAll('.project-card, .expertise-card, .skill-category, .hardware-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Hardware visualization interaction
const motherboard = document.querySelector('.motherboard');
if (motherboard) {
    motherboard.addEventListener('mouseenter', () => {
        document.querySelectorAll('.cpu, .ram, .gpu, .storage').forEach(comp => {
            comp.style.animation = 'pulse 0.8s infinite alternate';
        });
    });
    
    motherboard.addEventListener('mouseleave', () => {
        document.querySelectorAll('.cpu, .ram, .gpu, .storage').forEach(comp => {
            comp.style.animation = 'pulse 2s infinite alternate';
        });
    });
}