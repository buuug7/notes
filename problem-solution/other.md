# others

## 重启 wsl

```
//WSL-Ubuntu18.04 LTS 重启方法
//以管理员权限运行cmd
>>net stop LxssManager	//停止
>>net start LxssManager	//启动
```

## 安装 v2ray

```
bash <(curl -L -s https://install.direct/go.sh)
```

- 编辑 /etc/v2ray/config.json 文件来配置你需要的代理方式；
- 运行 service v2ray start 来启动 V2Ray 进程；
- 之后可以使用 service v2ray start|stop|status|reload|restart|force-reload 控制 V2Ray 的运行。

## node-sass 中导入 css

1. If your intention is to have the browser make a network request to retrieve this CSS file at page load, then you should update your code from: `@import "file.css";` to: `@import url('file.css');`

2. If your intention is to have the CSS imported and inlined in the same manner as a .sass or .scss file, then you should remove the .css file extension, like so: `@import "file";`
