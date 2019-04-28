<!--  -->
<template>
 
<div class="parent" style="width:100%;">

<!-- 		 <div class="top">
			<select class="chzn-select" name="type" id="type"
				data-placeholder="客户类型" style="vertical-align: top; width: 90px;">
				<option value="-1">客户类型</option>
				<option value="1">新客户</option>
				<option value="0">老客户</option>
				<option value="2">潜客</option>
			</select> <select class="chzn-select" name="areaId" id="areaId"
				data-placeholder="请选择区域" style="vertical-align: top; width: 120px;">
			</select> <select class="chzn-select" name="compCode" id="compCode"
				data-placeholder="请选择门店" style="vertical-align: top; width: 120px;">
			</select>
		</div>    -->
<!-- 		
    <div class="nui-toolbar"   style=" " id="toolbar1">
		       区域：	<input name="area" id="area"
				emptyText="区域"   multiSelect="false"
				class="nui-combobox" textfield="deptName" valuefield="deptCode"
				emptytext="请选择..." allowinput="true" shownullitem="true"
				nullitemtext="请选择..."  onvaluechanged="onAreaChange"
				datafield="complist"
				url="com.saas.commons.model.orgcomponent.getAreaName.biz.ext"
				required="false" requiredErrorText="请选择区域"
				valueFromSelect="true"/>

        店名：	<input name="compName" id="compName"
					emptyText="分店名称" multiSelect="false"
				class="nui-combobox" textfield="shortName" valuefield="compID"
				emptytext="请选择..." allowinput="true" shownullitem="true"
				nullitemtext="请选择..."    onvaluechanged="onStoreChange"
				datafield="complist"
				url="com.saas.commons.model.orgcomponent.getUserCompGover.biz.ext"
				required="false" requiredErrorText="请选择分店"
				valueFromSelect="true"/>

店号：	<input name="compCode" id="compCode"
					emptyText="店号" multiSelect="false" style="width:70px;"
				class="nui-combobox" textfield="compCode" valuefield="compCode"
				allowinput="true"
				 onvaluechanged="search_Code()"
				datafield="complist"
				url="com.saas.commons.model.orgcomponent.getUserCompGover.biz.ext"
				required="false" requiredErrorText="请选择分店"
				valueFromSelect="true"/>
	      店型： 		<input  class="nui-textbox" name="InvestLevel" id="InvestLevel"  style="width:70px;" allowInput="false"  >
          成长阶段：  <input  class="nui-textbox" name="compAgeType" id="compAgeType"  style="width:70px;" allowInput="false"  >
					<input class="nui-hidden" name="compid" id="compid" />
    </div>
 -->

		<div id="container"></div>
		<!-- <div id="myModal1" class="modal hide fade"
			style="width: 80%; margin-left: 0px; transform: translate(-50%, 0); height: 80%;"
			tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
			aria-hidden="true">
			<iframe src="javascript:;" id="detail"
				style="margin: 0px auto; width: 100%; height: 100%; border: 0px; padding: 0px;"></iframe>
		</div> -->

</div>
</template>

<script>
import {getCompAddress} from '@/api/myApi';
export default {
  data () {
    return {
        mapData:[],
        point: '',//new BMap.Point(114.31667, 30.51667),
    };
  },

  

  methods: {
      getExandMapData(){
          getCompAddress().then(res =>{
              this.mapData = res.data;
          })
  },
  initPoint(){
			this.point = new BMap.Point("121.435023","28.642517");
			map.centerAndZoom(point, 13);
			$.each(compData, function(index, item) {
						/* var myIcon = new BMap.Icon("static/img/dizhi.png",
								new BMap.Size(19,25));  */
						var marker = new BMap.Marker(new BMap.Point(
								item.longitude, item.latitude)); // 创建标注
						var content = item.compName;
						markers.push(marker);
						//map.addOverlay(marker); // 将标注添加到地图中
						var sContent =
                        "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>"+item.compName+"</h4>" +
                        "<div class='media'>" +
                        "<img  class='pull-left' src='"+item.thumb+"' style='width:80px;height:80px;' title='"+item.compName+"'/>" +
                        "<div class='media-body'>"+
                        "<div class='media' style='width:200px'>地址："+item.address+"</div>" +
                        "<div class='media' style='width:200px'>电话："+item.tel+"</div>" +
                        "</div></div>";
						addClickHandler(sContent, marker);

					});
					for (var i = 0; i < markers.length; i++) {
						map.addOverlay(markers[i]); // 将标注添加到地图中
					}
  }
}
}

</script>
<style lang='less' scoped>

ul, li {
		list-style: none;
		margin: 0;
		padding: 0;
		float: left;
	}

	html {
		height: 100%
	}

	body {
		height: 100%;
		margin: 0px;
		padding: 0px;
		font-family: "微软雅黑";
	}

	#container {
		height: 100%;
		width: 100%;
	}

	#r-result {
		width: 100%;
	}

	* {
		margin: 0;
		padding: 0;
		font-size: 12px;
		font-weight: normal;
	}

	.top {
		padding: 10px;
		background: #eee;
	}

	.parent {
		width: 100%;
		height: 100%;
	}
	div img {
	    max-width: none;
	    vertical-align: middle;
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

</style>