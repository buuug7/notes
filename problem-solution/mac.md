
## mac brew 更换源

更换

```
# 步骤一
cd "$(brew --repo)"
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git
 
# 步骤二
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git
 
#步骤三
brew update
```

复原

```
cd "$(brew --repo)"
git remote set-url origin https://github.com/Homebrew/brew.git
 
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://github.com/Homebrew/homebrew-core
 
brew update
```



## mac 通过 ssh 上传/下载文件

```
# upload
scp /path/to/file user@ip:/path/to/remote

# download
scp user@ip:/path/to/some/file /path/to/local
```

## mac 通过 brew 安装的 mysql 启动方式

```
mysql.server stop
mysql.server start
mysql.server restart
```

## mac 删除大文件

```
brew install ncdu
sudo ncdu
```

## 为 zsh/bash 添加 PATH

```
# 添加到$HOME/.zshrc文件末尾
export PATH="$HOME/development/flutter/bin:$PATH"
# 运行下面的命令让其立刻生效
ource $HOME/.zshrc

# 同理bash也一样，只需要把zsh换成bash即可
```

## 常用快捷键

- `cmd+shift+g` go to any folders
- `cmd+shift+.` toggle hidden files

## mac 卸载软件后需要清理的几个地方

- `~/Library/Application Support`
- `~/Library/Caches`
- `~/Library/Preferences`
- `~/Library/Logs`

## 常见文件操作

- `mv fileName|folderName newFileName|newFolderName` 移动(重命名)文件或者文件夹
- `mkdir dirname` 创建单个文件夹
- `mkdir -p dirname1/dirname2/dirname3` 创建嵌套多个文件夹
