// Service Worker for Cache Management
const CACHE_NAME = 'irukatun-welcome-v1.2.0';
const STATIC_CACHE = 'static-v1.2.0';

// 需要緩存的資源
const CACHE_URLS = [
    '/',
    '/index.html',
    '/style.css?v=2.1.0',
    '/script.js?v=2.1.0',
    '/avatar.jpg?v=2.1.0',
    '/favicon.png?v=2.1.0'
];

// 安裝Service Worker
self.addEventListener('install', event => {
    console.log('Service Worker 安裝中...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('緩存已開啟');
                return cache.addAll(CACHE_URLS);
            })
            .then(() => {
                // 強制激活新的Service Worker
                return self.skipWaiting();
            })
    );
});

// 激活Service Worker
self.addEventListener('activate', event => {
    console.log('Service Worker 激活中...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // 刪除舊版本的緩存
                    if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE) {
                        console.log('刪除舊緩存:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // 立即控制所有客戶端
            return self.clients.claim();
        })
    );
});

// 攔截網路請求
self.addEventListener('fetch', event => {
    // 只處理同域請求
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        // 網路優先策略 (對HTML文件使用)
        event.request.url.includes('.html') || event.request.url === self.location.origin + '/' ?
            networkFirst(event.request) :
            // 緩存優先策略 (對靜態資源使用)
            cacheFirst(event.request)
    );
});

// 網路優先策略
async function networkFirst(request) {
    try {
        // 嘗試從網路獲取
        const networkResponse = await fetch(request);
        
        // 如果成功，更新緩存
        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        // 網路失敗，從緩存獲取
        console.log('網路請求失敗，使用緩存:', request.url);
        return caches.match(request);
    }
}

// 緩存優先策略
async function cacheFirst(request) {
    // 首先嘗試從緩存獲取
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    // 緩存中沒有，從網路獲取
    try {
        const networkResponse = await fetch(request);
        
        // 如果成功，添加到緩存
        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('無法獲取資源:', request.url);
        return new Response('資源無法載入', { status: 404 });
    }
}

// 監聽消息，用於手動清除緩存
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        return caches.delete(cacheName);
                    })
                );
            }).then(() => {
                // 通知客戶端緩存已清除
                self.clients.matchAll().then(clients => {
                    clients.forEach(client => {
                        client.postMessage({ type: 'CACHE_CLEARED' });
                    });
                });
            })
        );
    }
});
