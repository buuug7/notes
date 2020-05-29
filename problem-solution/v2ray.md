# v2ray

[v2ray document](https://www.v2ray.com/)

## 安装

```bash
bash <(curl -L -s https://install.direct/go.sh)
```

## 时间校准

对于 V2Ray，它的验证方式包含时间，就算是配置没有任何问题，如果时间不正确，也无法连接 V2Ray 服务器的，服务器会认为你这是不合法的请求。所以系统时间一定要正确，只要保证时间误差在 90 秒之内就没问题。

查看时间

```bash
# Sun, 22 Jan 2017 10:10:36 -0500
$ date -R
```

修改时间

```bash
# Sun 22 Jan 16:16:23 GMT 2017
$ sudo date --set="2017-01-22 16:16:23"
```

## 使用 ws+ssl+web 方式的配置

服务器 V2Ray 配置

```json
{
  "inbounds": [
    {
      "port": 10000,
      "listen": "127.0.0.1", //只监听 127.0.0.1，避免除本机外的机器探测到开放了 10000 端口
      "protocol": "vmess",
      "settings": {
        "clients": [
          {
            "id": "b831381d-6324-4d53-ad4f-8cda48b30811",
            "alterId": 64
          }
        ]
      },
      "streamSettings": {
        "network": "ws",
        "wsSettings": {
          "path": "/ray"
        }
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "freedom",
      "settings": {}
    }
  ]
}
```

Nginx 配置

```
server {
  listen 443 ssl;
  ssl_certificate /root/mycerts/yoursoups.com.pem;
  ssl_certificate_key /root/mycerts/yoursoups.com.key;
  server_name yoursoups.com;
  root /var/www/html/yoursoups.com;

  location / {
     index index.html;
  }

  location /ray {
    proxy_redirect off;
    proxy_pass http://127.0.0.1:19494;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $http_host;

    # Show realip in v2ray access.log
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}

```

客户端配置

```json
{
  "inbounds": [
    {
      "port": 1080,
      "listen": "127.0.0.1",
      "protocol": "socks",
      "sniffing": {
        "enabled": true,
        "destOverride": ["http", "tls"]
      },
      "settings": {
        "auth": "noauth",
        "udp": false
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "vmess",
      "settings": {
        "vnext": [
          {
            "address": "mydomain.me",
            "port": 443,
            "users": [
              {
                "id": "b831381d-6324-4d53-ad4f-8cda48b30811",
                "alterId": 64
              }
            ]
          }
        ]
      },
      "streamSettings": {
        "network": "ws",
        "security": "tls",
        "wsSettings": {
          "path": "/ray"
        }
      }
    }
  ]
}
```
