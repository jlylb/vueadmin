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
                :pfrom-model='formModel'
                :pform-columns='formColumns'></my-form>
        </el-dialog>
    </div>
</template>

<script>
import tableList from '../common/components/tableList'
import MyForm from '../common/components/myform'
import { fetchList, createCompany, updateCompany, deleteCompany } from '@/api/company'
export default {
  components: { tableList, MyForm },
  data() {
    return {
      data: [],
      logo: [],
      dialogTitle: '',
      formColumns: [
        { name: 'name', label: '公司名' },
        {
          name: 'logo',
          label: '上传LOGO',
          type: 'upload',
          props: {
            action: '/api/upload/create',
            limit: 1
          }

        }
      ],
      searchColumns: [
        { name: 'name', label: '公司名', props: { clearable: true }},
        {
          name: 'created_at',
          label: '时间',
          type: 'date'
        }
      ],
      formRules: {
        name: [
          { required: true, message: '请输入公司名', trigger: 'blur' }
        ]
      },
      columns: {
      },
      total: 0,
      search: {
        page: 1,
        pageSize: 10
      },
      formModel: {},
      editDialog: false
    }
  },
  methods: {
    handleDelete(data) {
      deleteCompany(data).then((res) => {
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
        this.formModel = {}
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
      const method = data.id ? updateCompany : createCompany
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

