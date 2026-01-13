<p align="center">
  <img src="./docs/public/logo.png" width="120" />
</p>

<h2 align="center">AiPrism</h2>
<p align="center">Dissecting AI from Every Angle</p>

# AiPrism

Dissecting AI from Every Angle.

Built with VitePress.

## 1 AiPrism结构

```bash
docs/
├─ zh/
│  ├─ index.md         # 中文首页
│  ├─ models/          # 模型与算法
│  ├─ engineering/     # AI 工程化（核心）
│  ├─ systems/         # 系统与架构
│  ├─ edge/            # 端侧 AI
│  ├─ notes/           # 技术札记
│  └─ about.md
│
├─ en/
│  ├─ index.md         # English Home
│  ├─ models/
│  ├─ engineering/
│  ├─ systems/
│  ├─ edge/
│  ├─ notes/
│  └─ about.md
```

URL 示例：

* `aiprism.dev/zh/models/yolo-deploy`
* `aiprism.dev/en/models/yolo-deploy`

操作步骤

```bash
# Step 1  Node.js 建议 ≥ 18
$ node -v
$ npm -v

# Step 2 创建和初始化
$ cd ~/
$ mkdir Github && cd Github
$ mkdir aiprism-site
$ cd aiprism-site
$ npm init -y
$ npm install -D vitepress
$ npx vitepress init

Where should VitePress initialize the config?
./docs

Site title:
AiPrism

Site description:
Dissecting AI from Every Angle


# step 3 本地启动
$ npx vitepress dev docs

# 打开浏览器，访问http://localhost:5173

```

## 2 后续更新计划

* [ ] 域名 aiprism.dev，aiprism.ai
* [ ] slogan Dissecting AI from Every Angle
