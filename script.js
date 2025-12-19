/*==================== MENU SHOW & HIDE ====================*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Menu show
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Menu hide
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
    const header = document.getElementById('header');
    // When the scroll is greater than 50 viewport height, add the scroll-header class
    if (this.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 350 viewport height, add the show-scroll class
    if (this.scrollY >= 350) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
}
window.addEventListener('scroll', scrollUp);

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*==================== HOME SEARCH FUNCTIONALITY ====================*/
const searchButton = document.querySelector('.home__search-button');

if (searchButton) {
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        const location = document.querySelector('.home__search-box:nth-child(1) input').value;
        const date = document.querySelector('.home__search-box:nth-child(2) input').value;
        const guests = document.querySelector('.home__search-box:nth-child(3) select').value;
        
        if (!location) {
            alert('Vui lòng nhập điểm đến!');
            return;
        }
        
        console.log('Tìm kiếm:', { location, date, guests });
        alert(`Đang tìm kiếm tour đến ${location}${date ? ' vào ngày ' + formatDate(date) : ''}${guests ? ' cho ' + guests : ''}`);
        
        // Scroll to destinations section
        document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
    });
}

/*==================== DESTINATION BOOKING ====================*/
const destinationButtons = document.querySelectorAll('.destination__button');

destinationButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.destination__card');
        const title = card.querySelector('.destination__title').textContent;
        const price = card.querySelector('.destination__price').textContent;
        
        alert(`Bạn đã chọn tour: ${title}\nGiá: ${price}\n\nChức năng đặt tour sẽ được phát triển trong phiên bản tiếp theo!`);
        
        // In real application, this would open a booking modal or redirect to booking page
        console.log('Booking:', { title, price });
    });
});

/*==================== TOURS FILTER TABS ====================*/
const toursTabs = document.querySelectorAll('.tours__tab');

toursTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        // Remove active class from all tabs
        toursTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        const filter = this.getAttribute('data-tab');
        console.log('Filter selected:', filter);
        
        // Filter logic would be implemented here
        // For now, just show a message
        alert(`Đang lọc tour theo: ${this.textContent.trim()}`);
    });
});

/*==================== CONTACT FORM SUBMISSION ====================*/
const contactForm = document.querySelector('.contact__form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const tourType = this.querySelector('select').value;
        const message = this.querySelector('textarea').value;
        
        // Validation
        if (!name || !email || !phone || !tourType || !message) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('Email không hợp lệ!');
            return;
        }
        
        if (!validatePhone(phone)) {
            alert('Số điện thoại không hợp lệ!');
            return;
        }
        
        // Show success message
        alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24h.');
        console.log('Form submitted:', { name, email, phone, tourType, message });
        
        // Reset form
        this.reset();
    });
}

/*==================== NEWSLETTER SUBSCRIPTION ====================*/
const newsletterForm = document.querySelector('.footer__newsletter');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('.footer__input').value;
        
        if (!email) {
            alert('Vui lòng nhập email!');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('Email không hợp lệ!');
            return;
        }
        
        alert('Đăng ký thành công! Bạn sẽ nhận được thông tin khuyến mãi qua email.');
        console.log('Newsletter subscription:', email);
        
        this.reset();
    });
}

/*==================== SMOOTH SCROLL ====================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Check if href is just "#" or a valid section ID
        if (href === '#' || href === '#home') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

/*==================== IMAGE LAZY LOADING ====================*/
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Force load
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});

/*==================== ANIMATION ON SCROLL ====================*/
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.destination__card, .blog__card, .testimonial__card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
};

document.addEventListener('DOMContentLoaded', animateOnScroll);

/*==================== TESTIMONIALS SLIDER (Optional Enhancement) ====================*/
let testimonialIndex = 0;

function showTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial__card');
    
    if (testimonials.length > 0) {
        testimonials.forEach((testimonial, index) => {
            testimonial.style.display = 'none';
        });
        
        // Show 3 testimonials at a time on desktop
        const testimonialsPerView = window.innerWidth > 768 ? 3 : 1;
        
        for (let i = 0; i < testimonialsPerView && i < testimonials.length; i++) {
            const index = (testimonialIndex + i) % testimonials.length;
            testimonials[index].style.display = 'block';
        }
    }
}

// Auto rotate testimonials every 5 seconds
setInterval(() => {
    testimonialIndex++;
    showTestimonials();
}, 5000);

/*==================== UTILITY FUNCTIONS ====================*/
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]{10,}$/;
    return re.test(phone);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

