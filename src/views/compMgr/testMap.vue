<template>
  <div class="map-area" :id="mapId"></div>
</template>
<script>
import loadBMap from './loadBMap.js'
export default {
  data() {
    return {
      mapId: 'BMap-' + parseInt(Date.now() + Math.random()),
      myMap: null
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      loadBMap('tO2SsUpep6SNN9aiNKzGiBI8')
        .then(() => {
          // 百度地图API功能
          this.myMap = new BMap.Map(this.mapId) // 创建Map实例
          this.myMap.centerAndZoom(new BMap.Point(113.307649675,23.1200491021), 11) // 初始化地图,设置中心点坐标和地图级别
          //添加地图类型控件
          this.myMap.addControl(
            new BMap.MapTypeControl({
              mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
            })
          )
          //this.myMap.addControl(navigationControl);//定位 
          this.myMap.setCurrentCity('广州') // 设置地图显示的城市 此项是必须设置的
          this.myMap.enableScrollWheelZoom(true) //开启鼠标滚轮缩放
        })
        .catch(err => {
          console.log('地图加载失败')
        })
    }
  }
}
</script>
<style scoped>
.map-area {
  width: 100%;
  height: 570px;
}
/* 隐藏左下角logo  但是没起作用 */
.BMap_cpyCtrl {
    display: none;
}

.anchorBL {
    display: none;
}
</style>
