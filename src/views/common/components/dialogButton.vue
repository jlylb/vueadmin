<template>
        <el-dialog title="按钮权限设置" :visible.sync="isShowDialog">
          <div class='button-top'>
          <el-button
              type="primary"
              @click="handleAdd">添加</el-button>
          <el-button
              type="success"
              @click="handleSave">保存</el-button>
          </div>
          <el-form  :model="formModel" class="button-form"  label-width="50px"  ref="buttonForm">
            <div class='button-form-item' v-for='(item,key) in formModel.button' :key='key'>
              <el-form-item label='名称'>
                <el-input v-model="formModel.button[key]['label']"  type='text'></el-input>
              </el-form-item>
              <el-form-item label='权限'>
                <el-input v-model="formModel.button[key]['value']"  type='text'></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="handleDel(key)">删除</el-button>
              </el-form-item>
            </div>  
          </el-form>
        </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      isShowDialog: false,
      formModel: {button:[
        {label: '', value: ''}
      ]}
    }
  },
  methods: {
    open(bool) {
      this.isShowDialog = bool
    },
    handleAdd() {
      this.formModel.button.push({
        label: '', value: ''
      })
    },
    handleDel(key) {
      console.log(key)
      this.formModel.button.splice(key,1)
    },
    handleSave() {
      this.$refs.buttonForm.validate((valid) => {
        if (valid) {
          console.log(this.formModel)
          this.$emit('do-button-form', this.formModel)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  .button-form {
    .el-form-item{
      display: inline-block;
    }
    .el-input {
      width: auto
    }
  }
  .button-top {
    margin-bottom: 20px;
  }

</style>

