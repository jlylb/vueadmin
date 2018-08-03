<template>
  <div class='short-cut'>
    <el-tooltip effect="dark" :content="'系统设置'" placement="bottom">
      <div class='short-cut-item'>
        <svg-icon icon-class="setting" class-name="short-cut-icon" />
      </div>
    </el-tooltip>
    <el-tooltip effect="dark" :content="'权限设置'" placement="bottom">
      <div class='short-cut-item'>
        <svg-icon icon-class="privillege" class-name="short-cut-icon" @click.native='openShort("api.permission.index")'/>
      </div>
    </el-tooltip>
      <el-tooltip effect="dark" :content="'修改密码'" placement="bottom">  
      <div class='short-cut-item'>
        <svg-icon icon-class="password" class-name="short-cut-icon" @click.native='openShort("password")'/>
      </div>
     </el-tooltip> 
      <el-tooltip effect="dark" :content="'消息通知'" placement="bottom">  
      <div class='short-cut-item'>
        <svg-icon icon-class="message" class-name="short-cut-icon" @click.native='openShort("notice_index")'/>
      </div>
    </el-tooltip>   
  </div>  
</template>

<script>
export default{
  methods: {
    openShort(name) {
      this.$router.push({ name: name })
    }
  }
}
</script>
<style lang='scss'>

.short-cut{
  float: left;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  .short-cut-item{
    width: 48px;
    height: 48px;
    margin: 16px;
    cursor: pointer;
  }
  .short-cut-icon{
    width: 100%;
    height: 100%;
  }
}

</style>
