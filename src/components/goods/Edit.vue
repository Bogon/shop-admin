<template>
  <div>
    <!--    面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>编辑商品</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>

      <el-alert
              title="编辑商品信息"
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
                 @tab-click="tabClicked">
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

          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">

            <el-form-item v-for="(item, idx) in manyTabData" :label="item.attr_name" :key="idx">
              <el-checkbox-group v-model="item.attr_vals" size="small">
                <el-checkbox v-for="(attr, i) in item.attr_vals" :key="i" :label="attr" border disabled></el-checkbox>
              </el-checkbox-group>
            </el-form-item>

          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item v-for="(item, i) in onlyTabData" :label="item.attr_name" :key="i">
              <el-input v-model="item.attr_vals" disabled></el-input>
            </el-form-item>

          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
                    :action="uploadURL"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    list-type="picture"
                    :file-list="fileList"
                    :headers="headerObj"
                    :on-success="uploadSuccess">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor v-model="addForm.goods_introduce"></quill-editor>
            <el-button type="primary" class="add-goods-btn" @click="edit">修改商品</el-button>
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
  getGoods,
  editGoods,
} from "@/api";

import _ from 'lodash'

export default {

  created() {
    console.log(this.$route)
    this.goodsId = this.$route.params.goodsId
    this.getGoodsInfo()
  },

  data() {
    return {
      goodsId: 0,
      activeIndex: '0',
      addForm: {
        goods_name: '',
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_cat: '',
        pics: [],
        goods_introduce: '',
        attrs: [],
      },
      fileList: [],
      addRules: {
        goods_name: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
          {min: 2, max: 500, message: '商品名称字数要求：3-500个字符', trigger: 'blur'},
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
        ]
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

    async tabClicked() {


    },

    handleRemove(file) {
      const filePath = file.response.data.tmp_path
      const index = this.addForm.pics.findIndex(x => x.pic === filePath)
      this.addForm.pics.splice(index, 1)

    },

    handlePreview(file) {
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

    edit() {
      this.$refs.addRuleFormRef.validate(async (valid) => {
        if (!valid) {
          return this.$message.error("输入信息有误，请检查后重试")
        }
        const params = _.cloneDeep(this.addForm)

        this.manyTabData.forEach((item) => {
          const info = {attr_id: item.attr_id, attr_value: item.attr_vals.join(' ')}
          params.attrs.push(info)
        })

        this.onlyTabData.forEach((item) => {
          const info = {attr_id: item.attr_id, attr_value: item.attr_vals}
          params.attrs.push(info)
        })

        const result = await editGoods(this.goodsId,params)
        if (result.meta.status !== 200) return this.$message.error(result.meta.msg)
        this.$message.success(result.meta.msg)
        this.$router.push('/goods')
      })
    },

    //   获取商品信息
    async getGoodsInfo() {
      const result = await getGoods(this.goodsId)
      if (result.meta.status != 200) return this.$message.error(result.meta.msg)
      this.addForm.goods_name = result.data.goods_name
      this.addForm.goods_number = result.data.goods_number
      this.addForm.goods_weight = result.data.goods_weight
      this.addForm.goods_price = result.data.goods_price
      this.addForm.goods_introduce = result.data.goods_introduce
      this.addForm.goods_cat = result.data.goods_cat

      result.data.pics.forEach((item) => {
        const info = {name: item.pics_big, url: item.pics_big_url}
        this.fileList.push(info)
      })


      result.data.attrs.forEach((item) => {
        if (item.attr_sel === 'many') {
          const info = {attr_name: item.attr_name, attr_id: item.attr_id, attr_vals: item.attr_vals}
          this.manyTabData.push(info)
        } else {
          const info = {attr_name: item.attr_name, attr_id: item.attr_id, attr_vals: item.attr_vals, attr_value: item.attr_value}
          this.onlyTabData.push(info)
        }
      })



      /*
      goods_name: '',
          goods_price: 0,
          goods_number: 0,
          goods_weight: 0,
          goods_cat: [],
          pics: [],
          goods_introduce: '',
          attrs: [],
      * */
    },

  },

  computed: {},

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