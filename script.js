document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动实现
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 打字机效果
    const typewriterElement = document.getElementById('typewriter');
    const texts = ["AI学习者", "技术探索者", "知识记录者", "终身学习者"]; // 更新的文本
    let textIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < texts[textIndex].length) {
            typewriterElement.textContent += texts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100); // 打字速度
        } else {
            setTimeout(erase, 2000); // 完成后等待2秒
        }
    }

    function erase() {
        if (charIndex > 0) {
            typewriterElement.textContent = texts[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50); // 删除速度
        } else {
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500); // 切换下一个文本前等待0.5秒
        }
    }
    
    // 启动打字机
    setTimeout(type, 1000);

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

    // 知识卡片进度条动画
    const progressBars = document.querySelectorAll('.progress-fill');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => {
        observer.observe(bar);
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
