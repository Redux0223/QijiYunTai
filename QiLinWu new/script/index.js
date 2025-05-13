// function openCozeChat() {
//     try {
//         // 创建新的聊天实例
//         const chatClient = new CozeWebSDK.WebChatClient({
//             config: {
//                 bot_id: '7428791282442436635',
//                 pat: 'pat_0chbDW41AzTN9m5AkmsItc4RPwBsRihCAOY2zI994jRB5ExSmMXLkqI3MBwLIcg4'
//             },
//             componentProps: {
//                 title: '麒麟舞学习助手',
//                 open: true,
//                 position: 'right', // 设置窗口位置
//                 width: '400px',    // 设置窗口宽度
//                 height: '600px'    // 设置窗口高度
//             }
//         });
        
//         // 确保聊天窗口打开
//         chatClient.open();
        
//     } catch (error) {
//         console.error('打开聊天窗口失败:', error);
//         alert('聊天助手加载失败，请稍后重试');
//     }
// }

// // 添加跳转函数
// function open3DModelDemo() {
//     // 替换为您新部署的Gradio应用URL
//     const gradioAppUrl = "https://huggingface.co/spaces/[您的用户名]/[Space名称]";
//     window.open(gradioAppUrl, '_blank');
// }

// async function predict() {
//     const inputText = document.getElementById("userInput").value;
//     if (!inputText.trim()) {
//         alert("请输入内容");
//         return;
//     }

//     try {
//         const response = await fetch("http://localhost:8000/predict/", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ text: inputText }),
//         });

//         if (!response.ok) {
//             throw new Error('网络响应不正常');
//         }

//         const result = await response.json();
//         if (result.link) {
//             window.location.href = result.link;
//         } else {
//             alert("未找到相关内容");
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert("处理请求时出错，请稍后重试");
//     }
// }

