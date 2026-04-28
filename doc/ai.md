D:\LosAngelous\Los\LosTeaWeb\
├── index.html                          # Vite 入口
├── package.json                        # 依赖配置
├── vite.config.ts                      # Vite配置 (含/api代理)
├── tsconfig.json
├── public/
│   ├── *.jpg (22张)                    # 图片资源
│   ├── 茶小泽2.png
│   └── static/data.json               # 面板数据
└── src/
    ├── main.ts                         # 应用入口
    ├── App.vue                         # 根组件 (含MascotEntry + AiChatbot + ImagePreviewModal)
    ├── router/index.ts                 # / → ShopView, /dashboard → DashboardView
    ├── types/bootstrap.d.ts            # Bootstrap类型声明
    ├── utils/
    │   ├── faq.ts                      # FAQ数据 + matchFaqAnswer
    │   └── products.ts                # 茶叶产品数据 + calcTeaPrice/clampQty
    ├── composables/
    │   ├── useAiChat.ts               # AI客服逻辑 (被两页面复用)
    │   └── useImagePreview.ts         # 图片预览缩放拖拽 (被两页面复用)
    ├── stores/
    │   ├── cart.ts                     # Pinia购物车 (localStorage持久化)
    │   └── dashboard.ts               # Pinia面板数据 (fetch data.json)
    ├── components/
    │   ├── shared/
    │   │   ├── MascotEntry.vue         # 右下角茶小泽入口
    │   │   ├── AiChatbot.vue           # AI客服浮层
    │   │   └── ImagePreviewModal.vue   # 图片预览弹窗
    │   ├── shop/ (11个组件)
    │   │   ├── ShopNavbar.vue          # 顶部导航栏
    │   │   ├── HeroSwiper.vue          # Swiper轮播
    │   │   ├── CultureSection.vue      # 茶文旅预约
    │   │   ├── IndustrySection.vue     # 茶产业
    │   │   ├── TechSection.vue         # 茶科技
    │   │   ├── ServiceSection.vue      # 茶服务
    │   │   ├── CarbonSection.vue       # 茶碳汇
    │   │   ├── MarketSection.vue       # 交易中心 (预定+文创+购物车+弹窗)
    │   │   ├── ProductCard.vue         # 通用产品卡片
    │   │   ├── MetaversePage.vue       # 茶园元宇宙VR
    │   │   └── AppFooter.vue           # 页脚
    │   └── dashboard/ (6个组件)
    │       ├── DashboardSidebar.vue
    │       ├── MetricCard.vue
    │       ├── MonthlySalesChart.vue
    │       ├── CategoryChart.vue
    │       ├── TopProductsChart.vue
    │       └── OrdersTable.vue
    └── views/
        ├── ShopView.vue                # C端门户
        └── DashboardView.vue           # B端数据大屏


src/views/CultureView.vue     # 茶文旅
src/views/IndustryView.vue    # 茶产业
src/views/TechView.vue        # 茶科技
src/views/ServiceView.vue     # 茶服务
src/views/CarbonView.vue      # 茶碳汇
src/views/MarketView.vue      # 交易中心

