# git related

## Failed to connect to github.com port 443: Timed out

结果报错： fatal: unable to access 'https://github.com/xxx.git/': Failed to connect to github.com port 443: Timed out 解决方案配置

git 的代理

```
git config --global http.proxy "127.0.0.1:1080"
git config --global https.proxy "127.0.0.1:1080"
```

那么取消代理的命令是

```
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## git 合并两个不同的远程仓库分支

下载远程仓库 1

`git clone rep1`

下载远程仓库 2

`git remote add rep2 + 第二个远程仓库地址`

把 rep2 远程仓库数据拉取到本地

`git fetch rep2`

在本地创建 rep2Master 分支并拉取远程 rep2 代码到本地 rep2Master ，自动切换到 rep2Master

`git checkout -b rep2Master rep2/master`

由于我们需要把 rep2Master 分支合并到第一个仓库中去，我们再切换到仓库 rep1 下的 master 分支

`git checkout master`

合并代码

`git merge rep2Master`

如果出现如下错误, 在操作命令后面添加 `--allow-unrelated-histories`

## git 拉去远程分支

```
git fetch origin dev
git checkout -b dev origin/dev

```

## 单个仓库使用不同的用户

一个例子，设置本仓库下的`.git/config`文件中加入 user 设定

```
[core]
	repositoryformatversion = 0
	filemode = false
	bare = false
	logallrefupdates = true
	symlinks = false
	ignorecase = true
[remote "origin"]
	url = http://36.41.190.179:8000/spot-market/spot-market-web.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
	remote = origin
	merge = refs/heads/master
[user]
	name = 蒲国红
	email = puguohong@togeek.cn
```

## 一个电脑使用多个 git 账号

```
# github key
Host github.com
    Port 22
    User git
    HostName github.com
    PreferredAuthentications publickey
    IdentityFile C:\\Users\\buuug7\\.ssh\\id-rsa
# eam
Host 10.61.16.201
    Port 22
    User git
    HostName 10.61.16.201
    PreferredAuthentications publickey
    IdentityFile C:\\Users\\buuug7\\.ssh\\id-rsa-eam
```

- [参考 1](https://blog.csdn.net/u014296452/article/details/79984867)
- [参考 2](https://www.cnblogs.com/popfisher/p/5731232.html)

## git tag 相关操作

```
# 创建tag
git tag v0.0.1

# 列出当前仓库的所有标签
git tag

# 查看标签信息
git show v0.0.1

# 切换标签
git checkout v0.0.1

# 删除标签
git tag -d v0.0.1

# 删除远程仓库标签
git push origin :refs/tags/v0.0.1

# gitlab删除远程标签
git push origin :<your tag>

# 给指定commit打标签
git tag -a v0.0.1 49e0cd22f6bd9510fe65084e023d9c4316b446a6

# 发布标签到远程仓库
git push origin v0.0.1
# 将本地所有标签一次性提交到远程仓库
git push origin --tag
```

## git 提交的 message

https://stackoverflow.com/questions/179123/how-to-modify-existing-unpushed-commits

## git configuration

```
# show git version
git --version

# set name and email
git config --global user.name <YOUR NAME>
git config --global user.emal <YOUR EMAIL>


# set line-ending behavior for your operating system
# Windows
git config --global core.autocrlf true
# unix-like system and on Mac
git config --global core.autocrlf input

# to see current configuration
git config --list

git config --global|local --list

git config --global|local --edit

git config --local user.name yourName
git cofnig --local user.email yourEmail
```

## git basic operation

```
# 克隆远程仓库 clone a repository
git clone <URL>

# show status of current repository
git status

#  添加当前的变动 add file
git add <FILE NAME>
# or
git add .

# commit
git commit
# or
git commit -m "<YOUR MESSAGE>"

# see the history of commits
git log

# git log show oneline
git log --oneline

# push your commits to the remote
git push -u origin <BRANCH NAME>

// 提交到远程仓库并关联master 分支
git push -u origin master

# 拉取远程仓库最新信息并合并update local with latest remote
git pull

# Windows, store you passwod
git config --global credential.helper wincred

# change the git default eidtor to atom editor
git config --global core.editor "atom --wait