// 打开demo模态窗口
function openDemoModal() {
    const modal = document.getElementById('demoModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }
}

// 关闭demo模态窗口
function closeDemoModal() {
    const modal = document.getElementById('demoModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // 恢复背景滚动
    }
}

// 当用户点击模态窗口外部时关闭
window.addEventListener('click', function(event) {
    const modal = document.getElementById('demoModal');
    if (event.target === modal) {
        closeDemoModal();
    }
});

// 烟花效果和页面切换函数
function exploreWithFireworks() {
    // 获取烟花元素
    const leftFirework = document.querySelector('.fireworks-left');
    const rightFirework = document.querySelector('.fireworks-right');
    
    // 激活按钮动画
    const exploreButton = document.querySelector('.explore-button');
    exploreButton.style.transform = 'scale(1.1)';
    exploreButton.style.boxShadow = '0 10px 30px rgba(220, 38, 38, 0.5)';
    
    // 只保留一次烟花效果，使用更华丽的内部烟花参数
    triggerFireworks(leftFirework, rightFirework, 'inner');
    
    // 快速淡出当前页面
    const welcomeSection = document.getElementById('0');
    if (welcomeSection) {
        welcomeSection.style.opacity = '0';
        welcomeSection.style.transition = 'opacity 0.4s ease';
    }
    
    // 确保清除任何可能存在的遮罩
    const screenMask = document.querySelector('.screen-mask');
    if (screenMask) {
        screenMask.style.display = 'none';
    }
    
    // 较短延迟后切换页面（让烟花有足够时间展示但不产生明显停顿）
    setTimeout(() => {
        showDiv1(1); // 切换到专业服务页面
        
        // 恢复欢迎页面的透明度（为下次切换做准备）
        if (welcomeSection) {
            setTimeout(() => {
                welcomeSection.style.opacity = '1';
            }, 300);
        }
    }, 400);
}

// 触发烟花效果
function triggerFireworks(leftFirework, rightFirework, type) {
    // 清除之前的烟花粒子
    leftFirework.innerHTML = '';
    rightFirework.innerHTML = '';
    
    // 显示烟花容器
    leftFirework.classList.add('firework-active');
    rightFirework.classList.add('firework-active');
    
    // 创建左侧烟花粒子
    createFireworkParticles(leftFirework, 'left', type);
    
    // 创建右侧烟花粒子
    createFireworkParticles(rightFirework, 'right', type);
}

// 创建烟花粒子
function createFireworkParticles(container, side, type) {
    // 烟花颜色 - 更加鲜艳的色彩
    const colors = [
        '#FF3333', // 更鲜艳的红色
        '#FF8800', // 更鲜艳的橙色
        '#FFDD00', // 更鲜艳的黄色
        '#AAFF00', // 更鲜艳的绿色
        '#00EEFF', // 更鲜艳的青色
        '#7030FF', // 更鲜艳的紫色
        '#FF2090', // 更鲜艳的粉色
        '#FFFFFF'  // 白色
    ];
    
    // 增加粒子数量，提高视觉效果
    const particleCount = 150;
    
    for (let i = 0; i < particleCount; i++) {
        // 创建粒子元素
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        
        // 随机选择颜色
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        // 增强阴影效果，提高亮度
        particle.style.boxShadow = `0 0 8px ${color}, 0 0 15px ${color}`;
        
        // 设置粒子大小
        const sizeFactor = Math.random() * 1.8 + 0.7;
        particle.style.setProperty('--size-factor', sizeFactor);
        
        // 设置烟花喷射的角度（全方位）
        let angleStart, angleEnd;
        if (side === 'left') {
            angleStart = -160; 
            angleEnd = 70;
        } else {
            angleStart = 110;
            angleEnd = 340;
        }
        
        // 随机角度和距离
        const angle = (Math.random() * (angleEnd - angleStart) + angleStart) * Math.PI / 180;
        // 随机距离，增加变化效果
        const distance = 150 + Math.random() * 350;
        
        // 计算最终位置
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        // 设置粒子CSS变量
        particle.style.setProperty('--x', `${x}px`);
        particle.style.setProperty('--y', `${y}px`);
        particle.style.setProperty('--base-opacity', `${Math.random() * 0.6 + 0.4}`);
        
        // 设置动画 - 缩短动画时间以减少卡顿感
        const duration = 600 + Math.random() * 400;
        particle.style.animation = `
            particle-explosion ${duration}ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards,
            particle-flicker ${Math.random() * 70 + 30}ms ease-in-out infinite,
            particle-trail ${duration}ms ease-out forwards
        `;
        
        // 添加到容器
        container.appendChild(particle);
    }
}

// 添加html2canvas的polyfill
function html2canvas(element) {
    return new Promise((resolve) => {
        // 创建一个临时canvas
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        // 设置canvas尺寸
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // 简单的背景颜色填充（实际上应该是截图）
        context.fillStyle = '#f5f5f5';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // 由于我们无法真正截屏，这里只是模拟
        // 在实际应用中，需要包含html2canvas库才能实现真正的截图
        setTimeout(() => {
            resolve(canvas);
        }, 100); // 添加一个短暂延迟确保渲染完成
    });
}

// 添加滚动到指定section的函数
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        // 先确保该元素可见
        showDiv1(parseInt(id));
        
        // 然后滚动到该元素
        setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
}

function hideDiv(index)
{
    var div1 = document.getElementById(index);
    if (div1) {
        // 先设置透明度为0
        div1.style.opacity = "0";
        // 短暂延迟后隐藏元素，避免生硬的切换
        setTimeout(() => {
            div1.style.display = "none";
        }, 300);
    }
}

function showDiv(index)
{
    var div2 = document.getElementById(index);
    if (div2) {
        // 先显示但透明
        div2.style.opacity = "0";
        div2.style.display = "block";
        div2.style.transition = "opacity 0.4s ease";
        
        // 强制回流后显示元素
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                div2.style.opacity = "1";
            });
        });
    }
    divNum = index;
}

var showing1 = 0;
function showDiv1(index)
{
    // 如果是相同页面，不进行操作
    if (showing1 === index) return;
    
    hideDiv(showing1);
    showDiv(index);
    showing1 = index;
}

var showing2 = 31;
function showDiv2(index)
{
    // 如果是相同页面，不进行操作
    if (showing2 === index) return;
    
    hideDiv(showing2);
    showDiv(index);
    showing2 = index;
}