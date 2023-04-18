<template>
  <div>

    <!--    面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!--    内容-->
    <el-card>

      <el-row>
        <el-button type="primary" @click="showAddCategoryDialog">添加分类</el-button>
      </el-row>

      <el-row>
        <!--      展示分类表格-->
        <tree-table
                :data="categoryList"
                :columns="columns"
                :selection-type="false"
                :show-index="true"
                index-text="#"
                :expand-type="false"
                :stripe="true"
                border
                :show-row-hover="false">
          <template v-slot:isOk="scope">
            <el-icon class='el-icon-success'
                     v-if="scope.row.cat_deleted === false"
                     style="color: lightgreen"></el-icon>
            <el-icon class='el-icon-error'
                     v-else style="color: red"></el-icon>
          </template>

          <template v-slot:order="scope">
            <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
            <el-tag v-else-if="scope.row.cat_level === 1" type="success">二级</el-tag>
            <el-tag v-else type="warning">三级</el-tag>
          </template>

          <template v-slot:operator="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="showCategory(scope.row)">编辑
            </el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteCategoryAction(scope.row.cat_id)">
              删除
            </el-button>
          </template>

        </tree-table>
      </el-row>

      <el-row>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="categoryInfo.pagenum"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="categoryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
      </el-row>

      <!-- 添加分类对话框 -->
      <el-dialog
              title="添加分类"
              :visible.sync="addCategoryDialogVisible"
              width="50%"
              :before-close="addCategoryDialogClose">

        <el-form ref="addCategoryRef"
                 :model="addCategoryForm"
                 label-width="100px"
                 :rules="addCategoryRules">
          <el-form-item label="分类名称:" prop="cat_name">
            <el-input v-model="addCategoryForm.cat_name"></el-input>
          </el-form-item>

          <el-form-item label="父级分类:">
            <el-cascader
                    v-model="selectCates"
                    :options="parentCateList"
                    :props="propcascaderProps"
                    @change="parentChange"
                    clearable
                    change-on-select></el-cascader>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="addCategoryDialogClose">取 消</el-button>
          <el-button type="primary" @click="addCategoryAction">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改分类对话框 -->
      <el-dialog
              title="修改分类"
              :visible.sync="editCategoryDialogVisible"
              width="50%"
              :before-close="editCategoryDialogClose">

        <el-form ref="editCategoryRef"
                 :model="editCategoryForm"
                 label-width="100px"
                 :rules="editCategoryRules">
          <el-form-item label="分类名称:" prop="cat_name">
            <el-input v-model="editCategoryForm.cat_name"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="editCategoryDialogClose">取 消</el-button>
          <el-button type="primary" @click="commitCategory">确 定</el-button>
        </span>
      </el-dialog>

    </el-card>

  </div>
</template>

<script>
import {
  getCategories,
  deleteCategory,
  addCategory,
  editCategory,
} from '@/api'

export default {

  name: "Categories",

  created() {
    this.getCategoryList()
  },

  data() {
    return {
      categoryInfo: {
        type: '',
        pagenum: 1,
        pagesize: 10
      },
      categoryList: [],
      total: 0,
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name',
        },
        {
          label: '是否有效',
          prop: 'cat_deleted',
          type: 'template',
          template: 'isOk',
        },
        {
          label: '排序',
          prop: 'cat_pid',
          type: 'template',
          template: 'order',
        },
        {
          label: '操作',
          prop: 'cat_deleted',
          type: 'template',
          template: 'operator',
        },
      ],
      addCategoryDialogVisible: false,
      addCategoryForm: {
        cat_name: '',
        cat_level: 0,
        cat_pid: 0,
      },
      addCategoryRules: {
        cat_name: [
          {required: true, message: '请输入分类名称', trigger: 'blur'},
          {min: 3, max: 20, message: '至少3个字符，至多20个字符', trigger: 'blur'}
        ],
      },
      cateListparentCateList: [],
      propcascaderProps: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      selectCates: [],
      editCategoryDialogVisible: false,
      editCategoryForm: {
        cat_name: '',
        cat_id: 0,
      },
      editCategoryRules: {
        cat_name: [
          {required: true, message: '请输入分类名称', trigger: 'blur'},
          {min: 3, max: 20, message: '至少3个字符，至多20个字符', trigger: 'blur'}
        ],
      },
    }
  },

  methods: {

    // 获取商品分类列表
    async getCategoryList() {
      const result = await getCategories(this.categoryInfo)
      console.log(result)
      if (result.meta.status != 200) return this.$message.error(result.meta.msg)
      this.categoryList = result.data.result
      this.total = result.data.total
    },

    handleSizeChange(newSize) {
      this.categoryInfo.pagesize = newSize
      this.getCategoryList()
    },

    handleCurrentChange(newPage) {
      this.categoryInfo.pagenum = newPage
      this.getCategoryList()
    },

    // 删除分类
    deleteCategoryAction(cat_id) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const result = await deleteCategory(cat_id)
        if (result.meta.status != 200) return this.$message.error(result.meta.msg)
        this.$message.success(result.meta.msg)
        await this.getCategoryList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },

    // 展示添加对话框
    showAddCategoryDialog() {
      this.getParentCateList()
      this.addCategoryDialogVisible = true
    },

    // 添加分类
    addCategoryAction() {
      this.$refs.addCategoryRef.validate(async (valid) => {
        if (!valid) {
          return this.$message.error('填写数据有误，请检查无误后重试')
        }
        const result = await addCategory(this.addCategoryForm)
        console.log(result)

        if (result.meta.status != 201) return this.$message.error(result.meta.msg)
        this.$message.success(result.meta.msg)
        await this.getCategoryList()
        this.addCategoryDialogClose()
      })
    },

    //   关闭categoryDialog
    addCategoryDialogClose() {
      this.$refs.addCategoryRef.resetFields()
      this.selectCates = []
      this.parentCateList = []
      this.addCategoryDialogVisible = false
    },

    // 获取父级分类
    async getParentCateList() {
      const result = await getCategories({type: 2})
      if (result.meta.status != 200) return this.$message.error(result.meta.msg)
      this.parentCateList = result.data
    },

    parentChange() {
      console.log(this.selectCates)
      if (this.selectCates.length > 0) {
        this.addCategoryForm.cat_pid = this.selectCates[this.selectCates.length - 1]
        this.addCategoryForm.cat_level = this.selectCates.length
      } else {
        this.addCategoryForm.cat_pid = 0
        this.addCategoryForm.cat_level = 0

      }
    },

    // 修改分类
    showCategory(cate) {
      this.editCategoryForm.cat_id = cate.cat_id
      this.editCategoryForm.cat_name = cate.cat_name
      this.editCategoryDialogVisible = true
    },

    //   关闭categoryDialog
    editCategoryDialogClose() {
      this.$refs.editCategoryRef.resetFields()
      this.editCategoryForm.cat_name = ''
      this.editCategoryForm.cat_id = 0
      this.editCategoryDialogVisible = false
    },

    // 提交修改分类信息
    commitCategory() {
      this.$refs.editCategoryRef.validate(async (valid) => {
        if (!valid) {
          return this.$message.error('填写数据有误，请检查无误后重试')
        }
        const result = await editCategory(this.editCategoryForm.cat_id, this.editCategoryForm.cat_name)
        if (result.meta.status != 200) return this.$message.error(result.meta.msg)
        this.$message.success(result.meta.msg)
        await this.getCategoryList()
        this.editCategoryDialogClose()
      })
    },

  },
}
</script>

<style lang="less" scoped>
.zk-table {
  margin-top: 15px;
}

.el-cascader {
  width: 100%;
}
</style>