1、在github上创建项目

2、使用git clone git@github.com:jsonLiao/jsonLiao.github.io.git 到本地

3、编辑项目

4、git add . （将改动添加到暂存区）

5、git commit -m "提交说明"

6、git push origin master 将本地更改推送到远程master分支。

备注：如果在github的remote上已经有了文件，会出现错误。此时应当先pull一下，即：

6.git pull origin master

7.git push origin master