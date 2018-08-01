<template>
    <el-form  :model="formModel" class="my-form" :rules='rules'  label-width="100px"  :ref="formName">
        <el-form-item :label="myitem.label || myitem.name" v-for='myitem in formColumns' :key='myitem.name' :prop='myitem.name'>
<slot :name='myitem.name' :data='myitem' :fmodel='formModel'>
            <el-input v-model="formModel[myitem.name]" v-if='!myitem.type || myitem.type=="input"' v-bind='myitem.props||{}' :type='myitem.inputType||"text"'></el-input>

            <el-select v-model="formModel[myitem.name]" v-if='myitem.type=="select"'  v-bind='myitem.props||{}'>
                <el-option
                v-for="item in myitem.data"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>

            <el-date-picker
                v-if='myitem.type=="date"'
                v-model="formModel[myitem.name]"
                :type="myitem.datetype||'daterange'"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                start-placeholder='开始日期'
                end-placeholder='结束日期'
                v-bind='myitem.props||{}'>
            </el-date-picker>

            <el-switch
                v-model="formModel[myitem.name]"
                v-if='myitem.type=="switch"'
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value='1'
                :inactive-value='0'
                v-bind='myitem.props||{}'>
            </el-switch>

              <el-radio-group 
              v-model="formModel[myitem.name]"
              v-if='myitem.type=="radiogroup"'
              v-bind='myitem.props||{}'>
                <el-radio 
                    :label="item.value" 
                    v-for="item in myitem.data" 
                    :key='item.value'>{{ item.label }}</el-radio>
            </el-radio-group>

            <el-checkbox-group 
              v-model="formModel[myitem.name]"
              v-if='myitem.type=="checkboxgroup"'
              v-bind='myitem.props||{}'>
                <el-checkbox 
                    :label="item.value" 
                    v-for="item in myitem.data" 
                    :key='item.value'>{{ item.label }}</el-checkbox>
            </el-checkbox-group>

            <el-checkbox 
                v-model="formModel[myitem.name]"
                v-if='myitem.type=="checkbox"'
                v-bind='myitem.props||{}'></el-checkbox>

            <upload-form-column
                v-if='myitem.type=="upload"'
                @upload-success='uploadSuccess'
                @remove-success='removeSuccess'
                :upload-props='myitem.props || {}'>
            </upload-form-column>
</slot>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import uploadFormColumn from './uploadFormColumn'
export default {
  components: { uploadFormColumn },
  data() {
    return {
      formModel: this.pformModel,
      formColumns: this.pformColumns,
      rules: this.formRules
    }
  },
  props: {
    pformColumns: {
      type: Array,
      default() {
        return []
      }
    },
    pformModel: {
      type: Object,
      default() {
        return {}
      }
    },
    formRules: {
      type: Object,
      default() {
        return {}
      }
    },
    formName: {
      type: String,
      default() {
        return 'from1'
      }
    },
    defaultFiles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  provide() {
    return {
      pics: this.defaultFiles
    }
  },
  watch: {
    formRules(newVal) {
      console.log(newVal)
      this.rules = newVal
    },
    pformModel(newVal) {
      console.log(newVal)
      this.formModel = newVal
    },
    pformColumns(newVal) {
      console.log(newVal)
      this.formColumns = newVal
    }
  },
  methods: {
    onSubmit() {
      this.$refs[this.formName].validate((valid) => {
        if (valid) {
          console.log(this.formModel)
          this.$emit('do-form', this.formModel)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.$refs[this.formName].resetFields()
    },
    uploadSuccess(file, props) {
      const fieldName = props.name || 'file'
      this.formModel[fieldName] = file.url
    },
    removeSuccess(file, props) {
      const fieldName = props.name || 'file'
      this.formModel[fieldName] = ''
    },
    setFormModel(data) {
      console.log()
      this.formModel = Object.assign(this.formModel, data)
      console.log(this.formModel, 7777777777)
    },
    getForm() {
      return this.$refs[this.formName]
    },
    setFormRules() {

    }
  },
  created() {
    const items = {}
    this.formColumns.forEach((item) => {
      items[item.name] = ''
    })
    this.formModel = Object.assign(items, this.formModel)
    console.log(this.formModel, 6666666)
  }
}
</script>

<style lang="scss">
 .my-form {
     .el-form-item__label {
        color: #606266
     }
     .el-input {
         width: auto;
     }
 }
</style>

