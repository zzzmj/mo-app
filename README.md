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

<!-- database: moapp
username: umpbbanvp29dpq1fdbrc
host: aws.connect.psdb.cloud
password: pscale_pw_DbVf2crxaDBV3uGFTybQDTp4dGYbS7APiU6tADrminG -->
