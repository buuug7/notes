## vagrant related

#### 在 win7 上安装 vagrant 显示如下错误的解决方法

错误:

```
An error occurred while downloading the remote file. The error
message, if any, is reproduced below. Please fix this error and try
again.

SSL certificate problem: unable to get local issuer certificate
More details here: http://curl.haxx.se/docs/sslcerts.html

curl performs SSL certificate verification by default, using a "bundle"
 of Certificate Authority (CA) public keys (CA certs). If the default
 bundle file isn't adequate, you can specify an alternate file
 using the --cacert option.
If this HTTPS server uses a certificate signed by a CA represented in
 the bundle, the certificate verification probably failed due to a
 problem with the certificate (it might be expired, or the name might
 not match the domain name in the URL).
If you'd like to turn off curl's ve
```

解决方法:

```
$ vagrant box add --insecure laravel/homestead
``


#### linux查看 vagrant virtualbox 版本
查看virtualbox版本命令
```

vboxmanage --version

```

查看vagrant 版本命令
```

vagrant -v

```

#### vagrant常用命令
```

vagrant 打包虚拟机 重命名为 my.box
vagrant package --output my.box

vagrant 添加盒子
my.box 必须在当前目录
vagrant box add my my.box

vagrant init
vagrant init my

```

```
