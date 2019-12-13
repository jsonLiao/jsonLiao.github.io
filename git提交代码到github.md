@ ----------------- 生成密钥
1. cd ~/.ssh

2. ssh-keygen -t rsa #

3. 找到本地文件 /c/Users/Administrator/.ssh/id_rsa.pub
   复制内容

4. 登录github->setting-> SSH and GPG key -> 添加公钥保存即可

5. 查看公钥是否添加成功
   ssh -T git@github.com
   

@ ----------------- git 将本地文件推送到Github远程仓库

1. 在github上创建项目demos

2. 使用git clone git@github.com:jsonLiao/jsonLiao.github.io.git 到本地
   或者
   在本地demos 项目中使用 git init 把其变成git可以管理的仓库

3. 若要忽略本地的文件或文件夹不被提交到github ，则需要在项目根目录下创建 .gitignore 文件
   touch .gitignore

4. 添加忽略文件
   如： node_modules/

5. 关联远程仓库 （第一次使用需要添加github公钥）
   git remote add origin git@github.com:jsonLiao/jsonLiao.github.io.git

5. 添加文件夹下所有文件到暂存区
   git add .

6. 把文件提交到仓库
   git commit -m "提交说明"

7. 将本地更改推送到远程master分支。
   git push origin master

备注：如果在github的remote上已经有了文件，会出现错误。此时应当先pull一下，即：
git pull origin master
git push origin master
