## 1.1 克隆Git代码

```
$ git clone http://xxxx.git --branch master
```

### 为自己的写新项目添加git版本控制，进入项目目录执行以下命令：

```
git init .
```

## 2 分支相关
### 2.1 查看所有分支
```
$ git branch -a
```

### 2.2 切换分支

```
git checkout 分支名
git checkout feature/xx-1.7.0
```

### 2.3 查看当前所属分支

```
$ git branch -vv
* feature/tq-xxxx-1.7.0 d477378d [origin/feature/tq-xxx-1.7.0] 【涂作权】 更新配置
  master                          331276ed [origin/master] 【涂作权】 解决命令行下执行脚本出错的问题
```

### 2.4 创建本地分支feature/tq-xxx-1.7.1

```
$ git branch feature/tq-xxx-1.7.1
$ git branch -a
* feature/tq-xxx-1.7.0
  feature/tq-xxx-1.7.1
  master
  ...
```

### 2.5 切换到本地分支：feature/tq-xxx-1.7.1

```
git checkout feature/tq-xxx-1.7.1
```

### 2.6 远程分支就是本地分支push到服务器上。比如master就是一个最典型的远程分支（默认）

```

git push origin feature/tq-xxx-1.7.1

```

### 2.7 删除本地分支

```
git branch -d feature/tq-xxx-1.7.1
```

### 2.8 删除远程分支
```
git push origin --delete feature/tq-xxx-1.7.1
```

### 2.9 更新代码

```
git pull origin feature/tq-xxx-1.7.1
```

### 2.10 批量删除远程分支
```
git branch -r | grep 'origin/AUTO' | xargs git branch -r -d
xargs表示作为参数
```

## 3 git tag打标签（tag）

### 3.1 查看所有标签
```
git tag   
```

默认标签是打在最新提交的commit上的

### 3.2 本地打新标签

```
git tag <tag name> 
or
git tag <tag name> 16098ee1cbbc8a1884e19c6681735e1792f9b577 // 在某个commit上打tag
// git log 查看commit版本号
```

例如：打v1.1.0标签

```
git tag v1.1.0
```

### 3.3 附注标签
```
git tag -a <tag name> -m <message>
```

例如, 打v1.1.0标签
```
git tag -a v1.1.0 -m 'v1.1.0 release'
```

### 3.4 本地推送到远程

```
git push origin <tag name>  // 推送一个标签到远程
or
git push origin --tags   // 推送全部未推送的本地标签
```

### 3.5. 本地删除标签
```
git tag -d <tag name>
```

### 3.6 并远程删除标签

```
git push origin :refs/tags/<tag name>   // 本地tag删除了，在执行该句，删除远程tag
```

### 3.7 git如何获取指定tag代码

A: 先git clone的方式获取代码
B: 切换到某个tag : git checkout tag_name
C: 当前处于一个“detached HEAD” 状态 ,每一个 tag 就是代码仓库中的一个快照，如果你想编辑此tag 下的代码,上面的方法就不适用了.你需要把 tag 快照对应的代码拉取到一个分支上。
例如想编辑 v1.0的tag 代码，那么可以选择如下操作

```
git checkout -b new_branch v1.0
git checkout -b [分支名称] [tag标签名称]
```

## 4 git日志查看：

### 4.1 git log
如果日志特别多的话，在git bash中，按向下键来查看更多，按q键退出查看日志。

### 4.2 git show
查看最近一次commit内容，也可以后面加commit号，单独查看此次版本的日志

### 4.3 git log -p
-p参数输出的信息会更多，用来显示提交的改动记录，相当于多次使用git show [commit_id]的结果。
```
git archive -o $PWD/version-$(git rev-parse HEAD)-latest.tar.gz $(git rev-parse HEAD)
$(git diff --name-only HEAD HEAD~1)
```
## 5 git常使用的命令

1、git init —在当前目录新建一个代码库。
2、 git config user.name=””git config user.email=””—设置代码提交时候的信息。
3、 git clone 需要clone 远程地址 ––从服务器端克隆项目到本地
4、 git status —查看文件修改状态。
5、 git diff 文件路径 ––查看该文件与上次提交修改代码的差别。
6、 git diff –-cached 文件路径 ––查看本地缓冲和上次提交的差别。
7、 git checkout –b 分支名称 ––新建一个临时分支。
8、 git checkout 分支名称 ––切换分支。
9、 git branch —查看所有的分支。
10、 git branch –D temp —强制删除一个分支
11、 git pull —将服务端代码更新到本地。
12、 git add 文件路径 —提交文件到暂冲区。
13、 git add –A —提交所有的需要add 的文件到缓冲区。
14、 git commit –m ‘提交说明’—将缓冲区的文件提交到本地库中。提交说明尽量将提交内容简单明了的表达清楚。
15、 git push origin master —将已经提交到本地的仓库的代码push到远程服务器。
16、 git log —显示提交的日志。
17、 git show [commit 的Id] — 显示某次提交的元数据和内容变化。
18、 git show [commit Id] –-stat —-显示提交的文件名称
19、 git checkout —恢复暂存区的所有文件。
20、 git reset [file/commit ID] – 重置暂存区的指定文件。用来撤销git commit
21、 git reset –hard [commit 的Id] —将本地版本退回到提交之前的版本。这个操作会将自己新写的代码全部撤销没了。
22、 git cherry-pick temp —-合并临时分支到当前分支。
23、 git commit –amend —修改最近一次提交说明的内容同时可以合并提交。对已经Push 的无效。
24、git rm <删除的本地仓库中文件路径（前提已经提交到远程仓库）> git commit -m “delete file” 分两步执行，可以删除远程仓库对应的文件

## 提交步骤

- 首先你先通过git init git clone 基本环境准备好后，你写完自己的代码想要提交到远程服务器。
- git status 查看改动的文件有哪些
- 分别git diff 改动文件路径 看看有没有空格之类。检查格式，改动具体代码
- 确认无误后 git add 需要提交的文件路径 也可以加入改动的都是需要提交可以git add .
- git pull
- git commit -m “提交备注” 切记commit 之前 先git pull
- git push origin master

## 6 、其它
比对工具
kdiff3