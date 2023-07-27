This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## 教程

采用了prisma + vercel-Postgres构成后端


在prisma/schema.prisma中定义数据表结构

每次表结构更改时需要通过下列表明更新它
```bash
npx prisma generate #本地修改表结构
npx prisma db push #推送到数据库，建议不用

npx prisma migrate dev --name update_question_table 
npx prisma generate
npx prisma migrate deploy
```

数据库可视化
```bash
npx prisma studio
```

## 后续要做的功能

- [] 打卡headmap （准备）
- [] PC端优化，UI优化

PC优化思路，模仿flomo的首页。

1. 可以直接通过输入语言制卡。 要有基本的高亮和加粗功能。
2. 有一个看板视图


- [] 上传页接入chatGPT，自动解析 （垃圾功能，不好用）
- [] 接入trpc作为前后端
