document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 平滑滚动实现
    const navLinks = document.querySelectorAll('.nav-links a, .btn-primary, .btn-secondary');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // 打字机效果
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const texts = ["AI学习者", "后端开发者", "技术探索者", "云原生爱好者"];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeWriter() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // 暂停时间
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(typeWriter, typeSpeed);
        }

        setTimeout(typeWriter, 1000);
    }

    // 数字统计动画
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateNumber = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.textContent = target;
                }
            };

            updateNumber();
        });
    };

    // 技能进度条动画
    const animateSkills = () => {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
    };

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // 统计数字动画
                if (target.classList.contains('hero-stats')) {
                    animateStats();
                }
                
                // 技能条动画
                if (target.id === 'skills') {
                    animateSkills();
                }
                
                // 进度条动画
                if (target.classList.contains('progress-fill')) {
                    const width = target.style.width;
                    target.style.width = '0%';
                    setTimeout(() => {
                        target.style.width = width;
                    }, 200);
                }
                
                // 添加进入动画
                if (!target.classList.contains('progress-fill')) {
                    target.style.opacity = '1';
                    target.style.transform = 'translateY(0)';
                }
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.hero-stats, #skills, .about-content, .learning-container');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // 观察进度条
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        observer.observe(bar);
    });

    // 滚动指示器点击事件
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // 学习记录标签页切换功能
    const learningTabs = document.querySelectorAll('.learning-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    learningTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // 移除所有活动状态
            learningTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // 添加当前活动状态
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // 添加一些交互效果
    const paperCards = document.querySelectorAll('.paper-card');
    paperCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// 复制邮箱功能
function copyEmail() {
    const emailText = document.getElementById('email-text').textContent;
    const copyBtn = document.querySelector('.copy-btn');
    const originalIcon = copyBtn.innerHTML;
    
    // 使用现代的 Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailText).then(() => {
            showCopySuccess(copyBtn, originalIcon);
        }).catch(() => {
            // 如果 Clipboard API 失败，使用传统方法
            fallbackCopyEmail(emailText, copyBtn, originalIcon);
        });
    } else {
        // 浏览器不支持 Clipboard API，使用传统方法
        fallbackCopyEmail(emailText, copyBtn, originalIcon);
    }
}

// 传统的复制方法（兼容性更好）
function fallbackCopyEmail(emailText, copyBtn, originalIcon) {
    const textArea = document.createElement('textarea');
    textArea.value = emailText;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess(copyBtn, originalIcon);
    } catch (err) {
        console.error('复制失败:', err);
        showCopyError(copyBtn, originalIcon);
    }
    
    document.body.removeChild(textArea);
}

// 显示复制成功状态
function showCopySuccess(copyBtn, originalIcon) {
    copyBtn.classList.add('copied');
    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
    
    setTimeout(() => {
        copyBtn.classList.remove('copied');
        copyBtn.innerHTML = originalIcon;
    }, 2000);
}

// 显示复制错误状态
function showCopyError(copyBtn, originalIcon) {
    copyBtn.style.background = '#e74c3c';
    copyBtn.innerHTML = '<i class="fas fa-times"></i>';
    
    setTimeout(() => {
        copyBtn.style.background = '';
        copyBtn.innerHTML = originalIcon;
    }, 2000);
}
