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
    const texts = ["Web 开发者", "技术爱好者", "终身学习者"]; // 你可以自定义这里的文本
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
});
