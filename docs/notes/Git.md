# Git

## 创建版本库

  * 初始化一个Git仓库，使用`git init`命令。
  * 添加文件到Git仓库，分两步：

    * 第一步，使用命令`git add <file>`，注意，可反复多次使用，添加多个文件；
    * 第二步，使用命令`git commit`，完成。



## 时光机穿梭

要随时掌握工作区的状态，使用`git status`命令。   
如果`git status`告诉你有文件被修改过，用`git diff`可以查看修改内容。

## 版本回退



```
  * HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令`git reset --hard commit_id`。
  * 穿梭前，用`git log`可以查看提交历史，以便确定要回退到哪个版本。
  * 要重返未来，用`git reflog`查看命令历史，以便确定要回到未来的哪个版本。
```





## [工作区和暂存区](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013745374151782eb658c5a5ca454eaa451661275886c6000)

## 管理修改



```
  * Git是如何跟踪修改的，每次修改，如果不add到暂存区，那就不会加入到commit中。
  * 推荐：一次修改，一次add，一次commit.
  * 也可以：多次修改，一次add，一次commit.
```





## 撤销修改



```
  * 场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- file`。
  * 场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD file`，就回到了场景1，第二步按场景1操作。
  * 场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库。
```





## 删除文件

命令`git rm`用于删除一个文件。

## 添加远程库

  * 要关联一个远程库，使用命令`git remote add origin git@server-name:path/repo-name.git`；
  * 关联后，使用命令`git push -u origin master`第一次推送master分支的所有内容；
此后，每次本地提交后，只要有必要，就可以使用命令`git push origin master`推送最新修改；



## 从远程库克隆

要克隆一个仓库，首先必须知道仓库的地址，然后使用`git clone`命令克隆。   
Git支持多种协议，包括https，但通过ssh支持的原生git协议速度最快

## 创建与合并分支

Git鼓励大量使用分支：   


```
* 查看分支：`git branch` ###git branch命令会列出所有分支，当前分支前面会标一个*号。
* 创建分支：`git branch <name>`
* 切换分支：`git checkout <name>`
* 创建+切换分支：`git checkout -b <name>`
* 合并某分支到当前分支：`git merge <name>`
* 删除分支：`git branch -d <name>`
```



## 解决冲突

当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。   
用`git log --graph`命令可以看到分支合并图。

## 分支管理策略

在实际开发中，我们应该按照几个基本原则进行分支管理：   


```
* 首先，master分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；
* 那在哪干活呢？干活都在dev分支上，也就是说，dev分支是不稳定的，到某个时候，比如1.0版本发布时，再把dev分支合并到master上；
* 在master分支发布1.0版本；
```


你和你的小伙伴们每个人都在dev分支上干活，每个人都有自己的分支，时不时地往dev分支上合并就可以了。

Git分支十分强大，在团队开发中应该充分应用。   
合并分支时，加上`--no-ff`参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而**fast forward** 合并就看不出来曾经做过合并。

## Bug分支

当手头工作没有完成时，先把工作现场`git stash`一下，然后去修复bug，修复后，再`git stash pop`，回到工作现场。

工作现场查看：`git stash list`

工作现场还在，Git把stash内容存在某个地方了，但是需要恢复一下，有两个办法：   
* 一是用`git stash apply`恢复，但是恢复后，stash内容并不删除，你需要用`git stash drop`来删除；
* 另一种方式是用`git stash pop`，恢复的同时把stash内容也删了。

你可以多次stash，恢复的时候，先用`git stash list`查看，然后恢复指定的stash，用命令：   
`$ git stash apply stash@{0}`

## Feature分支

开发一个新feature，最好新建一个分支；   
如果要丢弃一个没有被合并过的分支，可以通过`git branch -D <name>`强行删除。

## 多人协作



```
  * master分支是主分支，因此要时刻与远程同步；`git push origin master`
  * dev分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；`git push origin dev`
  * bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；
  * feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。
```





因此，多人协作的工作模式通常是这样：   
1\. 首先，可以试图用`git push origin branch-name`推送自己的修改；   
2\. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；   
3\. 如果合并有冲突，则解决冲突，并在本地提交；   
4\. 没有冲突或者解决掉冲突后，再用`git push origin branch-name`推送就能成功！   
5\. 如果`git pull`提示“no tracking information”，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream branch-name origin/branch-name`   
这就是多人协作的工作模式，一旦熟悉了，就非常简单。

**小结**
1\. 查看远程库信息，使用`git remote -v`；   
2\. 本地新建的分支如果不推送到远程，对其他人就是不可见的；   
3\. 从本地推送分支，使用`git push origin branch-name`，如果推送失败，先用`git pull`抓取远程的新提交；   
4\. 在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致；   
5\. 建立本地分支和远程分支的关联，使用`git branch --set-upstream branch-name origin/branch-name`；   
6\. 从远程抓取分支，使用`git pull`，如果有冲突，要先处理冲突。 

## 标签管理

命令`git tag <name>`用于新建一个标签，默认为HEAD，也可以指定一个commit id；   
`git tag -a <tagname> -m "blablabla..."`可以指定标签信息；   
`git tag -s <tagname> -m "blablabla..."`可以用PGP签名标签；   
命令`git tag`可以查看所有标签。 

命令`git push origin <tagname>`可以推送一个本地标签；   
命令`git push origin --tags`可以推送全部未推送过的本地标签；   
命令`git tag -d <tagname>`可以删除一个本地标签；   
命令`git push origin :refs/tags/<tagname>`可以删除一个远程标签。 

## 使用Github

在GitHub上，可以任意Fork开源仓库；   
自己拥有`Fork`后的仓库的读写权限；   
可以推送`pull request`给官方仓库来贡献代码。 

让Git显示颜色，会让命令输出看起来更醒目：   
`$ git config --global color.ui true`

全局设置：`~/.gitignore_global`   
忽略某些文件时，需要编写`.gitignore`；   
`.gitignore`文件本身要放到版本库里，并且可以对`.gitignore`做版本管理！ 

`$ git config --global alias.st status`   
`$ git config --global alias.co checkout`   
`$ git config --global alias.ci commit`   
`$ git config --global alias.br branch`   
`$ git config --global alias.unstage 'reset HEAD'`   
`$ git config --global alias.last 'log -1'`

转自 [廖雪峰老师](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)