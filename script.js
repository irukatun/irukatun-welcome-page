// === 版本配置 - 唯一版本來源 ===
const APP_VERSION = '1.3.25-release';
const BUILD_DATE = '2025-10-02 18:13:42';

// 版本資訊（從上方配置讀取）
const CURRENT_VERSION = APP_VERSION;
const CURRENT_VERSION_DATE = BUILD_DATE;

// 等待 DOM 完全載入後再執行
document.addEventListener('DOMContentLoaded', function() {
    // 更新頁面上的版本顯示
    const versionDisplay = document.getElementById('version-display');
    const versionDate = document.getElementById('version-date');
    if (versionDisplay) {
        versionDisplay.textContent = CURRENT_VERSION;
    }
    if (versionDate) {
        versionDate.textContent = CURRENT_VERSION_DATE;
    }
    
    // 主題切換功能
    initThemeToggle();
    
    // DOM 元素
    const servicesButton = document.querySelector(".services-button");
    const modalOverlay = document.getElementById("modalOverlay");
    const jupyterModalOverlay = document.getElementById("jupyterModalOverlay");
    const closeBtn = document.getElementById("closeBtn");
    const mainCard = document.querySelector(".main-card");
    const wakeButton = document.querySelector(".wake-button");



    // 檢查必要元素是否存在
    if (!servicesButton) {
        console.error('Services button not found');
        return;
    }
    if (!modalOverlay) {
        console.error('Modal overlay not found');
        return;
    }
    if (!wakeButton) {
        console.error('Control button not found');
        return;
    }

    // 開啟服務列表彈出框
    function openModal() {
        modalOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    // 關閉服務列表彈出框
    function closeModal() {
        modalOverlay.classList.remove("active");
        document.body.style.overflow = "auto";
    }

    // 開啟 Jupyter 配置選擇彈出框
    function openJupyterModal() {
        modalOverlay.classList.remove("active");
        if (jupyterModalOverlay) {
            jupyterModalOverlay.classList.add("active");
        }
    }

    // 關閉 Jupyter 配置選擇彈出框
    function closeJupyterModal() {
        if (jupyterModalOverlay) {
            jupyterModalOverlay.classList.remove("active");
        }
        document.body.style.overflow = "auto";
    }

    // 事件監聽器 - 添加安全檢查
    if (servicesButton) {
        servicesButton.addEventListener("click", openModal);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    // 服務控制按鈕事件處理
    if (wakeButton) {
        wakeButton.addEventListener("click", (e) => {
            e.preventDefault();
            
            // 添加點擊動畫
            wakeButton.style.transform = "scale(0.95)";
            setTimeout(() => {
                wakeButton.style.transform = "";
            }, 150);
            
            // 直接跳轉
            window.directRedirect("https://control.irukatun.dev");
        });
    }
    
    // 服務狀態按鈕事件處理
    const statusButton = document.querySelector(".status-button");
    if (statusButton) {
        statusButton.addEventListener("click", (e) => {
            e.preventDefault();
            
            // 添加點擊動畫
            statusButton.style.transform = "scale(0.95)";
            setTimeout(() => {
                statusButton.style.transform = "";
            }, 150);
            
            // 直接跳轉
            window.directRedirect("https://status.irukatun.dev");
        });
    }

    // 點擊背景關閉彈出框 - 添加安全檢查
    if (modalOverlay) {
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    if (jupyterModalOverlay) {
        jupyterModalOverlay.addEventListener("click", (e) => {
            if (e.target === jupyterModalOverlay) {
                closeJupyterModal();
            }
        });
    }

    // ESC 鍵關閉彈出框 - 添加安全檢查
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (modalOverlay && modalOverlay.classList.contains("active")) {
                closeModal();
            }
            if (jupyterModalOverlay && jupyterModalOverlay.classList.contains("active")) {
                closeJupyterModal();
            }

        }
    });

    // 狀態指示器動畫
    const statusDots = document.querySelectorAll(".status-dot");
    let currentDot = 0;

    function animateStatusDots() {
        if (statusDots.length > 0) {
            statusDots.forEach(dot => dot.classList.remove("active"));
            statusDots[currentDot].classList.add("active");
            currentDot = (currentDot + 1) % statusDots.length;
        }
    }

    // 每1秒切換狀態指示器
    if (statusDots.length > 0) {
        setInterval(animateStatusDots, 1000);
    }

    // 主卡片進入動畫
    if (mainCard) {
        window.addEventListener("load", () => {
            mainCard.style.opacity = "0";
            mainCard.style.transform = "translateY(30px) scale(0.9)";
            
            setTimeout(() => {
                mainCard.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
                mainCard.style.opacity = "1";
                mainCard.style.transform = "translateY(0) scale(1)";
            }, 300);
        });
    }

    // 社交連結點擊處理
    const socialLinks = document.querySelectorAll(".social-link");
    socialLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            
            // 添加點擊動畫
            link.style.transform = "scale(0.9)";
            setTimeout(() => {
                link.style.transform = "";
            }, 150);
            
            // 根據連結類型執行不同操作
            const linkType = link.classList[1]; // github, email, website
            
            switch(linkType) {
                case "github":
                    window.directRedirect("https://github.com/irukatun");
                    break;
                case "email":
                    // Email 不需要跳轉提示，直接執行
                    window.location.href = "mailto:support@irukatun.dev";
                    break;
                case "website":
                    window.directRedirect("https://irukatun.dev");
                    break;
                case "jupyter":
                    window.directRedirect("https://jupyter-lite.irukatun.dev");
                    break;
            }
        });
    });

    // 觸控設備優化
    if ("ontouchstart" in window) {
        // 移除滑鼠移動效果，避免在觸控設備上出現問題
        document.removeEventListener("mousemove", () => {});
        
        // 添加觸控反饋
        const touchElements = document.querySelectorAll(".social-link, .services-button, .wake-button, .status-button, .close-btn, .service-item");
        touchElements.forEach(element => {
            element.addEventListener("touchstart", () => {
                element.style.transform = "scale(0.95)";
            });
            
            element.addEventListener("touchend", () => {
                setTimeout(() => {
                    element.style.transform = "";
                }, 150);
            });
        });
    }
    
    // 添加 Jupyter 服務項目的點擊事件處理
    const jupyterService = document.querySelector(".jupyter-service");
    if (jupyterService) {
        jupyterService.addEventListener("click", openJupyterModal);
    }
    
    // 添加 Jupyter 模態框關閉按鈕的事件處理
    const jupyterCloseBtn = document.querySelector('#jupyterModalOverlay .close-btn');
    if (jupyterCloseBtn) {
        jupyterCloseBtn.addEventListener("click", closeJupyterModal);
    }
});

