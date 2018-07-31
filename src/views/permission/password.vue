<template>
<div class='table-layout'>
    <div class='table-layout-inner'>
        <my-form
            class='profile-form'
            ref='profileForm'
            @do-form='saveData'
            @set-validate-rules='setRules'
            :form-rules='formRules'
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
      formColumns: [
        {
          name: 'password',
          label: '原密码',
          type: 'input',
          inputType: 'password'
        },
        {
          name: 'new_password',
          label: '新密码',
          type: 'input',
          inputType: 'password'
        },
        {
          name: 'new_password_confirmation',
          label: '确认新密码',
          type: 'input',
          inputType: 'password'
        }
      ],
      formRules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        new_password: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        new_password_confirmation: [
          { required: true, message: '请确认新密码', trigger: 'blur' }
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
    },
    setRules(form, fromModel) {
      console.log(form, fromModel)
    }
  },
  computed: {

  },
  created() {

  },
  beforeCreate() {
    this.$nextTick(() => {
      console.log(this.$refs.profileForm)
    })
  }
}
</script>

<style lang='scss'>
.table-layout-inner{
    background-color: #fff;
    padding: 20px 0;
}
.table-layout-inner .profile-form .el-input {
    width: 30%;
}
</style>
