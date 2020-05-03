# Nginx

## ubuntu 上 nginx 命令

```bash
# 启动|重启|停止
sudo service nginx start|restart|stop

# 加载新配置
nginx -s reload
```

## windows 上 nginx 操作常用命令

```shell
# 启动
start nginx
# 快速停止nginx，可能并不保存相关信息
nginx.exe -s stop
# 完整有序的停止nginx，并保存相关信息
nginx.exe -s quit
# 当配置信息修改，需要重新载入这些配置时使用此命令
nginx.exe -s reload
# 重新打开日志文件
nginx.exe -s reopen
# 查看Nginx版本
nginx -v
```

## 配置文件

配置文件通常位于 `/etc/nginx/nginx.conf` , 一个标准的配置文件类似于下面的样子

```
# 这里是一些配置
...
http {
  # 这里是一些配置
  ...
  # 这部分可能存在于/etc/nginx/conf.d/目录下
  upstream {

  }
  server {
    listen 8080;
    root /data/up1;

    location / {
    }
  }
  server {
    listen 80;
    root /data/up2;

    location / {
    }
  }
  这里是一些配置
  ...
}

mail {
}
```

## nginx 配置详解

- https://www.cnblogs.com/knowledgesea/p/5199046.html
- https://www.cnblogs.com/knowledgesea/p/5199046.html

## nigix 常用正则

- `=`开头表示精确匹配
- `^~` 开头表示 uri 以某个常规字符串开头，不是正则匹配
- `~` 开头表示区分大小写的正则匹配;
- `~*` 开头表示不区分大小写的正则匹配
- `/` 通用匹配, 如果没有其它匹配,任何请求都会匹配到

```nginx
#所以实际使用中，个人觉得至少有三个匹配规则定义，如下：
#直接匹配网站根，通过域名访问网站首页比较频繁，使用这个会加速处理，官网如是说。
#这里是直接转发给后端应用服务器了，也可以是一个静态首页
# 第一个必选规则
location = / {
    proxy_pass http://tomcat:8080/index
}
# 第二个必选规则是处理静态文件请求，这是nginx作为http服务器的强项
# 有两种配置模式，目录匹配或后缀匹配,任选其一或搭配使用
location ^~ /static/ {
    root /webroot/static/;
}
location ~* \.(gif|jpg|jpeg|png|css|js|ico)$ {
    root /webroot/res/;
}
#第三个规则就是通用规则，用来转发动态请求到后端应用服务器
#非静态文件请求就默认是动态请求，自己根据实际把握
#毕竟目前的一些框架的流行，带.php,.jsp后缀的情况很少了
location / {
    proxy_pass http://tomcat:8080/
}
```

文件及其目录匹配

- `-f`和`!-f`用来判断是否存在文件
- `-d`和`!-d`用来判断是否存在目录
- `-e`和`!-e`用来判断是否存在文件或目录
- `-x`和`!-x`用来判断文件是否可执行

## rewrite 规则

rewrite 功能就是，使用 nginx 提供的全局变量或自己设置的变量，结合正则表达式和标志位实现 url 重写以及重定向。rewrite 只能放在 server{},location{},if{}中，并且只能对域名后边的除去传递的参数外的字符串起作用。[详细介绍](https://segmentfault.com/a/1190000002797606)
例如`http://seanlook.com/a/we/index.php?id=1&u=str`只对`/a/we/index.php`重写。语法`rewrite regex replacement [flag]`.

## 链接 sites-available 到 sites-enabled

```
ln -s /etc/nginx/sites-available/yoursoups80.app /etc/nginx/sites-enabled/yoursoups80.app
```

## 防盗链

```
server {
	listen       80;
	server_name demo.neoease.com;
	index index.html index.htm index.php;
	root  /var/www/demo_neoease_com;

	# 这里为图片添加为期 1 年的过期时间, 并且禁止 Google, 百度和本站之外的网站引用图片
	location ~ .*\.(ico|jpg|jpeg|png|gif)$ {
		expires 1y;
		valid_referers none blocked demo.neoease.com *.google.com *.baidu.com;
		if ($invalid_referer) {
			return 404;
		}
	}

	log_format demo.neoease.com '$remote_addr - $remote_user [$time_local] $request'
	'$status $body_bytes_sent $http_referer '
	'$http_user_agent $http_x_forwarded_for';
	access_log  /var/log/demo.neoease.com.log demo.neoease.com;
}
```

## proxy_pass rewrite

比如将`http://some.com/api`代理到`http://some.com:3000`, 主义 url 中 api 被去掉了

```
server {
    listen 80;
    root /path/to;
    index index.html;
    server_name some.com;

    location /api/ {
        rewrite /api/(.+)$ /$1 break;
        proxy_pass http://some.com:3000
    }
}

```

## 公司 nginx 配置例子

```
user  root;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    upstream backend {
        server 10.59.8.51:8880;
        server 10.59.8.53:8880 down;
    }

    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;
    server_tokens  off;

    keepalive_timeout  65;
    client_max_body_size 6m;

    #gzip  on;

    server {
        listen 80;

        location / {
            proxy_pass http://backend;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $host;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";

            proxy_set_header X-Forwarded-Proto $scheme;

            proxy_buffering off;
            proxy_request_buffering off;
        }

        location  /eam/ldap/ {
            proxy_pass http://10.59.8.51:8990/ldap/;

            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $host;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";

            proxy_set_header X-Forwarded-Proto $scheme;

            proxy_buffering off;
            proxy_request_buffering off;
        }

        location /eam/mobile-static {
            root /apps/nginx-html;
            index index.html index.htm;
        }

        location /eam/web-static {
            root /apps/nginx-html;
            index index.html index.htm;
            try_files $uri /eam/web-static/index.html =404;
        }

        location /eam/appupdate/download/ {
            alias /apps/eam-storage/;
        }
    }
}
```
