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
             <template slot='route_name' slot-scope='{ data, fmodel }'>
                <el-select 
                v-model="fmodel[data.name]" 
                v-if='data.type=="select"' 
                @change='selectChange($event,data.data)' 
                v-bind='data.props||{}'>
                    <el-option
                    v-for="item in data.data"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </template>
                </my-form>
        </el-dialog>
    </div>
</template>

<script>
import tableList from '../common/components/tableList'
import MyForm from '../common/components/myform'
import { fetchList, createMenu, updateMenu, deleteMenu, fetchAllMenu, fetchMenu } from '@/api/menu'
import { getPermissiones } from '@/api/permission'
export default {
  components: { tableList, MyForm },
  data() {
    return {
      data: [],
      logo: [],
      dialogTitle: '',
      formColumns: [
        { name: 'name', label: '菜单名' },
        {
          name: 'route_name',
          label: '路由名称',
          type: 'select',
          selectChange: this.selectChange,
          props: {
            filterable: true,
            remote: true,
            remoteMethod: this.remoteRoute,
            placeholder: '请输入路由名称',
            style: { width: '500px'},
          },
          data: [

          ]
        },
        { name: 'route_path', label: '路由路径' },
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
        // {
        //   name: 'pid',
        //   label: '父菜单',
        //   type: 'select',
        //   props: {
        //     filterable: true,
        //     remote: true,
        //     remoteMethod: this.remoteMethod,
        //     style: { width: '500px'},
        //   },
        //   data: [
        //     {value: 0, label: '根目录'}
        //   ]
        // },
        {
          name: 'pid',
          label: '父菜单',
          type: 'tree',
          ref: 'tree1',
          props: {
          },
          data: [{
          label: '一级 1',
          id: 1,
          children: [{
            label: '二级 1-1',
            id: 2,
            children: [{
              label: '三级 1-1-1',
              id: 3,
            }]
          }]
        }, {
          label: '一级 2',
          id: 4,
          children: [{
            label: '二级 2-1',
            id: 5,
            children: [{
              label: '三级 2-1-1',
              id: 6,
            }]
          }, {
            label: '二级 2-2',
            id: 7,
            children: [{
              label: '三级 2-2-1',
              id: 8,
            }]
          }]
        }, {
          label: '一级 3',
          id: 9,
          children: [{
            label: '二级 3-1',
            id: 10,
            children: [{
              label: '三级 3-1-1',
              id: 11,
            }]
          }, {
            label: '二级 3-2',
id: 12,
            children: [{
              label: '三级 3-2-1',
              id: 13,
            }]
          }]
        }]
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
        },
        component: 'layout/Layout'
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
       try{
        data.meta = data.meta && JSON.parse(data.meta) || this.formModel.meta
       }catch(e){
        data.meta = data.meta
       }

       this.$refs.dialogForm.setFormModel(data)
              console.log( this.$refs.dialogForm.$refs,4444444444)
       this.$refs.dialogForm.$refs.tree1[0].setCheckedKeys([4])
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
      fetchAllMenu().then((res) => {
        console.log(res)
      })
      this.$nextTick(() => {
        console.log(this.$refs)
      })
    },
    remoteMethod() {
      let columns = this.formColumns
      columns.map((item)=> {
        if(item.name=='pid') {
          item.data = [
            {value: 0, label: '根目录'},
            {value: 1, label: '权限'},
            {value: 2, label: 'abc'},
          ]
          return item
        }
      })
      this.formColumns = columns
    },
    remoteRoute(query) {
      getPermissiones(query, {}).then((res)=> {
        console.log(res)
        let columns = this.formColumns
        columns.map((item)=> {
          if(item.name=='route_name') {
            item.data = res.data.data
            return item
          }
        })
        this.formColumns = columns
      }).catch((res) => {
        console.log(res)
      })
    },
    selectChange(val, data) {
      for(let key in data) {
        if(data[key].value==val) {
          this.$set(this.formModel, 'route_path', data[key].route_path)
          this.$set(this.formModel, 'route_name', val)
          console.log(this.formModel)
          break
        }
      } 
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

