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
            @click="handleRoleAbility(data)">授权</el-button>
        </template>
        </table-list>
        <el-dialog title="编辑" :visible.sync="editDialog" @open='dialogOpen'>
            <my-form
                class="my-form"
                ref='dialogForm'
                @do-form='saveData'
                :form-rules='formRules'
                :default-files='logo'
                :form-columns='formColumns'></my-form>
        </el-dialog>
        <el-dialog title="角色授权" :visible.sync="roleDialog" @open='roleDialogOpen'>
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
import { fetchList, fetchRoleAlibity } from '@/api/roles'
export default {
  components: { tableList, MyForm },
  data() {
    return {
      data: [],
      logo: [],
      formColumns: [
        { name: 'name', label: '用户名' },
        {
          name: 'status',
          label: '消息等级',
          type: 'select',
          data: [
            { value: 1, label: '一般' },
            { value: 2, label: '警告' },
            { value: 3, label: '严重' },
            { value: 4, label: '紧急' },
            { value: 5, label: '加急' }
          ],
          props: {
            clearable: true,
            placeholder: '请选择'
          }
        },
        {
          name: 'created_at',
          label: '发送时间',
          type: 'date'
        },
        {
          name: 'logo',
          label: '上传LOGO',
          type: 'upload',
          props: {
            action: '/upload/create'
          }

        }
      ],
      searchColumns: [
        { name: 'name', label: '用户名' },
        {
          name: 'status',
          label: '消息等级',
          type: 'select',
          data: [
            { value: 1, label: '一般' },
            { value: 2, label: '警告' },
            { value: 3, label: '严重' },
            { value: 4, label: '紧急' },
            { value: 5, label: '加急' }
          ],
          props: {
            clearable: true,
            placeholder: '请选择'
          }
        },
        {
          name: 'created_at',
          label: '发送时间',
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
        action: {
          'min-width': '150'
        }
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
    handleRoleAbility(data) {
      // this.roleDialog = true
      // fetchRoleAlibity( data.id ).then((res) => {

      // }).catch((res) => {
      //     console.log(res)
      // })
      console.log(data)
      this.$router.push({ name: 'permission_role_ability', params: { role: data.name }})
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

