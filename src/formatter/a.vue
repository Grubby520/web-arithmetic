<template>
  <div class="add-model-div" :class="addmodelwidth">
    <h2>新增数据模型</h2>
    <el-card class="add-model-el-card">
      <div class="edit-data" ref="addModelDiv" v-show="!addResult && !customFieldsVisible">
        <el-form
          @submit.native.prevent
          ref="datamodelform"
          label-position="right"
          size="mini"
          :model="editModel"
          class="basic-info-form model-mananger-el-form-label model-mananger-el-form-label-text-align model-el-form-label"
        >
          <el-row class="row">
            <el-col :span="12">
              <el-form-item
                class="data-name"
                label="逻辑模型名称："
                prop="name"
                label-width="108px"
                :rules="{ required: true, message: '数据源名称不能为空', trigger: 'blur' }"
              >
                <el-input class="database-input" v-model.trim="editModel.name" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="data-des" label="逻辑模型描述：" prop="description">
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="请输入"
                  class="database-textarea"
                  v-model="editModel.description"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="12">
              <el-form-item
                class="subjectTree"
                label="所属主题："
                prop="subjectId"
                label-width="108px"
                :rules="{ required: true, message: '所属主题不能为空', trigger: 'change' }"
              >
                <!-- :disable-branch-nodes="true" 是否可以点击根节点 -->
                <tree-select
                  placeholder="请输入关键字检索或选择模型"
                  :searchable="true"
                  :clearable="false"
                  :default-expand-level="1"
                  :options="subjectTree"
                  v-model="editModel.subjectId"
                  @input="handleTreeSelectInput"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <setModelFields ref="setModelFields1" v-show="active === 0" :selected-model="editModel" />
        <setSourceTable ref="setSourceTable1" v-show="active === 1" :selected-model="editModel" />
        <setFieldMapping
          ref="setFieldMapping1"
          v-show="active === 2"
          :selected-model="editModel"
          :soruce-tables="soruceTables"
        />
      </div>
      <div ref="footerDiv" class="add-model-footer">
        <span slot="footer" class="dialog-footer">
          <el-button v-show="active === 0" class="cancle-btn" @click="addModelCancel">取 消</el-button>
          <el-button v-show="active > 0" @click="lastStep" class="back-btn">上一步</el-button>
          <el-button
            v-show="active === 2"
            class="next-btn"
            @click="createModel"
            :loading="modelLoading"
          >确 定</el-button>
          <el-button v-show="active === 0 || active === 1" class="next-btn" @click="nextStep">下一步</el-button>
          <!-- :disabled="active == 1 && editModel.fields.length <= 0" -->
        </span>
      </div>
      <div class="step">
        <el-steps :active="active" direction="vertical" finish-status="success">
          <el-step title="模型表字段定义" />
          <el-step title="选择业务数据源表" />
          <el-step class="last-step" title="字段映射" />
        </el-steps>
      </div>

      <addModelResult
        ref="addModelResult1"
        v-if="addResult && !customFieldsVisible"
        :model-name="editModel.name"
        @dialog-callback="canAddCustomFields"
      />
      <addCustomFields
        ref="addCustomFields1"
        v-if="customFieldsVisible"
        :model="editModel"
        @dialog-callback="addCustomFieldsCallback"
      />
    </el-card>
  </div>
</template>

