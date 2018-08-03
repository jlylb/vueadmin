<template>
    <div class='table-layout'>
        <table-list
        :custom-columns='columns'
        :form-columns='searchColumns'
        :table-data='data'
        :total='total'
        :search-data='search'
        @list-data='getList'
        @list-edit='handleEdit'
        @list-delete='handleDelete'>
        <template  slot='add_search_button'>
            <el-button
            type="primary"
            icon='el-icon-circle-plus-outline'
            @click="handleAdd">添加</el-button>
        </template>
        <template slot-scope="{ data }" slot='status'>
            <el-tag> {{ data.status }} </el-tag>
        </template>
          <template slot-scope="{ data }" slot='avatar'>
            <img :src="data.avatar" />
        </template>
        <template slot='actionExtra' slot-scope="{ data }">
                <el-button
                size="mini"
                type="success"
                @click="handleRole(data)">授权</el-button>
        </template>
        </table-list>
        <el-dialog :title="dialogTitle" :visible.sync="addDialog" @open='dialogOpen'>
            <my-form
                class="my-form"
                ref='dialogForm'
                @do-form='saveData'
                :form-rules='formRules'
                :pform-model='userFormModel'
                :pform-columns='formColumns'></my-form>
        </el-dialog>

        <el-dialog :title="dialogTitle" :visible.sync="editDialog" @open='dialogOpen'>
            <my-form
                class="my-form"
                ref='editDialogForm'
                @do-form='saveData'
                :form-rules='editFormRules'
                :pform-model='editUserFormModel'
                :pform-columns='editFormColumns'></my-form>
        </el-dialog>

        <el-dialog title="用户授权" :visible.sync="roleDialog" @open='roleDialogOpen'>
            <my-form
                class="my-form"
                ref='roleForm'
                @do-form='saveRoleData'
                :pform-model='roleFormModel'
                :pform-columns='roleColumns'></my-form>
        </el-dialog>
    </div>
</template>

<script>
import tableList from '../common/components/tableList'
import MyForm from '../common/components/myform'
import { fetchList, fetchRoles, saveRoles, createUser, updateUser, deleteUser } from '@/api/users'
import axios from 'axios'
export default {
  components: { tableList, MyForm },
  data() {
    return {
      data: [],
      logo: [],
      formColumns: [
        { name: 'name', label: '用户名' },
        { name: 'email', label: '邮箱' },
        { name: 'password', label: '密码', inputType: 'password', type: 'input' },
        { name: 'password_confirmation', label: '确认密码', inputType: 'password', type: 'input' }
      ],
      editFormColumns: [
        { name: 'name', label: '用户名' },
        { name: 'email', label: '邮箱' }
      ],
      searchColumns: [
        { name: 'name', label: '用户名', props: { clearable: true }},
        {
          name: 'created_at',
          label: '创建时间',
          type: 'date'
        }
      ],
      formRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      editFormRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      },
      columns: {
      },
      total: 0,
      search: {
        page: 1,
        pageSize: 10
      },
      editDialog: false,
      roleDialog: false,
      addDialog: false,
      roleFormModel: {},
      userFormModel: {},
      editUserFormModel: {},
      roleColumns: [
        {
          name: 'roles',
          label: '角色',
          type: 'checkboxgroup',
          data: [
          ]
        }
      ],
      dialogTitle: ''
    }
  },
  methods: {
    handleAdd(data) {
      this.addDialog = true
      this.dialogTitle = '添加'
      this.editId = 0
      this.$nextTick(() => {
        this.$refs.dialogForm.resetForm()
      })
    },
    handleDelete(data) {
      deleteUser(data).then((res) => {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.getList()
      }).catch((err) => {
        console.log(err)
      })
    },
    handleEdit(data) {
      // console.log(data)
      this.editDialog = true
      this.dialogTitle = '编辑'
      this.editUserFormModel = data
      this.$nextTick(() => {
        this.$refs.editDialogForm.resetForm()
      })
    },
    getList(query) {
      console.log(query)

      fetchList(query || this.search).then((res) => {
        this.data = res.data.data.data
        this.total = res.data.data.total
      }).catch((res) => {

      })
    },
    saveData(data) {
      const method = data.id ? updateUser : createUser
      method(data).then((res) => {
        console.log(res)
        this.addDialog = false
        this.editDialog = false
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.getList()
      }).catch((res) => {
        console.log(res)
      })
    },
    dialogOpen(val) {
      this.$nextTick(() => {
        console.log(this.$refs)
      })
    },
    handleRole(data) {
      this.roleDialog = true
      fetchRoles(data.id).then((res) => {
        const columns = this.roleColumns
        columns[0].data = res.data.data.allRoles
        this.roleColumns = columns
        this.roleFormModel = { roles: res.data.data.myRoles, id: data.id }
      }).catch((res) => {
        console.log(res)
      })
    },
    roleDialogOpen() {

    },
    saveRoleData(data) {
      saveRoles(data).then((res) => {
        this.roleDialog = false
        this.$message({
          type: 'success',
          message: '授权成功'
        })
      })
        .catch((res) => {
          console.log(res)
        })
    }
  },
  created() {
    this.getList()
  }
}
</script>
<style lang="scss">
   .table-layout .my-form .el-input{
        width: 50%;
    }
</style>

