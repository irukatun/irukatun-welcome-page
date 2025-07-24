// DOM 元素
const moreInfo = document.querySelector(".more-info");
const modalOverlay = document.getElementById("modalOverlay");
const closeBtn = document.getElementById("closeBtn");
const mainCard = document.querySelector(".main-card");

// 開啟模糊彈出框
function openModal() {
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

// 關閉模糊彈出框
function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
}

// 事件監聽器
moreInfo.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);

// 點擊背景關閉模糊彈出框
modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// ESC 鍵關閉模糊彈出框
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
        closeModal();
    }
});

// 狀態指示器動畫
const statusDots = document.querySelectorAll(".status-dot");
let currentDot = 0;

function animateStatusDots() {
    statusDots.forEach(dot => dot.classList.remove("active"));
    statusDots[currentDot].classList.add("active");
    currentDot = (currentDot + 1) % statusDots.length;
}

// 每1秒切換狀態指示器
setInterval(animateStatusDots, 1000);

// 背景圖形動畫增強
const shapes = document.querySelectorAll(".shape");
shapes.forEach((shape, index) => {
    shape.style.setProperty("--rotation", `${index * 45}deg`);
});

// 主卡片進入動畫
window.addEventListener("load", () => {
    mainCard.style.opacity = "0";
    mainCard.style.transform = "translateY(30px) scale(0.9)";
    
    setTimeout(() => {
        mainCard.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
        mainCard.style.opacity = "1";
        mainCard.style.transform = "translateY(0) scale(1)";
    }, 300);
});

// 社交連結點擊處理（示例）
const socialLinks = document.querySelectorAll(".social-link");
socialLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        
        // 添加點擊動畫
        link.style.transform = "scale(0.9)";
        setTimeout(() => {
            link.style.transform = "";
        }, 150);
        
        // 這裡可以添加實際的連結邏輯
        const linkType = link.classList[1]; // github, email, website
        console.log(`點擊了 ${linkType} 連結`);
        
        // 示例：根據連結類型執行不同操作
        switch(linkType) {
            case "github":
                window.open("https://github.com/tuntun1112", "_blank");
                break;
            case "email":
                window.location.href = "mailto:support@irukatun.dev";
                break;
            case "website":
                window.open("https://irukatun.dev", "_blank");
                break;
        }
    });
});

// 添加滑鼠移動視差效果
document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        // 重新啟用滑鼠跟隨效果
        shape.style.transform = `translate(${x}px, ${y}px) rotate(var(--rotation, 0deg))`;
    });
});

// 觸控設備優化
if ("ontouchstart" in window) {
    // 移除滑鼠移動效果，避免在觸控設備上出現問題
    document.removeEventListener("mousemove", () => {});
    
    // 添加觸控反饋
    const touchElements = document.querySelectorAll(".social-link, .more-info, .close-btn");
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


