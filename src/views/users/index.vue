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
        <template slot-scope="{ data }" slot='status'>
            <el-tag> {{ data.status }} </el-tag>
        </template>
          <template slot-scope="{ data }" slot='avatar'>
            <img :src="data.avatar" />
        </template>
        <template slot='action' slot-scope="{ data }">
                <el-button
                size="mini"
                type="primary"
                @click="handleEdit(data)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(data)">删除</el-button>
                <el-button
                size="mini"
                type="success"
                @click="handleRole(data)">授权</el-button>
        </template>
        </table-list>
        <el-dialog title="编辑" :visible.sync="editDialog" @open='dialogOpen'>
            <my-form
                class="my-form"
                ref='dialogForm'
                @do-form='saveData'
                :form-rules='formRules'
                :default-files='logo'
                :pform-columns='formColumns'></my-form>
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
import { fetchList, fetchRoles, saveRoles } from '@/api/users'
import axios from 'axios'
export default {
  components: { tableList, MyForm },
  data() {
    return {
      data: [],
      logo: [],
      formColumns: [
        { name: 'name', label: '用户名' },
        { name: 'email', label: '邮箱'},
        { name: 'password', label: '密码', inputType: 'password', type: 'input'},
        { name: 'password_confirmation', label: '确认密码', inputType: 'password', type: 'input'},
        { name: 'role', label: '角色'},
      ],
      searchColumns: [
        { name: 'name', label: '用户名' },
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
        status: [
          { required: true, message: '请输入消息等级', trigger: 'blur' }
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
      roleFormModel: {},
      roleColumns: [
        {
          name: 'roles',
          label: '角色',
          type: 'checkboxgroup',
          data: [
          ]
        }
      ]
    }
  },
  methods: {
    handleDelete(data) {
      deleteNotice(data).then((res) => {
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
      this.$nextTick(() => {
        this.$refs.dialogForm.resetForm()
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
    saveData() {
      this.$message({
        type: 'success',
        message: '保存成功'
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

</style>

