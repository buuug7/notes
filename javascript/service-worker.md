# service worker

Service Worker 是一个独立于 js 主线程的一种 Web Worker 线程，一个独立于主线程的 Context，但是面向开发者来说 Service Worker 的形态其实就是一个需要开发者自己维护的文件，我们假设这个文件叫做 sw.js，此文件的内容就是定制 Service Worker 生命周期中每个阶段所处理的定制化的细节逻辑，比如缓存 Cache 的读写，更新的策略，推送的策略等等，通常 sw.js 文件是处于项目的根目录，并且需要保证能直接通过 `https://yourhost/sw.js` 这种形式直接被访问到才行。

## 限制

HTTPS 是 Service Worker 所必须依赖的应用层协议，Service Worker 只有在 Web App 为 HTTPS 的环境下才能被注册成功，可是我们开发的时候应该不会直接在线上开发，拥有一个 HTTPS 的测试环境成本很高。

各大浏览器厂商也考虑到了这个问题，如 Chrome，Firefox，在 localhost 和 127.0.0.1 的 host 下，也能注册成功。这样就能保证我们在本地开发的时候也能直接在本地注册。

## 注册 service worker

```javascript
if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/sw.js");
}
```

## simple example

```javascript
// sw.js 文件

// 安装
self.addEventListener("install", function (e) {
  // 缓存 App Shell 等关键静态资源和 html (保证能缓存的内容能在离线状态跑起来)
});

// 激活
self.addEventListener("activate", function (e) {
  // 激活的状态，这里就做一做老的缓存的清理工作
});

// 缓存请求和返回（这是个简单的缓存优先的例子）
self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      if (response) {
        return response;
      }
      // fetchAndCache 方法并不存在，需要自己定义，这里只是示意代码
      return fetchAndCache(e.request);
    })
  );
});
```

## references

- https://zhuanlan.zhihu.com/p/28161855
