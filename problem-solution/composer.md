## composer realted

#### windows 中 composer 的 config.json 位置

`C:\Users\buuug7\AppData\Roaming\Composer\`

#### composer 常用命令

- 升级 composer 本身 `composer selfupdate`
- 显示详细的安装信息 `composer update -vvv`
- 安装 composer 在 composer.json 中的依赖 `composer install`

#### 当 composer 运行的时候出现 xdebug ennabled 的时候

打开 php.ini 然后找到 zend_extension,在前面加上`;`注释掉
