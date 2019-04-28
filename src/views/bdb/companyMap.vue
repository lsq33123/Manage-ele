<template>
  <div>
      1
    <HtmlPanel :url="url1"></HtmlPanel>
    <HtmlPanel :url="url2"></HtmlPanel>
  </div>
</template>
<style scoped>
  div{color:red}
</style>
<script>
import HtmlPanel  from '@/components/HtmlPanel';
  export default{
    data () {
      return {
        url1: '',
        url2: ''
      }
    },
    components: { 
        HtmlPanel:HtmlPanel
    },
    mounted () {
      this.url1 = ''
      this.url2 = 'https://www.cnblogs.com/leeshine-luo/p/5246076.html'
    },
    methods: {
    }
  }
</script>