// 提供備用的全局函數，以防某些功能需要在 DOMContentLoaded 外執行
window.openModal = function() {
    const modalOverlay = document.getElementById("modalOverlay");
    if (modalOverlay) {
        modalOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }
};

window.closeModal = function() {
    const modalOverlay = document.getElementById("modalOverlay");
    if (modalOverlay) {
        modalOverlay.classList.remove("active");
        document.body.style.overflow = "auto";
    }
};

// 確認進入後台管理
window.confirmDashboardAccess = function() {
    const confirmed = confirm("⚠️ 您即將進入服務狀態的後台管理介面\n\n這是管理員專用頁面，可能不是您該去的地方。\n\n確定要繼續嗎？");
    
    if (confirmed) {
        window.directRedirect('https://status.irukatun.dev/dashboard');
    }
};



// 添加 Jupyter 相關的全局函數
window.openJupyterModal = function() {
    const modalOverlay = document.getElementById("modalOverlay");
    const jupyterModalOverlay = document.getElementById("jupyterModalOverlay");
    
    if (modalOverlay) {
        modalOverlay.classList.remove("active");
    }
    if (jupyterModalOverlay) {
        jupyterModalOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }
};

window.closeJupyterModal = function() {
    const jupyterModalOverlay = document.getElementById("jupyterModalOverlay");
    if (jupyterModalOverlay) {
        jupyterModalOverlay.classList.remove("active");
        document.body.style.overflow = "auto";
    }
};

// 添加跳轉相關的全局函數
// 直接跳轉函數（無延遲）
window.directRedirect = function(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
};

// 保留原有的跳轉模態框函數（可選保留，以防需要）
window.showRedirectModal = function(url) {
    // 直接跳轉，不再顯示模態框
    window.directRedirect(url);
};

// 主題切換功能
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    
    // 檢測系統主題偏好
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // 獲取保存的主題或使用系統偏好
    let currentTheme = localStorage.getItem('theme');
    if (!currentTheme) {
        currentTheme = prefersDarkMode ? 'dark' : 'light';
    }
    
    // 應用主題
    setTheme(currentTheme);
    
    // 添加點擊事件
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            currentTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(currentTheme);
            localStorage.setItem('theme', currentTheme);
        });
    }
    
    // 監聽系統主題變化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // 如果用戶沒有手動設置過主題，則跟隨系統
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            setTheme(newTheme);
        }
    });
    
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.className = 'fas fa-sun';
            } else {
                themeIcon.className = 'fas fa-moon';
            }
        }
    }
}
