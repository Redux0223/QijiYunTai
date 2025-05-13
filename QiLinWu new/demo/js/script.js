// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 导航菜单
    const menuLinks = document.querySelectorAll('.menu a');
    const pages = document.querySelectorAll('.page');
    
    // 为每个菜单项添加点击事件
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // 更新菜单状态
            menuLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            // 切换页面
            pages.forEach(page => page.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');
            
            // 添加URL历史记录
            history.pushState(null, null, `#${targetId}`);
        });
    });
    
    // 处理标签页切换
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // 更新标签状态
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 切换内容
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            document.getElementById(`${tabName}-content`).classList.add('active');
        });
    });
    
    // 上传相关功能
    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');
    const processBtn = document.getElementById('processBtn');
    const uploadStatus = document.getElementById('uploadStatus');
    const progressBar = document.getElementById('progressBar');
    const statusText = document.getElementById('statusText');
    
    // 点击上传区域触发文件选择
    if (dropArea) {
        dropArea.addEventListener('click', () => {
            fileInput.click();
        });
        
        // 拖拽文件进入
        dropArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropArea.classList.add('drag-over');
        });
        
        // 拖拽文件离开
        dropArea.addEventListener('dragleave', () => {
            dropArea.classList.remove('drag-over');
        });
        
        // 拖拽文件释放
        dropArea.addEventListener('drop', (e) => {
            e.preventDefault();
            dropArea.classList.remove('drag-over');
            
            if (e.dataTransfer.files.length) {
                handleFile(e.dataTransfer.files[0]);
            }
        });
    }
    
    // 文件选择变化
    if (fileInput) {
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length) {
                handleFile(fileInput.files[0]);
            }
        });
    }
    
    // 处理文件上传
    function handleFile(file) {
        // 显示上传状态
        uploadStatus.style.display = 'block';
        progressBar.style.width = '0%';
        statusText.textContent = `准备上传: ${file.name}`;
        
        // 模拟上传进度
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            progressBar.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                statusText.textContent = '上传完成!';
                processBtn.disabled = false;
                
                // 添加文件名显示
                const fileName = document.createElement('div');
                fileName.className = 'file-name';
                fileName.innerHTML = `<i class="fa-solid fa-file"></i> ${file.name}`;
                uploadStatus.appendChild(fileName);
                
                // 添加上传成功动画
                dropArea.classList.add('pulse');
                setTimeout(() => {
                    dropArea.classList.remove('pulse');
                }, 1000);
            }
        }, 100);
    }
    
    // 处理按钮点击
    if (processBtn) {
        processBtn.addEventListener('click', () => {
            // 显示处理中页面
            pages.forEach(page => page.classList.remove('active'));
            document.getElementById('processing').classList.add('active');
            
            // 模拟处理进度
            const processingProgress = document.getElementById('processingProgress');
            let progress = 0;
            const interval = setInterval(() => {
                progress += 2;
                if (processingProgress) {
                    processingProgress.style.width = `${progress}%`;
                }
                
                if (progress >= 100) {
                    clearInterval(interval);
                    
                    // 处理完成后显示结果页面
                    setTimeout(() => {
                        pages.forEach(page => page.classList.remove('active'));
                        document.getElementById('result').classList.add('active');
                        
                        // 更新菜单状态
                        menuLinks.forEach(item => item.classList.remove('active'));
                        document.querySelector('.menu a[href="#result"]').classList.add('active');
                    }, 500);
                }
            }, 50);
        });
    }
    
    // 返回上传按钮
    const backToUploadBtn = document.getElementById('backToUpload');
    if (backToUploadBtn) {
        backToUploadBtn.addEventListener('click', () => {
            // 切换到上传页面
            pages.forEach(page => page.classList.remove('active'));
            document.getElementById('upload').classList.add('active');
            
            // 更新菜单状态
            menuLinks.forEach(item => item.classList.remove('active'));
            document.querySelector('.menu a[href="#upload"]').classList.add('active');
            
            // 重置上传状态
            uploadStatus.style.display = 'none';
            processBtn.disabled = true;
            
            // 删除可能存在的文件名显示
            const fileName = uploadStatus.querySelector('.file-name');
            if (fileName) {
                fileName.remove();
            }
        });
    }
    
    // 取消按钮
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            // 切换回上传页面
            pages.forEach(page => page.classList.remove('active'));
            document.getElementById('upload').classList.add('active');
            
            // 更新菜单状态
            menuLinks.forEach(item => item.classList.remove('active'));
            document.querySelector('.menu a[href="#upload"]').classList.add('active');
        });
    }
    
    // 添加按钮波纹效果
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 创建波纹元素
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            // 计算位置
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // 设置波纹位置
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // 动画完成后移除
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // 滚动动画效果
    const scrollElements = document.querySelectorAll('.scroll-animation');
    
    function checkElementsInView() {
        scrollElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('scrolled-into-view');
            }
        });
    }
    
    // 初始检查
    checkElementsInView();
    
    // 滚动时检查
    window.addEventListener('scroll', checkElementsInView);
    
    // 检查URL哈希值并切换到相应页面
    function checkHash() {
        const hash = location.hash;
        if (hash) {
            const targetId = hash.substring(1);
            
            // 切换页面
            pages.forEach(page => page.classList.remove('active'));
            const targetPage = document.getElementById(targetId);
            
            if (targetPage) {
                targetPage.classList.add('active');
                
                // 更新菜单状态
                menuLinks.forEach(item => item.classList.remove('active'));
                document.querySelector(`.menu a[href="#${targetId}"]`).classList.add('active');
            }
        }
    }
    
    // 初始检查哈希值
    checkHash();
    
    // 检查视频是否可用
    const video = document.querySelector('.result-video');
    const videoFallback = document.querySelector('.video-fallback');
    
    if (video && videoFallback) {
        video.addEventListener('error', () => {
            video.style.display = 'none';
            videoFallback.style.display = 'block';
        });
    }
});

// 处理浏览器历史导航
window.addEventListener('popstate', function() {
    const hash = location.hash;
    if (hash) {
        const targetId = hash.substring(1);
        
        // 切换页面
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        document.getElementById(targetId).classList.add('active');
        
        // 更新菜单状态
        document.querySelectorAll('.menu a').forEach(item => item.classList.remove('active'));
        document.querySelector(`.menu a[href="#${targetId}"]`).classList.add('active');
    }
}); 