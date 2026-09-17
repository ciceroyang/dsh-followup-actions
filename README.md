# dsh-followup-actions

A row of follow-up chips under every finished answer in DeepSeek Harness. Click one and a complete
follow-up question lands in the composer — you still press send.

Built for people who read an answer, do not know what to ask next, and give up. The chips are named
after the reaction, not the technique: 说人话, 缩成三句, 给我步骤, 哪里可能不对.

## The chips

| chip | what it asks for |
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

## Install

    dsh plugin --profile web add github:ciceroyang/dsh-followup-actions#v0.1.0

## Notes

- The chips never send on their own; the draft is always editable first.
- Each prompt refers to 上面这条回答, so it needs no access to the message text and works in any session.
- The list is plain data in `lib/actions.js`. Adding one is a data change plus a test.
- No network, no storage, no telemetry.

## Test

    node build.mjs && node --test

## Licence

MIT. Maintained by [@ciceroyang](https://github.com/ciceroyang).
