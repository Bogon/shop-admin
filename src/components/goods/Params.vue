<template>
  <div>

    <!--    面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>

      <!--      提示信息-->
      <el-row>
        <el-alert
                title="注意：只允许为第三级分类设置参数！"
                type="warning"
                show-icon :closable="false">
        </el-alert>

      </el-row>

      <!-- 选择分类-->
      <el-row class="selcet-cate">
        <span>选择商品分类：</span>
        <el-cascader
                v-model="selectCates"
                :options="cateList"
                :props="propCascaderProps"
                @change="parentChange"
                clearable></el-cascader>
      </el-row>

      <el-row>
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="动态参数" name="many">
            <el-button type="primary"
                       size="mini"
                       :disabled="isBtnEnable"
                       @click="addAttrAction">添加参数
            </el-button>
            <!--            表格展示属性-->
            <el-table :data="attributesList" border stripe>
              <el-table-column type="expand">
                <template v-slot:default="scope">
                  <el-tag v-for="(tag, i) in scope.row.attr_vals" :key="tag" closable
                          @close="deleteAttributesOne(scope.row, i)">{{ tag }}
                  </el-tag>
                  <el-input
                          class="input-new-tag"
                          v-if="scope.row.isInputVisible"
                          v-model="scope.row.inputValue"
                          ref="saveTagInput"
                          size="small"
                          @keyup.enter.native="handleInputConfirm(scope.row)"
                          @blur="handleInputConfirm(scope.row)"
                  >
                  </el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column type="index" label="#"></el-table-column>
              <el-table-column label="参数名称" prop="attr_name"></el-table-column>
              <el-table-column label="操作">
                <template v-slot:default="scope">
                  <el-button size="mini"
                             type="primary"
                             icon="el-icon-edit" @click="showEditDialog(scope.row)">修改
                  </el-button>

                  <el-button size="mini"
                             type="danger"
                             icon="el-icon-delete"
                             @click="deleteAttrAction(scope.row)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="静态属性" name="only">
            <el-button type="primary"
                       size="mini"
                       :disabled="isBtnEnable"
                       @click="addAttrAction">添加属性
            </el-button>
            <el-table :data="attributesList" border stripe>
              <el-table-column type="expand">
                <template v-slot:default="scope">
                  <el-tag v-for="(tag, i) in scope.row.attr_vals" :key="tag" closable
                          @close="deleteAttributesOne(scope.row, i)">{{ tag }}
                  </el-tag>
                  <el-input
                          class="input-new-tag"
                          v-if="scope.row.isInputVisible"
                          v-model="scope.row.inputValue"
                          ref="saveTagInput"
                          size="small"
                          @keyup.enter.native="handleInputConfirm(scope.row)"
                          @blur="handleInputConfirm(scope.row)"
                  >
                  </el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column type="index" label="#"></el-table-column>
              <el-table-column label="参数名称" prop="attr_name"></el-table-column>
              <el-table-column label="操作">
                <template v-slot:default="scope">
                  <el-button size="mini"
                             type="primary"
                             icon="el-icon-edit"
                             @click="showEditDialog(scope.row)">修改
                  </el-button>

                  <el-button size="mini"
                             type="danger"
                             icon="el-icon-delete"
                             @click="deleteAttrAction(scope.row)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-row>

      <!--      添加属性对话框-->
      <el-dialog
              :title="'添加' + dialogTitle"
              :visible.sync="editAttrDialogVisible"
              width="50%"
              :before-close="editAttrHandleClose">

        <el-form :model="attrForm"
                 :rules="attrRules"
                 ref="attrRuleFormRef"
                 label-width="100px">
          <el-form-item :label="dialogFormTitle" prop="attr_name">
            <el-input v-model="attrForm.attr_name"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer">
          <el-button @click="editAttrHandleClose">取 消</el-button>
          <el-button type="primary" @click="commitAttrInfo">确 定</el-button>
        </span>
      </el-dialog>

      <!--      修改属性对话框-->
      <el-dialog
              :title="dialogTitle"
              :visible.sync="editAttrDialogVisible"
              width="50%"
              :before-close="editAttrHandleClose">

        <el-form :model="attrForm"
                 :rules="attrRules"
                 ref="attrRuleFormRef"
                 label-width="100px">
          <el-form-item :label="dialogFormTitle" prop="attr_name">
            <el-input v-model="attrForm.attr_name"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer">
          <el-button @click="editAttrHandleClose">取 消</el-button>
          <el-button type="primary" @click="commitAttrInfo">确 定</el-button>
        </span>
      </el-dialog>


    </el-card>

  </div>
</template>

<script>

import {
  getCategories,
  getAttributes,
  editAttributes,
  deleteAttributes,
  updateAttributes,
} from "@/api";