# git fixing the last commit message
git commit --amend
```

## git 分支操作

```
// git创建分支
git checkout dev

// git切换分支
git checkout dev

// git创建并切换分支
git checkout -b dev

// git查看分支
git branch -a

// git删除本地分支
git branch -delete dev

// git删除远程分支
git push --delete origin dev

// git重命名本地分支
git branch -m dev dev_renamed

// git提交本地新分支到远程
git push origin dev

```

## git 本地回滚操作

```
// 回滚到commit-id,commit-id之后的提交的commit都去除
git reset --hard commit-id

// 将最近三次的提交回滚
git reset --hard HEAD~3
```

## git 远程代码回滚

```
// 过程比本地回滚复杂
// 应用场景,自动部署系统后发布后发现问题,需要回滚到某一个commit,在重写发布
// 原理: 先将本地分支退回到某个commit,删除远程分支,在重新push本地分支

// 1, 检出要回滚的分支
git checkout dev

// 2, 拉取仓库中的最新信息
git pull

// 3, 备份当前分支
git branch dev_backup

// 4, 回滚到commit_id
git reset --hard commit_id

// 5, 删除远程分支dev
git push --delete origin dev

// 6, 提交回滚后的分支
git push origin dev

// 7, 如果前面都成功了,删除备份的分支dev_backup
git push --delete origin dev_backup
```

## git 重命名远程分支

原理是就是先删除远程分支,然后在重命名本地分支,在重新提交一个远程分支

```
// 先删除远程分支
git push --delete origin dev
// 在重命名本地分支
git branch -m dev dev_renamed
// 在提交本地分支
git push -u origin dev_renamed
```

## create github repository from CLI

```
curl -u 'username' https://api.github.com/user/repos -d '{"name":"RepoName"}'
```

## generating a new ssh key

```
https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/
```

## git 常用操作

- 添加远程仓库地址 `git remote add origin https://github.com/buuug7/some.git`
- 修改远程仓库地址 `git remote set-url origin https://github.com/...`
- 查看远程仓库地址 `git remote -v`

## git ssh 连接到 aws

```
 ssh -i 'c:\Users\Administrator\.ssh\MyKeyPair.pem' ubuntu@35.166.185.172

```

## git 常用命令

- 设置你的用户名跟电子邮件`git config --global --edit`

## Git pull 强制覆盖本地文件

```shell
git fetch --all
git reset --hard origin/master
git pull
```

## old mode 100755 new mode 100644 让 git 忽略掉文件权限检查

100644 让 git 忽略掉文件权限检查：

```
// 让git忽略掉文件权限检查：
git config --add core.filemode false
```

## github 搜索格式

- `stars:>50000` 搜索星星大于 50000 的项目
-

## github 查看自己 watch 的项目

https://github.com/watching

## 新建的一个项目推到 github 仓库的操作

```
echo # game4039 >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/buuug7/game4039.git
git push -u origin master
```

## window 下 git 的全局配置文件和 composer 的全局配置文件

window 下 git 的全局配置文件在用户主目录下.gitconfig 文件中
composer 的全局配置文件在用户主目录下的 composer.json 中

## 配置（windows 系统的）git 环境变量

4、配置（windows 系统的）git 环境变量，在 Path 后面追加（复制下面代码改下 git 的安装路径就可以了）
;D:\Program Files\Git\bin;D:\Program Files\Git\libexec\git-core;

## git 简易指南地址

http://www.bootcss.com/p/git-guide/

## windows 使用 git 时出现：warning: LF will be replaced by CRLF

windows 中的换行符为 CRLF， 而在 linux 下的换行符为 LF，所以在执行 add . 时出现提示，解决办法

```
// 删除.git
rm -rf .git

//禁用自动转换
git config --global core.autocrlf false
```

然后重新执行

```
git init
git add
```

## Bad owner or permissions on .ssh/config 的解决

```
Bad owner or permissions on /home/haowt/.ssh/config
fatal: The remote end hung up unexpectedly
```

经网上查是因为 ssh config 文件权限的问题，修改 config 文件权限即可。在.ssh 目录下，执行下面的语句：

```
sudo chmod 600 config
```
