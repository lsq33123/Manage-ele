<template>
<baidu-map class="map" center="中国" ak="tO2SsUpep6SNN9aiNKzGiBI8">
  <bml-marker-clusterer :averageCenter="true">
    <bm-marker v-for="marker of markers" :key="marker.id" :position="{lng: marker.lng, lat: marker.lat}"></bm-marker>
  </bml-marker-clusterer>
</baidu-map>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import {BmlMarkerClusterer,bmMarker} from 'vue-baidu-map'
export default {
  data () {
    // 插入 10 个随机点
    // const markers = []
    // for (let i = 0; i < 10; i++) {
    //   const position = {lng: Math.random() * 40 + 85, lat: Math.random() * 30 + 21}
    //   this.markers.push(position)
    // }
    return {
      markers:[{id:1,lng:123.0,lat:23.0},{id:2,lng:103.0,lat:55.0},{id:3,lng:143.0,lat:33.0}]
    }
  },
  components: {
    BaiduMap,
    BmlMarkerClusterer,
    bmMarker
  }
}
</script>
<style scoped>
.map{
  width: 100%;
  height: 550px;
}
</style>