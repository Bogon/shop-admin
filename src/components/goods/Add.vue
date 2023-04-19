<template>
  <div>

    <!--    面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>

      <el-alert
              title="添加商品信息"
              type="info"
              center
              show-icon closable>
      </el-alert>

      <!--      进度条区域-->
      <el-steps :space="200" :active="activeIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <el-form :model="addForm"
               :rules="addRules"
               ref="addRuleFormRef"
               label-width="120px"
               label-position="top">
        <el-tabs tab-position="left"
                 v-model="activeIndex"
                 :before-leave="beforeTabLeave" @tab-click="tabClicked">
          <el-tab-pane label="基本信息" name="0">

            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>

            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price"></el-input>
            </el-form-item>

            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number"></el-input>
            </el-form-item>

            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight	"></el-input>
            </el-form-item>

            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                      v-model="addForm.goods_cat"
                      :options="categories"
                      :props="cateProps"
                      @change="handleChange" clearable></el-cascader>

            </el-form-item>

          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">

            <el-form-item v-for="(item) in manyTabData" :label="item.attr_name" :key="item.attr_id">
              <el-checkbox-group v-model="item.attr_vals" size="small">
                <el-checkbox v-for="(attr, i) in item.attr_vals" :key="i" :label="attr" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>

          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item v-for="(item) in onlyTabData" :label="item.attr_name" :key="item.attr_id">
             <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>

          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
                    :action="uploadURL"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    list-type="picture"
                    :headers="headerObj"
                    :on-success="uploadSuccess">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor v-model="addForm.goods_introduce" ></quill-editor>
            <el-button type="primary" class="add-goods-btn" @click="add">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>

    </el-card>

    <el-dialog
            title="图片预览"
            :visible.sync="previewDialogVisible"
            width="50%"
            :before-close="previewHandleClose">
        <img :src="priviewPath" class="preview-img">
    </el-dialog>

  </div>
</template>

<script>
import {
  getCategories,
  getAttributes,
  addGoods,
} from "@/api";

import _ from 'lodash'

export default {
  name: "Add",

  created() {
    this.getCategories()
  },

  data() {
    return {
      activeIndex: '0',
      addForm: {
        goods_name: '',
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_cat: [],
        pics:[],
        goods_introduce:'',
        attrs: [],
      },
      addRules: {
        goods_name: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
          {min: 2, max: 20, message: '商品名称字数要求：3-20个字符', trigger: 'blur'},
        ],
        goods_price: [
          {required: true, message: '请输入商品价格', trigger: 'blur'},
          // { type: 'number', message: '价格必须为数字值'}
        ],
        goods_number: [
          {required: true, message: '请输入商品数量', trigger: 'blur'},
          // { type: 'number', message: '商品数量必须为数字值'}

        ],
        goods_weight: [
          {required: true, message: '请输入商品重量', trigger: 'blur'},
          // { type: 'number', message: '商品重量必须为数字值'}
        ],
        goods_cat: [
          {required: true, message: '请选择商品分类', trigger: 'blur'},

        ],
      },
      categories: [],
      cateProps: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children',
        expandTrigger: 'hover'
      },
      manyTabData: [],
      onlyTabData: [],
      uploadURL: "http://127.0.0.1:8888/api/private/v1/upload",
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      priviewPath: '',
      previewDialogVisible: false,

    }
  },

  methods: {
    // 获取商品分类
    async getCategories() {
      const result = await getCategories()
      if (result.meta.status != 200) return this.$message.error(result.meta.msg)
      this.categories = result.data
    },

    handleChange() {
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = []
      }
    },

    beforeTabLeave(newTab, oldTab) {
      if (oldTab === '0' && this.addForm.goods_cat.length !== 3) {
        this.$message.error('请先选择商品分类')
        return false
      } else {
        return true
      }
    },

    async tabClicked() {
      if (this.activeIndex === '1') {
        const result = await getAttributes({
          cateId: this.cateId,
          sel: 'many'
        });
        if (result.meta.status !== 200) {
          this.$message.error(result.meta.msg)
          return
        }
        result.data.forEach((item) => {
          item.attr_vals = item.attr_vals.split(' ').filter((s) => {
            return s && s.trim()
          })
        })
        this.manyTabData = result.data
      } else if (this.activeIndex === '2') {
        const result = await getAttributes({
          cateId: this.cateId,
          sel: 'only'
        });
        if (result.meta.status !== 200) {
          this.$message.error(result.meta.msg)
          return
        }
        this.onlyTabData = result.data
        console.log(result)
      }

    },

    handleRemove(file) {
      const filePath = file.response.data.tmp_path
      const index = this.addForm.pics.findIndex(x => x.pic === filePath)
      this.addForm.pics.splice(index, 1)
      console.log(this.addForm.pics)

    },

    handlePreview(file) {
      console.log(file);
      this.priviewPath = file.response.data.url
      this.previewDialogVisible = true
    },

    // 上传成功的回调
    uploadSuccess(response) {
      const info = {pic: response.data.tmp_path}
      this.addForm.pics.push(info)
    },

    previewHandleClose() {
      this.previewDialogVisible = false
    },

    add() {
      console.log(this.addForm)
      this.$refs.addRuleFormRef.validate(async (valid) => {
        if (!valid) {
          return this.$message.error("输入信息有误，请检查后重试")
        }
        const params = _.cloneDeep(this.addForm)
        params.goods_cat = params.goods_cat.join(',')

        this.manyTabData.forEach((item) => {
          const info = {attr_id: item.attr_id, attr_value: item.attr_vals.join(' ')}
          this.addForm.attrs.push(info)
        })

        this.onlyTabData.forEach((item) => {
          const info = {attr_id: item.attr_id, attr_value: item.attr_vals}
          this.addForm.attrs.push(info)
        })

        const result  = await addGoods(params)
        if (result.meta.status !== 201) return this.$message.error(result.meta.msg)
        this.$message.success(result.meta.msg)
        this.$router.push('/goods')
      })
    },

  },

  computed: {
    cateId() {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[2]
      } else {
        return null
      }

    },
  },
}
</script>

<style lang="less" scoped>

.el-steps {
  margin-top: 15px;
  margin-bottom: 15px;
}

.el-step__title {
  font-size: 13px !important;
}

.el-checkbox {
  padding-top: 8px !important;
  margin: 0px 10px 0px 0px !important;
}

.preview-img {
  width: 100%;

}

.add-goods-btn {
  margin-top: 65px;
}


</style>