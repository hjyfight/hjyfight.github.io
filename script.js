document.addEventListener('DOMContentLoaded', function() {
    // 版本检查 - 确保资源正确加载
    console.log('个人主页已加载 - 版本: 2025.07.04.01');
    
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
        const texts = ["AI学习者", "深度学习探索者", "技术研究者", "算法实践者"];
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

// 论文详情数据
const paperDetails = {
    transformer: {
        title: "Attention Is All You Need",
        authors: "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin",
        venue: "NIPS 2017",
        tags: ["Transformer", "Attention", "NLP", "Deep Learning"],
        abstract: "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
        contributions: [
            "提出了完全基于注意力机制的Transformer架构",
            "摒弃了传统的RNN和CNN结构，实现了更好的并行化",
            "在机器翻译任务上取得了SOTA结果",
            "为后续的预训练模型（BERT、GPT等）奠定了基础"
        ],
        methods: "Transformer使用多头自注意力机制和位置编码来处理序列数据。编码器由6个相同的层组成，每层包含多头自注意力和前馈网络。解码器同样由6个层组成，但在多头注意力基础上增加了掩码机制。",
        results: "在WMT 2014英德翻译任务上取得了28.4 BLEU分数，在英法翻译任务上取得了41.8 BLEU分数，同时训练时间大幅减少。模型在其他序列转换任务上也表现出色。",
        notes: "这篇论文是NLP领域的里程碑。Transformer的自注意力机制解决了RNN无法并行化的问题，同时能够捕捉长距离依赖关系。论文的创新在于完全依赖注意力机制，这启发了后续BERT、GPT等预训练模型的发展。",
        links: [
            { title: "原论文", url: "https://arxiv.org/abs/1706.03762", icon: "fas fa-file-pdf" },
            { title: "代码实现", url: "https://github.com/tensorflow/tensor2tensor", icon: "fab fa-github" },
            { title: "详细解析", url: "#", icon: "fas fa-blog" }
        ]
    },
    bert: {
        title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
        authors: "Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova",
        venue: "NAACL 2019",
        tags: ["BERT", "Pre-training", "NLP", "Bidirectional"],
        abstract: "We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers. Unlike recent language representation models, BERT is designed to pre-train deep bidirectional representations from unlabeled text by jointly conditioning on both left and right context in all layers.",
        contributions: [
            "提出了双向预训练的语言表示模型",
            "使用掩码语言模型和下一句预测任务进行预训练",
            "在11个NLP任务上刷新了SOTA记录",
            "证明了双向上下文的重要性"
        ],
        methods: "BERT基于Transformer的编码器架构，通过掩码语言模型（MLM）和下一句预测（NSP）任务进行预训练。MLM随机掩码输入中的部分词语，让模型预测被掩码的词语；NSP让模型判断两个句子是否连续。",
        results: "在GLUE基准测试中取得了80.5%的平均分数，比之前最好的结果提升了7.7%。在SQuAD v1.1问答任务上达到了93.2%的F1分数，在SQuAD v2.0上达到了83.1%的F1分数。",
        notes: "BERT的成功证明了预训练-微调范式的有效性。双向编码器相比单向模型能够更好地理解上下文，这对下游任务非常重要。BERT启发了后续众多预训练模型的发展，如RoBERTa、ALBERT等。",
        links: [
            { title: "原论文", url: "https://arxiv.org/abs/1810.04805", icon: "fas fa-file-pdf" },
            { title: "官方代码", url: "https://github.com/google-research/bert", icon: "fab fa-github" },
            { title: "Hugging Face", url: "https://huggingface.co/bert-base-uncased", icon: "fas fa-external-link-alt" }
        ]
    }
};

// 显示论文详情弹窗
function showPaperDetails(paperId) {
    const paper = paperDetails[paperId];
    if (!paper) return;
    
    // 填充论文信息
    document.getElementById('paperTitle').textContent = paper.title;
    document.getElementById('paperAuthors').textContent = paper.authors;
    document.getElementById('paperVenue').textContent = paper.venue;
    document.getElementById('paperAbstract').textContent = paper.abstract;
    document.getElementById('paperMethods').textContent = paper.methods;
    document.getElementById('paperResults').textContent = paper.results;
    document.getElementById('paperNotes').textContent = paper.notes;
    
    // 填充标签
    const tagsContainer = document.getElementById('paperTags');
    tagsContainer.innerHTML = '';
    paper.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
    });
    
    // 填充贡献列表
    const contributionsContainer = document.getElementById('paperContributions');
    contributionsContainer.innerHTML = '';
    paper.contributions.forEach(contribution => {
        const li = document.createElement('li');
        li.textContent = contribution;
        contributionsContainer.appendChild(li);
    });
    
    // 填充链接
    const linksContainer = document.getElementById('paperLinks');
    linksContainer.innerHTML = '';
    paper.links.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.target = '_blank';
        linkElement.className = 'paper-link';
        linkElement.innerHTML = `<i class="${link.icon}"></i> ${link.title}`;
        linksContainer.appendChild(linkElement);
    });

    // 显示弹窗
    const modal = document.getElementById('paperModal');
    const modalContent = modal.querySelector('.modal-content');
    
    // 移除关闭动画类，确保每次打开都播放打开动画
    modalContent.classList.remove('fade-out');
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // 防止背景滚动
}

// 关闭论文详情弹窗
function closePaperModal() {
    const modal = document.getElementById('paperModal');
    const modalContent = modal.querySelector('.modal-content');
    
    // 添加关闭动画类
    modalContent.classList.add('fade-out');
    
    // 在动画结束后隐藏弹窗
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // 恢复背景滚动
    }, 300); // 动画时长为300ms
}

// 点击弹窗外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('paperModal');
    if (event.target === modal) {
        closePaperModal();
    }
}

// ESC键关闭弹窗
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('paperModal');
        if (modal.style.display === 'block') {
            closePaperModal();
        }
    }
});
