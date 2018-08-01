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
                :pform-model='formModel'
                :pform-columns='formColumns'>
                  <template slot='meta' slot-scope='{ data, fmodel }'>
                      <el-input type="text" v-model="fmodel.meta.title" placeholder="请输入标题" class='meta' ></el-input>
                      <el-input type="text" v-model="fmodel.meta.icon" placeholder="请输入图标" class='meta'></el-input>
                  </template>
                </my-form>
        </el-dialog>
    </div>
</template>

<script>
import tableList from '../common/components/tableList'
import MyForm from '../common/components/myform'
import { fetchList, createMenu, updateMenu, deleteMenu } from '@/api/menu'
export default {
  components: { tableList, MyForm },
  data() {
    return {
      data: [],
      logo: [],
      dialogTitle: '',
      formColumns: [
        { name: 'route_path', label: '路由路径' },
        {
          name: 'route_name',
          label: '路由名称',
        },
        {
          name: 'component',
          label: '组件名称'
        },
        {
          name: 'redirect',
          label: '跳转路径'
        },
        {
          name: 'meta',
          label: '组件属性'
        },
        {
          name: 'pid',
          label: '父菜单',
          type: 'select',
          data: [
            {value: 0, label: '根目录'}
          ]
        },

      ],
      searchColumns: [
        { name: 'route_name', label: '路由名称' },
        {
          name: 'created_at',
          label: '创建时间',
          type: 'date'
        }
      ],
      formRules: {
        route_path: [
          { required: true, message: '请输入路由路径', trigger: 'blur' }
        ],
        route_name: [
          { required: true, message: '请输入路由名称', trigger: 'blur' }
        ],
        component: [
          { required: true, message: '请输入组件名称', trigger: 'blur' }
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
      formModel: {
        pid: 0,
        meta: {
          title: '',
          icon: ''
        }
      }
    }
  },
  methods: {
    handleDelete(data) {
      deleteMenu({id: data.id}).then((res) => {
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
      console.log(data,'edit')
      this.editDialog = true
      this.dialogTitle = '编辑'
      this.$nextTick(() => {
        
       this.$refs.dialogForm.resetForm()
       console.log(data.meta,data)
       try{
        data.meta = data.meta && JSON.parse(data.meta) || this.formModel.meta
       }catch(e){
        data.meta = this.formModel.meta
       }
       console.log(data,'edit2')
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
        let method = data.id?updateMenu:createMenu
        method(data)
        .then((res)=>{
            this.$message({
                type: 'success',
                message: res.data.data.msg
            })
            this.getList()
        })
        .catch((res)=>{
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
    .meta {
      margin-bottom: 10px;  width: 30%;
    }
</style>

