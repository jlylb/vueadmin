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
        </table-list>
        <el-dialog :title="dialogTitle" :visible.sync="editDialog" @open='dialogOpen'>
            <my-form
                class="permission-form"
                ref='dialogForm'
                @do-form='saveData'
                :form-rules='formRules'
                :default-files='logo'
                :pform-columns='formColumns'></my-form>
        </el-dialog>
    </div>
</template>

<script>
import tableList from '../common/components/tableList'
import MyForm from '../common/components/myform'
import { fetchList, createPermission, updatePermission, deletePermission } from '@/api/permission'
export default {
  components: { tableList, MyForm },
  data() {
    return {
      data: [],
      logo: [],
      dialogTitle: '',
      formColumns: [
        { name: 'name', label: '权限名称' },
        {
          name: 'title',
          label: '权限描述'
        }
        // {
        //   name: 'entity_type',
        //   label: '模型'
        // },
        // {
        //   name: 'only_owned',
        //   label: '属于自己',
        //   type: 'checkbox'
        // },
        // {
        //   name: 'scope',
        //   label: '域名称'
        // }
      ],
      searchColumns: [
        { name: 'name', label: '权限名', props: { clearable: true }},
        {
          name: 'created_at',
          label: '时间',
          type: 'date'
        }
      ],
      formRules: {
        name: [
          { required: true, message: '请输入权限名', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入权限描述', trigger: 'blur' }
        ]
      },
      columns: {
      },
      total: 0,
      search: {
        page: 1,
        pageSize: 10
      },
      editDialog: false
    }
  },
  methods: {
    handleDelete(data) {
      deletePermission(data).then((res) => {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.getList()
      }).catch((err) => {
        console.log(err)
      })
    },
    handleAdd() {
      this.editDialog = true
      this.dialogTitle = '添加'
      this.$nextTick(() => {
        this.$refs.dialogForm.resetForm()
      })
    },
    handleEdit(data) {
      console.log(data)
      this.editDialog = true
      this.dialogTitle = '编辑'
      this.$nextTick(() => {
        this.$refs.dialogForm.resetForm()
        this.$refs.dialogForm.setFormModel(data)
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
      this.editDialog = false
      const method = data.id ? updatePermission : createPermission
      method(data)
        .then((res) => {
          this.$message({
            type: 'success',
            message: res.data.msg
          })
          this.getList()
        })
        .catch((res) => {
        })
    },
    dialogOpen(val) {
      this.$nextTick(() => {
        console.log(this.$refs)
      })
    }
  },
  created() {
    this.getList()
  }
}
</script>
<style lang="scss" >
   .table-layout .permission-form .el-input{
        width: 50%;
    }
</style>

