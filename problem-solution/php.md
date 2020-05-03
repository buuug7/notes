## 新安装的 PHP 需要设置的地方

```
// windows
; On windows:
extension_dir = "ext"

extension=php_openssl.dll
extension=php_mbstring.dll
extension=php_curl.dll
```

## php related

#### 文件上传大小限制

```
Starting with version 2.7.0, the import engine has been re–written and these problems should not occur. If possible, upgrade your phpMyAdmin to the latest version to take advantage of the new import features.

The first things to check (or ask your host provider to check) are the values of max_execution_time, upload_max_filesize, memory_limit and post_max_size in the php.ini configuration file. All of these three settings limit the maximum size of data that can be submitted and handled by PHP. Please note that post_max_size needs to be larger than upload_max_filesize. There exist several workarounds if your upload is too big or your hosting provider is unwilling to change the settings:

Look at the $cfg['UploadDir'] feature. This allows one to upload a file to the server via scp, ftp, or your favorite file transfer method. PhpMyAdmin is then able to import the files from the temporary directory. More information is available in the Configuration of this document.

Using a utility (such as BigDump) to split the files before uploading. We cannot support this or any third party applications, but are aware of users having success with it.

If you have shell (command line) access, use MySQL to import the files directly. You can do this by issuing the “source” command from within MySQL:

source filename.sql;
```

修改完毕了记着重启服务器

```
service apche2 restart
```

#### 如何用 composer 加载自己写的类(PSR-4)

比如你项目文件机构

- src
  - Email.php
- tests
  - EmailTest.php
- vendor
  - autoload.php
- composer.json

```php

// 在composer.json中配置psr-4
  "autoload": {
    "psr-4": {
      "App\\": "src/"
    }
  },
  "autoload-dev": {
    "psr-4": {
      "Tests\\": "tests/"
    }
  }

// 注意调用下面命令让你的更改生效
composer update

// 在Email中你可以这样写
namespaces App;
class Email{
    //
}

// 在其他地方调用Emaill类
require 'vendor/autoload.php';
$email= new App\Email;
```

#### 数组字符串相互转换

```
//将数组通过glue指定的连接符转换成字符串
implode(string glue,array pieces)

//使用一个字符串分割另一个字符串,将结果存入数组
explode(string delimiter,string str)

//在数组中通过指定的值搜索对应的键名
array_search(mixed $needle,array $haystack)
```

#### 关于 dirname,**DIR**

```
dirname每一次嵌套都会使原来的目录缩短一层
比如当前文件的目录为 d:\myfile\file\phone.php
在使用了dirname(" d:\myfile\file\phone.php")后变成 d:\myfile\myfile\file
而嵌套之后:
dirname(dirname('d:\myfile\file\phone.php'))后变成 d:\myfile

__DIR__指的是当前文件的目录

```

#### PHP+Apache 上传文件大小限制的问题

- php.ini:upload_max_filesize 所上传的文件的最大大小
- php.ini:memory_limit 本 指令设定 了一个脚本所能够申请到的最大内存字节数，默认值 8M。如果不需要任何内存上的限制，必须将其设为 -1。如果内存不够，则可能出现错误：Fatal error: Allowed memory size of X bytes exhausted (tried to allocate Y bytes)(一般导入数据库时，如果数据库太大，就会报错，改这个就可以)
- php.ini:post_max_size 设定 POST 数据所允许的最大大小。此设定也影响到文件上传。要上传大文件，该值必须大于 upload_max_filesize。
- php.ini:max_execution_time = 30 ; Maximum execution time of each script, in seconds
- php.ini:max_input_time = 60 ; Maximum amount of time each script may spend parsing request data
- 如果用到 mysql 的 BLOB 进行二进制文件存储，则需要设置 my.ini:max_allowed_packet=xxM

#### php 时间不对的解决办法

- 修改 php.ini 配置文件,打开 php.ini 文件，一般在 php 配置根目录下，找到其中的 ;date.timezone，删掉前面的分号，并改为 date timezone = PRC。保存，重启 Apahce 服务即可（有时用 restart 会有问题，先 stop 然后 start 就行了）。
- 加上 date_default_timezone_set(timezone_identifier)函数
  这个函数的意思是，设置当前时区，对时间进行初始化，在页头或获取时间语句前加上这句话。
  例如：
  date_default_timezone_set(PRC);
  echo date("Y-m-d H-i-s");

#### stripslashes()函数的功能与 addslashes()‍ 正好相反，它的功能是去除转义的效果

#### php 中网页跳转

```php
// header(“location:http://example.”);

```

#### PHP header()函数常用方法

```
//定义编码
header( 'Content-Type:text/html;charset=utf-8 ');

//Atom
header('Content-type: application/atom+xml');

//CSS
header('Content-type: text/css');

//Javascript
header('Content-type: text/javascript');

//JPEG Image
header('Content-type: image/jpeg');

//JSON
header('Content-type: application/json');

//PDF
header('Content-type: application/pdf');

//RSS
header('Content-Type: application/rss+xml; charset=ISO-8859-1');

//Text (Plain)
header('Content-type: text/plain');

//XML
header('Content-type: text/xml');

// ok
header('HTTP/1.1 200 OK');

//设置一个404头:
header('HTTP/1.1 404 Not Found');

//设置地址被永久的重定向
header('HTTP/1.1 301 Moved Permanently');

//转到一个新地址
header('Location: http://www.jbxue.com/');

//文件延迟转向:
header('Refresh: 10; url=http://www.jbxue.com/');

print 'You will be redirected in 10 seconds';//当然，也可以使用html语法实现// <meta http-equiv="refresh" content="10;http://www.jbxue.com/ />

// override X-Powered-By: PHP:
header('X-Powered-By: PHP/4.4.0');
header('X-Powered-By: Brain/0.6b');

//文档语言
header('Content-language: en');

//告诉浏览器最后一次修改时间
$time = time() - 60; // or filemtime($fn), etc
header('Last-Modified: '.gmdate('D, d M Y H:i:s', $time).' GMT');

//告诉浏览器文档内容没有发生改变
header('HTTP/1.1 304 Not Modified');

//设置内容长度
header('Content-Length: 1234');

//设置为一个下载类型
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename="example.zip"');header('Content-Transfer-Encoding: binary');// load the file to send:readfile('example.zip');

// 对当前文档禁用缓存
header('Cache-Control: no-cache, no-store, max-age=0, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the pastheader('Pragma: no-cache');

//设置内容类型:
header('Content-Type: text/html; charset=iso-8859-1');
header('Content-Type: text/html; charset=utf-8');header('Content-Type: text/plain'); //纯文本格式header('Content-Type: image/jpeg'); //JPG***header('Content-Type: application/zip'); // ZIP文件header('Content-Type: application/pdf'); // PDF文件header('Content-Type: audio/mpeg'); // 音频文件header('Content-Type: application/x-shockw**e-flash'); //Flash动画

//显示登陆对话框
header('HTTP/1.1 401 Unauthorized');
header('WWW-Authenticate: Basic realm="Top Secret"');print 'Text that will be displayed if the user hits cancel or ';print 'enters wrong login data';
```
