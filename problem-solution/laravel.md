## laravel related

#### laravel 清除 cache

```
php artisan cache:clear
php artisan config:clear
```

#### laravel 验证汉化

```
$this->validate($request,[
    '验证的表单名称（例如name）' => '验证规则',
],[],[
    '验证的表单名称（例如name）' => '你想改成的中文（例如 姓名）'
])

// 或者
$validation = Validator::make($data, $rules,[
    'required' => '请输入:attribute',
    confirmed' => '密码确认不一致',
],[
     'name' => '用户名',
     'email' => '电子邮箱',
     'password' => '密码',
]);
```

#### homestead 安装 phpmyadmin

- Go to phpMyadmin website, download the latest version and unzip it into your code directory
- Open up homestead.yaml file and add these lines

```
folders:- map:/Users/{yourName}/Code/phpMyAdmin
      to:/home/vagrant/Code/phpMyAdmin
sites:- map: phpmyadmin.app
      to:/home/vagrant/Code/phpMyAdmin
```

- Open your hosts file and add this line:

```
127.0.0.1 phpmyadmin.app

```

- you need to reprovision your homestead vm with

```
vagrant provision
```

- Go to http://phpmyadmin.app:8000. It should work from there. Great thing about this method is that if you ever need to destroy your box, you won't ever have to set up phpMyAdmin again so long as you keep your homestead.yaml file and phpMyAdmin in your code directory.

#### laravel 配置 qq 邮箱

```
MAIL_DRIVER=smtp
MAIL_HOST=smtp.qq.com
MAIL_PORT=465
MAIL_USERNAME=3190136675@qq.com
MAIL_PASSWORD=adxwvgbqhwejdfcj
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS=3190136675@qq.com
MAIL_FROM_NAME=GanSuTianQi
```

qq 需要开通 POP3/SMTP 服务,其中密码为开通 POP3/SMTP 服务的授权密码,不是你邮箱的登陆密码

### 安装 laravel 所需要的相关库

```
sudo apt-get install php-mbstring
sudo apt-get install php-dom
sudo apt-get install zip
```

### 安装 laravel 在 ubuntu 16.04

- 首先 `sudo apt-get update && sudo apt-get upgrade`
- 安装 ngix `sudo apt-get install nginx`
- 安装 php `sudo apt-get install php`
- 安装 mysql `sudo apt-get install mysql-server mysql-client`
- 安装 composer
- 安装所需要的额外库,例如**php-mbstring...**
- 安装 laravel`sudo composer create-project laravel/laravel appName`
- 设置项目下的 storage 的权限`sudo chmod -R 777 storage`
- 设置 nginx vhost

```
server {
    listen 80;
    server_name default_server;
    root "/var/www/html/appName/public";

    index index.html index.htm index.php;
    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    location = /favicon.icon {access_log off; log_not_found off;}
    location = /robots.txt {access_log off; log_not_found off;}

    access_log off;
    error_log /var/log/nginx/tianqi_user_center.app-error.log error;

    sendfile off;

    client_max_body_size 100m;

    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/var/run/php/php7.0-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;

        fastcgi_intercept_errors off;
        fastcgi_buffer_size 16k;
        fastcgi_buffers 4 16k;
        fastcgi_connect_timeout 300;
        fastcgi_send_timeout 300;
        fastcgi_read_timeout 300;
    }
    location ~ /\.ht {
        deny all;
    }
}
```
