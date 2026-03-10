document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar & Scroll Events
    const navbar = document.getElementById('navbar');
    const scrollHandler = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', scrollHandler);

    // 2. Reveal Animations on Scroll
    const reveals = document.querySelectorAll('.reveal');
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, options);

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });

    // 3. Menu Filtering
    window.filterMenu = (category) => {
        const menuItems = {
            coffee: [
                { name: 'Midnight Noir Espresso', price: '$4.50', desc: 'Robust double shot blend with deep cocoa and roasted nut profiles.' },
                { name: 'Golden Amber Latte', price: '$5.25', desc: 'Velvety steamed oat milk with single-origin beans and raw honey.' },
                { name: 'Cloudfoam Cold Brew', price: '$5.75', desc: '12-hour slow steeped brew topped with a silky vanilla bean foam.' },
                { name: 'Salted Caramel Mist', price: '$6.25', desc: 'Double espresso marked with house-made caramel and a touch of sea salt.' },
                { name: 'The Flat White Royal', price: '$5.00', desc: 'Precision microfoam poured over two Ristretto shots for intense flavor.' },
                { name: 'Ethiopian V60 Pourover', price: '$6.00', desc: 'Hand-poured filter coffee with bright citrus and floral jasmine notes.' }
            ],
            pastry: [
                { name: 'Almond Butter Croissant', price: '$4.75', desc: 'Twice-baked French pastry filled with rich almond cream and flaky butter layers.' },
                { name: 'Hazelnut Dark Tart', price: '$6.50', desc: 'Decadent dark chocolate ganache with roasted hazelnuts and a buttery crust.' },
                { name: 'Wild Berry Danish', price: '$5.25', desc: 'Seasonal forest berries on a bed of vanilla custard with a honey glaze.' },
                { name: 'Pistachio Madeleines', price: '$3.50', desc: 'Three delicate sea-shell cakes with crushed pistachios and lemon zest.' }
            ],
            tea: [
                { name: 'Matcha Sakura Zen', price: '$6.50', desc: 'Ceremonial grade matcha whisked with cherry blossom infusion and creamy oat milk.' },
                { name: 'Masala Spiced Chai', price: '$4.25', desc: 'Hand-crushed spices steeped in black tea and simmered with organic milk.' },
                { name: 'Earl Grey Lavender Mist', price: '$5.00', desc: 'Classic bergamot black tea with dried lavender and vanilla bean syrup.' },
                { name: 'Rooibos Honeycomb', price: '$4.50', desc: 'Caffeine-free South African red tea with notes of wild honey and vanilla.' }
            ]
        };

        const grid = document.getElementById('menu-items');
        const buttons = document.querySelectorAll('.tab-btn');

        // Update Active Button
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.innerText.toLowerCase().includes(category)) {
                btn.classList.add('active');
            }
        });

        // Animate & Update Grid
        grid.style.opacity = '0';
        grid.style.transform = 'translateY(20px)';

        setTimeout(() => {
            grid.innerHTML = menuItems[category].map(item => `
                <div class="menu-item ${category}" style="animation: fadeInUp 0.6s forwards;">
                    <div class="menu-item-header">
                        <h4>${item.name}</h4>
                        <span class="price">${item.price}</span>
                    </div>
                    <p>${item.desc}</p>
                </div>
            `).join('');
            grid.style.opacity = '1';
            grid.style.transform = 'translateY(0)';
        }, 300);
    };

    // 4. Smooth Scrolling for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 5. Contact Form Simulation
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerText;

            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                formStatus.style.display = 'block';

                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }

    // Initialize Hero Animation on Load
    const heroH1 = document.querySelector('.hero-content h1');
    if (heroH1) {
        heroH1.style.opacity = '1';
        heroH1.style.transform = 'translateY(0)';
    }

    // Update active link on scroll
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