<script>
import api from '../../../../api'
import setModelFields from './setModelFields'
import setSourceTable from './setSourceTable'
import setFieldMapping from './setFieldMapping'
import addModelResult from './addModelResult'
import addCustomFields from './addCustomFields'
// 使用vuetreeselect
import treeSelect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: { treeSelect, setModelFields, setSourceTable, setFieldMapping, addModelResult, addCustomFields },
  props: {
    visibility: Boolean,
    dataCategory: Object
  },
  data() {
    return {
      subjectTree: [],
      title: '新增数据模型',
      active: 0,
      dialogVisible: false,
      editModel: {
        dataSourceId: 0,
        description: '',
        directoryId: this.dataCategory.id,
        fields: [],
        joins: [],
        name: '',
        subjectName: '',
        subjectId: ''
      },
      soruceTables: [],
      modelLoading: false,
      addResult: false,
      customFieldsVisible: false,
      addmodelwidth: 'add-model-width-1280',
      firstStepOffsetLeft: 0
    }
  },
  watch: {
    dataCategory: {
      handler: function(val, oldVal) {
        if (this.editModel) this.editModel.directoryId = val.id
      },
      immediate: true
    },
    visibility: {
      handler: function(val, oldVal) {
        this.initialize(val)
        if (val) {
          this.$nextTick(() => {
            this.firstStepOffsetLeft = this.$refs.datamodelform.$el.offsetLeft - this.$refs.datamodelform.$el.parentNode.offsetLeft
            this.$refs.footerDiv.style = 'margin-left:' + this.firstStepOffsetLeft + 'px !important;'
          })
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.addmodelwidth =
      window.screen.width < 1440 ? 'add-model-width-1280' : window.screen.width > 1900 ? 'add-model-width-1920' : 'add-model-width-1440'
    // 获取主题树
    api.categoryApi.findSubjectTreeData().then((res) => {
      this.subjectTree = res.data
    })
  },
  methods: {
    handleTreeSelectInput(value) {
      if (value) {
        this.$refs.datamodelform.validateField('subjectId')
      }
    },
    createModel() {
      let that = this
      this.$refs.setFieldMapping1.setMapping()
      let hasNotMapping = false
      for (let i = 0; i < this.editModel.fields.length; i++) {
        const field = this.editModel.fields[i]
        field.idx = i // 默认必须 idx 排序？
        if (
          (field.mappingType === 'field' && !field.mappingFieldId) ||
          (field.mappingType === 'calculated' && (!field.calculated || !field.calculated.formula))
        ) {
          hasNotMapping = true
          break
        }
      }
      if (hasNotMapping) {
        this.$message({ message: '有字段未选择映射或未配置计算字段，请设置后再保存!', type: 'error' })
        return
      }
      this.modelLoading = true
      const apiFn = this.editModel.id ? 'update' : 'add'
      api.datamodelApi[apiFn](this.editModel)
        .then((res) => {
          that.modelLoading = false
          if (res.code == 0) {
            that.$message({ message: '保存成功', type: 'success' })
            that.$emit('dialog-callback', 1)
          } else {
            that.$message({ message: '保存失败', type: 'error' })
          }
        })
        .catch(() => {
          that.modelLoading = false
        })
    },
    lastStep() {
      if (this.active > 0) this.active = this.active - 1
      if (this.active === 0) {
        this.$refs.footerDiv.style = 'margin-left:' + this.firstStepOffsetLeft + 'px !important;'
      }
    },
    nextStep() {
      if (this.active == 0) {
        this.$refs['datamodelform'].validate((valid) => {
          if (valid) {
            this.$refs.footerDiv.style = ''
            // fix#991 让已经填写的数据不被清空(暴力处理,不动原逻辑)
            const prevFields = JSON.parse(JSON.stringify(this.editModel.fields))
            const nextFields = JSON.parse(JSON.stringify(this.$refs.setModelFields1.getAllFields()))
            nextFields.forEach((field) => {
              const prev = prevFields.find((item) => item.name === field.name)
              if (prev) {
                // 处理 mappingFieldId, fieldType
                field.mappingFieldId = prev.mappingFieldId
                field.fieldType = prev.fieldType
              }
            })
            this.editModel.fields = nextFields
            if (!this.editModel.fields || this.editModel.fields.length < 1) {
              this.$message({ message: '至少需要一个字段！', type: 'warning' })
              return
            }
            let names = {}
            for (let i in this.editModel.fields) {
              if (
                this.editModel.fields[i].dataType === 'Number' ||
                this.editModel.fields[i].dataType === 'Integer' ||
                this.editModel.fields[i].dataType === 'BigNumber'
              ) {
                this.editModel.fields[i].fieldType = 'Measure'
              }
              if (!names[this.editModel.fields[i].name]) {
                names[this.editModel.fields[i].name] = true
              } else {
                this.$message({ message: '字段名字不能重复！', type: 'warning' })
                return
              }
            }
            // if (this.editModel.joins.length === 0) this.$refs.setSourceTable1.clear()//不知道注释后是否会引起其他bug
            this.$nextTick(() => {
              this.$refs.setSourceTable1.setContainerSize()
            })
            this.active = 1
          } else {
            this.$message({ message: '请按照要求填完整信息！', type: 'warning' })
            return false
          }
        })
      } else if (this.active == 1) {
        this.soruceTables = this.$refs.setSourceTable1.getAllTables()
        if (!this.soruceTables || this.soruceTables.length < 1) {
          this.$message({ message: '至少需要选择一个源表！', type: 'warning' })
          return
        }
        this.$refs.setSourceTable1.setJionFields()
        // this.$refs.setFieldMapping1.reSetFields()
        this.active = 2
      }
      console.log(this.editModel)
    },
    addModelCancel() {
      this.$refs.setModelFields1.nameIndex = 0
      this.dialogVisible = false
      this.$emit('dialog-callback', 0)
    },
    canAddCustomFields(type) {
      if (type === 1) {
        this.addModelResult = false
        this.customFieldsVisible = true
      }
      if (type === 0) {
        this.addModelResult = false
        this.customFieldsVisible = false
        this.$emit('dialog-callback', 1)
      }
    },
    addCustomFieldsCallback() {
      this.addModelResult = false
      this.customFieldsVisible = false
      this.$emit('dialog-callback', 1)
    },
    initialize(val) {
      this.dialogVisible = val
      this.active = 0
      if (val) {
        this.$refs.addModelDiv.style.display = 'block'
        if (this.$refs.addModelResult1 && this.$refs.addModelResult1.$el) this.$refs.addModelResult1.$el.style.display = 'none'
        if (this.$refs.addCustomFields1 && this.$refs.addCustomFields1.$el) this.$refs.addCustomFields1.$el.style.display = 'none'
        this.editModel = {
          dataSourceId: 0,
          description: '',
          directoryId: this.dataCategory.id,
          fields: [],
          joins: [],
          name: ''
        }
        if (this.$refs.setSourceTable1) this.$refs.setSourceTable1.clear()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.subjectTree {
  /deep/ .vue-treeselect__control {
    height: 32px;
    width: 300px;
  }
  /deep/ .vue-treeselect__menu-container {
    width: 300px;
  }
}
.database-textarea {
  & /deep/ .el-textarea__inner {
    height: 32px !important;
  }
}
.data-name {
  width: 100%;
  .el-input {
    width: 50%;
  }
}
.data-des {
  width: 100%;
  .el-textarea {
    width: calc(100% - 84px);
  }
}
.back-btn {
  width: 88px;
  height: 32px;
  background: #fbfbfb;
  box-shadow: 0px 3px 6px -3px rgba(0, 0, 0, 0.16);
  border: 1px solid #c5c6c6;
  &:hover {
    width: 88px;
    height: 32px;
    background: #fbfbfb;
    box-shadow: 0px 3px 6px -3px rgba(0, 0, 0, 0.16);
    border: 1px solid #4a61cc;
    color: #4a61cc;
  }
  &:focus {
    color: #4a61cc;
  }
}
.add-model-div {
  height: 56px;
  padding-top: 24px;
  margin-bottom: 8px;
  .dialog-footer {
    float: right;
  }
}
.model-mananger-next-footer-a {
  margin-left: 75px;
}

.next-btn {
  width: 88px;
  height: 32px;
  background: #273cc0;
  box-shadow: 0px 3px 6px -3px #172799;
  border-color: #273cc0;
  border: none;
  color: #fbfbfb;
  &:hover {
    background: #4a61cc;
    box-shadow: 0px 3px 6px -3px #172799;
    border: none;
    color: #fbfbfb;
  }
}

.cancle-btn {
  width: 88px;
  height: 32px;
  background: #fbfbfb;
  box-shadow: 0px 3px 6px -3px rgba(0, 0, 0, 0.16);
  border: 1px solid #c5c6c6;
  &:hover {
    background: #fbfbfb;
    box-shadow: 0px 3px 6px -3px rgba(0, 0, 0, 0.16);
    border: 1px solid #4a61cc;
    color: #4a61cc;
  }
}

button[disabled] {
  color: white !important;
  background: #cbd6f2 !important;
  box-shadow: none;
}
button[disabled]:hover {
  box-shadow: none;
}
.add-model-el-card {
  height: 93%;
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  .edit-data {
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  & /deep/ .el-card__body {
    display: flex;
    flex-direction: column;
    width: 60% !important;
  }
}
.add-model-div {
  height: 100%;
}
.add-model-width-1920 {
  // min-width: 1639px;
  width: 100%;
  // min-height: 716px;
  height: 100%;
}
.add-model-width-1440 {
  min-width: 1160px;
  min-height: 616px;
}
.add-model-width-1280 {
  min-width: 1000px;
  min-height: 551px;
}
.basic-info-form {
  height: 124px;
  padding-top: 8px;
  margin-bottom: 24px;
  // display: flex;
  // justify-content: space-between;
  border-bottom: 1px solid #ddd;
  .row {
    width: 100%;
    margin-bottom: 16px;
  }
  & /deep/ .el-form-item__label {
    padding: 0;
  }
}
// .model-el-form-label /deep/ .el-form-item /deep/ .el-form-item__label {
//   padding-bottom: 0px;
// }

// 表单标签
.el-form--label-top /deep/ .el-form-item__label {
  // height: 20px;
  // font-size: 14px;
  // font-family: 'PingFangSC-Regular, PingFang SC';
  // font-weight: bold;
  // color: #3c3c3f;
  // line-height: 20px;
}
// .el-form-item--mini /deep/ .el-form-item__content,
// .el-form-item--mini /deep/ .el-form-item__label {
//   margin-bottom: 8px;
// }
.el-form--label-top /deep/ .el-form-item__label::before {
  margin-left: -12px;
}

.step {
  position: absolute;
  height: 370px;
  width: 140px;
  right: 0;
  top: 40%;
  transform: translate(-70%, -50%);
  .el-step.is-vertical {
    position: relative;
  }
  .el-step.is-vertical .el-step__line {
    width: 1px;
  }
  & /deep/ .el-step__main {
    position: absolute !important;
    top: 24px;
    left: -10px;
  }
  & /deep/ .el-step.is-vertical .el-step__title {
    padding-top: 2px;
    background: #fff;
  }
  & /deep/ .el-step.is-vertical .el-step__line {
    bottom: 8px;
  }
  // & /deep/ .el-step.is-horizontal {
  //   position: relative;
  //   padding: 0 8px 0 0;
  // }
  // & /deep/ .el-step__main {
  //   position: absolute;
  //   top: -6px;
  //   left: 24px;
  //   padding: 0 8px;
  //   background: #fff;
  // }
  // .last-step {
  //   flex-basis: 105px !important;
  // }
}
</style>
