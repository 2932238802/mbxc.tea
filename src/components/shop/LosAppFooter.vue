<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 mb-4">
          <h5 class="footer-title">茗不虚传 · 产业互联</h5>
          <p class="mb-4">致力于中国茶产业数字化转型，打造"数字茶园+智慧工厂+云端交易+绿色金融"的全产业链生态闭环</p>
          <img src="/logo.jpg" alt="Logo" class="rounded bg-white p-2 footer-logo">
        </div>
        <div class="col-lg-2 col-md-4 mb-4">
          <h5 class="footer-title">核心服务</h5>
          <ul>
            <li><a href="" @click.prevent>数字茶园解决方案</a></li>
            <li><a href="" @click.prevent>茶企 ERP 系统</a></li>
            <li><a href="" @click.prevent>溯源防伪体系</a></li>
            <li><a href="" @click.prevent>茶碳汇资产管理</a></li>
          </ul>
        </div>
        <div class="col-lg-2 col-md-4 mb-4">
          <h5 class="footer-title">友情链接</h5>
          <ul>
            <li><a href="" @click.prevent>中国茶叶流通协会</a></li>
            <li><a href="" @click.prevent>农业农村部</a></li>
            <li><a href="" @click.prevent>安顶山云雾茶官网</a></li>
            <li><a href="" @click.prevent>茶小智产业大脑</a></li>
          </ul>
        </div>
        <div class="col-lg-4 col-md-4 mb-4 footer-contact">
          <h5 class="footer-title">联系我们</h5>
          <ul>
            <li><i class="fas fa-phone-alt"></i> 咨询热线：400-888-TEA9</li>
            <li><i class="fas fa-headset"></i> 直线电话：18857131919</li>
            <li><i class="fas fa-envelope"></i> 邮箱：contact@mingbuxuchuan.com</li>
            <li><i class="fas fa-map-marker-alt"></i> 地址：杭州市富阳区里山镇安顶村游客服务中心</li>
          </ul>
        </div>
      </div>
      <hr class="border-secondary mt-4 mb-4">
      <div class="text-center text-muted">
        <p class="mb-1">Copyright © 2026 茗不虚传 - 安顶山云雾茶数字焕新方案. All Rights Reserved.</p>
        <small>浙ICP备0910xxxx号 | 浙公网安备 330106xxxx号 | 技术支持：茶小智架构参考</small>
      </div>
    </div>
  </footer>
</template>
<!--------------------------------------------------------->

<script lang="ts">

</script>

<!--------------------------------------------------------->
<script setup lang="ts">
</script>

<style scoped>
.footer { background-color: #2c3e50; color: #ccc; padding: 50px 0 20px; font-size: 0.9rem; }
.footer-title { color: white; font-weight: 700; margin-bottom: 20px; font-size: 1.1rem; }
.footer ul { padding-left: 0; list-style: none; }
.footer ul li { margin-bottom: 10px; }
.footer a { color: #ccc; text-decoration: none; transition: 0.3s; }
.footer a:hover { color: white; }
.footer-contact i { width: 20px; color: var(--tea-secondary); }
.footer-logo { width: 96px; height: 96px; object-fit: contain; }
</style>