export default {
  name: "Params",

  created() {
    this.getCategoryList()
    this.attrForm.attr_sel = this.activeName
  },

  data() {
    return {
      selectCates: [],
      cateList: [],
      propCascaderProps: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      activeName: 'many',
      attributesList: [],
      editAttrDialogVisible: false,
      attrForm: {
        attr_name: '',
        attr_sel: '',
        attr_vals: ''
      },
      attrRules: {
        attr_name: [
          {required: true, message: '请输入属性名称', trigger: 'blur'},
          {min: 2, max: 20, message: '属性名称输入字符个数范围：2-20', trigger: 'blur'},
        ],
      },
      isAdd: true,
      attr_id: 0,

    }
  },


  methods: {

    // 获取商品分类
    async getCategoryList() {
      const result = await getCategories({})
      console.log(result)
      if (result.meta.status != 200) return this.$message.error(result.meta.msg)
      this.cateList = result.data
    },

    // 选择节点
    parentChange() {
      this.getAttributesInfo()
    },

    //   menu 选择
    handleTabClick() {
      this.getAttributesInfo()
      this.attrForm.attr_sel = this.activeName

    },
    //   获取参数列表
    async getAttributesInfo() {
      if (this.selectCates.length !== 3) {
        this.selectCates = []
        this.attributesList = []
        return
      }
      const result = await getAttributes({cateId: this.selectCates[this.selectCates.length - 1], sel: this.activeName})
      if (result.meta.status != 200) return this.$message.error(result.meta.msg)
      result.data.forEach((item) => {
        item.attr_vals = item.attr_vals.split(' ').filter((s) => {
          return s && s.trim()
        })
        //   控制文本框的显示与隐藏
        item.isInputVisible = false
        item.inputValue = ''
      })
      this.attributesList = result.data
    },

    // 关闭dialaog
    editAttrHandleClose() {
      this.isAdd = true
      this.$refs.attrRuleFormRef.resetFields()
      this.editAttrDialogVisible = false
    },

    //   提交 属性信息
    commitAttrInfo() {
      this.$refs.attrRuleFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('请输入正确的属性名称后重试')
        if (this.isAdd) {
          const result = await editAttributes(this.getCatId(), this.attrForm)
          if (result.meta.status !== 201) return this.$message.error(result.meta.msg)
          this.$message.success(result.meta.msg)
        } else {
          const result = await updateAttributes(this.getCatId(), this.attr_id, this.attrForm)
          if (result.meta.status !== 200) return this.$message.error(result.meta.msg)
          this.$message.success(result.meta.msg)
        }

        await this.getAttributesInfo()
        this.editAttrHandleClose()
      })

    },

    // 添加属性
    addAttrAction() {
      this.editAttrDialogVisible = true
      this.attrForm.attr_name = ''
      this.attrForm.attr_vals = ''
    },

    getCatId() {
      if (this.selectCates.length === 3)
        return this.selectCates[2]
      else return -1
    },

    // 删除属性
    deleteAttrAction(attr) {
      this.$confirm('此操作将永久删除该属性, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const result = await deleteAttributes({cat_id: this.getCatId(), attr_id: attr.attr_id})
        if (result.meta.status != 200) return this.$message.error(result.meta.msg)
        this.$message.success(result.meta.msg)
        await this.getAttributesInfo()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // 展示修改
    showEditDialog(attr) {
      this.isAdd = false
      this.editAttrDialogVisible = true
      this.attr_id = attr.attr_id
      this.attrForm.attr_name = attr.attr_name
      this.attrForm.attr_vals = attr.attr_vals

    },

    handleInputConfirm(attr) {
      if (attr.inputValue.trim().length === 0) {
        attr.inputValue = ''
        attr.isInputVisible = false
        return
      }
      attr.attr_vals.push(attr.inputValue)
      attr.inputValue = ''
      attr.isInputVisible = false
      this.saveAttrs(attr)
    },

    showInput(attr) {
      attr.isInputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    deleteAttributesOne(attr, val) {
      attr.attr_vals.splice(val, 1)
      this.saveAttrs(attr)
    },

    async saveAttrs(attr) {
      const result = await updateAttributes(attr.cat_id, attr.attr_id, {
        attr_name: attr.attr_name,
        attr_sel: attr.attr_sel,
        attr_vals: attr.attr_vals.join(' ')
      })
      if (result.meta.status !== 200) return this.$message.error(result.meta.msg)
      this.$message.success(result.meta.msg)
    }

  },
  computed: {
    isBtnEnable() {
      if (this.selectCates.length != 3) {
        return true
      }
      return false
    },
    dialogTitle() {
      const title = this.isAdd ? '添加' : '修改'
      if (this.activeName === 'only') return title + '属性'
      else return title + '参数'
    },
    dialogFormTitle() {
      if (this.activeName === 'only') return '属性名称'
      else return '参数名称'
    },

  }
}
</script>

<style lang="less" scoped>

.selcet-cate {
  margin-top: 15px;
  color: #666;
  font-size: 15px;
}

.el-tag {
  margin-left: 15px;
  margin-bottom: 15px;
}

.input-new-tag {
  width: 120px;
  margin-left: 15px;
}

.button-new-tag {
  margin-left: 15px;
}

</style>