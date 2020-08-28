## 强制终结进程

```
kill -9 pid
```

## 查看 cpu 信息

```bash
cat /proc/version
cat /proc/cpuinfo
```

## nginx 报错： nginx: [emerg] bind() to 0.0.0.0:8080 failed (13: Permission denied)

```
getenforce # 查询selinux状态
getenforce 0 # 临时关闭selinux
```

## centos 防火墙

```
firewall-cmd --state
systemctl stop firewall.service
```

## centos nginx

```
systemctl status nginx.service
systemctl start nginx.service
systemctl stop nginx.service
systemctl reload nginx.service
```