/*==================== LOCAL STORAGE FOR FAVORITES ====================*/
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function addToFavorites(destinationId) {
    if (!favorites.includes(destinationId)) {
        favorites.push(destinationId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Đã thêm vào danh sách yêu thích!');
    } else {
        alert('Điểm đến này đã có trong danh sách yêu thích!');
    }
}

function removeFromFavorites(destinationId) {
    favorites = favorites.filter(id => id !== destinationId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('Đã xóa khỏi danh sách yêu thích!');
}

/*==================== SEARCH FUNCTIONALITY WITH FILTER ====================*/
function searchDestinations(query) {
    const cards = document.querySelectorAll('.destination__card');
    query = query.toLowerCase();
    
    cards.forEach(card => {
        const title = card.querySelector('.destination__title').textContent.toLowerCase();
        const location = card.querySelector('.destination__location').textContent.toLowerCase();
        
        if (title.includes(query) || location.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

/*==================== PRICE RANGE FILTER ====================*/
function filterByPrice(minPrice, maxPrice) {
    const cards = document.querySelectorAll('.destination__card');
    
    cards.forEach(card => {
        const priceText = card.querySelector('.destination__price').textContent;
        const price = parseInt(priceText.replace(/\D/g, ''));
        
        if (price >= minPrice && price <= maxPrice) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

/*==================== RATING SYSTEM ====================*/
function rateDestination(destinationId, rating) {
    if (rating < 1 || rating > 5) {
        alert('Đánh giá phải từ 1 đến 5 sao!');
        return;
    }
    
    const ratings = JSON.parse(localStorage.getItem('ratings')) || {};
    ratings[destinationId] = rating;
    localStorage.setItem('ratings', JSON.stringify(ratings));
    
    alert(`Bạn đã đánh giá ${rating} sao!`);
    console.log('Rating saved:', { destinationId, rating });
}

/*==================== VIEW COUNTER ====================*/
function incrementViewCount(destinationId) {
    const views = JSON.parse(localStorage.getItem('views')) || {};
    views[destinationId] = (views[destinationId] || 0) + 1;
    localStorage.setItem('views', JSON.stringify(views));
}

/*==================== DARK MODE TOGGLE (Optional Feature) ====================*/
const darkModeToggle = document.getElementById('dark-mode-toggle');

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        
        darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
    
    // Check saved preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

/*==================== SHARE FUNCTIONALITY ====================*/
function shareDestination(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: `Check out this amazing destination: ${title}`,
            url: url
        }).then(() => {
            console.log('Shared successfully');
        }).catch((error) => {
            console.log('Error sharing:', error);
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        alert('Chức năng chia sẻ không được hỗ trợ trên trình duyệt này.');
        
        // Copy link to clipboard
        navigator.clipboard.writeText(url).then(() => {
            alert('Link đã được sao chép vào clipboard!');
        });
    }
}

/*==================== PERFORMANCE OPTIMIZATION ====================*/
// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/*==================== ANALYTICS TRACKING (Basic) ====================*/
function trackEvent(category, action, label) {
    console.log('Event tracked:', { category, action, label, timestamp: new Date() });
    
    // In production, you would send this to Google Analytics or similar service
    // gtag('event', action, { 'event_category': category, 'event_label': label });
}

// Track page views
window.addEventListener('load', () => {
    trackEvent('Page', 'View', window.location.pathname);
});

// Track button clicks
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('destination__button')) {
        trackEvent('Button', 'Click', 'Book Tour');
    }
});

/*==================== ACCESSIBILITY IMPROVEMENTS ====================*/
// Skip to main content
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.className = 'skip-link';
skipLink.textContent = 'Bỏ qua để đến nội dung chính';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #000;
    color: #fff;
    padding: 8px;
    z-index: 100;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
    }
});

/*==================== PRINT FUNCTIONALITY ====================*/
function printPage() {
    window.print();
}

/*==================== CONSOLE WELCOME MESSAGE ====================*/
console.log('%c🌴 Chào mừng đến với Khám Phá Việt Nam! 🌴', 
    'color: #E67E22; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%cWebsite được phát triển với ❤️ bởi nhóm sinh viên', 
    'color: #2C3E50; font-size: 14px;');
console.log('%cCông nghệ: HTML5, CSS3, JavaScript', 
    'color: #3498DB; font-size: 12px;');

/*==================== ERROR HANDLING ====================*/
window.addEventListener('error', (e) => {
    console.error('Error occurred:', e.error);
    // In production, you might want to send errors to a logging service
});

/*==================== SERVICE WORKER REGISTRATION (PWA - Optional) ====================*/
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}

/*==================== INITIALIZATION ====================*/
document.addEventListener('DOMContentLoaded', () => {
    console.log('Website loaded successfully! ✨');
    
    // Initialize any plugins or libraries here
    showTestimonials();
    
    // Set minimum date for date picker to today
    const dateInput = document.querySelector('.home__search-box:nth-child(2) input[type="date"]');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});
