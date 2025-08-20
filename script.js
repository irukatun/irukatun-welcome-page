// 等待 DOM 完全載入後再執行
document.addEventListener('DOMContentLoaded', function() {
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
                    window.confirmAuthorizedRedirect("https://jupyter-lite.irukatun.dev","Jupyter Lite");
                    break;
            }
        });
    });

    // 觸控設備優化
    if ("ontouchstart" in window) {
        // 移除滑鼠移動效果，避免在觸控設備上出現問題
        document.removeEventListener("mousemove", () => {});
        
        // 添加觸控反饋
        const touchElements = document.querySelectorAll(".social-link, .services-button, .wake-button, .status-button, .close-btn");
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

// 授權訪問確認（Remote Access 與 Jupyter Notebook 分流）
window.confirmAuthorizedRedirect = function(url, label) {
    const serviceLabel = label || '目標服務';
    const confirmed = confirm(
        '⚠️ 僅限具有權限的用戶訪問' +
        '\n\n此服務僅開放給已授權或受邀使用者，未經授權的嘗試可能被記錄。' +
        '\n\n是否要繼續前往 ' + serviceLabel + '？'
    );
    if (confirmed) {
        window.directRedirect(url);
    }
};
