<template>
    <baidu-map
        id="container"
        class="map"
        center="郑州"
        ak="tO2SsUpep6SNN9aiNKzGiBI8"
        :zoom="5"
        :scroll-wheel-zoom="true"
    >
        <bml-marker-clusterer :averageCenter="true">
            <bm-marker
                v-for="marker of markers"
                :key="marker.compCode"
                :position="{lng: marker.longitude, lat: marker.latitude}"
                @click="clickHandler(marker.compCode)"
            ></bm-marker>
            <bm-info-window
                :position="{lng: currPoint.longitude, lat: currPoint.latitude}"
                :width="300" :height="120"
                :show="isShowInfoWin"
            >
                <!-- <p v-text="JSON.stringify(currPoint)"></p> -->
                <h4 style="margin:0 0 5px 0;padding:0.2em 0">{{currPoint.compName}}</h4>
                <div class="media">
                    <img
                        class="pull-left"
                        :src="currPoint.thumb"
                        style="width:80px;height:80px;"
                        :title="currPoint.compName"
                    >
                    <div class="media-body">
                        <div class="media" style="width:210px">地址：{{currPoint.address}}</div>
                        <div class="media" style="width:210px">电话：{{currPoint.tel}}</div>
                    </div>
                </div>
            </bm-info-window>
        </bml-marker-clusterer>
    </baidu-map>
</template>

<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmMarker from "vue-baidu-map/components/overlays/Marker.vue";
import BmInfoWindow from "vue-baidu-map/components/overlays/InfoWindow.vue";
import BmlMarkerClusterer from "vue-baidu-map/components/extra/MarkerClusterer.vue";
import { getCompAddressInfo } from "@/api/bdbApi";
export default {
    data() {
        return {
            markers: [],
            isShowInfoWin: false,
            currPoint: {
                compCode: "",
                compName: "",
                province: "",
                city: "",
                longitude: "",
                latitude: "",
                thumb: "", //图标地址
                address: "",
                tel: ""
            }
        };
    },
    components: {
        BaiduMap,
        BmlMarkerClusterer,
        BmMarker,
        BmInfoWindow
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData() {
            getCompAddressInfo().then(res => {
                this.markers = res.data;
            });
        },
        clickHandler(compCode) {
            //this.currPoint.longitude = e.point.lng;
            //this.currPoint.latitude = e.point.lat;
            const comp = this.markers.find(item =>item.compCode==compCode);
            this.currPoint = comp;
            this.isShowInfoWin = true;
        }
    }
};
</script>
<style scoped>
.map {
    width: 100%;
    height: 570px;
    
}

.pull-left {
	float: left
}
.media, .media-body {
	overflow: hidden;
	*overflow: visible;
	zoom: 1
}

.media, .media .media {
	margin-top: 15px
}

.media:first-child {
	margin-top: 0
}

.media-object {
	display: block
}

.media-heading {
	margin: 0 0 5px
}

.media>.pull-left {
	margin-right: 10px
}

.media>.pull-right {
	margin-left: 10px
}

.media-list {
	margin-left: 0;
	list-style: none
}
/* 隐藏左下角logo  但是没起作用 */
.BMap_cpyCtrl {
    display: none !important;
}
.anchorBL {
    display: none !important;
}
</style>