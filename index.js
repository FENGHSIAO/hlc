///<reference lib="dom" />
///<reference lib="dom.iterable" />
///<reference lib="dom.asynciterable" />
///<reference lib="webworker" />
///<reference lib="webworker.iterable" />
///<reference lib="webworker.importscripts" />
//** // @ts-check

new (class _ {
  constructor() {
    const version = "0.0.2";
    const alives = new Map();
    const codeMap = new Map();
    const breeze = new BroadcastChannel("breeze");


    const ADMIN_KEY = Deno.env.get("ADMIN_KEY");


    class HTMLElement {
      static html(currentOrigin) {
        return /*html*/ `
          <!DOCTYPE html>
          <html lang="zh-CN">
            <head>
              <meta charset="UTF-8">
              <base href="${currentOrigin}">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta name="mobile-web-app-capable" content="yes">
              <meta name="apple-mobile-web-app-status-bar-style" content="#000">
              <meta name="apple-mobile-web-app-capable" content="yes">
              <meta name="apple-mobile-web-app-title" content="圣灯社区">
              <meta name="application-name" content="圣灯社区">
              <meta name="format-detection" content="telephone=no">
              <meta name="keywords" content="Holy Lantern Community, HolyLanternCommunity, hlc, 圣灯社区">
              <meta name="description" content="Holy Lantern Community">
              <meta name="author" content="Universes">
              <meta name="robots" content="index, follow">
              <meta name="start_url" content="/">
              <title>圣灯社区</title>
              <link rel="icon" type="image/svg+xml" href="/icon.svg">
              <link rel="apple-touch-icon" type="image/png" href="/icon.png">
              <link rel="mask-icon" href="/icon.svg" color="#000">
              <link rel="fluid-icon" href="/icon.png" title="圣灯社区">
              <link rel="shortcut icon" type="image/svg+xml" href="/icon.svg">
              <link rel="apple-touch-startup-image" type="image/png" href="/icon.png">
              <link rel="manifest" type="application/manifest+json" href="/manifest.webmanifest">
            </head>
            <body></body>
            <style>
              :root {
                --red: 0;
                --green: 0;
                --blue: 0;
                --redAlpha: 0;
                --greenAlpha: 0;
                --blueAlpha: 0;
                --alpha: calc((var(--redAlpha) + var(--greenAlpha) + var(--blueAlpha)) / 3);
                --light: rgba( calc(255 - var(--red)), calc(255 - var(--green)), calc(255 - var(--blue)), 1);
                --dark: rgba(var(--red), var(--green), var(--blue), 1);
              }
              ::-webkit-scrollbar {
                width: 0px;
                background-color: rgba( calc(255 - var(--red)), calc(255 - var(--green)), calc(255 - var(--blue)), 0);
              }
              html,
              body {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                width: 100dvw;
                height: 100dvh;
                background-color: var(--light);
                color: var(--dark);
                border-color: var(--dark);
                font-family: Verdana, "PingFang SC", "Microsoft YaHei", "Wenquanyi Micro Hei", sans-serif;
                overflow: hidden;
                transition: all 1s ease-in-out;
              }
              body {
                display: grid;
                grid-template-columns: 100%;
                grid-template-rows: 100%;
                grid-template-areas: "body";
                place-items: center;
              }
              div::-webkit-scrollbar {
                display: none;
              }
              section::-webkit-scrollbar {
                display: none;
              }
              a {
                text-decoration: none;
                color: inherit;
              }
              button {
                width: 100%;
                height: 100%;
                padding: 10px;
                background-color: transparent;
                font-size: 1.5rem;
                border: none;
                border-top: 5px solid;
                color: var(--dark);
                transition: all 1s ease-in-out;
              }
              input {
                width: 100%;
                height: 100%;
                text-align: center;
                font-size: 2rem;
                background-color: transparent;
                color: var(--dark);
                border: none;
                outline: none;
                transition: all 1s ease-in-out;
              }
              input::placeholder{
                font-size: 2rem;
                color: transparent;
                text-align: center;
                text-shadow: 0 0 0 rgba(0, 0, 0, 0.5);
                transition: all 1s ease-in-out;
              }
              input::-webkit-scrollbar{
                display: none;
              }
              select {
                width: 100%;
                height: 100%;
                border: none;
                outline: none;
                padding: 10px;
                background: rgba(0,0,0,0);
                color: inherit;
                font-size: 1.5rem;
                text-align: center;
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                transition: all 1s ease-in-out;
              }
              select::-ms-expand {
                display: none;
              }
              svg {
                pointer-events: none;
              }
              svg path{
                stroke: var(--dark);
                transition: all 1s ease-in-out;
              }
              @media (prefers-color-scheme: dark) {
                html,
                body {
                  background-color: var(--dark);
                  color: var(--light);
                  border-color: var(--light);
                }
                button,
                input {
                  color: var(--light);
                }
                input::placeholder {
                  text-shadow: 0 0 0 rgba(255, 255, 255, 0.5);
                }
                svg path {
                  stroke: var(--light);
                }
              }
              @media screen and (orientation: landscape) {}
            </style>
            <script id="race" type="module">
              const style = document.querySelector('style');
              const css = style.textContent;
              const sheet = new CSSStyleSheet();
              sheet.replaceSync(css);
              document.adoptedStyleSheets = [sheet];
              style.remove();
            </script>
            <script id="base" type="module" src="/$Web.Base"></script>
          </html>`.replace(/^\s*[\r\n]/gm, "").replace(/\s+/g, ' ');
      }
      static manifest(currentOrigin) {
        return {
          "name": "圣灯社区",
          "short_name": "HLC",
          "description": "Holy Lantern Community",
          "start_url": currentOrigin + "/",
          "id": "hlc.universes",
          "icons": [
            {
              "src": currentOrigin + "/icon.svg",
              "sizes": "any",
              "type": "image/svg+xml",
            },
            {
              "src": currentOrigin + "/icon.png",
              "sizes": "1024x1024",
              "type": "image/png",
            },
            {
              "src": currentOrigin + "/icon.ico",
              "sizes": "1024x1024",
              "type": "image/x-icon",
            },
          ],
          "theme_color": "#000",
          "background_color": "#000",
          "orientation": "any",
          "display": "fullscreen",
        };
      }
      static svg() {
        return /*html*/ `
          <svg width="1024px" height="1024px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 2C6.38 2 4.25 4.13 4.25 6.75C4.25 9.32 6.26 11.4 8.88 11.49C8.96 11.48 9.04 11.48 9.1 11.49C9.12 11.49 9.13 11.49 9.15 11.49C9.16 11.49 9.16 11.49 9.17 11.49C11.73 11.4 13.74 9.32 13.75 6.75C13.75 4.13 11.62 2 9 2Z" fill="#292D32"/>
            <path d="M14.0809 14.1489C11.2909 12.2889 6.74094 12.2889 3.93094 14.1489C2.66094 14.9989 1.96094 16.1489 1.96094 17.3789C1.96094 18.6089 2.66094 19.7489 3.92094 20.5889C5.32094 21.5289 7.16094 21.9989 9.00094 21.9989C10.8409 21.9989 12.6809 21.5289 14.0809 20.5889C15.3409 19.7389 16.0409 18.5989 16.0409 17.3589C16.0309 16.1289 15.3409 14.9889 14.0809 14.1489Z" fill="#292D32"/>
            <path d="M19.9894 7.33815C20.1494 9.27815 18.7694 10.9781 16.8594 11.2081C16.8494 11.2081 16.8494 11.2081 16.8394 11.2081H16.8094C16.7494 11.2081 16.6894 11.2081 16.6394 11.2281C15.6694 11.2781 14.7794 10.9681 14.1094 10.3981C15.1394 9.47815 15.7294 8.09815 15.6094 6.59815C15.5394 5.78815 15.2594 5.04815 14.8394 4.41815C15.2194 4.22815 15.6594 4.10815 16.1094 4.06815C18.0694 3.89815 19.8194 5.35815 19.9894 7.33815Z" fill="#292D32"/>
            <path d="M21.9883 16.5904C21.9083 17.5604 21.2883 18.4004 20.2483 18.9704C19.2483 19.5204 17.9883 19.7804 16.7383 19.7504C17.4583 19.1004 17.8783 18.2904 17.9583 17.4304C18.0583 16.1904 17.4683 15.0004 16.2883 14.0504C15.6183 13.5204 14.8383 13.1004 13.9883 12.7904C16.1983 12.1504 18.9783 12.5804 20.6883 13.9604C21.6083 14.7004 22.0783 15.6304 21.9883 16.5904Z" fill="#292D32"/>
          </svg>`.replace(/^\s*[\r\n]/gm, "").replace(/\s+/g, ' ');
      }
      static async icon(source, format = "png") {
        const { Image } = await import("https://deno.land/x/imagescript@1.3.0/mod.ts");
        const { createCanvas, loadImage } = await import("https://deno.land/x/canvas@v1.4.1/mod.ts");
        const svg = Image.renderSVG(source);
        const png = await svg.encode(0);
        const width = 1024;
        const height = 1024;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, height);
        const img = await loadImage(png);
        ctx.drawImage(img, 0, 0);
        const buffer = canvas.toBuffer(`image/${format}`);
        const blob = new Blob([buffer], { type: `image/${format}` });
        return blob;
      }
    }


    class $WebBase extends HTMLElement {
      /**
       * @typedef {Object} Zone
       * @property {Map<string, Worker>} casualWorkersMap - 用于存储所有临时工人的Map
       * @property {BroadcastChannel} bus - 用于与其他线程通信的广播频道
       * @property {ServiceWorkerRegistration} proxyServer - 用于注册代理服务器的ServiceWorkerRegistration
       */

      /**@type {Zone} */
      static zone = {};
      static isServerNode = false;
      static fire(type, detail) {
        globalThis.dispatchEvent(new CustomEvent(type, { detail: detail }));
      }
      static on(type, callback) {
        return globalThis.addEventListener(type, callback, false);
      }
      constructor() {
        super();
        this.rare = "web-base";
        /**@type {ShadowRoot} */
        this.root = this.attachShadow({ mode: 'open' });
        this.sheet = new CSSStyleSheet();
        this.root.adoptedStyleSheets = [this.sheet];
        this.template = new Proxy(document.createElement('template'), {
          set: (target, prop, value) => {
            if (prop === 'innerHTML') {
              this.root.innerHTML = '';
              const style = value.match(/<style>([\s\S]*)<\/style>/)?.[1] || "";
              value = value.replace(/<style>[\s\S]*<\/style>/, "");
              target.innerHTML = value.trim();
              this.root.appendChild(target.content.cloneNode(true));
              this.sheet.replaceSync(style);
            }
            return true;
          }
        });
      };
      static async $define() {
        const className = this.name;
        const tagName = className[0] === "$" ? className.slice(1).replace(/(?<!^)([A-Z])/g, "-$1").toLowerCase() : className.replace(/(?<!^)([A-Z])/g, "-$1").toLowerCase();
        if (!customElements.get(tagName)) {
          customElements.define(tagName, this);
          globalThis[className] = this;
        }
        if (className === "$WebBase") { await this.#boot(); }
        return [className, tagName];
      };
      static async $new(options = undefined) {
        const nameArray = await this.$define();
        const rareInstance = this.zone.rareMap.get(nameArray[1]);
        if (rareInstance) { return rareInstance; }
        const instance = new this(options);
        if (instance.rare) {
          this.zone.rareMap.set(instance.rare, instance);
        }
        return instance;
      };
      static async #boot() {
        /*-----------------注册紧急恢复事件--------------------*/
        (() => {
          let awake = false;
          let count = 0;
          let currentTimer = null;
          document.addEventListener("click", async () => {
            if (!awake) {
              awake = true;
              count = 1;
              currentTimer = setTimeout(() => {
                awake = false;
                count = 0;
                clearTimeout(currentTimer);
              }, 5000);
            } else {
              count++;
              if (count === 10) {
                const response = confirm("是否进行强制更新？");
                if (response) {
                  try {
                    console.log("开始强制更新");
                    // 清除localStorage
                    localStorage.clear();
                    // 清除sessionStorage
                    sessionStorage.clear();
                    // 清除cookie
                    const cookies = await cookieStore.getAll();
                    await Promise.all(cookies.map(cookie => cookieStore.delete(cookie)));
                    // 清除IndexedDB
                    const indexedDB = globalThis.indexedDB || globalThis.mozIndexedDB || globalThis.webkitIndexedDB || globalThis.msIndexedDB;
                    const databases = await indexedDB.databases();
                    await Promise.all(databases.map(database => indexedDB.deleteDatabase(database.name)));
                    // 清除CacheStorage
                    const cachesArray = await caches.keys();
                    await Promise.all(cachesArray.map(cache => caches.delete(cache)));
                    // 清除FileSystem
                    await (await navigator.storage.getDirectory()).remove({ recursive: true });
                    // 清除ServiceWorker
                    const registrations = await navigator.serviceWorker.getRegistrations();
                    await Promise.all(registrations.map(registration => registration.unregister()));
                    // 刷新页面
                    location.reload();
                  } catch (error) {
                    console.error(error);
                  }
                }
                clearTimeout(currentTimer);
                awake = false;
                count = 0;
              }
            }
          });
        })();
        /*-----------------设置全局唯一元素控制器--------------------*/
        this.zone.rareMap = new Map();
        /*-----------------招募临时工人--------------------*/
        const recruitmentQuantity = navigator.hardwareConcurrency ? navigator.hardwareConcurrency - 2 : 2;
        this.zone.casualWorkersReportCount = 0;
        this.zone.casualWorkersDone = new Promise((resolve) => { this.zone.casualWorkersDoneResolve = resolve; });
        this.zone.casualWorkersMap = new Map(
          Array.from({ length: recruitmentQuantity }, (_, index) => {
            const name = `No_${index + 1}CWer`;
            const casualWorker = new Worker("$Casual.Worker", { type: "module", name });
            return [name, casualWorker];
          })
        );
        /*-----------------加入虚拟总线--------------------*/
        this.zone.bus = new BroadcastChannel("BUS");
        this.zone.bus.onmessage = (event) => {
          const { to, from, type, content } = event.data;
          if (to === "MainAvenue") {
            switch (from) {
              case "ProxyServer": {
                switch (type) {
                  case "requestLatestNews": {
                    $WebBase.fire("requestLatestNews", content);
                    break;
                  }
                }
                break;
              }
              default: {
                switch (type) {
                  case "Report": {
                    const CWQuote = this.zone.casualWorkersMap.get(from);
                    CWQuote.status = content;
                    this.zone.casualWorkersReportCount++;
                    if (this.zone.casualWorkersReportCount === recruitmentQuantity) {
                      this.zone.casualWorkersDoneResolve();
                    }
                    break;
                  }
                  case "receiveConfig": {
                    this.isServerNode = content;
                    if (!content) {
                      this.zone.bus.postMessage({ to: "ProxyServer", from: "MainAvenue", type: "requestLatestNews" });
                    }
                    break;
                  }
                  default: {
                    console.log(`临时工${from}发来了一个未知类型的消息`);
                    break;
                  }
                }
                break;
              }
            }
          }
        };
        /*-----------------注册代理服务器--------------------*/
        switch ("serviceWorker" in navigator) {
          case true: {
            try {
              this.zone.proxyServer = await navigator.serviceWorker.register("$Proxy.Server");
            } catch (error) {
              console.error(error);
            }
            break;
          }
          case false: {
            document.body.innerHTML = "当前浏览器不支持Service Worker<br>请使用最新版的Chrome浏览器";
            break;
          }
        }
        /*-----------------清理HTML结构--------------------*/
        const scripts = document.querySelectorAll("script");
        for (const script of scripts) {
          script.remove();
        }
        document.body.appendChild(await $SudokuGrid.$new($ControlPanel));
      }
    } codeMap.set("$WebBase", $WebBase);


    function $ProxyServer() {
      self.RECO_ZONE = "ProxyServer";
      const CACHE_NAME = "VERSION";

      /**
       * @typedef {Object} TransEngine
       * @property {WebSocket} socket - 用于与服务器通信的WebSocket
       * @property {Promise<void>} socketDone - 用于判断WebSocket是否已经准备好
       * @property {Array<Promise>} transQueue - 用于存储等待被解决的消息Promise
       * @property {Map<string, function>} transSolver - 用于存储消息Promise的resolver
       * @property {function} transmit - 用于向其他线程发送消息
       * @property {function} createSocket - 用于创建WebSocket
       * @private {number|undefined} reconnectPulse - 用于存储重连的定时器
       * @private {function} isConnected - 用于判断WebSocket是否已经连接
       * @private {function} isConnecting - 用于判断WebSocket是否正在连接
       */

      /**
       * @typedef {Object} ProxyZone
       * @property {BroadcastChannel} bus - 用于与其他线程通信的广播频道
       * @property {TransEngine} transEngine - 用于与其他线程通信的传输引擎
       */

      /**@type {ProxyZone} */
      const zone = {};
      zone.transEngine = new $TransEngine();
      zone.bus = new BroadcastChannel("BUS");
      zone.bus.onmessage = (event) => {
        const { to, from, type, content } = event.data;
        if (to === "ProxyServer") {
          switch (from) {
            case "MainAvenue": {
              switch (type) {
                case "applyStatus": {
                  const message = {
                    type: "applyStatus",
                    key: content,
                  };
                  zone.transEngine.transmit(message);
                  break;
                }
                case "requestLatestNews": {
                  const message = {
                    type: "requestLatestNews",
                  };
                  zone.transEngine.transmit(message);
                  break;
                }
                default: {
                  console.log(`主线程发来了一个未知类型的消息`, content);
                  break;
                }
              }
              break;
            }
          }
        }
      };

      self.addEventListener("top", (_event) => {
        console.log("代理服务器顶级事件触发");
        const de = new $DataEngine();
        console.log(de);
      });
      self.dispatchEvent(new Event("top"));

      $TransEngine.on("requestLatestNews", (event) => {
        zone.bus.postMessage({ to: "MainAvenue", from: "ProxyServer", type: "requestLatestNews", content: event.detail });
      });

      self.addEventListener("install", () => { // 安装服务工作线程时缓存指定资源
        self.skipWaiting(); // 强制当前处于等待状态的脚本立即被激活
      });
      self.addEventListener("fetch", (event) => { // 在捕获到网络请求时从匹配的缓存中回复资源
        const url = new URL(event.request.url);
        switch (url.pathname) {
          default: {
            event.respondWith((async () => {
              const localResponse = await caches.match(event.request);
              if (localResponse) {
                return localResponse;
              } else {
                const remoteResponse = await fetch(event.request);
                // 判断状态码是否为210 如果是则将资源缓存
                if (remoteResponse.status === 210) {
                  const transformResponse = new Response(remoteResponse.body, { status: 200, headers: remoteResponse.headers });
                  const cache = await caches.open(CACHE_NAME);
                  cache.put(event.request, transformResponse.clone());
                  return transformResponse;
                } else {
                  return remoteResponse;
                }
              }
            })());
            break;
          }
        }
      });
      self.addEventListener("activate", (event) => { // 删除所有非当前缓存版本的资源
        event.waitUntil(
          Promise.all([
            clients.claim(),
            caches.keys().then((keyList) => {
              return Promise.all(
                keyList.map((key) => {
                  if (key !== CACHE_NAME) {
                    return caches.delete(key);
                  }
                })
              );
            }),
            clients.matchAll().then((clients) => {
              clients.forEach((client) => {
                client.postMessage({ id: "activate", content: CACHE_NAME });
              });
            }),
          ])
        );
      });
      self.addEventListener("message", (event) => { // 监听客户端的消息并作出回应
        const { instruction, content, randomStamp } = event.data;
        switch (instruction) {
          default: {
            event.source.postMessage("Hello, I am service worker");
            console.log(`服务端收到指令:${instruction},指令内容为:${content}`);
            break;
          }
        }
      });
    } codeMap.set("$ProxyServer", $ProxyServer);


    async function $CasualWorker() {
      self.RECO_ZONE = "CasualWorker";
      self.zone = {};
      self.zone.bus = new BroadcastChannel("BUS");
      self.zone.bus.onmessage = async (event) => {
        const { to, from, type, content = undefined } = event.data;
        if (to === self.name) {
          switch (from) {
            case "MainAvenue": {
              switch (type) {
                case "getConfig": {
                  // 在opfs中获取config.json文件
                  const draftHandle = await self.zone.dataEngine.root.getFileHandle("config.json", { create: true });
                  const accessHandle = await draftHandle.createSyncAccessHandle();
                  const fileSize = accessHandle.getSize();
                  if (fileSize === 0) {
                    const message = '{"serverNode":false}';
                    const encoder = new TextEncoder();
                    const encodedMessage = encoder.encode(message);
                    accessHandle.write(encodedMessage, { at: 0 });
                    accessHandle.flush();
                    accessHandle.close();
                    self.zone.bus.postMessage({ to: "MainAvenue", from: self.name, type: "receiveConfig", content: false });
                  } else {
                    const buffer = new DataView(new ArrayBuffer(fileSize));
                    accessHandle.read(buffer, { at: 0 });
                    const textDecoder = new TextDecoder();
                    const text = textDecoder.decode(buffer);
                    const config = JSON.parse(text);
                    accessHandle.close();
                    self.zone.bus.postMessage({ to: "MainAvenue", from: self.name, type: "receiveConfig", content: config.serverNode });
                  }
                  break;
                }
                default: {
                  console.log(`${self.name}: ${from}发来了一个未知类型的消息`, content);
                  break;
                }
              }
              break;
            }
            case "ProxyServer": {
              switch (type) {
                default: {
                  console.log(`代理服务器发来了一个未知类型的消息`, content);
                  break;
                }
              }
              break;
            }
          }
        }
      };
      self.zone.dataEngine = await $DataEngine.new();
      self.zone.bus.postMessage({ to: "MainAvenue", from: self.name, type: "Report", content: "Activated" });
    } codeMap.set("$CasualWorker", $CasualWorker);

    // #region Source

    function $capitalize(str) {
      return str.charAt(0) === "$" ? str.charAt(0) + str.charAt(1).toUpperCase() + str.slice(2) : str.charAt(0).toUpperCase() + str.slice(1);
    }; codeMap.set("$capitalize", $capitalize);


    class $ControlPanel extends $WebBase {
      constructor() {
        super();
        this.rare = "control-panel";
        this.template.innerHTML = /*html*/ `
          <section id="header">
            <div id="selected" tabindex="0">最新消息</div>
            <div id="options">
              <button id="latestNews" type="button">最新消息</button>
              <button id="settings" type="button">设置</button>
            </div>
          </section>
          <section id="body"></section>
          <section id="display"></section>
          <style>
            :host {
              width: 100%;
              height: 100%;
              display: grid;
              grid-template-columns: 100%;
              grid-template-rows: 25% 75%;
            }
            #header {
              grid-area: 1 / 1 / 2 / 2;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              display: grid;
              grid-template-columns: 100%;
              grid-template-rows: 100%;
              place-items: center;
              transition: all 0.3s ease-in-out;
            }
            #selected {
              grid-area: 1 / 1 / 2 / 2;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              padding: 1rem;
              background-color: var(--light);
              display: grid;
              align-items: end;
              font-size: 3rem;
              font-weight: bolder;
              z-index: 1;
            }
            #options {
              width: 100%;
              position: relative;
              display: grid;
              grid-template-columns: 100%;
              grid-auto-rows: 100%;
              transform: translateY(-200%);
              z-index: 0;
              transition: all 0.3s ease-in-out;
            }
            #options button {
              width: 100%;
              height: 100%;
              font-size: 2rem;
              font-weight: bold;
              background-color: lightgray;
              border: none;
              outline: none;
            }
            #selected:focus + #options {
              transform: translateY(0);
            }
            #body {
              grid-area: 2 / 1 / 3 / 2;
              width: 100%;
              height: 100%;
              background-color: lightblue;
            }
            #display {
              grid-area: 1 / 1 / 3 / 2;
              width: 100%;
              height: 100%;
              transform: scale(0);
              z-index: 2;
              transition: all 0.3s ease-in-out;
              background-color: lightgreen;
            }
            @media (prefers-color-scheme: dark) {
              #selected {
                background-color: var(--dark);
              }
            }
          </style>`;
      }
      async connectedCallback() {
        // setTimeout(() => {
        //   this.dispatchEvent(new CustomEvent("reset", { detail: { layout: "25 50 25 50" }, bubbles: true, composed: true }));
        // }, 1000);

        // 设置一个点击监听器在元素options上
        const tag_body = this.root.querySelector("#body");
        const tag_options = this.root.querySelector("#options");
        const tag_selected = this.root.querySelector("#selected");
        tag_options.addEventListener("click", async (event) => {
          const { target } = event;
          if (target.tagName === "BUTTON") {
            tag_selected.textContent = target.textContent;
            switch (target.id) {
              case "latestNews": {
                tag_body.innerHTML = "";
                if (!$WebBase.isServerNode) {
                  $WebBase.zone.bus.postMessage({ to: "ProxyServer", from: "MainAvenue", type: "requestLatestNews" });
                }
                break;
              }
              case "settings": {
                // 清空body中的所有子元素
                tag_body.innerHTML = "";
                tag_body.appendChild(await $SettingsPage.$new());
                break;
              }
            }
          }
        });

        $WebBase.on("requestLatestNews", (event) => {
          const news = event.detail;
          // 判断news是否是一个空对象
          if (Object.keys(news).length === 0) {
            tag_body.innerHTML = "<h1>暂无最新消息</h1>";
          } else {
            tag_body.innerHTML = "";
            for (const key in news) {
              const newsItem = document.createElement("div");
              newsItem.textContent = news[key];
              tag_body.appendChild(newsItem);
            }
          }
        });

        await $WebBase.zone.casualWorkersDone;
        // 找出$WebBase.zone.casualWorkersMap中第一个空闲的临时工人 获取他在casualWorkersMap中的Key
        const casualWorker = Array.from($WebBase.zone.casualWorkersMap).find(([_, value]) => value.status === "Activated");
        $WebBase.zone.bus.postMessage({ to: casualWorker[0], from: "MainAvenue", type: "getConfig" });
      }
    } codeMap.set("$ControlPanel", $ControlPanel);


    function $coverCSS() {
      const userAgent = navigator.userAgent;
      switch (true) {
        case /Windows/i.test(userAgent):
        case /Linux/i.test(userAgent): {
          document.documentElement.style.width = "100%";
          document.documentElement.style.height = "100%";
          document.body.style.width = "100%";
          document.body.style.height = "100%";
          globalThis.deviceSign = "Normal";
          break;
        }
        case /Android/i.test(userAgent): {
          document.documentElement.style.width = "100%";
          document.documentElement.style.height = "100%";
          document.body.style.width = "100%";
          document.body.style.height = "100%";
          globalThis.deviceSign = "Android";
          break;
        }
        case /iPhone/i.test(userAgent):
        case /iPad/i.test(userAgent): {
          const version = userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/);
          const majorVersion = parseInt(version[1], 10);
          if (majorVersion < 15) {
            document.documentElement.style.width = "100%";
            document.documentElement.style.height = "100%";
            document.body.style.width = "100%";
            document.body.style.height = "100%";
          }
          globalThis.deviceSign = "Apple";
          break;
        }
        default: {
          console.log(navigator.userAgent);
          break;
        }
      }
    }; codeMap.set("$coverCSS", $coverCSS);


    class $DataEngine {
      constructor() {
        this.env = self.RECO_ZONE ? self.RECO_ZONE : "MainAvenue";
      }
      static async new() {
        const dataEngine = new $DataEngine();
        await dataEngine.getSpaceInfo();
        await dataEngine.getRoot();
        return dataEngine;
      }
      async getRoot() {
        this.root = await navigator.storage.getDirectory();
        return this.root;
      }
      async getSpaceInfo() {
        const { quota, usage, usageDetails = {} } = await navigator.storage.estimate();
        const { indexedDB = null, cache = null, serviceWorker = null, fileSystem = null, other = null } = usageDetails;
        // 通过quota属性获取到的是字节单位，需要根据其大小判断合适的单位
        // 如果quota小于1024b 则使用b单位
        // 如果quota大于等于1024b且小于1024kb 则使用kb单位
        // 如果quota大于等于1024kb且小于1024mb 则使用mb单位
        // 如果quota大于等于1024mb且小于1024gb 则使用gb单位
        // 如果quota大于等于1024gb 则使用tb单位
        const unitConversion = (item) => {
          return item < 1024 ? "B" : item < 1024 * 1024 ? "KB" : item < 1024 * 1024 * 1024 ? "MB" : item < 1024 * 1024 * 1024 * 1024 ? "GB" : "TB";
        };
        const quotaUnit = unitConversion(quota);
        const usageUnit = unitConversion(usage);
        const indexedDBUnit = indexedDB ? unitConversion(indexedDB) : quotaUnit;
        const cacheUnit = cache ? unitConversion(cache) : quotaUnit;
        const serviceWorkerUnit = serviceWorker ? unitConversion(serviceWorker) : quotaUnit;
        const fileSystemUnit = fileSystem ? unitConversion(fileSystem) : quotaUnit;
        const otherUnit = other ? unitConversion(other) : quotaUnit;
        const spaceInfo = {
          quota: `${(quota / (1024 ** ["B", "KB", "MB", "GB", "TB"].indexOf(quotaUnit))).toFixed(2)} ${quotaUnit}`,
          usage: `${(usage / (1024 ** ["B", "KB", "MB", "GB", "TB"].indexOf(usageUnit))).toFixed(2)} ${usageUnit}`,
          indexedDB: `${(indexedDB / (1024 ** ["B", "KB", "MB", "GB", "TB"].indexOf(indexedDBUnit))).toFixed(2)} ${indexedDBUnit}`,
          cache: `${(cache / (1024 ** ["B", "KB", "MB", "GB", "TB"].indexOf(cacheUnit))).toFixed(2)} ${cacheUnit}`,
          serviceWorker: `${(serviceWorker / (1024 ** ["B", "KB", "MB", "GB", "TB"].indexOf(serviceWorkerUnit))).toFixed(2)} ${serviceWorkerUnit}`,
          fileSystem: `${(fileSystem / (1024 ** ["B", "KB", "MB", "GB", "TB"].indexOf(fileSystemUnit))).toFixed(2)} ${fileSystemUnit}`,
          other: `${(other / (1024 ** ["B", "KB", "MB", "GB", "TB"].indexOf(otherUnit))).toFixed(2)} ${otherUnit}`,
        };
        this.info = spaceInfo;
        return spaceInfo;
      }
      async requestDataSecurity() {
        const result = await navigator.storage.persist();
        if (result) {
          return { type: "success", reason: "数据持久化请求成功" };
        } else {
          return { type: "error", reason: "数据持久化请求失败" };
        }
      }
      async checkDataSecurity() {
        const result = await navigator.storage.persisted();
        if (result) {
          return { type: "success", reason: "数据持久化已授权" };
        } else {
          return { type: "error", reason: "数据持久化未授权" };
        }
      }
      async set() { }
      async det() { }
      async get() { }
    }; codeMap.set("$DataEngine", $DataEngine);


    /**
     * @param {Blob | Uint8Array} data - 一个Blob或Uint8Array 
     * @returns 
     */
    async function $deliver(data, recursion = false) {
      try {
        if (data instanceof Blob) data = await data.arrayBuffer();
        const input = recursion ? data : JSON.parse(new TextDecoder().decode(data));
        const items = Object.keys(input).filter((key) => key.endsWith("]"));
        const output = {};
        for (const key of items) {
          // key是形如"xxx[yyy]"的字符串
          // xxx是数据类型 yyy是属性名
          const index = key.indexOf("[");
          const dataType = key.substring(0, index);
          const newKey = key.substring(index + 1, key.length - 1);
          let newValue;
          switch (dataType) {
            case "String": {
              newValue = input[key];
              break;
            }
            case "Undefined": {
              newValue = undefined;
              break;
            }
            case "ArrayBuffer": {
              // 将数组转换为Uint8Array 再转换为ArrayBuffer
              newValue = new Uint8Array(input[key]).buffer;
              break;
            }
            case "Deno.KvU64":
            case "BigInt": {
              newValue = BigInt(input[key]);
              break;
            }
            case "BigInt64Array":
            case "BigUint64Array": {
              // input[key]是一个数组，需要将数组中的每个元素转换为BigInt
              // 然后再转换为BigInt64Array或BigUint64Array
              newValue = new globalThis[dataType](input[key].map((value) => BigInt(value)));
              break;
            }
            case "Blob": {
              // 从数组变成Uint8Array 再变成Blob
              newValue = new Blob([new Uint8Array(input[key])]);
              break;
            }
            case "Map": {
              // input[key]是一个对象，需要将对象转换为Map
              const transient = await this.$deliver(input[key], true);
              newValue = new Map(Object.entries(transient));
              break;
            }
            case "Set": {
              // input[key]是一个对象，需要将对象转换为Set
              const transient = await this.$deliver(input[key], true);
              newValue = new Set(Object.values(transient));
              break;
            }
            case "Array": {
              // input[key]是一个对象，需要将对象转换为数组
              const transient = await this.$deliver(input[key], true);
              newValue = Object.values(transient);
              break;
            }
            case "Object": {
              newValue = await this.$deliver(input[key], true);
              break;
            }
            case "Uint8Array":
            case "Uint8ClampedArray":
            case "Uint16Array":
            case "Uint32Array":
            case "Int8Array":
            case "Int16Array":
            case "Int32Array":
            case "Float32Array":
            case "Float64Array": {
              newValue = new globalThis[dataType](input[key]);
              break;
            }
            default: {
              newValue = input[key];
              break;
            }
          }
          output[newKey] = newValue;
        }
        return output;
      } catch (error) {
        console.error(error);
      }
    }; codeMap.set("$deliver", $deliver);


    /**
     * @param {Object} data - 一个对象 包含type属性和其他属性
     * @returns - 返回一个Blob对象
     */
    async function $encoder(data, recursion = false) {
      try {
        const output = {};
        const promises = [];
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const dataType = $obType(data[key]);
            switch (dataType) {
              case "Null":
              case "String":
              case "Number":
              case "Boolean": {
                output[`${dataType}[${key}]`] = data[key];
                break;
              }
              case "Undefined": {
                output[`${dataType}[${key}]`] = "undefined";
                break;
              }
              case "ArrayBuffer": {
                output[`${dataType}[${key}]`] = Array.from(new Uint8Array(data[key]));
                break;
              }
              case "Deno.KvU64":
              case "BigInt": {
                output[`${dataType}[${key}]`] = data[key].toString();
                break;
              }
              case "BigInt64Array":
              case "BigUint64Array": {
                output[`${dataType}[${key}]`] = Array.from(data[key], (value) => Number(value));
                break;
              }
              case "Blob": {
                const reader = new FileReader();
                const promise = new Promise((resolve) => {
                  reader.onload = (event) => {
                    output[`${dataType}[${key}]`] = Array.from(new Uint8Array(event.target.result));
                    resolve();
                  };
                });
                reader.readAsArrayBuffer(data[key]);
                promises.push(promise);
                break;
              }
              case "Uint8Array":
              case "Uint8ClampedArray":
              case "Uint16Array":
              case "Uint32Array":
              case "Int8Array":
              case "Int16Array":
              case "Int32Array":
              case "Float32Array":
              case "Float64Array": {
                output[`${dataType}[${key}]`] = Array.from(data[key]);
                break;
              }
              case "Map": {
                const map = {};
                for (const [mapKey, mapValue] of data[key]) {
                  map[mapKey] = mapValue;
                }
                output[`${dataType}[${key}]`] = await $encoder(map, true);
                break;
              }
              case "Set": {
                const set = Array.from(data[key]);
                output[`${dataType}[${key}]`] = await $encoder(set, true);
                break;
              }
              case "Array": {
                // 将数组转换成对象
                const array = {};
                for (let i = 0; i < data[key].length; i++) {
                  array[i] = data[key][i];
                }
                output[`${dataType}[${key}]`] = await $encoder(array, true);
                break;
              }
              case "Object": {
                output[`${dataType}[${key}]`] = await $encoder(data[key], true);
                break;
              }
              default: {
                throw new Error(`"${key}" 是不支持的数据类型: [${dataType}]`);
              }
            }
          }
        }
        await Promise.all(promises);
        return recursion ? output : new TextEncoder().encode(JSON.stringify(output));
      } catch (error) {
        console.error(error);
      }
    }; codeMap.set("$encoder", $encoder);


    /** 生成随机汉字
     * @returns 返回一个随机的汉字
     */
    function $generateRandomChineseCharacter() {
      const minCharCode = 0x4E00;
      const maxCharCode = 0x9FFF;
      const randomCharCode = Math.floor(Math.random() * (maxCharCode - minCharCode + 1)) + minCharCode;
      return String.fromCodePoint(randomCharCode);
    }; codeMap.set("$generateRandomChineseCharacter", $generateRandomChineseCharacter);


    /** 生成随机颜色
     * @returns 返回一个随机的颜色
     */
    function $generateRandomColor() {
      return `#${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, "0")}`;
    }; codeMap.set("$generateRandomColor", $generateRandomColor);


    /**
     * @param {any} arg - 任意值
     * @returns {Promise<string>} - 哈希值
     */
    async function $hash(arg) {
      let processedArg;
      if (arg instanceof Uint8Array) {
        processedArg = arg;
      } else {
        switch (typeof arg) {
          case "undefined": {
            processedArg = "undefined";
            break;
          };
          case "symbol": {
            processedArg = Symbol.keyFor(arg) || "Symbol()";
            break;
          };
          case "object": {
            if (arg === null) {
              processedArg = "null";
            } else if (arg instanceof Set || arg instanceof WeakSet) {
              processedArg = JSON.stringify(Array.from(arg).sort());
            } else if (arg instanceof Map || arg instanceof WeakMap) {
              processedArg = JSON.stringify(Array.from(arg.entries()).sort());
            } else {
              processedArg = JSON.stringify(Object.entries(arg).sort());
            }
            break;
          };
          default: {
            processedArg = arg.toString();
            break;
          }
        }
        processedArg = new TextEncoder().encode(processedArg);
      }
      const hashBuffer = await crypto.subtle.digest("SHA-256", processedArg);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
      return hashHex;
    }; codeMap.set("$hash", $hash);


    /** 判断传入参数的类型
     * @param {any} arg - 任意值
     * @returns - 返回一个字符串
     */
    function $obType(arg) {
      let type = Object.prototype.toString.call(arg);
      type = type.substring(8, type.length - 1);
      if (type !== "Object") {
        return type;
      } else {
        return arg.constructor ? arg.constructor.name : "Object";
      }
    }; codeMap.set("$obType", $obType);

    class $SettingsPage extends $WebBase {
      constructor() {
        super();
        this.rare = "settings-page";
        this.template.innerHTML = /*html*/ `
          <label for="serverNode">设置为资源服务器节点</label>
          <input type="text" id="serverNode" placeholder="请输入密钥">
          <button id="confirm" type="button">确认</button>
          <style>
            :host {
              display: grid;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              padding: 1rem;
              background-color: #f0f0f0;
            }
            @media (prefers-color-scheme: dark) {
            }
            @media screen and (orientation: landscape) {
            }
          </style>`;
      }
      connectedCallback() {
        const tag_serverNode = this.root.querySelector("#serverNode");
        const tag_confirm = this.root.querySelector("#confirm");
        tag_confirm.addEventListener("click", () => {
          $WebBase.zone.bus.postMessage({ to: "ProxyServer", from: "MainAvenue", type: "applyStatus", content: tag_serverNode.value });
        });
      };
    }; codeMap.set("$SettingsPage", $SettingsPage);

    class $StorePage extends $WebBase {
      constructor() {
        super();
        this.template.innerHTML = /*html*/ `
          <style>
            :host {
              display: block;
              width: 100px;
              height: 100px;
              background-color: #f0f0f0;
            }
            @media (prefers-color-scheme: dark) {
            }
            @media screen and (orientation: landscape) {
            }
          </style>`;
      }
      connectedCallback() {
        console.log("connectedCallback");
      };
    }; codeMap.set("$StorePage", $StorePage);


    class $SudokuGrid extends $WebBase {
      static get observedAttributes() { return ["data-r1", "data-r2", "data-c1", "data-c2"]; }
      constructor(component) {
        super();
        this.powerCenter = component;
        this.template.innerHTML = /*html*/ `
          <style>
            :host {
              --R1: 0%;
              --R2: 100%;
              --R3: calc(100% - var(--R1) - var(--R2));
              --C1: 0%;
              --C2: 100%;
              --C3: calc(100% - var(--C1) - var(--C2));
              grid-area: body;
              width: 100%;
              height: 100%;
              display: grid;
              grid-template-columns: var(--C1) var(--C2) var(--C3);
              grid-template-rows: var(--R1) var(--R2) var(--R3);
              transition: all 0.5s ease-in-out;
            }
            :host > :first-child {
              grid-area: 2/2/3/3;
              width: 100%;
              height: 100%;
            }
          </style>`;
      }
      async connectedCallback() {
        this.root.addEventListener("reset", (event) => {
          const { layout } = event.detail;
          const [r1, r2, c1, c2] = layout.split(" ");
          this.dataset.r1 = `${r1}%`;
          this.dataset.r2 = `${r2}%`;
          this.dataset.c1 = `${c1}%`;
          this.dataset.c2 = `${c2}%`;
        });
        this.root.appendChild(await this.powerCenter.$new());
      }
      attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
          case "data-r1": {
            this.sheet.cssRules[0].style.setProperty("--R1", newValue);
            break;
          }
          case "data-r2": {
            this.sheet.cssRules[0].style.setProperty("--R2", newValue);
            break;
          }
          case "data-c1": {
            this.sheet.cssRules[0].style.setProperty("--C1", newValue);
            break;
          }
          case "data-c2": {
            this.sheet.cssRules[0].style.setProperty("--C2", newValue);
            break;
          }
        }
      }
    }; codeMap.set("$SudokuGrid", $SudokuGrid);


    class $TransEngine {
      static fire(type, detail) {
        globalThis.dispatchEvent(new CustomEvent(type, { detail: detail }));
      }
      static on(type, callback) {
        return globalThis.addEventListener(type, callback, false);
      }
      constructor() {
        this.socket = this.createSocket();
        this.socketDone = new Promise((resolve) => { this.socketSolver = resolve; });
        this.transQueue = [];
        this.transSolver = new Map();
      }
      #reconnectPulse = undefined;
      #isConnected() {
        return this.socket && this.socket.readyState === this.socket.OPEN;
      }
      #isConnecting() {
        return this.socket && this.socket.readyState === this.socket.CONNECTING;
      }
      createSocket() {
        switch (WebSocket) {
          case undefined: {
            document.body.innerHTML = "当前浏览器不支持WebSocket<br>请使用最新版Chrome浏览器";
            return null;
          }
          default: {
            try {
              clearInterval(this.#reconnectPulse);
              if (this.#isConnected() || this.#isConnecting()) return;
              const isSecure = location.protocol === "https:";
              const protocol = isSecure ? "wss" : "ws";
              const socket = new WebSocket(`${protocol}://${location.host}/web.socket`);
              socket.onopen = () => {
                try {
                  this.socketSolver();
                  socket.heartbeat = setInterval(() => {
                    const message = { type: "heartbeat" };
                    this.transmit(message);
                  }, 60 * 1000);
                  const message = { type: "online" };
                  this.transmit(message);
                } catch (error) {
                  console.error(error);
                }
              };
              socket.onmessage = async (event) => {
                try {
                  const output = await $deliver(event.data);
                  this.transSolver.get(output.randomStamp)();
                  this.transSolver.delete(output.randomStamp);
                  switch (output.type) {
                    case "online": {
                      socket.uuid = output.uuid;
                      break;
                    }
                    case "heartbeat": {
                      break;
                    }
                    case "applyStatus": {
                      console.log(output.success);
                      break;
                    }
                    case "requestLatestNews": {
                      $TransEngine.fire("requestLatestNews", output.news);
                      break;
                    }
                    case "error": {
                      console.error(output.reason);
                      break;
                    }
                    default: {
                      break;
                    }
                  }
                } catch (error) {
                  const output = await $deliver(event.data);
                  console.error({ error: error, message: output });
                  const message = {
                    type: "error",
                    reason: "客户端代码错误或服务端未传输正确的数据",
                  };
                  this.transmit(message);
                }
              };
              socket.onclose = (event) => {
                console.log(`WebSocket连接关闭 ${event.code}`);
                clearInterval(socket.heartbeat);
                if (event.code !== 1000 && event.code !== 1006 && event.code !== 4000) {
                  // 1000 正常关闭
                  // 1006 异常关闭
                  // 4000 主动关闭
                  clearInterval(this.#reconnectPulse);
                  this.#reconnectPulse = setInterval(() => {
                    console.log("尝试重新连接");
                    this.socket = this.createSocket(); // 重新链接
                  }, 5000);
                }
              };
              socket.onerror = (event) => {
                console.error(`WebSocket连接出错: ${event}`);
                clearInterval(socket.heartbeat);
                clearInterval(this.#reconnectPulse);
                this.#reconnectPulse = setInterval(() => {
                  console.log("尝试重新连接");
                  this.socket = this.createSocket(); // 重新链接
                }, 5000);
              };
              return socket;
            } catch (error) {
              console.error(error);
              return null;
            }
          }
        }
      };
      async transmit(message) {
        try {
          await this.socketDone;
          if (!this.socket) return { type: "error", reason: "WebSocket连接未建立" };
          if (this.socket.readyState !== 1) return { type: "error", reason: "WebSocket连接未就绪" };
          const randomStamp = Math.random().toString(36).slice(2);
          this.transQueue.push(new Promise((resolve) => { this.transSolver.set(randomStamp, resolve); }));
          message.randomStamp = randomStamp;
          this.socket.send(await $encoder(message));
          while (this.transQueue.length > 0) { return await this.transQueue.shift(); }
        } catch (error) {
          console.error(error);
          this.socket = this.createSocket();
        }
      }
    }; codeMap.set("$TransEngine", $TransEngine);


    class $TransHub { }; codeMap.set("$TransHub", $TransHub);


    function initBreeze() {
      breeze.onmessageerror = (event) => console.error(event);
      breeze.onmessage = (event) => {
        const { instruction, content } = event.data;
        switch (instruction) {
          case "online": {
            const { genecode, username } = content;
            for (const alive of alives) {
              if (alive.username === username) {
                const targetSocket = alive;
                const data = {
                  linkType: "mesh",
                  activeID: targetSocket.id,
                  passiveID: genecode,
                };
                const message = {
                  type: "link",
                  content: data,
                };
                targetSocket.send(JSON.stringify(message));
              }
            }
            break;
          }
          default: {
            console.log(event);
            break;
          }
        }
      };
    };
    function pack(component, sourceType) {
      const twigGrafting = (component) => {
        const methods = Array.from(codeMap.keys()).filter((method) => method !== "$WebBase" && method !== component.name);
        const usedMethods = new Set();
        let selectedComponent = '';
        switch (component.name) {
          case "$ProxyServer":
          case "$CasualWorker": {
            selectedComponent = component.toString();
            selectedComponent = selectedComponent.slice(selectedComponent.indexOf("{") + 1, selectedComponent.lastIndexOf("}"));
            break;
          }
          default: {
            selectedComponent = component.toString();
            break;
          }
        }
        methods.forEach((method) => {
          if (selectedComponent.includes(method)) {
            usedMethods.add(method);
          }
        });
        let unusedMethods = methods.filter((method) => !usedMethods.has(method));
        const deepGather = () => {
          const superaddition = new Set();
          let nextLayer = false;
          usedMethods.forEach((method) => {
            const selectedMethod = codeMap.get(method).toString();
            unusedMethods.forEach((method) => {
              if (selectedMethod.includes(method)) {
                superaddition.add(method);
                nextLayer = true;
              }
            });
          });
          superaddition.forEach((method) => {
            usedMethods.add(method);
          });
          unusedMethods = methods.filter((method) => !usedMethods.has(method));
          if (nextLayer) {
            deepGather();
          }
        };
        deepGather();
        let fusionStr = ``;
        Array.from(usedMethods).map((method) => {
          fusionStr += `const { ${method} } = await import("/${method}.twig");`;
        });
        function grafting(name, str) {
          switch (name) {
            case "$WebBase": {
              const bootIndex = str.indexOf("static async #boot");
              const bootEndIndex = str.indexOf("{", bootIndex);
              return str.slice(0, bootEndIndex + 1) + fusionStr + str.slice(bootEndIndex + 1);
            }
            case "$ProxyServer": {
              str = str.replace("VERSION", version);
              const fusionStr = `importScripts(${Array.from(usedMethods).map((method) => `"${method}.swig"`).join(",")});`;
              return fusionStr + str;
            }
            case "$CasualWorker": {
              return fusionStr + str;
            }
            default: {
              // 判断str里async connectedCallback有没有匹配的字符串
              const isAsyncConnectedCallback = /async connectedCallback/.test(str);
              // 如果有匹配的字符串 则在async connectedCallback后面插入
              if (isAsyncConnectedCallback) {
                // const fusion = `const { ${method} } = await import("/${method}.twig");`;
                const asyncConnectedCallbackIndex = str.indexOf("async connectedCallback");
                const asyncConnectedCallbackEndIndex = str.indexOf("{", asyncConnectedCallbackIndex);
                return str.slice(0, asyncConnectedCallbackEndIndex + 1) + fusionStr + str.slice(asyncConnectedCallbackEndIndex + 1);
              } else {
                // 判断str里connectedCallback有没有匹配的字符串
                const isConnectedCallback = /connectedCallback/.test(str);
                if (isConnectedCallback) {
                  // 如果没有匹配的字符串 则先将connectedCallback替换为async connectedCallback
                  str = str.replace("connectedCallback", "async connectedCallback");
                  // 再在async connectedCallback后面插入
                  const asyncConnectedCallbackIndex = str.indexOf("async connectedCallback");
                  const asyncConnectedCallbackEndIndex = str.indexOf("{", asyncConnectedCallbackIndex);
                  return str.slice(0, asyncConnectedCallbackEndIndex + 1) + fusionStr + str.slice(asyncConnectedCallbackEndIndex + 1);
                } else {
                  return str;
                }
              }
            }
          }
        }
        selectedComponent = grafting(component.name, selectedComponent);
        return selectedComponent;
      };
      const source = twigGrafting(component);
      const matchStr = "(" + ["(?<![\\w'\"])\\/\\*[\\s\\S]*?(?<!\\*)\\*\\/", "(?<![:\\(\\*])\\/\\/.*", "(?<![\\w'\"/])\\/\\*\\*[^]*?(?<!\\*)\\*\\/"].join("|") + ")";
      const matchReg = new RegExp(matchStr, "g");
      const distillation = source.replace(matchReg, "").replace(/^\s*[\r\n]/gm, "").replace(/\s+/g, ' ');
      switch (sourceType) {
        case "Swig":
        case "Server":
        case "Worker": {
          return distillation;
        }
        case "Twig": {
          return `export ${distillation}`;
        }
        default: {
          return `export ${distillation}${component.name}.$define();`
        }
      }
    }
    /**
     * 解析路径名
     * @param {string} pathname - 要解析的路径名
     * @returns {object} - 包含请求名称和请求类型的对象
     */
    function parsePath(pathname) {
      try {
        const parts = pathname.split("/");
        if (parts[1] === "") return { requestName: "Home", requestType: "Index", requestLoad: "" };
        const [beforeDot, afterDot] = parts[1].split(".");
        return { requestName: beforeDot, requestType: $capitalize(afterDot), requestLoad: parts[2] ? parts.slice(2).join("/") : "" };
      } catch (_error) {
        // return { requestName: "Redirect", requestType: "Index", requestLoad: "" };
        return { requestName: "Redirect", requestType: "404", requestLoad: "" };
      }
    }
    /**
     * 解析请求对象
     * @param {Request} request - 请求对象
     * @returns {Promise<object>} - 解析后的请求对象
     */
    async function parseRequest(request) {
      const requestAuth = request.headers.get("Authorization");
      const requestUrl = new URL(request.url);
      const requestOrigin = requestUrl.origin;
      const requestHost = requestUrl.hostname;
      const { requestName, requestType, requestLoad } = parsePath(requestUrl.pathname);
      const requestBody = request.method !== "GET" && request.method !== "HEAD" && request.json ? await request.json() : {};
      return { requestAuth, requestOrigin, requestHost, requestName, requestType, requestLoad, requestBody };
    }
    function socketServer(request, info) {
      const { socket, response } = Deno.upgradeWebSocket(request);
      socket.reply = async (message) => {
        try {
          if (socket.readyState !== 1) { throw new Error(`<-${socket.uuid}-> 链接已关闭`); }
          socket.send(await $encoder(message));
        } catch (error) {
          console.error(error);
        }
      };
      socket.onopen = (event) => console.log(`Socket is ${event.type}`);
      socket.onerror = (event) => console.error("Socket errored:", event);
      socket.onclose = (event) => {
        alives.delete(socket.uuid);
        switch (event.code) {
          case 4000: {
            console.log(`多余的 <-${event.reason}-> 断开`)
            break;
          }
          case 1001: {
            console.log(`<-${socket.uuid}-> 下线`)
            break;
          }
          default: {
            console.error(event);
            break;
          }
        }
      };
      socket.onmessage = async (event) => {
        try {
          const output = await $deliver(event.data);
          switch (output.type) {
            case "online": {
              const uuid = crypto.randomUUID();
              socket.uuid = uuid;
              alives.set(uuid, socket);
              console.log(`<-${uuid}-> 上线`);
              const message = {
                type: "online",
                uuid: uuid,
                randomStamp: output.randomStamp,
              }
              socket.reply(message);
              break;
            }
            case "heartbeat": {
              const message = {
                type: "heartbeat",
                randomStamp: output.randomStamp,
              }
              socket.reply(message);
              break;
            }
            case "applyStatus": {
              let message;
              if (output.key === ADMIN_KEY) {
                message = {
                  type: "applyStatus",
                  success: true,
                  randomStamp: output.randomStamp,
                };
              } else {
                message = {
                  type: "applyStatus",
                  success: false,
                  randomStamp: output.randomStamp,
                };
              }
              socket.reply(message);
              break;
            }
            case "requestLatestNews": {
              const message = {
                type: "requestLatestNews",
                news: {},
                randomStamp: output.randomStamp,
              };
              socket.reply(message);
              break;
            }
            case "error": {
              console.error(output.reason);
              const message = {
                type: "default",
                randomStamp: output.randomStamp,
              }
              socket.reply(message);
              break;
            }
            default: {
              console.log(output);
              const message = {
                type: "default",
                randomStamp: output.randomStamp,
              }
              socket.reply(message);
              break;
            }
          }
        } catch (error) {
          const output = await $deliver(event.data);
          console.error({ error: error, message: output });
          const message = {
            type: "error",
            reason: "服务器端代码错误或客户端未传输正确的数据",
            randomStamp: output.randomStamp,
          };
          socket.reply(message);
        }
      };
      return response;
    }
    /**
     * 
     * @param {string} requestType - 请求的后缀 代表请求的类型
     * @param {string} requestOrigin - 请求的源 代表请求的来源
     * @param {string} requestHost - 请求的项目 代表请求的项目
     * @param {string} requestName - 请求的名称 代表请求的名称
     * @param {object} requestBody - 请求的主体 代表请求的主体
     * @returns - 返回一个Response对象
     */
    async function sourceServer(request, info) {
      try {
        const { requestType, requestOrigin, requestHost, requestName, requestLoad, requestBody, requestAuth } = await parseRequest(request);
        switch (requestType) {
          case "Index": {
            const headers = new Headers({ "Content-Type": "text/html;charset=UTF-8" });
            // if (requestName === "Redirect") requestHost = "Public";
            const body = HTMLElement.html(requestOrigin);
            return new Response(body, { status: 200, headers });
          }
          case "Webmanifest": {
            const headers = new Headers({ "Content-Type": "application/manifest+json;charset=UTF-8" });
            const body = JSON.stringify(HTMLElement.manifest(requestOrigin));
            return new Response(body, { status: 200, headers });
          }
          case "Svg": {
            const headers = new Headers({ "Content-Type": "image/svg+xml;charset=UTF-8" });
            const body = HTMLElement.svg();
            return new Response(body, { status: 200, headers });
          }
          case "Png": {
            const headers = new Headers({ "Content-Type": "image/png;charset=UTF-8" });
            const iconSource = HTMLElement.svg();
            const body = await HTMLElement.icon(iconSource, "png");
            return new Response(body, { status: 200, headers });
          }
          case "Ico": {
            const headers = new Headers({ "Content-Type": "image/x-icon;charset=UTF-8" });
            const iconSource = HTMLElement.svg();
            const body = await HTMLElement.icon(iconSource, "ico");
            return new Response(body, { status: 200, headers });
          }
          case "Database": {
            const format = requestName.toLowerCase();
            let headers;
            switch (format) {
              case "png": {
                headers = new Headers({ "Content-Type": "image/png;charset=UTF-8" });
                break;
              }
              case "ico": {
                headers = new Headers({ "Content-Type": "image/x-icon;charset=UTF-8" });
                break;
              }
              case "svg": {
                headers = new Headers({ "Content-Type": "image/svg+xml;charset=UTF-8" });
                break;
              }
              case "html": {
                headers = new Headers({ "Content-Type": "text/html;charset=UTF-8" });
                break;
              }
              case "css": {
                headers = new Headers({ "Content-Type": "text/css;charset=UTF-8" });
                break;
              }
              case "js": {
                headers = new Headers({ "Content-Type": "text/javascript;charset=UTF-8" });
                break;
              }
              default: {
                headers = new Headers({ "Content-Type": "text/plain;charset=UTF-8" });
                break;
              }
            };
            const data = dosomething();
            return new Response(data, { status: 200, headers });
          }
          case "Local": {
            const format = requestName.toLowerCase();
            let headers;
            switch (format) {
              case "png": {
                headers = new Headers({ "Content-Type": "image/png;charset=UTF-8" });
                break;
              }
              case "ico": {
                headers = new Headers({ "Content-Type": "image/x-icon;charset=UTF-8" });
                break;
              }
              case "svg": {
                headers = new Headers({ "Content-Type": "image/svg+xml;charset=UTF-8" });
                break;
              }
              case "html": {
                headers = new Headers({ "Content-Type": "text/html;charset=UTF-8" });
                break;
              }
              case "css": {
                headers = new Headers({ "Content-Type": "text/css;charset=UTF-8" });
                break;
              }
              case "js": {
                headers = new Headers({ "Content-Type": "text/javascript;charset=UTF-8" });
                break;
              }
              default: {
                headers = new Headers({ "Content-Type": "text/plain;charset=UTF-8" });
                break;
              }
            };
            const file = Deno.readFileSync(`./${requestLoad}.${format}`);
            return new Response(file, { status: 200, headers });
          }
          default: {
            const headers = new Headers({ "Content-Type": "text/javascript;charset=UTF-8" });
            const componentName = (requestType === "Twig" || requestType === "Swig") ? requestName : requestName + requestType;
            const component = codeMap.get(componentName) || codeMap.get("$NotFound");
            const body = pack(component, requestType);
            return new Response(body, { status: 200, headers });
          }
        }
      } catch (error) {
        console.error(error);
        return new Response("sourceServer Error:" + error, { status: 500 });
      }
    }
    function httpServer() {
      Deno.serve({ onListen(localAddr) { console.log(`%cServer started at http://${localAddr.hostname}:${localAddr.port} in ${localAddr.transport}`, 'background-color:blue;font-weight:bold;') } }, async (request, info) => {
        try {
          return request.headers.get("upgrade") === "websocket" ? socketServer(request, info) : await sourceServer(request, info);
        } catch (error) {
          console.error(error);
          return new Response("Internal server error:" + error, { status: 500 });
        }
      });
    }
    class $NotFound extends $WebBase {
      constructor() {
        super();
        this.template.innerHTML = /*html*/ `
          <span></span>
          <div>找不到<br/>任何资源或页面</div>
          <style>
            :host {
              background-color: #4169e1;
              overflow: hidden;
              display: grid;
              grid-template-rows: 100%;
              grid-template-columns: 100%;
              align-items: center;
              transition: all 1s ease-in-out;
              animation: toShow 1s ease-in-out forwards;
            }
            div {
              grid-area: 1/1/2/2;
              padding-left: 10%;
              font-size: 3rem;
              font-weight: bolder;
            }
            span {
              grid-area: 1/1/2/2;
              height: 100%;
              width: 100%;
              display: grid;
              background-image:
                  radial-gradient(closest-side, rgba(235, 105, 78, 0.3), rgba(235, 105, 78, 0)),
                  radial-gradient(closest-side, rgba(77, 109, 203, 0.3), rgba(77, 109, 203, 0)),
                  radial-gradient(closest-side, rgba(228, 0, 70, 0.2), rgba(228, 0, 70, 0)),
                  radial-gradient(closest-side, rgba(170, 142, 245, 0.3), rgba(170, 142, 245, 0)),
                  radial-gradient(closest-side, rgba(248, 192, 147, 0.3), rgba(248, 192, 147, 0));
              background-size:
                  130vmax 130vmax,
                  130vmax 130vmax,
                  90vmax 90vmax,
                  160vmax 160vmax,
                  90vmax 90vmax;
              background-position:
                  -80vmax -80vmax,
                  60vmax -30vmax,
                  10vmax 10vmax,
                  -30vmax -10vmax,
                  50vmax 50vmax;
              background-repeat: no-repeat;
              opacity: 1;
              z-index: 1;
              animation: 5s streamer linear infinite;
              transition: all 1s ease-in-out;
            }
            span::after {
              content: '';
              display: block;
              position: fixed;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
            }
            @keyframes streamer {
              0%,
              100% {
                  background-size:
                      130vmax 130vmax,
                      80vmax 80vmax,
                      90vmax 90vmax,
                      110vmax 110vmax,
                      90vmax 90vmax;
                  background-position:
                      -80vmax -80vmax,
                      60vmax -30vmax,
                      10vmax 10vmax,
                      -30vmax -10vmax,
                      50vmax 50vmax;
              }
              25% {
                  background-size:
                      100vmax 100vmax,
                      90vmax 90vmax,
                      100vmax 100vmax,
                      90vmax 90vmax,
                      60vmax 60vmax;
                  background-position:
                      -60vmax -90vmax,
                      50vmax -40vmax,
                      0vmax -20vmax,
                      -40vmax -20vmax,
                      40vmax 60vmax;
              }
              50% {
                  background-size:
                      80vmax 80vmax,
                      110vmax 110vmax,
                      80vmax 80vmax,
                      60vmax 60vmax,
                      80vmax 80vmax;
                  background-position:
                      -50vmax -70vmax,
                      40vmax -30vmax,
                      10vmax 0vmax,
                      20vmax 10vmax,
                      30vmax 70vmax;
              }
              75% {
                  background-size:
                      90vmax 90vmax,
                      90vmax 90vmax,
                      100vmax 100vmax,
                      90vmax 90vmax,
                      70vmax 70vmax;
                  background-position:
                      -50vmax -40vmax,
                      50vmax -30vmax,
                      20vmax 0vmax,
                      -10vmax 10vmax,
                      40vmax 60vmax;
              }
            }
            @keyframes toHide {
              to {
                opacity: 0;
                transform: scale(0);
                filter: blur(100vmax);
              }
            }
            @keyframes toShow {
              from {
                opacity: 0;
                transform: scale(0);
                filter: blur(100vmax);
              } to {
                opacity: 1;
                transform: scale(1);
                filter: blur(0);
              }
            }
            @media (prefers-color-scheme: dark) {
              span {
                filter: hue-rotate(180deg);
              }
            }
          </style>`;
      }
      connectedCallback() {
        const userAgent = navigator.userAgent;
        switch (true) {
          case /Windows/i.test(userAgent):
          case /Linux/i.test(userAgent): {
            document.documentElement.style.width = "100%";
            document.documentElement.style.height = "100%";
            document.body.style.width = "100%";
            document.body.style.height = "100%";
            globalThis.deviceSign = "Normal";
            break;
          }
          case /Android/i.test(userAgent): {
            document.documentElement.style.width = "100%";
            document.documentElement.style.height = "100%";
            document.body.style.width = "100%";
            document.body.style.height = "100%";
            globalThis.deviceSign = "Android";
            break;
          }
          case /iPhone/i.test(userAgent):
          case /iPad/i.test(userAgent): {
            const version = userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/);
            const majorVersion = parseInt(version[1], 10);
            if (majorVersion < 15) {
              document.documentElement.style.width = "100%";
              document.documentElement.style.height = "100%";
              document.body.style.width = "100%";
              document.body.style.height = "100%";
            }
            globalThis.deviceSign = "Apple";
            break;
          }
          default: {
            console.log(navigator.userAgent);
            break;
          }
        }
      }
    } codeMap.set("$NotFound", $NotFound);


    class $CubeInterlude extends $WebBase {
      constructor() {
        super();
        this.template.innerHTML = /*html*/ `
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <style>
            :host {
              width: 44px;
              height: 44px;
              animation: spinner 2s infinite ease;
              transform-style: preserve-3d;
            }
            :host > div {
              background-color: rgba(0,77,255,0.2);
              height: 100%;
              position: absolute;
              width: 100%;
              border: 2px solid #004dff;
            }
            :host div:nth-of-type(1) {
              transform: translateZ(-22px) rotateY(180deg);
            }
            :host div:nth-of-type(2) {
              transform: rotateY(-270deg) translateX(50%);
              transform-origin: top right;
            }
            :host div:nth-of-type(3) {
              transform: rotateY(270deg) translateX(-50%);
              transform-origin: center left;
            }
            :host div:nth-of-type(4) {
              transform: rotateX(90deg) translateY(-50%);
              transform-origin: top center;
            }
            :host div:nth-of-type(5) {
              transform: rotateX(-90deg) translateY(50%);
              transform-origin: bottom center;
            }
            :host div:nth-of-type(6) {
              transform: translateZ(22px);
            }
            @keyframes spinner {
              0% {
                transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
              }
              50% {
                transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
              }
              100% {
                transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
              }
            }
            @media (prefers-color-scheme: dark) {
            }
            @media screen and (orientation: landscape) {
            }
          </style>`;
      }
      selfDestruction() {
        return new Promise((resolve) => {
          this.ontransitionend = () => {
            this.remove();
            resolve();
          };
          setTimeout(() => {
            this.style.transition = "all 1s ease-in-out";
            this.style.scale = "0";
          }, 50);
        });
      }
      connectedCallback() { }
      disconnectedCallback() { }
    } codeMap.set("$CubeInterlude", $CubeInterlude);


    class $ProgressBar extends $WebBase {
      constructor() {
        super();
        this.viewBoxLength = 64;
        this.circleRadiusPercentage = 40;
        this.circleStrokeWidthPercentage = this.circleRadiusPercentage / 4;
        this.circlePerimeter = 2 * Math.PI * this.circleRadiusPercentage;
        this.circleUnit = this.circlePerimeter / 100;
        this.progressPercentage = 0;
        this.completedPercentage = this.progressPercentage * this.circleUnit;
        this.uncompletedPercentage = this.circlePerimeter - this.completedPercentage;
        this.template.innerHTML = /*html*/ `
          <div></div>
          <div></div>
          <div></div>
          <svg width="100%" height="100%" viewBox="0 0 ${this.viewBoxLength} ${this.viewBoxLength}">
            <circle id="bg" cx="50%" cy="50%" r="${this.circleRadiusPercentage}%" stroke-width="${this.circleStrokeWidthPercentage}%" fill="none" stroke="cadetblue"></circle>
            <circle id="pb" cx="50%" cy="50%" r="${this.circleRadiusPercentage}%" stroke-width="${this.circleStrokeWidthPercentage}%" fill="none" stroke="blueviolet" stroke-linecap="round" stroke-dasharray="${this.completedPercentage}% ${this.uncompletedPercentage}%" transform-origin="center" style="transform: rotate(-90deg);"></circle>
            <rect x="${50 - (0.375 * this.circleRadiusPercentage)}%" y="${50 - (0.375 * this.circleRadiusPercentage)}%" width="${0.75 * this.circleRadiusPercentage}%" height="${0.75 * this.circleRadiusPercentage}%" rx="10%" ry="10%" fill="blueviolet" ></rect>
          </svg>
          <div></div>
          <style>
            :host {
              box-sizing: border-box;
              width: 100%;
              height: 100%;
              display: grid;
              grid-template-rows: 100%;
              grid-template-columns: 5% 20% 50% 20% 5%;
              place-items: center;
              background-color: red;
              border-radius: 9999px;
            }
            svg {
              box-sizing: border-box;
              transition: all 0.1s ease-in-out;
            }
            circle {
              transition: all 0.1s ease-in-out;
            }
            rect {
              transition: all 0.1s ease-in-out;
            }
            @media (prefers-color-scheme: dark) {
            }
            @media screen and (orientation: landscape) {
            }
          </style>`;
      }
      static get observedAttributes() { return ["data-stage"] }
      connectedCallback() {
        this.pb = this.shadowRoot.getElementById("pb");
      }
      disconnectedCallback() { }
      attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
          case "data-stage": {
            this.progressPercentage = Number(newValue);
            this.completedPercentage = this.progressPercentage * this.circleUnit;
            this.uncompletedPercentage = this.circlePerimeter - this.completedPercentage;
            this.pb.style.strokeDasharray = `${this.completedPercentage}% ${this.uncompletedPercentage}%`;
            if (this.progressPercentage === 0) {
              this.pb.ontransitionend = () => {
                setTimeout(() => {
                  this.remove();
                  this.pb.ontransitionend = null;
                }, 100);
              };
              this.pb.style.stroke = "red";
            }
            if (this.progressPercentage === 100) {
              this.pb.ontransitionend = () => {
                setTimeout(() => {
                  this.remove();
                  this.pb.ontransitionend = null;
                }, 100);
              };
              this.pb.style.stroke = "green";
            }
            break;
          }
        }
      }
    } codeMap.set("$ProgressBar", $ProgressBar);
    class $HollowBox extends $WebBase {
      constructor() { super() }
      connectedCallback() {
        if (this.firstConnected === undefined) {
          this.firstConnected = true;
          globalThis.cubeInterlude = this;
          this.template.innerHTML = /*html*/ `
            <style>
              :host {
                width: 50%;
                height: 50%;
                border-radius: 20rem;
                padding: 4rem;
                background: linear-gradient(45deg, rgb(255, 238, 0), rgb(166, 255, 0));
                mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0) border-box;
                mask-composite: exclude;
              }
              @media (prefers-color-scheme: dark) {
              }
              @media screen and (orientation: landscape) {
              }
            </style>`;
        }
      }
      disconnectedCallback() { }
    } codeMap.set("$HollowBox", $HollowBox);
    class $MessIcon extends $WebBase {
      constructor() { super() }
      connectedCallback() {
        this.template.innerHTML = /*html*/ `
          <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
          <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M201.677 81.9118C212.672 77.0696 207.224 79.5587 225.535 70.4195C235.615 65.3875 248.208 59.4395 259.831 62.7568C275.648 67.2721 299.695 97.4839 280.707 111.794C238.365 143.704 169.524 127.141 140.541 180.754C135.535 190.014 133.299 201.867 137.559 212.168C149.67 241.454 220.765 236.871 244.92 234.388C248.831 233.987 269.184 234.025 268.777 224.427C267.133 185.55 184.579 132.156 158.435 106.431C156.314 104.345 128.86 78.6603 139.05 68.887C143.571 64.5505 164.921 72.302 165.89 72.7177C199.384 87.0601 289.459 140.095 267.286 187.65C242.537 240.731 114.434 218.174 121.902 291.854C125.089 323.291 175.004 333.217 197.204 339.359C237.418 350.486 319.964 377.852 332.15 313.308C340.577 268.674 319.992 186.676 265.049 184.585C211.572 182.549 164.391 245.715 97.299 228.258C34.0506 211.803 27.869 115.201 60.0205 72.7177C98.1711 22.3077 151.136 57.9717 195.712 78.8478C226.556 93.2922 266.262 110.148 264.304 152.404C262.056 200.92 237.131 241.05 209.878 278.828C195.538 298.706 168.669 325.16 166.636 351.618C164.178 383.615 210.3 382 229.262 377.669C250.747 372.763 274.534 358.191 290.398 343.19C322.893 312.467 352.95 259.425 345.57 212.168C336.592 154.677 249.844 100.129 199.44 103.366C180.241 104.599 172.401 114.048 163.654 130.184C143.158 
            167.989 135.795 211.473 135.323 254.31C135.06 277.996 144.798 303.24 142.778 325.568C141.161 343.418 128.526 347.949 113.701 340.125C57.8845 310.669 82.4732 191.41 92.0792 143.209C94.4788 131.173 93.3548 112.43 104.754 108.729C116.957 104.769 138.892 145.935 139.05 146.274C160.078 191.347 156.242 320.154 80.1504 304.113C21.4269 291.733 72.2556 103.211 141.286 114.86C203.616 125.376 245.856 189.285 249.393 250.479C250.164 263.811 247.788 295.15 237.463 307.944C223.826 324.847 172.056 327.325 158.435 309.477C151.643 300.578 146.174 289.967 144.269 278.828C136.512 233.487 178.34 107.894 221.807 87.2751C280.215 59.5722 314.221 141.05 310.529 186.117C302.465 284.527 166.03 316.309 102.518 252.011C74.0105 223.151 70.363 144.672 83.878 107.964C91.0992 88.3502 104.969 78.8369 123.393 71.9509C135.785 67.3204 169.946 60.226 184.529 63.5236C245.77 77.3691 317.351 144.678 341.097 204.507C387.132 320.493 161.857 407.136 105.5 313.308C92.1816 291.136 92.7463 254.55 92.0792 230.557C91.7856 219.989 88.8149 187.27 98.0441 174.624C116.54 149.28 177.703 206.034 190.494 213.701C200.96 219.974 211.79 225.895 223.298 229.791C279.308 248.752 284.672 220.649 327.677 209.87C334.908 208.058 353.042 206.592 360.481 206.805C364.884 206.93 377.333 209.205 373.155 210.636C330.61 225.21 262.908 156.691 225.535 144.741C214.259 141.136 202.296 139.787 190.494 139.378C168.097 138.602 150.222 143.56 130.103 153.17C95.5537 169.673 86.6064 199.97 48.0918 186.117" 
            stroke="currentColor" 
            stroke-opacity="0.9" 
            stroke-width="16" 
            stroke-linecap="round" 
            stroke-linejoin="round"/>
          </svg>
          <style>
            :host {
            }
            @media (prefers-color-scheme: dark) {
            }
            @media screen and (orientation: landscape) {
            }
          </style>`;
      }
      disconnectedCallback() { }
    } codeMap.set("$MessIcon", $MessIcon);
    class $LovescriptIcon extends $WebBase {
      constructor() { super() }
      connectedCallback() {
        this.template.innerHTML = /*html*/ `
          <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
          <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M179.981 276.772C164.375 267.266 161.18 262.061 147.634 248.36C66.1022 165.898 137.157 112.457 172.866 125.376C179.595 127.81 187.269 135.311 195.888 147.877C198.083 137.546 204.354 129.251 214.702 122.992C286.701 79.4431 320.679 175.189 251.306 237.353C234.603 252.325 207.881 277.281 196.844 287.597" 
            stroke="currentColor" 
            stroke-opacity="0.9" 
            stroke-width="16" 
            stroke-linecap="round" 
            stroke-linejoin="round"/>
          </svg>
          <style>
            :host {
            }
            @media (prefers-color-scheme: dark) {
            }
            @media screen and (orientation: landscape) {
            }
          </style>`;
      }
      disconnectedCallback() { }
    } codeMap.set("$LovescriptIcon", $LovescriptIcon);
    class $SharpscriptIcon extends $WebBase {
      constructor() { super() }
      connectedCallback() {
        this.template.innerHTML = /*html*/ `
          <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
          <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M190.386 110C186.875 121.225 183.239 132.412 179.864 143.676C179.046 146.397 147.926 276.04 134.885 295.715" 
            stroke="currentColor" 
            stroke-opacity="0.9" 
            stroke-width="16" 
            stroke-linecap="round" 
            stroke-linejoin="round"/>
            <path d="M265.1 122.808C240.447 171.189 222.276 268.302 216.003 302.119" 
            stroke="currentColor" 
            stroke-opacity="0.9" 
            stroke-width="16" 
            stroke-linecap="round" 
            stroke-linejoin="round"/>
            <path d="M284.311 231.675C224.291 237.11 165.353 240.214 105 240.214" 
            stroke="currentColor" 
            stroke-opacity="0.9" 
            stroke-width="16" 
            stroke-linecap="round" 
            stroke-linejoin="round"/>
            <path d="M294.984 163.366C246.269 167.199 134.895 169.011 124.212 169.77" 
            stroke="currentColor" 
            stroke-opacity="0.9" 
            stroke-width="16" 
            stroke-linecap="round" 
            stroke-linejoin="round"/>
          </svg>
          <style>
            :host {
            }
            @media (prefers-color-scheme: dark) {
            }
            @media screen and (orientation: landscape) {
            }
          </style>`;
      }
      disconnectedCallback() { }
    } codeMap.set("$SharpscriptIcon", $SharpscriptIcon);
    class $RadarIcon extends $WebBase {
      constructor() { super() }
      connectedCallback() {
        this.template.innerHTML = /*html*/ `
          <?xml version="1.0" encoding="UTF-8"?>
          <svg width="100%" height="100%" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g fill="currentColor" fill-rule="nonzero">
                <path d="M6.34277267,4.93867691 C6.73329697,5.3292012 6.73329697,5.96236618 6.34277267,6.35289047 C3.21757171,9.47809143 3.21757171,14.5450433 6.34277267,17.6702443 C6.73329697,18.0607686 6.73329697,18.6939336 6.34277267,19.0844579 C5.95224838,19.4749821 5.3190834,19.4749821 4.92855911,19.0844579 C1.02230957,15.1782083 1.02230957,8.84492646 4.92855911,4.93867691 C5.3190834,4.54815262 5.95224838,4.54815262 6.34277267,4.93867691 Z M19.0743401,4.93867691 C22.9805896,8.84492646 22.9805896,15.1782083 19.0743401,19.0844579 C18.6838158,19.4749821 18.0506508,19.4749821 17.6601265,19.0844579 C17.2696022,18.6939336 17.2696022,18.0607686 17.6601265,17.6702443 C20.7853275,14.5450433 20.7853275,9.47809143 17.6601265,6.35289047 C17.2696022,5.96236618 17.2696022,5.3292012 17.6601265,4.93867691 C18.0506508,4.54815262 18.6838158,4.54815262 19.0743401,4.93867691 Z M9.3094225,7.81205295 C9.69994679,8.20257725 9.69994679,8.83574222 9.3094225,9.22626652 C7.77845993,10.7572291 7.77845993,13.2394099 9.3094225,14.7703724 C9.69994679,15.1608967 9.69994679,15.7940617 9.3094225,16.184586 C8.91889821,16.5751103 8.28573323,16.5751103 7.89520894,16.184586 C5.58319778,13.8725748 5.58319778,10.1240641 7.89520894,7.81205295 C8.28573323,7.42152866 8.91889821,7.42152866 9.3094225,7.81205295 Z M16.267742,7.81205295 C18.5797531,10.1240641 18.5797531,13.8725748 16.267742,16.184586 C15.8772177,16.5751103 15.2440527,16.5751103 14.8535284,16.184586 C14.4630041,15.7940617 14.4630041,15.1608967 14.8535284,14.7703724 C16.384491,13.2394099 16.384491,10.7572291 14.8535284,9.22626652 C14.4630041,8.83574222 14.4630041,8.20257725 14.8535284,7.81205295 C15.2440527,7.42152866 15.8772177,7.42152866 16.267742,7.81205295 Z M12.0814755,10.5814755 C12.9099026,10.5814755 13.5814755,11.2530483 13.5814755,12.0814755 C13.5814755,12.9099026 12.9099026,13.5814755 12.0814755,13.5814755 C11.2530483,13.5814755 10.5814755,12.9099026 10.5814755,12.0814755 C10.5814755,11.2530483 11.2530483,10.5814755 12.0814755,10.5814755 Z"></path>
              </g>
            </g>
          </svg>
          <style>
            :host {
            }
            @media (prefers-color-scheme: dark) {
            }
            @media screen and (orientation: landscape) {
            }
          </style>`;
      }
      disconnectedCallback() { }
    } codeMap.set("$RadarIcon", $RadarIcon);
    class $QrcodeIcon extends $WebBase {
      constructor() { super() }
      connectedCallback() {
        this.template.innerHTML = /*html*/ `
          <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="5" height="5" rx="1" stroke="currentColor" stroke-width="2"/>
            <rect x="3" y="16" width="5" height="5" rx="1" stroke="currentColor" stroke-width="2"/>
            <rect x="16" y="3" width="5" height="5" rx="1" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <rect x="6" y="10" width="2" height="2" rx="0.5" fill="currentColor"/>
            <path d="M12.5 2H13.5C13.7761 2 14 2.22386 14 2.5V5.5C14 5.77614 13.7761 6 13.5 6H12.5C12.2239 6 12 6.22386 12 6.5V7.5C12 7.77614 11.7761 8 11.5 8H10.5C10.2239 8 10 7.77614 10 7.5V4.5C10 4.22386 10.2239 4 10.5 4H11.5C11.7761 4 12 3.77614 12 3.5V2.5C12 2.22386 12.2239 2 12.5 2Z" fill="currentColor"/>
            <rect x="8" y="12" width="4" height="2" rx="0.5" fill="currentColor"/>
            <rect x="18" y="10" width="4" height="2" rx="0.5" fill="currentColor"/>
            <rect x="12" y="18" width="4" height="2" rx="0.5" fill="currentColor"/>
            <rect x="10" y="16" width="2" height="2" rx="0.5" fill="currentColor"/>
            <path d="M12 11.5V10.5C12 10.2239 12.2239 10 12.5 10H15.5C15.7761 10 16 10.2239 16 10.5V14H17.5C17.7761 14 18 14.2239 18 14.5V15.5C18 15.7761 17.7761 16 17.5 16H16H14.5C14.2239 16 14 15.7761 14 15.5V12.5C14 12.2239 13.7761 12 13.5 12H12.5C12.2239 12 12 11.7761 12 11.5Z" fill="currentColor"/>
            <path d="M16.5 20L17.5 20C17.7761 20 18 19.7761 18 19.5L18 18.5C18 18.2239 18.2239 18 18.5 18L19.5 18C19.7761 18 20 17.7761 20 17.5L20 14.5C20 14.2239 20.2239 14 20.5 14L21.5 14C21.7761 14 22 14.2239 22 14.5L22 16L22 18L22 19.5C22 19.7761 21.7761 20 21.5 20L20.5 20C20.2239 20 20 20.2239 20 20.5L20 21.5C20 21.7761 19.7761 22 19.5 22L16.5 22C16.2239 22 16 21.7761 16 21.5L16 20.5C16 20.2239 16.2239 20 16.5 20Z" fill="currentColor"/>
            <path d="M2 13.5V10.5C2 10.2239 2.22386 10 2.5 10H3.5C3.77614 10 4 10.2239 4 10.5V11.5C4 11.7761 4.22386 12 4.5 12H5.5C5.77614 12 6 12.2239 6 12.5V13.5C6 13.7761 5.77614 14 5.5 14H2.5C2.22386 14 2 13.7761 2 13.5Z" fill="currentColor"/>
            <path d="M13.5 22H10.5C10.2239 22 10 21.7761 10 21.5V20.5C10 20.2239 10.2239 20 10.5 20H11.5C11.7761 20 12 19.7761 12 19.5V18.5C12 18.2239 12.2239 18 12.5 18H15.5C15.7761 18 16 18.2239 16 18.5V19.5C16 19.7761 15.7761 20 15.5 20H14.5C14.2239 20 14 20.2239 14 20.5V21.5C14 21.7761 13.7761 22 13.5 22Z" fill="currentColor"/>
          </svg>
          <style>
            :host {
            }
            @media (prefers-color-scheme: dark) {
            }
            @media screen and (orientation: landscape) {
            }
          </style>`;
      }
      disconnectedCallback() { }
    } codeMap.set("$QrcodeIcon", $QrcodeIcon);
    class $FingerprintIcon extends $WebBase {
      constructor() { super() }
      connectedCallback() {
        this.template.innerHTML = /*html*/ `
          <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.52844 13.782C9.77949 11.6442 10.3129 10.0455 11.873 10.0455C13.4331 10.0455 14.3852 11.2321 14.3852 13.2429C14.3852 15.2537 13.5186 18.5914 12.7945 20.6378" stroke="currentColor" stroke-width="1.36423" stroke-linecap="round"/>
            <path d="M11.9685 12.9446C11.827 14.7257 11.3316 18.5498 10.4823 19.5972" stroke="currentColor" stroke-width="1.36423" stroke-linecap="round"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.12592 18.9907C5.46505 19.3118 5.82676 19.6092 6.20842 19.8805C6.3087 19.6818 6.40785 19.4751 6.50469 19.2629C7.01745 18.139 7.50632 16.7685 7.78622 15.402C7.86181 15.0329 7.62391 14.6724 7.25485 14.5968C6.88579 14.5213 6.52533 14.7592 6.44974 15.1282C6.19442 16.3747 5.7426 17.6466 5.26353 18.6966C5.21752 18.7975 5.17159 18.8955 5.12592 18.9907Z" fill="currentColor"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.90918 20.3354C7.29946 20.5662 7.70687 20.7711 8.12903 20.9478C8.27973 20.6231 8.43106 20.2744 8.57856 19.918C9.06483 18.7432 9.52512 17.447 9.80209 16.5708C9.91564 16.2116 9.71649 15.8283 9.35729 15.7148C8.99809 15.6012 8.61485 15.8004 8.50131 16.1596C8.23536 17.0009 7.78833 18.2601 7.31804 19.3963C7.18112 19.7271 7.04356 20.0442 6.90918 20.3354Z" fill="currentColor"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.54584 17.0685C3.82113 17.5045 4.12933 17.9176 4.46695 18.3043C4.96213 17.3178 5.39149 16.2668 5.51279 15.4477C5.56798 15.0751 5.31062 14.7282 4.93796 14.6731C4.56531 14.6179 4.21847 14.8752 4.16328 15.2479C4.09288 15.7233 3.86302 16.3687 3.54584 17.0685Z" fill="currentColor"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7172 20.9852C15.8137 20.642 15.9133 20.2944 16.0139 19.9433L16.0139 19.9433L16.0139 19.9432C16.1658 19.413 16.32 18.8748 16.4695 18.3316C16.9933 16.4285 17.457 14.4703 17.457 12.7699C17.457 11.052 16.9837 9.51827 16.0382 8.40188C15.0816 7.27242 13.6916 6.63087 12.0001 6.63087C10.2913 6.63087 8.90442 7.33127 7.95699 8.47646C7.02036 9.6086 6.54321 11.1359 6.54321 12.7699C6.54321 13.1466 6.84861 13.452 7.22533 13.452C7.60205 13.452 7.90744 13.1466 7.90744 12.7699C7.90744 11.3901 8.3108 10.189 9.00813 9.34608C9.69465 8.51625 10.6952 7.99509 12.0001 7.99509C13.3224 7.99509 14.3198 8.4837 14.9972 9.28355C15.6856 10.0965 16.0928 11.2912 16.0928 12.7699C16.0928 14.266 15.6787 16.0635 15.1542 17.9696C15.0143 18.4778 14.8662 18.9947 14.7178 19.513C14.5299 20.1686 14.3415 20.8263 14.1683 21.4713C14.7021 21.3509 15.2197 21.1876 15.7172 20.9852Z" fill="currentColor"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.7882 19.0123C19.3688 17.2737 19.8048 15.3433 19.8048 13.4598C19.8048 10.6132 19.1919 8.25076 17.8716 6.5872C16.5308 4.89771 14.5365 4.02433 12.0001 4.02433C9.43626 4.02433 7.4904 5.01782 6.20559 6.70938C4.94072 8.3747 4.36731 10.6475 4.36731 13.1449C4.36731 13.5216 4.6727 13.827 5.04942 13.827C5.42614 13.827 5.73154 13.5216 5.73154 13.1449C5.73154 10.8324 6.2655 8.88598 7.29198 7.53454C8.29852 6.20934 9.828 5.38855 12.0001 5.38855C14.1996 5.38855 15.7666 6.12935 16.8031 7.43528C17.8601 8.76713 18.4406 10.7813 18.4406 13.4598C18.4406 15.8465 17.6551 18.3895 16.7757 20.4797C17.5079 20.0752 18.1836 19.5811 18.7882 19.0123Z" fill="currentColor"/>
            <path d="M2.98769 14.4844C2.55114 12.9601 2.50834 11.35 2.86329 9.80462C3.21825 8.25928 3.95936 6.82921 5.01731 5.64819" stroke="currentColor" stroke-width="1.36423" stroke-linecap="round"/>
            <path d="M7.43616 3.71466C8.95012 2.87086 10.6684 2.46328 12.4 2.53722C14.1317 2.61116 15.8089 3.16371 17.2455 4.1335" stroke="currentColor" stroke-width="1.36423" stroke-linecap="round"/>
            <path d="M19.5546 6.35229C20.463 7.58862 21.0541 9.02899 21.276 10.547C21.498 12.0651 21.344 13.6144 20.8275 15.059" stroke="currentColor" stroke-width="1.36423" stroke-linecap="round"/>
          </svg>
          <style>
            :host {
            }
            @media (prefers-color-scheme: dark) {
            }
            @media screen and (orientation: landscape) {
            }
          </style>`;
      }
      disconnectedCallback() { }
    } codeMap.set("$FingerprintIcon", $FingerprintIcon);
    class $PiechartIcon extends $WebBase {
      constructor() { super() }
      connectedCallback() {
        this.template.innerHTML = /*html*/ `
          <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.51663 4.79613C5.84337 6.09112 3.99994 8.83028 3.99994 12C3.99994 12.1969 4.00705 12.3921 4.02104 12.5855L10.1628 10.9398L8.51663 4.79613ZM11.4148 4.02107L13.19 10.6463L13.2017 10.6897C13.2517 10.8754 13.3222 11.1373 13.3531 11.3775C13.3921 11.6802 13.4013 12.159 13.1196 12.6469C12.8379 13.1348 12.4187 13.3662 12.137 13.4838C11.9136 13.5771 11.6515 13.647 11.4656 13.6965L11.4222 13.7081L4.7962 15.4836C6.09124 18.1567 8.83033 20 11.9999 20C16.4182 20 19.9999 16.4183 19.9999 12C19.9999 7.58172 16.4182 4 11.9999 4C11.8031 4 11.608 4.00711 11.4148 4.02107Z" fill="currentColor"/>
            <path d="M9.92945 4.27259C9.67849 3.33602 9.55302 2.86773 9.12083 2.67286C8.68865 2.47799 8.30723 2.66782 7.54439 3.04748C6.97028 3.33321 6.42361 3.67419 5.91239 4.06647C4.87054 4.8659 3.99636 5.86272 3.33975 7C2.68314 8.13728 2.25696 9.39275 2.08555 10.6947C2.00144 11.3336 1.97948 11.9775 2.01909 12.6176C2.07171 13.4681 2.09803 13.8933 2.48288 14.1701C2.86773 14.447 3.33602 14.3215 4.27259 14.0706L10.0681 12.5176C10.9788 12.2736 11.4342 12.1516 11.6413 11.7929C11.8484 11.4342 11.7264 10.9788 11.4824 10.0681L9.92945 4.27259Z" fill="currentColor"/>
          </svg>
          <style>
            :host {
            }
            @media (prefers-color-scheme: dark) {
            }
            @media screen and (orientation: landscape) {
            }
          </style>`;
      }
      disconnectedCallback() { }
    } codeMap.set("$PiechartIcon", $PiechartIcon);
    class $LiveIcon extends $WebBase {
      constructor() { super() }
      connectedCallback() {
        this.template.innerHTML = /*html*/ `
          <?xml version="1.0" encoding="UTF-8"?>
          <svg width="100%" height="100%" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g transform="translate(-864.000000, -96.000000)" fill-rule="nonzero">
                      <g transform="translate(864.000000, 96.000000)">
                          <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
                          fill-rule="nonzero"></path>
                          <path d="M12.1914,19.9978 C12.7436,19.9848 13.2016,20.4219 13.2146,20.9741 C13.2275,21.5262 12.7904,21.9843 12.2383,21.9972 L12,22 L12,22 L11.7617,21.9972 L11.7617,21.9972 C11.2096,21.9843 10.7725,21.5262 10.7854,20.9741 C10.7984,20.4219 11.2564,19.9848 11.8086,19.9978 L12,20 L12,20 L12.1914,19.9978 L12.1914,19.9978 Z M17.5381,19.1649 C17.826,19.6362 17.6773,20.2516 17.206,20.5395 C17.0708,20.6221 16.9334,20.7016 16.794,20.7779 C16.3095,21.043 15.7018,20.8652 15.4367,20.3807 C15.1716,19.8962 15.3494,19.2885 15.8339,19.0234 C15.9454,18.9624 16.0553,18.8988 16.1635,18.8327 C16.6348,18.5448 17.2503,18.6935 17.5381,19.1649 Z M7.83651,18.8327 C7.94472,18.8988 8.0546,18.9624 8.16608,19.0234 C8.65058,19.2885 8.82843,19.8962 8.56332,20.3807 C8.29821,20.8652 7.69054,21.043 7.20604,20.7779 C7.06663,20.7016 6.92924,20.6221 6.79398,20.5395 C6.32267,20.2516 6.17397,19.6362 6.46185,19.1649 C6.74974,18.6935 7.3652,18.5448 7.83651,18.8327 Z M12,6 C15.3137,6 18,8.68629 18,12 C18,15.3137 15.3137,18 12,18 C8.68629,18 6,15.3137 6,12 C6,8.68629 8.68629,6 12,6 Z M20.3807,15.4367 C20.8652,15.7018 21.043,16.3095 20.7779,16.794 C20.7016,16.9334 20.6221,17.0708 20.5395,17.206 C20.2516,17.6773 19.6362,17.826 19.1649,17.5381 C18.6935,17.2503 18.5448,16.6348 18.8327,16.1635 C18.8988,16.0553 18.9624,15.9454 19.0234,15.8339 C19.2885,15.3494 19.8962,15.1716 20.3807,15.4367 Z M4.9766,15.8339 C5.0376,15.9454 5.10118,16.0553 5.16728,16.1635 C5.45516,16.6348 5.30646,17.2503 4.83514,17.5381 C4.36383,17.826 3.74837,17.6773 3.46048,17.206 C3.37787,17.0708 
                          3.29837,16.9334 3.22208,16.794 C2.95697,16.3095 3.13482,15.7018 3.61932,15.4367 C4.10382,15.1716 4.71149,15.3494 4.9766,15.8339 Z M12,8 C9.79086,8 8,9.79086 8,12 C8,14.2091 9.79086,16 12,16 C14.2091,16 16,14.2091 16,12 C16,9.79086 14.2091,8 12,8 Z M12,10 C13.1046,10 14,10.8954 14,12 C14,13.1046 13.1046,14 12,14 C10.8954,14 10,13.1046 10,12 C10,10.8954 10.8954,10 12,10 Z M3.02594,10.7854 C3.57807,10.7984 4.01518,11.2564 4.00224,11.8086 L4,12 C4,12.064 4.00075,12.1278 4.00224,12.1914 C4.01518,12.7436 3.57807,13.2016 3.02594,13.2146 C2.4738,13.2275 2.01572,12.7904 2.00279,12.2383 L2,12 C2,11.9204 2.00093,11.8409 2.00279,11.7617 C2.01572,11.2096 2.4738,10.7725 3.02594,10.7854 Z M20.9741,10.7854 C21.5262,10.7725 21.9843,11.2096 21.9972,11.7617 L22,12 L21.9972,12.2383 L21.9972,12.2383 C21.9843,12.7904 21.5262,13.2275 20.9741,13.2146 C20.4219,13.2016 19.9848,12.7436 19.9978,12.1914 L20,12 L19.9978,11.8086 L19.9978,11.8086 C19.9848,11.2564 20.4219,10.7984 20.9741,10.7854 Z M20.5395,6.79398 C20.6221,6.92924 20.7016,7.06663 20.7779,7.20604 C21.043,7.69054 20.8652,8.29821 20.3807,8.56332 C19.8962,8.82843 19.2885,8.65058 19.0234,8.16608 C18.9624,8.0546 18.8988,7.94472 18.8327,7.83651 C18.5448,7.3652 18.6935,6.74974 19.1649,6.46185 C19.6362,6.17397 20.2516,6.32267 20.5395,6.79398 Z M4.83514,6.46185 C5.30646,6.74974 5.45516,7.3652 5.16727,7.83651 C5.10118,7.94472 5.0376,8.0546 4.9766,8.16608 C4.71149,8.65058 4.10382,8.82843 3.61932,8.56332 C3.13482,8.29821 2.95697,7.69054 3.22208,7.20604 C3.29837,7.06663 3.37787,6.92924 3.46048,6.79398 
                          C3.74837,6.32267 4.36383,6.17397 4.83514,6.46185 Z M16.794,3.22208 C16.9334,3.29837 17.0708,3.37787 17.206,3.46048 C17.6773,3.74837 17.826,4.36383 17.5381,4.83514 C17.2503,5.30646 16.6348,5.45516 16.1635,5.16727 C16.0553,5.10118 15.9454,5.0376 15.8339,4.9766 C15.3494,4.71149 15.1716,4.10382 15.4367,3.61932 C15.7018,3.13482 16.3095,2.95697 16.794,3.22208 Z M8.56332,3.61932 C8.82843,4.10382 8.65058,4.71149 8.16608,4.9766 C8.0546,5.0376 7.94472,5.10118 7.83651,5.16728 C7.3652,5.45516 6.74974,5.30646 6.46185,4.83514 C6.17397,4.36383 6.32267,3.74837 6.79398,3.46048 C6.92924,3.37787 7.06663,3.29837 7.20604,3.22208 C7.69054,2.95697 8.29821,3.13482 8.56332,3.61932 Z M12.2383,2.00279 C12.7904,2.01572 13.2275,2.4738 13.2146,3.02594 C13.2016,3.57807 12.7436,4.01518 12.1914,4.00224 L12,4 L12,4 L11.8086,4.00224 L11.8086,4.00224 C11.2564,4.01518 10.7984,3.57807 10.7854,3.02594 C10.7725,2.4738 11.2096,2.01572 11.7617,2.00279 L12,2 L12.2383,2.00279 L12.2383,2.00279 Z" 
                          fill="currentColor"></path>
                      </g>
                  </g>
              </g>
          </svg>
          <style>
            :host {
            }
            @media (prefers-color-scheme: dark) {
            }
            @media screen and (orientation: landscape) {
            }
          </style>`;
      }
      disconnectedCallback() { }
    } codeMap.set("$LiveIcon", $LiveIcon);
    class $CameraIcon extends $WebBase {
      constructor() { super() }
      connectedCallback() {
        this.template.innerHTML = /*html*/ `
          <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
            stroke="currentColor" stroke-width="1.5"/>
            <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          <style>
            :host {
            }
            @media (prefers-color-scheme: dark) {
            }
            @media screen and (orientation: landscape) {
            }
          </style>`;
      }
      disconnectedCallback() { }
    } codeMap.set("$CameraIcon", $CameraIcon);
    class $GreetIcon extends $WebBase {
      constructor() { super() }
      connectedCallback() {
        this.template.innerHTML = /*html*/ `
          <?xml version="1.0" ?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 21V18.5C4 15.4624 6.46243 13 9.5 13H12.8513C15.307 13 17.4651 11.3721 18.1397 9.01097L18.7454 6.89097C18.8961 6.3636 19.3781 6 19.9266 6C20.7258 6 21.3122 6.75106 21.1184 7.5264L19.3638 14.5448C19.15 15.4 18.3816 16 17.5 16M8 21V18M16 6.5C16 8.70914 14.2091 10.5 12 10.5C9.79086 10.5 8 8.70914 8 6.5C8 4.29086 9.79086 2.5 12 2.5C14.2091 2.5 16 4.29086 16 6.5Z"
              stroke="currentColor" stroke-linecap="round" stroke-width="1.4"/>
          </svg>
          <style>
            :host {
            }
            @media (prefers-color-scheme: dark) {
            }
            @media screen and (orientation: landscape) {
            }
          </style>`;
      }
      disconnectedCallback() { }
    } codeMap.set("$GreetIcon", $GreetIcon);
    class $PointtoIcon extends $WebBase {
      constructor() { super() }
      connectedCallback() {
        this.template.innerHTML = /*html*/ `
          <?xml version="1.0" ?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 21V18M14 21V17.6599C14 16.6974 14.6855 15.8715 15.6314 15.6941L21.1085 14.6672C21.6254 14.5702 22 14.1189 22 13.5929C22 12.9893 21.5107 12.5 20.9071 12.5H9.5C6.18629 12.5 3.5 15.1863 3.5 18.5V21M21 8L19 6M21 8L19 10.2592M21 8H16.5M14 6.5C14 8.70914 12.2091 10.5 10 10.5C7.79086 10.5 6 8.70914 6 6.5C6 4.29086 7.79086 2.5 10 2.5C12.2091 2.5 14 4.29086 14 6.5Z"
              stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4"/>
          </svg>
          <style>
            :host {
            }
            @media (prefers-color-scheme: dark) {
            }
            @media screen and (orientation: landscape) {
            }
          </style>`;
      }
      disconnectedCallback() { }
    } codeMap.set("$PointtoIcon", $PointtoIcon);
    class $ElatedIcon extends $WebBase {
      constructor() { super() }
      connectedCallback() {
        this.template.innerHTML = /*html*/ `
          <?xml version="1.0" ?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.00001 21V15.3426C6.00001 15.1158 5.96145 14.8908 5.88599 14.6769L3.35382 7.50248C3.15169 6.92978 3.40765 6.29618 3.95086 6.02457C4.5347 5.73265 5.24482 5.95902 5.552 6.53498L9.00001 13M18 21V15.3426C18 15.1158 18.0386 14.8908 18.114 14.6769L20.6462 7.50248C20.8483 6.92978 20.5924 6.29618 20.0491 6.02457C19.4653 5.73265 18.7552 5.95902 18.448 6.53498L15 13M16 6.5C16 8.70914 14.2091 10.5 12 10.5C9.79087 10.5 8.00001 8.70914 8.00001 6.5C8.00001 4.29086 9.79087 2.5 12 2.5C14.2091 2.5 16 4.29086 16 6.5Z"
              stroke="currentColor" stroke-linecap="round" stroke-width="1.4"/>
          </svg>
          <style>
            :host {
            }
            @media (prefers-color-scheme: dark) {
            }
            @media screen and (orientation: landscape) {
            }
          </style>`;
      }
      disconnectedCallback() { }
    } codeMap.set("$ElatedIcon", $ElatedIcon);
    class $BackButton extends $WebBase {
      constructor() { super() }
      connectedCallback() {
        this.template.innerHTML = /*html*/ `
          <svg fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
            width="100%" height="100%" viewBox="0 0 45.58 45.58" xml:space="preserve">
            <path d="M45.506,33.532c-1.741-7.42-7.161-17.758-23.554-19.942V7.047c0-1.364-0.826-2.593-2.087-3.113
              c-1.261-0.521-2.712-0.229-3.675,0.737L1.305,19.63c-1.739,1.748-1.74,4.572-0.001,6.32L16.19,40.909
              c0.961,0.966,2.415,1.258,3.676,0.737c1.261-0.521,2.087-1.75,2.087-3.113v-6.331c5.593,0.007,13.656,0.743,19.392,4.313
              c0.953,0.594,2.168,0.555,3.08-0.101C45.335,35.762,45.763,34.624,45.506,33.532z"/>
          </svg>
          <style>
            :host {
              width: 100%;
              height: 100%;
              pointer-events: none;
            }
            @media (prefers-color-scheme: dark) {
            }
            @media screen and (orientation: landscape) {
            }
          </style>`;
      }
      disconnectedCallback() { }
    } codeMap.set("$BackButton", $BackButton);
    class $MoreButton extends $WebBase {
      constructor() { super() }
      connectedCallback() {
        this.template.innerHTML = /*html*/ `
          <?xml version="1.0" ?>
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M8,12a2,2,0,1,1-2-2A2,2,0,0,1,8,12Zm10-2a2,2,0,1,0,2,2A2,2,0,0,0,18,10Zm-6,0a2,2,0,1,0,2,2A2,2,0,0,0,12,10Z"/>
          </svg>
          <style>
            :host {
              width: 100%;
              height: 100%;
              pointer-events: none;
            }
            @media (prefers-color-scheme: dark) {
            }
            @media screen and (orientation: landscape) {
            }
          </style>`;
      }
      disconnectedCallback() { }
    } codeMap.set("$MoreButton", $MoreButton);
    class $BinButton extends $WebBase {
      constructor(data) {
        super();
        if (data) {
          this.dataset.style = data;
        }
        if (!this.dataset.style) {
          this.dataset.style = "rectangle";
        }
      }
      static get observedAttributes() { return ["data-style"] }
      connectedCallback() { }
      disconnectedCallback() { }
      attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
          case "data-style": {
            switch (newValue) {
              case "rectangle": {
                this.template.innerHTML = /*html*/ `
                  <button class="bin-button">
                    <svg
                      class="bin-top"
                      viewBox="0 0 39 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
                      <line
                        x1="12"
                        y1="1.5"
                        x2="26.0357"
                        y2="1.5"
                        stroke="white"
                        stroke-width="3"
                      ></line>
                    </svg>
                    <svg
                      class="bin-bottom"
                      viewBox="0 0 33 39"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask id="path-1-inside-1_8_19" fill="white">
                        <path
                          d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                        ></path>
                      </mask>
                      <path
                        d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                        fill="white"
                        mask="url(#path-1-inside-1_8_19)"
                      ></path>
                      <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
                      <path d="M21 6V29" stroke="white" stroke-width="4"></path>
                    </svg>
                  </button>
                  <style>
                    :host {}
                    .bin-button {
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      justify-content: center;
                      width: 55px;
                      height: 55px;
                      border-radius: 15px;
                      background-color: rgb(255, 95, 95);
                      cursor: pointer;
                      border: 3px solid rgb(255, 201, 201);
                      transition-duration: 0.3s;
                    }
                    .bin-bottom {
                      width: 15px;
                    }
                    .bin-top {
                      width: 17px;
                      transform-origin: right;
                      transition-duration: 0.3s;
                    }
                    .bin-button:hover .bin-top {
                      transform: rotate(45deg);
                    }
                    .bin-button:hover {
                      background-color: rgb(255, 0, 0);
                    }
                    .bin-button:active {
                      transform: scale(0.9);
                    }
                    @media (prefers-color-scheme: dark) {
                    }
                    @media screen and (orientation: landscape) {
                    }
                  </style>`;
                break;
              }
              case "circle": {
                this.shadowRoot.innerHTML = /*html*/ `
                  <button class="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 69 14"
                      class="svgIcon bin-top"
                    >
                      <g clip-path="url(#clip0_35_24)">
                        <path
                          fill="black"
                          d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_35_24">
                          <rect fill="white" height="14" width="69"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 69 57"
                      class="svgIcon bin-bottom"
                    >
                      <g clip-path="url(#clip0_35_22)">
                        <path
                          fill="black"
                          d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_35_22">
                          <rect fill="white" height="57" width="69"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                  <style>
                    :host {
                    }
                    .button {
                      width: 50px;
                      height: 50px;
                      border-radius: 50%;
                      background-color: rgb(20, 20, 20);
                      border: none;
                      font-weight: 600;
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      justify-content: center;
                      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
                      cursor: pointer;
                      transition-duration: 0.3s;
                      overflow: hidden;
                      position: relative;
                      gap: 2px;
                    }
                    .svgIcon {
                      width: 12px;
                      transition-duration: 0.3s;
                    }
                    .svgIcon path {
                      fill: white;
                    }
                    .button:hover {
                      transition-duration: 0.3s;
                      background-color: rgb(255, 69, 69);
                      align-items: center;
                      gap: 0;
                    }
                    .bin-top {
                      transform-origin: bottom right;
                    }
                    .button:hover .bin-top {
                      transition-duration: 0.5s;
                      transform: rotate(160deg);
                    }
                    @media (prefers-color-scheme: dark) {
                    }
                    @media screen and (orientation: landscape) {
                    }
                  </style>`;
                break;
              }
            }
            break;
          }
        }
      }
    } codeMap.set("$BinButton", $BinButton);
    class $EditButton extends $WebBase {
      constructor() {
        super();
        this.template.innerHTML = /*html*/ `
          <button class="editBtn">
            <svg height="1em" viewBox="0 0 512 512">
              <path
                d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
              ></path>
            </svg>
          </button>
          <style>
            :host {
            }
            .editBtn {
              width: 55px;
              height: 55px;
              border-radius: 20px;
              border: none;
              background-color: rgb(93, 93, 116);
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.123);
              cursor: pointer;
              position: relative;
              overflow: hidden;
              transition: all 0.3s;
            }
            .editBtn::before {
              content: "";
              width: 200%;
              height: 200%;
              background-color: rgb(102, 102, 141);
              position: absolute;
              z-index: 1;
              transform: scale(0);
              transition: all 0.3s;
              border-radius: 50%;
              filter: blur(10px);
            }
            .editBtn:hover::before {
              transform: scale(1);
            }
            .editBtn:hover {
              box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.336);
            }
            .editBtn svg {
              height: 17px;
              fill: white;
              z-index: 3;
              transition: all 0.2s;
              transform-origin: bottom;
            }
            .editBtn:hover svg {
              transform: rotate(-15deg) translateX(5px);
            }
            .editBtn::after {
              content: "";
              width: 25px;
              height: 1.5px;
              position: absolute;
              bottom: 19px;
              left: -5px;
              background-color: white;
              border-radius: 2px;
              z-index: 2;
              transform: scaleX(0);
              transform-origin: left;
              transition: transform 0.5s ease-out;
            }
            .editBtn:hover::after {
              transform: scaleX(1);
              left: 0px;
              transform-origin: right;
            }
            @media (prefers-color-scheme: dark) {
            }
            @media screen and (orientation: landscape) {
            }
          </style>`;
      }
      connectedCallback() { }
      disconnectedCallback() { }
    } codeMap.set("$EditButton", $EditButton);
    class $AddButton extends $WebBase {
      constructor() {
        super();
        this.template.innerHTML = /*html*/ `
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50px"
              height="50px"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                stroke-width="1.5"
              ></path>
              <path d="M8 12H16" stroke-width="1.5"></path>
              <path d="M12 16V8" stroke-width="1.5"></path>
            </svg>
          </button>
          <style>
            :host {
            }
            button {
              padding: 0;
              aspect-ratio: 1;
              cursor: pointer;
              color: #eeffed;
              background-color: transparent;
              border: none;
              outline: none;
              overflow: hidden;
              transition: all 0.3s;
            }
            button:hover {
              transform: rotate(90deg);
            }
            svg {
              stroke: currentColor;
              fill: none;
              transition: all 0.3s;
            }
            svg:hover {
              stroke: #25bc42;
              fill: #b7f0c2;
            }
            svg:active {
              stroke: #00ff30;
              fill: #b2ffc1;
              transition-duration: 0s;
            }
            @media (prefers-color-scheme: dark) {
            }
            @media screen and (orientation: landscape) {
            }
          </style>`;
      }
      connectedCallback() { }
      disconnectedCallback() { }
    } codeMap.set("$AddButton", $AddButton);
    class $LineCheckbox extends $WebBase {
      constructor() {
        super();
        this.template.innerHTML = /*html*/ `
          <label class="container">
            <input type="checkbox">
            <svg viewBox="0 0 64 64" height="2em" width="2em">
              <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" class="path"></path>
            </svg>
          </label>
          <style>
            :host {
            }
            .container {
              cursor: pointer;
            }
            .container input {
              display: none;
            }
            .container svg {
              overflow: visible;
            }
            .path {
              fill: none;
              stroke: white;
              stroke-width: 6;
              stroke-linecap: round;
              stroke-linejoin: round;
              transition: stroke-dasharray 0.5s ease, stroke-dashoffset 0.5s ease;
              stroke-dasharray: 241 9999999;
              stroke-dashoffset: 0;
            }
            .container input:checked ~ svg .path {
              stroke-dasharray: 70.5096664428711 9999999;
              stroke-dashoffset: -262.2723388671875;
            }
            @media (prefers-color-scheme: dark) {
            }
            @media screen and (orientation: landscape) {
            }
          </style>`;
      }
      connectedCallback() { }
      disconnectedCallback() { }
    } codeMap.set("$LineCheckbox", $LineCheckbox);
    class $FullscreenCheckbox extends $WebBase {
      constructor() { super() }
      connectedCallback() {
        this.template.innerHTML = /*html*/ `
          <label class="container">
            <input checked="checked" type="checkbox">
              <svg viewBox="0 0 448 512" height="1em" xmlns="http://www.w3.org/2000/svg" class="expand"><path d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z"></path></svg>
              <svg viewBox="0 0 448 512" height="1em" xmlns="http://www.w3.org/2000/svg" class="compress"><path d="M160 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V64zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32H96v64c0 17.7 14.3 32 32 32s32-14.3 32-32V352c0-17.7-14.3-32-32-32H32zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V64zM320 320c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32s32-14.3 32-32V384h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z"></path></svg>
          </label>
          <style>
            :host {
            }
            /*------ Settings ------*/
            .container {
              --color: #a5a5b0;
              --size: 30px;
              display: flex;
              justify-content: center;
              align-items: center;
              position: relative;
              cursor: pointer;
              font-size: var(--size);
              user-select: none;
              fill: var(--color);
            }
            .container .expand {
              position: absolute;
              animation: keyframes-fill .5s;
            }
            .container .compress {
              position: absolute;
              display: none;
              animation: keyframes-fill .5s;
            }
            /* ------ On check event ------ */
            .container input:checked ~ .expand {
              display: none;
            }
            .container input:checked ~ .compress {
              display: block;
            }
            /* ------ Hide the default checkbox ------ */
            .container input {
              position: absolute;
              opacity: 0;
              cursor: pointer;
              height: 0;
              width: 0;
            }
            /* ------ Animation ------ */
            @keyframes keyframes-fill {
              0% {
                transform: scale(0);
                opacity: 0;
              }
              50% {
                transform: scale(1.2);
              }
            }
            @media (prefers-color-scheme: dark) {
            }
            @media screen and (orientation: landscape) {
            }
          </style>`;
      }
      disconnectedCallback() { }
    } codeMap.set("$FullscreenCheckbox", $FullscreenCheckbox);
    class $RawCard extends $WebBase {
      constructor() { super() }
      connectedCallback() {
        if (this.firstConnected === undefined) {
          this.firstConnected = true;
          globalThis.rawCard = this;
          this.template.innerHTML = /*html*/ `
            <form> 
                <section class="dataBox">
                  <label for="dataName">数据名称</label>
                  <input name="dataName" type="text" placeholder="dataName" class="collect" required>
                </section>
                <section class="twoColumns">
                  <section class="dataBox">
                    <label for="dataType">数据类型</label>
                    <select name="dataType" id="dataType" class="collect" title="请选择数据类型" required>
                      <option value="User">User</option>
                      <option value="Document">Document</option>
                    </select>
                  </section>
                  <section class="dataBox">
                    <label for="dataFormat">数据格式</label>
                    <select name="dataFormat" id="dataFormat" class="collect" title="请选择数据格式" required></select>
                  </section>
                </section>
                <section class="twoColumns">
                  <section class="dataBox">
                    <label for="readLevel">读取权限</label>
                    <select name="readLevel" id="readLevel" class="collect" title="请选择读取权限" required>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  </section>
                  <section class="dataBox">
                    <label for="writeLevel">写入权限</label>
                    <select name="writeLevel" id="writeLevel" class="collect" title="请选择写入类型" required>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  </section>
                </section>
                <section id="dataValueBox" class="dataBox">
                  <label for="dataValue">数据内容</label>
                  <section id="dataValue" class="collect"></section>
                </section>
                <button id="Submit" class="submit" type="submit">提交</button>
            </form>
            <style>
              :host {
                grid-area: page;
                width: 100%;
                height: 100%;
              }
              form {
                width: 100%;
                height: 100%;
                padding: 20px;
                box-sizing: border-box;
                display: grid;
                grid-template-columns: 100%;
                grid-template-rows: 20% 15% 15% 40% 10%;
              }
              .dataBox {
                display: grid;
                grid-template-columns: 100%;
                grid-template-rows: 50% 50%;
                gap: 10px;
              }
              #dataValueBox {
                grid-template-rows: 25% 75%;
              }
              .dataBox label {
                height: fit-content;
                align-self: end;
                display: grid;
                align-items: end;
                padding-left: 10px;
                font-size: 2rem;
              }
              .twoColumns .dataBox label {
                font-size: 1.5rem;
              }
              .twoColumns {
                display: grid;
                grid-template-columns: 50% 50%;
                grid-template-rows: 100%;
              }
              .twoColumns .collect {
                width: 80%;
              }
              .collect {
                box-sizing: border-box;
                justify-self: center;
                background-color: transparent;
                backdrop-filter: hue-rotate(120deg);
                color: #fff;
                width: 90%;
                padding-left: 1rem;
                outline: 0;
                border: 3px solid rgba(105, 105, 105, 0.397);
                border-radius: 10px;
                font-size: 1rem;
                font-weight: bolder;
                font-style: italic;
              }
              select {
                appearance: none;
                -moz-appearance: none;
                -webkit-appearance: none;
              }
              button {
                width: 40%;
                height: 70%;
                border: none;
                outline: none;
                margin-top: 2rem;
                padding: 10px;
                border-radius: 9999px;
                justify-self: center;
                align-self: end;
                color: #fff;
                font-size: 16px;
                transform: all 0.3s ease;
                background-color: #00bfff;
              }
              button:hover {
                background-color: #00bfff96;
              }
              #dataValue {
                width: 90%;
                justify-self: center;
                overflow-x: hidden;
                overflow-y: scroll;
              }
              #dataValue::-webkit-scrollbar {
                display: none;
              }
              @media (prefers-color-scheme: dark) {
              }
              @media screen and (orientation: landscape) {
              }
            </style>`;
          const dataType = this.shadowRoot.querySelector("#dataType");
          const dataFormat = this.shadowRoot.querySelector("#dataFormat");
          dataType.addEventListener("change", (event) => {
            dataFormat.innerHTML = "";
            switch (event.target.value) {
              case "User": {
                const options = ["mb", "am", "rt"];
                for (const option of options) {
                  const optionElement = document.createElement("option");
                  optionElement.value = option;
                  optionElement.textContent = option;
                  dataFormat.appendChild(optionElement);
                }
                break;
              }
              case "Document": {
                const options = ["txt", "md", "html"];
                for (const option of options) {
                  const optionElement = document.createElement("option");
                  optionElement.value = option;
                  optionElement.textContent = option;
                  dataFormat.appendChild(optionElement);
                }
                break;
              }
            }
          });
          // 手动触发一次
          dataType.dispatchEvent(new Event("change"));
          this.opClickEvents = (event) => {
            switch (event.target.id) {
              case "Submit": {
                event.preventDefault();
                const form = new FormData(this.shadowRoot.querySelector("form"));
                const data = {};
                for (const [key, value] of form) {
                  data[key] = value;
                }
                console.log(data);
                break;
              }
            }
          };
          this.shadowRoot.addEventListener("click", this.opClickEvents);
        }
      }
      disconnectedCallback() { }
    } codeMap.set("$RawCard", $RawCard);
    /**
     * 提示引擎
     * @param {Object} params
     * @param {String} params.mode 模式
     * @param {String} params.id ID
     * @param {String} params.text 展示文本
     * @param {String} params.trueText 确认按钮文本
     * @param {String} params.falseText 取消按钮文本
     * @param {String} params.time 持续时间
     * @param {String} params.icon 图标
     * @param {String} params.color 颜色
     * @param {String} params.background 背景
     * @example 
     * // 弹窗模式
     * const params = {
        id: "test",
        mode: "popup",
        text: "测试",
        trueText: "YES",
      };
      document.body.appendChild(await this.start("PromptEngine", params));
      const result = await globalThis.testPopupPromise; // 命名规则：${id}PopupPromise
      console.log(result); // true or false
     */
    class $PromptEngine extends $WebBase {
      constructor(params) {
        super();
        this.params = params;
      }
      static get observedAttributes() { return ["data-mode"] }
      connectedCallback() {
        this.dataset.mode = this.params.mode;
      }
      disconnectedCallback() { }
      attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
          case "data-mode": {
            switch (newValue) {
              case "ad": {
                break;
              }
              case "island": {
                this.template.innerHTML = /*html*/ `
                  <div>${this.params.text}</div>
                  <style>
                    :host {
                      height: 100%;
                      max-width: 40%;
                      background-color: var(--light);
                      color: var(--dark);
                      border-radius: 9999px;
                      display: grid;
                      place-items: center;
                      text-wrap: nowrap;
                      overflow: auto;
                    }
                    :host::-webkit-scrollbar {
                      display: none;
                    }
                    div {
                      width: 100%;
                      height: 100%;
                      padding-left: 10%;
                      padding-right: 10%;
                      display: grid;
                      place-items: center;
                    }
                    div::-webkit-scrollbar {
                      display: none;
                    }
                    @media (prefers-color-scheme: dark) {
                      :host {
                        background-color: var(--dark);
                        color: var(--light);
                      }
                    }
                  </style>`;
                this.onclick = () => {
                  this.animate(
                    [
                      { transform: "scale(1)", opacity: "1", easing: "cubic-bezier(0.19, 0.9, 0.32, 1.28)", offset: 0 },
                      { transform: "scale(0)", opacity: "0", easing: "cubic-bezier(0.19, 0.9, 0.32, 1.28)", offset: 1 },
                    ],
                    {
                      duration: 1000,
                      fill: "forwards",
                    }
                  ).onfinish = () => {
                    if (this.params?.click) {
                      this.params.click();
                    }
                    this.remove();
                  };
                };
                this.animate(
                  [
                    { transform: "translateX(-100%)", opacity: "0", easing: "cubic-bezier(0.19, 0.9, 0.32, 1.28)", offset: 0 },
                    { transform: "translateX(0)", opacity: "1", easing: "cubic-bezier(0.19, 0.9, 0.32, 1.28)", offset: 1 },
                  ],
                  {
                    duration: 1000,
                    fill: "forwards",
                  }
                ).onfinish = (event) => {
                  event.currentTarget.cancel();
                };
                break;
              }
              case "notice": {
                this.template.innerHTML = /*html*/ `
                  <div>${this.params.text}</div>
                  <style>
                    :host {
                      grid-area: body;
                      align-self: start;
                      justify-self: center;
                      margin: 20px;
                      box-sizing: border-box;
                      width: 80vw;
                      max-width: 400px;
                      height: 10vh;
                      max-height: 100px;
                      border-radius: 9999px;
                      background-color: var(--dark);
                      color: var(--light);
                      display: grid;
                      grid-template-columns: 100%;
                      grid-template-rows: 100%;
                      overflow: scroll;
                      opacity: 0;
                      z-index: 3;
                      transform: scale(0) translateY(100%);
                      transition: all 1s ease-in-out;
                    }
                    div {
                      width: 100%;
                      height: 100%;
                      grid-area: 1/1/2/2;
                      display: grid;
                      place-items: center;
                    }
                    @media (prefers-color-scheme: dark) {
                      :host {
                        background-color: var(--light);
                        color: var(--dark);
                      }
                    }
                  </style>`;
                this.animate(
                  [
                    { transform: "scale(0) translateY(100%)", opacity: "0", easing: "cubic-bezier(0.19, 0.9, 0.32, 1.28)", offset: 0 },
                    { transform: "scale(1.2) translateY(-10%)", opacity: "0.8", easing: "cubic-bezier(0.19, 0.9, 0.32, 1.28)", offset: 0.8 },
                    { transform: "scale(1) translateY(0)", opacity: "1", easing: "cubic-bezier(0.19, 0.9, 0.32, 1.28)", offset: 1 },
                  ],
                  {
                    duration: 1000,
                    fill: "forwards",
                  }
                ).onfinish = () => {
                  setTimeout(() => {
                    this.animate(
                      [
                        { transform: "scale(1) translateY(0)", opacity: "0", easing: "cubic-bezier(0.19, 0.9, 0.32, 1.28)", offset: 0 },
                        { transform: "scale(1.2) translateY(10%)", opacity: "0.8", easing: "cubic-bezier(0.19, 0.9, 0.32, 1.28)", offset: 0.8 },
                        { transform: "scale(0) translateY(-100%)", opacity: "1", easing: "cubic-bezier(0.19, 0.9, 0.32, 1.28)", offset: 1 },
                      ],
                      {
                        duration: 1000,
                        fill: "forwards",
                      }
                    ).onfinish = () => {
                      this.remove();
                    };
                  }, this.params.time || 3000);
                };
                break;
              }
              case "progress": {
                this.id = this.params.id;
                this.template.innerHTML = /*html*/ `
                  <div></div>
                  <style>
                    :host {
                      grid-area: body;
                      margin: 20px;
                      width: 90vw;
                      height: 10vh;
                      border-radius: 9999px;
                      align-self: start;
                      justify-self: center;
                      overflow: hidden;
                      transition: all 1s ease-in-out;
                    }
                    div {
                      width: 0px;
                      height: 100%;
                      justify-self: start;
                      background: linear-gradient( 90deg, #1677ff, #13c2c2 70%);
                      filter: blur(10px);
                      transition: all 1s ease-in-out;
                    }
                  </style>`;
                break;
              }
              case "popup": {
                globalThis[`${this.params.id}PopupPromise`] = new Promise((resolve) => this.resolve = resolve);
                this.template.innerHTML = /*html*/ `
                  <section>
                    <h1>${this.params.title || "提示"}</h1>
                    <div>
                      <p>${this.params.text}</p>
                    </div>
                    <div>
                      <button id="true" type="button">${this.params?.trueText || "确认"}</button>
                      <button id="false" type="button">${this.params?.falseText || "取消"}</button>
                    </div>
                  </section>
                  <style>
                    :host {
                      grid-area: body;
                      margin: 0;
                      padding: 0;
                      width: 100vw;
                      height: 100vh;
                      background-color: rgba(0, 0, 0, 0.5);
                      display: grid;
                      grid-template-columns: 100%;
                      grid-template-rows: 100%;
                      place-items: center;
                      overflow: hidden;
                      z-index: 3;
                      transition: all 1s ease-in-out;
                    }
                    section {
                      width: 80%;
                      border: 5px solid;
                      border-radius: 10vw;
                      background-color: var(--light);
                      filter: drop-shadow(2px 4px 6px black);
                      display: grid;
                      grid-template-columns: 100%;
                      grid-template-rows: 1fr auto 1fr;
                      place-items: center;
                      overflow: hidden;
                      transition: all 1s ease-in-out;
                    }
                    section > h1 {
                      width: 100%;
                      display: grid;
                      place-items: center;
                      overflow: hidden;
                    }
                    section > div:nth-child(2) {
                      width: 100%;
                      height: 100%;
                      max-height: 50vh;
                      display: grid;
                      justify-items: center;
                      overflow: auto;
                    }
                    section > div:nth-child(2) > p {
                      width: 80%;
                      margin: 0;
                      padding: 5%;
                      font-size: 1.2rem;
                      text-align: center;
                      overflow: scroll;
                      overflow-wrap: break-word;
                    }
                    section > div:nth-child(2) > p::-webkit-scrollbar {
                      display: none;
                    }
                    section > div:nth-child(3) {
                      width: 100%;
                      display: grid;
                      grid-template-columns: 50% 50%;
                      grid-template-rows: 100%;
                      place-items: center;
                      overflow: hidden;
                      transition: all 1s ease-in-out;
                    }
                    section > div:nth-child(3) > button {
                      width: 100%;
                      height: 100%;
                      font-size: 1.5rem;
                      font-weight: bolder;
                      border: none;
                      outline: none;
                      background-color: transparent;
                      color: inherit;
                      filter: drop-shadow(2px 4px 6px black);
                      transition: all 1s ease-in-out;
                    }
                    @media (prefers-color-scheme: dark) {
                      section {
                        background-color: var(--dark);
                      }
                    }
                    @media screen and (orientation: landscape) {
                      section {
                        width: 40%;
                        border-radius: 5vw;
                      }
                      section > div:nth-child(2) {
                        max-height: 60vh;
                      }
                    }
                  </style>`;
                this.opClickEvents = (event) => {
                  switch (event.target.id) {
                    case "true": {
                      this.resolve(true);
                      this.remove();
                      break;
                    }
                    case "false": {
                      this.resolve(false);
                      this.remove();
                      break;
                    }
                  }
                };
                this.shadowRoot.addEventListener("click", this.opClickEvents);
                break;
              }
            }
            break;
          }
        }
      }
    } codeMap.set("$PromptEngine", $PromptEngine);
    /**
     * 弹窗引擎
     */
    class $PopupEngine extends $WebBase {
      constructor(data) {
        super();
        this.data = data;
      }
      static get observedAttributes() { return [] }
      connectedCallback() {
        if (this.firstConnect === undefined) {
          this.firstConnect = true;
          this.template.innerHTML = /*html*/ `
            <style>
              :host {
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                padding: 10px;
                display: grid;
                grid-template-columns: 100%;
                row-gap: 10px;
                place-items: center;
                overflow: auto;
                transition: all 1s ease-in-out;
              }
              div {
                font-size: 2rem;
                font-weight: bolder;
              }
              button,input {
                width: 80%;
                padding: 10px;
                font-size: 1.5rem;
                font-weight: bolder;
                border: 5px solid var(--dark);
                border-radius: 9999px;
                background-color: var(--light);
                color: var(--dark);
                transition: all 1s ease-in-out;
              }
              input::placeholder {
                font-size: 1.5rem;
                font-weight: bolder;
              }
              @media (prefers-color-scheme: dark) {
                button,input {
                  border: 5px solid var(--light);
                  background-color: var(--dark);
                  color: var(--light);
                }
              }
            </style>`;
          for (const data of this.data) {
            switch (data.type) {
              case "id": {
                this.id = data.text;
                globalThis[data.text] = this;
                break;
              }
              case "div": {
                const div = document.createElement("div");
                div.innerHTML = data.text;
                this.shadowRoot.appendChild(div);
                break;
              }
              case "button": {
                const button = document.createElement("button");
                button.type = "button";
                button.innerHTML = data.text;
                button.onclick = data.func;
                this.shadowRoot.appendChild(button);
                break;
              }
              case "input": {
                const input = document.createElement("input");
                input.type = "text";
                input.placeholder = data.text;
                input.oninput = data.func;
                this.shadowRoot.appendChild(input);
                break;
              }
              default: {
                console.log("不支持的数据: ", data);
                break;
              }
            }
          }
          this.opOrientationchangeEvents = () => {
            setTimeout(() => {
              const matchResult = matchMedia("(orientation: portrait)");
              const orientation = matchResult.matches ? "portrait" : "landscape";
              switch (orientation) {
                case "portrait": {
                  hyperEngine.style.height = "50vh";
                  break;
                }
                case "landscape": {
                  hyperEngine.style.height = "90vh";
                  break;
                }
              }
            }, 100);
          };
        }
        addEventListener("orientationchange", this.opOrientationchangeEvents);
        this.opOrientationchangeEvents();
      }
      disconnectedCallback() {
        removeEventListener("orientationchange", this.opOrientationchangeEvents);
      }
      attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
          default: {
            console.log(name, oldValue, newValue);
            break;
          }
        }
      }
    } codeMap.set("$PopupEngine", $PopupEngine);
    class BootCore extends $WebBase {
      async createKV(raw) {
        // 检查raw对象里是否有dataName,dataType,dataFormat,dataValue
        if (!raw.dataName || !raw.dataType || !raw.dataFormat || !raw.dataValue) {
          throw new Error("缺少必要的数据");
        }
        // deno-lint-ignore no-this-alias
        const self = this;
        const topShard = {
          atomicType: "create",
          dataName: raw.dataName,
          dataType: raw.dataType,
          dataFormat: raw.dataFormat,
          readLevel: raw.readLevel || 0,
          writeLevel: raw.writeLevel || 0,
        };
        const parcel = await BootCore.$encoder(raw.dataValue);
        const shardArray = [];
        const shardSize = 1024 * 64;
        const shardCount = Math.ceil(parcel.length / shardSize);
        if (shardCount === 1) {
          topShard.shardCount = 1;
          topShard.dataValue = parcel;
          topShard.dataHash = await BootCore.$hash(parcel);
          const message = {
            type: "atomic",
            transaction: topShard,
          };
          return (async function* () {
            yield await self.seek(message);
          })();
        } else {
          topShard.shardCount = shardCount;
          topShard.shardHashMap = new Map();
          for (let i = 0; i < shardCount; i++) {
            const start = i * shardSize;
            const end = Math.min(start + shardSize, parcel.length);
            const shard = parcel.slice(start, end);
            const hash = await BootCore.$hash(shard);
            shardArray.push([i, hash, shard]);
          }
          // 对shardArray按照shardIndex排序
          shardArray.sort((a, b) => a[0] - b[0]);
          // 取出shardArray里的shardHash 并计算总的dataHash
          topShard.dataHash = await BootCore.$hash(shardArray.map((shard) => shard[1]).join(""));
          const message = {
            type: "atomic",
            transaction: topShard,
          };
          const response = await this.seek(message);
          if (response.status === "pending") {
            return (async function* () {
              for (const shard of shardArray) {
                const remainShard = {
                  atomicType: "create",
                  shardCount: shardCount,
                  shardIndex: shard[0],
                  shardHash: shard[1],
                  dataValue: shard[2],
                  dataHash: topShard.dataHash,
                };
                const message = {
                  type: "atomic",
                  transaction: remainShard,
                };
                yield await self.seek(message);
              }
            })();
          } else {
            return (async function* () {
              yield response;
            })();
          }
        }
      }
      async readKV({ index = [], options = {}, accurate = false, decode = false } = {}) {
        const message = {
          type: "atomic",
          transaction: {
            atomicType: "read",
            index: index,
            options: options,
            accurate: accurate,
          },
        };
        const response = await this.seek(message);
        if (index.length === 0 && Object.keys(options).length === 0 && accurate === false) {
          return (async function* () {
            for await (const res of response) {
              if (res.fulfilled || res.fulfilled === 0) {
                yield res.fulfilled;
              } else {
                yield res;
              }
            }
          })();
        } else {
          if (accurate) {
            return response;
          } else {
            // deno-lint-ignore no-this-alias
            const self = this;
            return (async function* () {
              try {
                for await (const res of response) {
                  if (res.fulfilled || res.fulfilled === 0) {
                    yield res.fulfilled;
                  } else {
                    if (res.value instanceof Uint8Array) {
                      yield res;
                    } else {
                      if (decode) {
                        const value = res.value;
                        if (value.dataValue) {
                          value.dataValue = await BootCore.$deliver(value.dataValue);
                          yield value;
                        } else {
                          const shardData = [];
                          const chunkSize = 10;
                          const shardhashMapArray = Array.from(res.value.shardHashMap);
                          for (let i = 0; i < shardhashMapArray.length; i += chunkSize) {
                            const shardIndexArray = shardhashMapArray.slice(i, i + chunkSize).map(shard => ["remainShard", localStorage.getItem("from"), shard[1]]);
                            const partialShardData = await self.readKV({ index: shardIndexArray, accurate: true });
                            shardData.push(...partialShardData);
                          }
                          // shardData是一个数组 数组里每个对象的value是一个Uint8Array 里面存放着分片数据 合并分片数据
                          const parcel = new Uint8Array(shardData.reduce((a, b) => a + b.value.byteLength, 0));
                          let offset = 0;
                          for (const shard of shardData) {
                            parcel.set(shard.value, offset);
                            offset += shard.value.byteLength;
                          }
                          // 对parcel进行解码
                          const dataValue = await BootCore.$deliver(parcel);
                          delete value.shardHashMap;
                          value.dataValue = dataValue;
                          yield value;
                        }
                      } else {
                        yield res;
                      }
                    }
                  }
                };
              } catch (error) {
                console.error(error);
              }
            })();
          }
        }
      }
      async updateKV(index, raw) {
        await this.deleteKV({ index: index });
        await this.createKV(raw);
      }
      async deleteKV({ index = [], options = {}, accurate = false } = {}) {
        const message = {
          type: "atomic",
          transaction: {
            atomicType: "delete",
            index: index,
            options: options,
            accurate: accurate,
          },
        };
        const response = await this.seek(message);
        if (accurate) {
          return response;
        } else {
          return (async function* () {
            for await (const res of response) {
              yield res;
            }
          })();
        }
      }
    }
    class SecondaryWindow extends $WebBase {
      constructor() { super() }
      static get observedAttributes() { return ["data-live"] }
      connectedCallback() {
        globalThis.secondaryWindow = this;
        const template = document.createElement("template");
        this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
        this.userButtonClickLogic = async () => {
          if (localStorage.getItem("login") === "true") {
            primaryWindow.dataset.page = "UserPage";
          } else {
            primaryWindow.dataset.page = "LoginPage";
            this.waitLogin = new Promise((resolve) => { this.resolveLogin = resolve });
            const result = await this.waitLogin;
            if (result === "success") {
              delete this.waitLogin;
              primaryWindow.dataset.page = "UserPage";
            } else {
              delete this.waitLogin;
            }
          }
        };
        this.opClickEvents = (event) => {
          switch (event.target.id) {
            case "Trending": {
              primaryWindow.dataset.page = "TrendingPage";
              break;
            }
            case "Communication": {
              primaryWindow.dataset.page = "CommunicationPage";
              break;
            }
            case "User": {
              this.userButtonClickLogic();
              break;
            }
            case "BoardPage": {
              primaryWindow.dataset.page = "BoardPage";
              const moreMenu = event.target.parentElement;
              moreMenu.classList.toggle("hide");
              moreMenu.classList.toggle("show");
              break;
            }
            case "Exit": {
              primaryWindow.dataset.page = primaryWindow.previousPage[primaryWindow.previousPage.length - 1];
              break;
            }
            case "AddPicture": {
              document.dispatchEvent(new CustomEvent("fromBar", { detail: "addPicture" }));
              break;
            }
            case "Publish": {
              document.dispatchEvent(new CustomEvent("fromBar", { detail: "publish" }));
              break;
            }
            case "More": {
              const moreMenu = event.target.nextElementSibling;
              moreMenu.classList.toggle("hide");
              moreMenu.classList.toggle("show");
              break;
            }
            case "Pulish": {
              primaryWindow.dataset.page = "EditorPage";
              const moreMenu = event.target.parentElement;
              moreMenu.classList.toggle("hide");
              moreMenu.classList.toggle("show");
              break;
            }
            case "Clear": {
              localStorage.setItem("login", "false");
              this.userButtonClickLogic();
              const moreMenu = event.target.parentElement;
              moreMenu.classList.toggle("hide");
              moreMenu.classList.toggle("show");
              break;
            }
          }
        };
        this.shadowRoot.addEventListener("click", this.opClickEvents);
      }
      async attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
          case "data-live": {
            switch (newValue) {
              case "NavBar": {
                this.shadowRoot.innerHTML = /*html*/ `
                    <div id="NavBar" class="inUse">
                      <button id="User" type="button">
                        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 8.5C15 10.433 13.433 12 11.5 12C9.567 12 8 10.433 8 8.5C8 6.567 9.567 5 11.5 5C13.433 5 15 6.567 15 8.5Z" fill="currentColor"/>
                          <path d="M17.6305 20H5.94623C5.54449 20 5.31716 19.559 5.56788 19.2451C6.68379 17.8479 9.29072 15 12 15C14.7275 15 17.0627 17.8864 18.0272 19.2731C18.2474 19.5897 18.0161 20 17.6305 20Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>用户</span>
                      </button>
                      <button id="Trending" type="button">
                        <svg fill="currentColor" width="100%" height="100%" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
                          <path d="M50.1,30.56a1.16,1.16,0,0,1-2,.82L42.73,26,30.32,36.65a3.39,3.39,0,0,1-4.92,0l-7.49-8.54L4.57,39.81a1.13,1.13,0,0,1-1.64,0l-.59-.59a1.13,1.13,0,0,1,0-1.64L15.46,19.68a3.39,3.39,0,0,1,4.92,0l7.49,7.49,7.61-8.78-4.92-4.45a1.26,1.26,0,0,1,.82-2.11H47.76A2.35,2.35,0,0,1,50,14.3Z"/>
                        </svg>
                        <span>动态</span>
                      </button>
                    </div>
                    <style>
                      :host {
                        grid-area: body;
                        width: 80%;
                        height: 8%;
                        margin: 0;
                        padding: 0;
                        margin-bottom: 10px;
                        margin-right: 0;
                        border-radius: 9999px;
                        background-color: #015293;
                        display: grid;
                        grid-template-columns: 100%;
                        grid-template-rows: 100%;
                        align-self: end;
                        justify-self: center;
                        place-items: center;
                        filter: drop-shadow(2px 4px 6px black);
                        z-index: 2;
                        transition: all 1s ease-in-out;
                      }
                      button {
                        width: 90%;
                        height: 80%;
                        border: none;
                        border-radius: 1rem;
                        font-size: 1rem;
                        font-weight: bolder;
                        color: white;
                        background-color: transparent;
                        display: grid;
                        grid-template-columns: 100%;
                        grid-template-rows: 70% 30%;
                        place-items: center;
                        cursor: pointer;
                        transition: all 1s ease-in-out;
                      }
                      button > svg, button > span {
                        display: grid;
                        place-items: center;
                        pointer-events: none;
                      }
                      button > span {
                        width: 100%;
                        height: 100%;
                      }
                      #NavBar {
                        grid-area: 1/1/2/2;
                        width: 100%;
                        height: 100%;
                        margin: 0;
                        padding: 0;
                        background-color: transparent;
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        grid-template-rows: 100%;
                        grid-auto-flow: column;
                        place-items: center;
                        filter: drop-shadow(2px 4px 6px black);
                        transition: all 1s ease-in-out;
                      }
                      #User {
                        grid-area: 1/2/2/3;
                      }
                      .inUse {
                        transform: scale(1);
                        opacity: 1;
                      }
                      .unUse {
                        transform: scale(0);
                        opacity: 0;
                      }
                      @media (prefers-color-scheme: dark) {
                        :host {
                          background-color: #dc3a3a;
                        }
                        button {
                          color: black;
                        }
                      }
                      @media screen and (orientation: landscape) {
                        :host {
                          width: 20%;
                          height: 80%;
                          border-radius: 50px;
                          justify-self: end;
                          margin-right: 10px;
                        }
                        button {
                          font-size: 2rem;
                          grid-template-columns: 30% 70%;
                          grid-template-rows: 100%;
                        }
                        #NavBar {
                          grid-template-rows: 1fr 1fr;
                          grid-template-columns: 100%;
                        }
                        #User {
                          grid-area: 1/1/2/2;
                        }
                      }
                    </style>
                  `;
                break;
              }
              case "EditBar": {
                this.shadowRoot.innerHTML = /*html*/ `
                    <div id="EditBar" class="inUse">
                      <button id="Exit" type="button">
                        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.37905 2.66859L12.0686 2.08881C15.2892 1.58272 16.8995 1.32967 17.9497 2.22779C19 3.12591 19 4.75596 19 8.01607V10.9996H13.0806L15.7809 7.62428L14.2191 6.37489L10.2191 11.3749L9.71938 11.9996L10.2191 12.6243L14.2191 17.6243L15.7809 16.3749L13.0806 12.9996H19V15.9831C19 19.2432 19 20.8733 17.9497 21.7714C16.8995 22.6695 15.2892 22.4165 12.0686 21.9104L8.37905 21.3306C6.76632 21.0771 5.95995 20.9504 5.47998 20.3891C5 19.8279 5 19.0116 5 17.3791V6.6201C5 4.98758 5 4.17132 5.47998 3.61003C5.95995 3.04874 6.76632 2.92202 8.37905 2.66859Z"/>
                        </svg>
                        <span>退出</span>
                      </button>
                      <button id="AddPicture" type="button">
                        <svg width="100%" height="100%" stroke-width="0.1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M7 7C5.34315 7 4 8.34315 4 10C4 11.6569 5.34315 13 7 13C8.65685 13 10 11.6569 10 10C10 8.34315 8.65685 7 7 7ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10Z" fill="currentColor" />
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M3 3C1.34315 3 0 4.34315 0 6V18C0 19.6569 1.34315 21 3 21H21C22.6569 21 24 19.6569 24 18V6C24 4.34315 22.6569 3 21 3H3ZM21 5H3C2.44772 5 2 5.44772 2 6V18C2 18.5523 2.44772 19 3 19H7.31374L14.1924 12.1214C15.364 10.9498 17.2635 10.9498 18.435 12.1214L22 15.6863V6C22 5.44772 21.5523 5 21 5ZM21 19H10.1422L15.6066 13.5356C15.9971 13.145 16.6303 13.145 17.0208 13.5356L21.907 18.4217C21.7479 18.7633 21.4016 19 21 19Z" fill="currentColor" />
                        </svg>
                        <span>添加图片</span>
                      </button>
                      <button id="Publish" type="button">
                        <svg width="100%" height="100%" stroke-width="0.1" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 21.5L17.5 13L13 10L15 2.5L6.5 11L11 14L9 21.5Z" />
                        </svg>
                        <span>发布</span>
                      </button>
                    </div>
                    <style>
                      :host {
                        grid-area: body;
                        width: 80%;
                        height: 8%;
                        margin: 0;
                        padding: 0;
                        margin-bottom: 10px;
                        margin-right: 0;
                        border-radius: 9999px;
                        background-color: #015293;
                        display: grid;
                        grid-template-columns: 100%;
                        grid-template-rows: 100%;
                        align-self: end;
                        justify-self: center;
                        place-items: center;
                        filter: drop-shadow(2px 4px 6px black);
                        z-index: 2;
                        transition: all 1s ease-in-out;
                      }
                      button {
                        width: 90%;
                        height: 80%;
                        border: none;
                        border-radius: 1rem;
                        font-size: 1rem;
                        font-weight: bolder;
                        color: white;
                        background-color: transparent;
                        display: grid;
                        grid-template-columns: 100%;
                        grid-template-rows: 70% 30%;
                        place-items: center;
                        cursor: pointer;
                        transition: all 1s ease-in-out;
                      }
                      button > svg, button > span {
                        display: grid;
                        place-items: center;
                        pointer-events: none;
                      }
                      button > span {
                        width: 100%;
                        height: 100%;
                      }
                      #EditBar {
                        grid-area: 1/1/2/2;
                        width: 100%;
                        height: 100%;
                        margin: 0;
                        padding: 0;
                        background-color: transparent;
                        display: grid;
                        grid-template-columns: 30% 35% 35%;
                        grid-template-rows: 100%;
                        grid-auto-flow: column;
                        place-items: center;
                        filter: drop-shadow(2px 4px 6px black);
                        transition: all 1s ease-in-out;
                      }
                      .inUse {
                        transform: scale(1);
                        opacity: 1;
                      }
                      .unUse {
                        transform: scale(0);
                        opacity: 0;
                      }
                      @media (prefers-color-scheme: dark) {
                        :host {
                          background-color: #dc3a3a;
                        }
                        button {
                          color: black;
                        }
                      }
                      @media screen and (orientation: landscape) {
                        :host {
                          width: 20%;
                          height: 80%;
                          border-radius: 50px;
                          justify-self: end;
                          margin-right: 10px;
                        }
                        button {
                          font-size: 2rem;
                          grid-template-columns: 30% 70%;
                          grid-template-rows: 100%;
                        }
                        #EditBar {
                          grid-template-rows: 30% 35% 35%;
                          grid-template-columns: 100%;
                        }
                      }
                    </style>
                  `;
                break;
              }
              case "BoardBar":
              case "LoginBar":
              case "CommunicationBar":
              case "OrganizationBar": {
                await this.$load("/back.button");
                this.shadowRoot.innerHTML = /*html*/ `
                    <div id="${newValue}" class="inUse">
                      <button id="Exit" type="button">
                        <back-button></back-button>
                        <span>退出</span>
                      </button>
                    </div>
                    <style>
                      :host {
                        grid-area: body;
                        width: 80%;
                        height: 8%;
                        margin: 0;
                        padding: 0;
                        margin-bottom: 10px;
                        margin-right: 0;
                        border-radius: 9999px;
                        background-color: #015293;
                        display: grid;
                        grid-template-columns: 100%;
                        grid-template-rows: 100%;
                        align-self: end;
                        justify-self: center;
                        place-items: center;
                        filter: drop-shadow(2px 4px 6px black);
                        z-index: 2;
                        transition: all 1s ease-in-out;
                      }
                      button {
                        width: 90%;
                        height: 80%;
                        border: none;
                        border-radius: 1rem;
                        font-size: 1rem;
                        font-weight: bolder;
                        color: white;
                        background-color: transparent;
                        display: grid;
                        grid-template-columns: 100%;
                        grid-template-rows: 70% 30%;
                        place-items: center;
                        cursor: pointer;
                        transition: all 1s ease-in-out;
                      }
                      button > svg, button > span {
                        display: grid;
                        place-items: center;
                        pointer-events: none;
                      }
                      button > span {
                        width: 100%;
                        height: 100%;
                      }
                      #${newValue} {
                        grid-area: 1/1/2/2;
                        width: 100%;
                        height: 100%;
                        margin: 0;
                        padding: 0;
                        background-color: transparent;
                        display: grid;
                        grid-template-columns: 1fr;
                        grid-template-rows: 100%;
                        grid-auto-flow: column;
                        place-items: center;
                        filter: drop-shadow(2px 4px 6px black);
                        transition: all 1s ease-in-out;
                      }
                      .inUse {
                        transform: scale(1);
                        opacity: 1;
                      }
                      .unUse {
                        transform: scale(0);
                        opacity: 0;
                      }
                      @media (prefers-color-scheme: dark) {
                        :host {
                          background-color: #dc3a3a;
                        }
                        button {
                          color: black;
                        }
                      }
                      @media screen and (orientation: landscape) {
                        :host {
                          width: 20%;
                          height: 80%;
                          border-radius: 50px;
                          justify-self: end;
                          margin-right: 10px;
                        }
                        button {
                          font-size: 2rem;
                          grid-template-columns: 30% 70%;
                          grid-template-rows: 100%;
                        }
                        #${newValue} {
                          grid-template-rows: 1fr;
                          grid-template-columns: 100%;
                        }
                      }
                    </style>
                  `;
                break;
              }
              case "UserBar": {
                await this.$load("/back.button");
                await this.$load("/more.button");
                this.shadowRoot.innerHTML = /*html*/ `
                    <div id="UserBar" class="inUse">
                      <button id="Exit" type="button">
                        <back-button></back-button>
                        <span>退出</span>
                      </button>
                      <button id="Communication" type="button">
                        <svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22,9V21a1,1,0,0,1-.55.89A.91.91,0,0,1,21,22a1,1,0,0,1-.6-.2L16.67,19H10a2,2,0,0,1-2-2V9a2,2,0,0,1,2-2H20A2,2,0,0,1,22,9Z" fill="currentColor"></path>
                          <path d="M16.27,6H10A3,3,0,0,0,7,9v7l-2.66,1A1,1,0,0,1,4,17a1,1,0,0,1-.61-.21A1,1,0,0,1,3,15.92l.24-3.06A6.6,6.6,0,0,1,2,9,7.27,7.27,0,0,1,9.5,2,7.51,7.51,0,0,1,16.27,6Z" fill="currentColor"></path>
                        </svg>
                        <span>交流</span>
                      </button>
                      <button id="More" type="button">
                        <more-button></more-button>
                        <span>更多</span>
                      </button>
                      <div id="MoreMenu" class="hide">
                        <button id="BoardPage" type="button">数据仪表盘</button>
                        <button id="Pulish" type="button">发布</button>
                        <button id="Clear" type="button">清除登录信息</button>
                      </div>
                    </div>
                    <style>
                      :host {
                        grid-area: body;
                        width: 80%;
                        height: 8%;
                        margin: 0;
                        padding: 0;
                        margin-bottom: 10px;
                        margin-right: 0;
                        border-radius: 9999px;
                        background-color: #015293;
                        display: grid;
                        grid-template-columns: 100%;
                        grid-template-rows: 100%;
                        align-self: end;
                        justify-self: center;
                        place-items: center;
                        filter: drop-shadow(2px 4px 6px black);
                        z-index: 2;
                        transition: all 1s ease-in-out;
                      }
                      button {
                        width: 90%;
                        height: 80%;
                        border: none;
                        border-radius: 1rem;
                        font-size: 1rem;
                        font-weight: bolder;
                        color: white;
                        background-color: transparent;
                        display: grid;
                        grid-template-columns: 100%;
                        grid-template-rows: 70% 30%;
                        place-items: center;
                        cursor: pointer;
                        transition: all 1s ease-in-out;
                      }
                      button > svg, button > span {
                        display: grid;
                        place-items: center;
                        pointer-events: none;
                      }
                      button > span {
                        width: 100%;
                        height: 100%;
                      }
                      #UserBar {
                        grid-area: 1/1/2/2;
                        width: 100%;
                        height: 100%;
                        margin: 0;
                        padding: 0;
                        position: relative;
                        background-color: transparent;
                        display: grid;
                        grid-template-columns: 1fr 1fr 1fr;
                        grid-template-rows: 100%;
                        grid-auto-flow: column;
                        place-items: center;
                        filter: drop-shadow(2px 4px 6px black);
                        transition: all 1s ease-in-out;
                      }
                      #MoreMenu {
                        box-sizing: border-box;
                        position: absolute;
                        width: 100%; 
                        padding: 1rem;
                        border-radius: 2rem;
                        background-color: #015293;
                        display: grid;
                        grid-template-columns: 100%;
                        grid-auto-flow: row;
                        align-items: center;
                        justify-items: start;
                        transform-origin: 90% 50%;
                        transition: all 0.3s ease-in-out;
                      }
                      #MoreMenu button {
                        width: 100%;
                        height: 100%;
                        padding: 1rem;
                        grid-template-columns: 100%;
                        grid-template-rows: 100%;
                        align-items: center;
                        justify-items: start;
                        font-size: 1rem;
                      }
                      .hide {
                        left: 0;
                        bottom: -100%;
                        margin-bottom: 10px;
                        margin-left: 0;
                        transform: scale(0);
                        opacity: 0;
                      }
                      .show {
                        left: 0;
                        bottom: 100%;
                        margin-bottom: 10px;
                        margin-left: 0;
                      }
                      .inUse {
                        transform: scale(1);
                        opacity: 1;
                      }
                      .unUse {
                        transform: scale(0);
                        opacity: 0;
                      }
                      @media (prefers-color-scheme: dark) {
                        :host {
                          background-color: #dc3a3a;
                        }
                        button {
                          color: black;
                        }
                        #MoreMenu {
                          background-color: #dc3a3a;
                        }
                      }
                      @media screen and (orientation: landscape) {
                        :host {
                          width: 20%;
                          height: 80%;
                          border-radius: 50px;
                          justify-self: end;
                          margin-right: 10px;
                        }
                        button {
                          font-size: 2rem;
                          grid-template-columns: 30% 70%;
                          grid-template-rows: 100%;
                        }
                        #UserBar {
                          grid-template-rows: 1fr 1fr 1fr;
                          grid-template-columns: 100%;
                        }
                        #MoreMenu {
                          transform-origin: 200% 100%;
                        }
                        .hide {
                          bottom: 0;
                          left: 100%;
                          margin-bottom: 0;
                          margin-left: -10px;
                          transform: scale(0);
                          opacity: 0;
                        }
                        .show {
                          bottom: 0;
                          left: -100%;
                          margin-bottom: 0;
                          margin-left: -10px;
                        }
                      }
                    </style>
                  `;
                break;
              }
            }
            break;
          }
        }
      }
    }
    class $CapsuleLogo extends $WebBase {
      constructor() {
        super();
        this.template.innerHTML = /*html*/ `
          <button id="Logo" type="button">
            <span>圣灯社区</span>
          </button>
          <style>
            :host {
              grid-area: body;
              width: 50%;
              height: 8%;
              margin: 0;
              padding: 0;
              margin-top: 10px;
              border-radius: 9999px;
              color: white;
              background-color: #015293;
              align-self: start;
              justify-self: center;
              display: flex;
              place-items: center;
              scroll-snap-type: x mandatory;
              overflow: scroll;
              filter: drop-shadow(2px 4px 6px black);
              z-index: 2;
              transition: all 1s ease-in-out;
            }
            :host::-webkit-scrollbar {
              display: none;
            }
            :host > * {
              min-width: 100%;
              min-height: 100%;
            } 
            button {
              width: 100%;
              height: 100%;
              background-color: transparent;
              border: none;
              font-size: 2rem;
              font-weight:bolder;
              transition: all 1s ease-in-out;
            }
            span {
              color: white;
              filter: drop-shadow(2px 4px 6px black);
              pointer-events: none;
              transition: all 1s ease-in-out;
            }
            @media (prefers-color-scheme: dark) {
              :host {
                color: black;
                background-color: #dc3a3a;
              }
              span {
                color: black;
              }
            }
            @media screen and (orientation: landscape) {
              :host {
                width: 20%;
                height: 14%;
                margin-right: 10px;
                justify-self: end;
              }
            }
          </style>`;
      }
    } codeMap.set("$CapsuleLogo", $CapsuleLogo);


    // #endregion Source


    httpServer();
  }
})();