# dsh-followup-actions · 追问快捷键

每条回答下面多一排小按钮：点一下就填好一句完整追问，发送还是你自己按。

它是给**看完回答、不知道该接着问什么、然后就放弃**的人用的。按钮名写的是你的感受，不是技巧：
说人话、缩成三句、给我步骤、哪里可能不对。

## 有哪些按钮

| 按钮 | 它替你问什么 |
| --- | --- |
| 说人话 | 用大白话重讲一遍，不用行话 |
| 翻译成中文 | 译成自然中文，不逐字直译 |
| 缩成三句 | 结论 / 依据 / 下一步 |
| 给我步骤 | 能照着做的步骤，每步带验收标准 |
| 做成表格 | 关键信息整理成表 |
| 举个例子 | 每个结论配一个具体例子 |
| 哪里可能不对 | 逐条指出可疑、过时或无依据的地方 |
| 写成邮件 | 直接能发的邮件草稿 |
| 换成英文 | 自然的书面英语 |

## 安装

    dsh plugin --profile web add github:ciceroyang/dsh-followup-actions#v0.1.1

一条命令就装好并挂载：manifest 里声明了 `dsh.bundle`，profile 会把它加入 loader 树，浏览器端
则通过 `exports["./client"]` 提供。

想从本地源码目录加载，就手动挂：

    ln -sfn "$PWD/dsh-followup-actions" ~/.dsh/profiles/web/node_modules/dsh-followup-actions
    # 然后写进 ~/.dsh/profiles/web/cordis.patch.yml
    - insert:
        - id: followup-actions
          name: dsh-followup-actions

web profile 会热重载 patch，之后刷新页面即可。

## 说明

- 按钮不会自动发送，草稿永远先给你改。
- 每句追问都写成「上面这条回答……」，所以不需要读取消息内容，任何会话里都能用。
- 按钮就是 `lib/actions.js` 里的纯数据，加一个 = 改数据 + 加测试。
- 不发网络请求、不写存储、没有埋点。

## 测试

    node build.mjs && node --test

## 许可

MIT。维护者 [@ciceroyang](https://github.com/ciceroyang)。
