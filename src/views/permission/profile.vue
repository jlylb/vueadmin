<template>
<div class='table-layout'>
    <div class='table-layout-inner'>
        <my-form
            class='profile-form'
            ref='profileForm'
            @do-form='saveData'
            :form-rules='formRules'
            :default-files='logo'
            :form-columns='formColumns'></my-form>
        </div>
    </div>    
</template>

<script>
import MyForm from '../common/components/myform'
import { fetchLogo } from '@/api/upload'
import { mapGetters } from 'vuex'
export default {
  components: { MyForm },
  data() {
    return {
      data: [],
      logo: [],
      formColumns: [
        { name: 'name', label: '用户名', props: { disabled: true }},
        {
          name: 'logo',
          label: '上传LOGO',
          type: 'upload',
          props: {
            action: '/upload/create',
            limit: 1
          }

        }
      ],
      formRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    saveData() {
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    }
  },
  computed: {
    ...mapGetters([
      'companyLogo',
      'companyName'
    ])
  },
  created() {
    this.logo = [
      {
        name: this.companyName,
        url: this.companyLogo
      }
    ]
    this.$nextTick(() => {
      console.log(this.$refs)
      this.$refs.profileForm.setFormModel({
        name: this.companyName
      })
    })
  }
}
</script>

<style lang='scss' scoped>
.table-layout-inner{
    background-color: #fff;
    padding: 20px 0;
}
.table-layout-inner .profile-form .el-input {
    width: 30%;
}
</style>
