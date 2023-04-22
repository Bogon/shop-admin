(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["goods"],{"16a8":function(t,e,a){"use strict";a("3d55")},"1a35":function(t,e,a){"use strict";a("f6df")},"211e":function(t,e,a){},2374:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t._self._c;return e("div",[e("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[e("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[t._v("首页")]),e("el-breadcrumb-item",[t._v("商品管理")]),e("el-breadcrumb-item",[t._v("商品列表")])],1),e("el-card",[e("el-row",[e("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入内容",clearable:""},on:{clear:t.searchGoods},model:{value:t.searchValue,callback:function(e){t.searchValue=e},expression:"searchValue"}},[e("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.searchGoods},slot:"append"})],1),e("el-button",{staticClass:"add-goods",attrs:{type:"primary"},on:{click:t.goAddPage}},[t._v("添加商品")])],1),e("el-row",[e("el-table",{staticStyle:{width:"100%"},attrs:{fit:"",data:t.goodsList,stripe:"",border:""}},[e("el-table-column",{attrs:{align:"center",type:"index",label:"#"}}),e("el-table-column",{attrs:{align:"left",width:"400",label:"商品名称",prop:"goods_name"}}),e("el-table-column",{attrs:{align:"center",label:"商品价格(元)",prop:"goods_price"}}),e("el-table-column",{attrs:{align:"center",label:"商品重量",prop:"goods_weight"}}),e("el-table-column",{attrs:{align:"center",label:"创建时间",prop:"add_time"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(t._f("dateFromat")(e.row.add_time))+" ")]}}])}),e("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(e){return t.goEditPage(a.row)}}}),e("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(e){return t.deleteGoodsById(a.row)}}})]}}])})],1)],1),e("el-row",[e("el-pagination",{attrs:{"current-page":t.pagenum,"page-sizes":[15,30,45,100],"page-size":t.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)],1)},r=[],i=(a("14d9"),a("365c")),o={name:"Goods",created(){this.getGoods()},data(){return{searchValue:"",goodsList:[],pagenum:1,pagesize:15,total:0}},methods:{async getGoods(){const t=await Object(i["t"])({query:this.searchValue,pagenum:this.pagenum,pagesize:this.pagesize});if(200!==t.meta.status)return this.$message.error(t.meta.msg);this.goodsList=t.data.goods,this.total=t.data.total},handleSizeChange(t){this.pagesize=t,this.getGoods()},handleCurrentChange(t){this.pagenum=t,this.getGoods()},searchGoods(){this.pagenum=1,this.getGoods()},deleteGoodsById(t){this.$confirm("此操作将永久删除该商品, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(async()=>{const e=await Object(i["h"])(t.goods_id);if(200!==e.meta.status)return this.$message.error(e.meta.msg);this.$message({type:"success",message:"删除成功!"}),await this.getGoods()}).catch(()=>{this.$message({type:"info",message:"已取消删除"})})},goAddPage(){this.$router.push("/goods/add")},goEditPage(t){this.$router.push({path:"/goods/edit/"+t.goods_id})}},computed:{}},l=o,n=(a("1a35"),a("2877")),d=Object(n["a"])(l,s,r,!1,null,"0185e8c5",null);e["default"]=d.exports},"3b0d":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t._self._c;return e("div",[e("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[e("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[t._v("首页")]),e("el-breadcrumb-item",[t._v("商品管理")]),e("el-breadcrumb-item",[t._v("分类参数")])],1),e("el-card",[e("el-row",[e("el-alert",{attrs:{title:"注意：只允许为第三级分类设置参数！",type:"warning","show-icon":"",closable:!1}})],1),e("el-row",{staticClass:"selcet-cate"},[e("span",[t._v("选择商品分类：")]),e("el-cascader",{attrs:{options:t.cateList,props:t.propCascaderProps,clearable:""},on:{change:t.parentChange},model:{value:t.selectCates,callback:function(e){t.selectCates=e},expression:"selectCates"}})],1),e("el-row",[e("el-tabs",{on:{"tab-click":t.handleTabClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[e("el-tab-pane",{attrs:{label:"动态参数",name:"many"}},[e("el-button",{attrs:{type:"primary",size:"mini",disabled:t.isBtnEnable},on:{click:t.addAttrAction}},[t._v("添加参数 ")]),e("el-table",{attrs:{data:t.attributesList,border:"",stripe:""}},[e("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(a){return[t._l(a.row.attr_vals,(function(s,r){return e("el-tag",{key:s,attrs:{closable:""},on:{close:function(e){return t.deleteAttributesOne(a.row,r)}}},[t._v(t._s(s)+" ")])})),a.row.isInputVisible?e("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",attrs:{size:"small"},on:{blur:function(e){return t.handleInputConfirm(a.row)}},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleInputConfirm(a.row)}},model:{value:a.row.inputValue,callback:function(e){t.$set(a.row,"inputValue",e)},expression:"scope.row.inputValue"}}):e("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:function(e){return t.showInput(a.row)}}},[t._v("+ New Tag ")])]}}])}),e("el-table-column",{attrs:{type:"index",label:"#"}}),e("el-table-column",{attrs:{label:"参数名称",prop:"attr_name"}}),e("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-edit"},on:{click:function(e){return t.showEditDialog(a.row)}}},[t._v("修改 ")]),e("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-delete"},on:{click:function(e){return t.deleteAttrAction(a.row)}}},[t._v("删除 ")])]}}])})],1)],1),e("el-tab-pane",{attrs:{label:"静态属性",name:"only"}},[e("el-button",{attrs:{type:"primary",size:"mini",disabled:t.isBtnEnable},on:{click:t.addAttrAction}},[t._v("添加属性 ")]),e("el-table",{attrs:{data:t.attributesList,border:"",stripe:""}},[e("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(a){return[t._l(a.row.attr_vals,(function(s,r){return e("el-tag",{key:s,attrs:{closable:""},on:{close:function(e){return t.deleteAttributesOne(a.row,r)}}},[t._v(t._s(s)+" ")])})),a.row.isInputVisible?e("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",attrs:{size:"small"},on:{blur:function(e){return t.handleInputConfirm(a.row)}},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleInputConfirm(a.row)}},model:{value:a.row.inputValue,callback:function(e){t.$set(a.row,"inputValue",e)},expression:"scope.row.inputValue"}}):e("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:function(e){return t.showInput(a.row)}}},[t._v("+ New Tag ")])]}}])}),e("el-table-column",{attrs:{type:"index",label:"#"}}),e("el-table-column",{attrs:{label:"参数名称",prop:"attr_name"}}),e("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-edit"},on:{click:function(e){return t.showEditDialog(a.row)}}},[t._v("修改 ")]),e("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-delete"},on:{click:function(e){return t.deleteAttrAction(a.row)}}},[t._v("删除 ")])]}}])})],1)],1)],1)],1),e("el-dialog",{attrs:{title:"添加"+t.dialogTitle,visible:t.editAttrDialogVisible,width:"50%","before-close":t.editAttrHandleClose},on:{"update:visible":function(e){t.editAttrDialogVisible=e}}},[e("el-form",{ref:"attrRuleFormRef",attrs:{model:t.attrForm,rules:t.attrRules,"label-width":"100px"}},[e("el-form-item",{attrs:{label:t.dialogFormTitle,prop:"attr_name"}},[e("el-input",{model:{value:t.attrForm.attr_name,callback:function(e){t.$set(t.attrForm,"attr_name",e)},expression:"attrForm.attr_name"}})],1)],1),e("span",{attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:t.editAttrHandleClose}},[t._v("取 消")]),e("el-button",{attrs:{type:"primary"},on:{click:t.commitAttrInfo}},[t._v("确 定")])],1)],1),e("el-dialog",{attrs:{title:t.dialogTitle,visible:t.editAttrDialogVisible,width:"50%","before-close":t.editAttrHandleClose},on:{"update:visible":function(e){t.editAttrDialogVisible=e}}},[e("el-form",{ref:"attrRuleFormRef",attrs:{model:t.attrForm,rules:t.attrRules,"label-width":"100px"}},[e("el-form-item",{attrs:{label:t.dialogFormTitle,prop:"attr_name"}},[e("el-input",{model:{value:t.attrForm.attr_name,callback:function(e){t.$set(t.attrForm,"attr_name",e)},expression:"attrForm.attr_name"}})],1)],1),e("span",{attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:t.editAttrHandleClose}},[t._v("取 消")]),e("el-button",{attrs:{type:"primary"},on:{click:t.commitAttrInfo}},[t._v("确 定")])],1)],1)],1)],1)},r=[],i=(a("14d9"),a("365c")),o={name:"Params",created(){this.getCategoryList(),this.attrForm.attr_sel=this.activeName},data(){return{selectCates:[],cateList:[],propCascaderProps:{expandTrigger:"hover",label:"cat_name",value:"cat_id",children:"children"},activeName:"many",attributesList:[],editAttrDialogVisible:!1,attrForm:{attr_name:"",attr_sel:"",attr_vals:""},attrRules:{attr_name:[{required:!0,message:"请输入属性名称",trigger:"blur"},{min:2,max:20,message:"属性名称输入字符个数范围：2-20",trigger:"blur"}]},isAdd:!0,attr_id:0}},methods:{async getCategoryList(){const t=await Object(i["r"])({});if(console.log(t),200!=t.meta.status)return this.$message.error(t.meta.msg);this.cateList=t.data},parentChange(){this.getAttributesInfo()},handleTabClick(){this.getAttributesInfo(),this.attrForm.attr_sel=this.activeName},async getAttributesInfo(){if(3!==this.selectCates.length)return this.selectCates=[],void(this.attributesList=[]);const t=await Object(i["q"])({cateId:this.selectCates[this.selectCates.length-1],sel:this.activeName});if(200!=t.meta.status)return this.$message.error(t.meta.msg);t.data.forEach(t=>{t.attr_vals=t.attr_vals.split(" ").filter(t=>t&&t.trim()),t.isInputVisible=!1,t.inputValue=""}),this.attributesList=t.data},editAttrHandleClose(){this.isAdd=!0,this.$refs.attrRuleFormRef.resetFields(),this.editAttrDialogVisible=!1},commitAttrInfo(){this.$refs.attrRuleFormRef.validate(async t=>{if(!t)return this.$message.error("请输入正确的属性名称后重试");if(this.isAdd){const t=await Object(i["l"])(this.getCatId(),this.attrForm);if(201!==t.meta.status)return this.$message.error(t.meta.msg);this.$message.success(t.meta.msg)}else{const t=await Object(i["F"])(this.getCatId(),this.attr_id,this.attrForm);if(200!==t.meta.status)return this.$message.error(t.meta.msg);this.$message.success(t.meta.msg)}await this.getAttributesInfo(),this.editAttrHandleClose()})},addAttrAction(){this.editAttrDialogVisible=!0,this.attrForm.attr_name="",this.attrForm.attr_vals=""},getCatId(){return 3===this.selectCates.length?this.selectCates[2]:-1},deleteAttrAction(t){this.$confirm("此操作将永久删除该属性, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(async()=>{const e=await Object(i["f"])({cat_id:this.getCatId(),attr_id:t.attr_id});if(200!=e.meta.status)return this.$message.error(e.meta.msg);this.$message.success(e.meta.msg),await this.getAttributesInfo()}).catch(()=>{this.$message({type:"info",message:"已取消删除"})})},showEditDialog(t){this.isAdd=!1,this.editAttrDialogVisible=!0,this.attr_id=t.attr_id,this.attrForm.attr_name=t.attr_name,this.attrForm.attr_vals=t.attr_vals},handleInputConfirm(t){if(0===t.inputValue.trim().length)return t.inputValue="",void(t.isInputVisible=!1);t.attr_vals.push(t.inputValue),t.inputValue="",t.isInputVisible=!1,this.saveAttrs(t)},showInput(t){t.isInputVisible=!0,this.$nextTick(()=>{this.$refs.saveTagInput.$refs.input.focus()})},deleteAttributesOne(t,e){t.attr_vals.splice(e,1),this.saveAttrs(t)},async saveAttrs(t){const e=await Object(i["F"])(t.cat_id,t.attr_id,{attr_name:t.attr_name,attr_sel:t.attr_sel,attr_vals:t.attr_vals.join(" ")});if(200!==e.meta.status)return this.$message.error(e.meta.msg);this.$message.success(e.meta.msg)}},computed:{isBtnEnable(){return 3!=this.selectCates.length},dialogTitle(){const t=this.isAdd?"添加":"修改";return"only"===this.activeName?t+"属性":t+"参数"},dialogFormTitle(){return"only"===this.activeName?"属性名称":"参数名称"}}},l=o,n=(a("16a8"),a("2877")),d=Object(n["a"])(l,s,r,!1,null,"4ec19f34",null);e["default"]=d.exports},"3d55":function(t,e,a){},"3ec0":function(t,e,a){},4111:function(t,e,a){},"4f9b":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t._self._c;return e("div",[e("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[e("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[t._v("首页")]),e("el-breadcrumb-item",[t._v("商品管理")]),e("el-breadcrumb-item",[t._v("添加商品")])],1),e("el-card",[e("el-alert",{attrs:{title:"添加商品信息",type:"info",center:"","show-icon":"",closable:""}}),e("el-steps",{attrs:{space:200,active:t.activeIndex-0,"finish-status":"success","align-center":""}},[e("el-step",{attrs:{title:"基本信息"}}),e("el-step",{attrs:{title:"商品参数"}}),e("el-step",{attrs:{title:"商品属性"}}),e("el-step",{attrs:{title:"商品图片"}}),e("el-step",{attrs:{title:"商品内容"}}),e("el-step",{attrs:{title:"完成"}})],1),e("el-form",{ref:"addRuleFormRef",attrs:{model:t.addForm,rules:t.addRules,"label-width":"120px","label-position":"top"}},[e("el-tabs",{attrs:{"tab-position":"left","before-leave":t.beforeTabLeave},on:{"tab-click":t.tabClicked},model:{value:t.activeIndex,callback:function(e){t.activeIndex=e},expression:"activeIndex"}},[e("el-tab-pane",{attrs:{label:"基本信息",name:"0"}},[e("el-form-item",{attrs:{label:"商品名称",prop:"goods_name"}},[e("el-input",{model:{value:t.addForm.goods_name,callback:function(e){t.$set(t.addForm,"goods_name",e)},expression:"addForm.goods_name"}})],1),e("el-form-item",{attrs:{label:"商品价格",prop:"goods_price"}},[e("el-input",{model:{value:t.addForm.goods_price,callback:function(e){t.$set(t.addForm,"goods_price",e)},expression:"addForm.goods_price"}})],1),e("el-form-item",{attrs:{label:"商品数量",prop:"goods_number"}},[e("el-input",{model:{value:t.addForm.goods_number,callback:function(e){t.$set(t.addForm,"goods_number",e)},expression:"addForm.goods_number"}})],1),e("el-form-item",{attrs:{label:"商品重量",prop:"goods_weight"}},[e("el-input",{model:{value:t.addForm.goods_weight,callback:function(e){t.$set(t.addForm,"goods_weight",e)},expression:"addForm.goods_weight\t"}})],1),e("el-form-item",{attrs:{label:"商品分类",prop:"goods_cat"}},[e("el-cascader",{attrs:{options:t.categories,props:t.cateProps,clearable:""},on:{change:t.handleChange},model:{value:t.addForm.goods_cat,callback:function(e){t.$set(t.addForm,"goods_cat",e)},expression:"addForm.goods_cat"}})],1)],1),e("el-tab-pane",{attrs:{label:"商品参数",name:"1"}},t._l(t.manyTabData,(function(a){return e("el-form-item",{key:a.attr_id,attrs:{label:a.attr_name}},[e("el-checkbox-group",{attrs:{size:"small"},model:{value:a.attr_vals,callback:function(e){t.$set(a,"attr_vals",e)},expression:"item.attr_vals"}},t._l(a.attr_vals,(function(t,a){return e("el-checkbox",{key:a,attrs:{label:t,border:""}})})),1)],1)})),1),e("el-tab-pane",{attrs:{label:"商品属性",name:"2"}},t._l(t.onlyTabData,(function(a){return e("el-form-item",{key:a.attr_id,attrs:{label:a.attr_name}},[e("el-input",{model:{value:a.attr_vals,callback:function(e){t.$set(a,"attr_vals",e)},expression:"item.attr_vals"}})],1)})),1),e("el-tab-pane",{attrs:{label:"商品图片",name:"3"}},[e("el-upload",{attrs:{action:t.uploadURL,"on-preview":t.handlePreview,"on-remove":t.handleRemove,"list-type":"picture",headers:t.headerObj,"on-success":t.uploadSuccess}},[e("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")]),e("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传jpg/png文件，且不超过500kb")])],1)],1),e("el-tab-pane",{attrs:{label:"商品内容",name:"4"}},[e("quill-editor",{model:{value:t.addForm.goods_introduce,callback:function(e){t.$set(t.addForm,"goods_introduce",e)},expression:"addForm.goods_introduce"}}),e("el-button",{staticClass:"add-goods-btn",attrs:{type:"primary"},on:{click:t.add}},[t._v("添加商品")])],1)],1)],1)],1),e("el-dialog",{attrs:{title:"图片预览",visible:t.previewDialogVisible,width:"50%","before-close":t.previewHandleClose},on:{"update:visible":function(e){t.previewDialogVisible=e}}},[e("img",{staticClass:"preview-img",attrs:{src:t.priviewPath}})])],1)},r=[],i=(a("14d9"),a("365c")),o=a("60bb"),l=a.n(o),n={name:"Add",created(){this.getCategories()},data(){return{activeIndex:"0",addForm:{goods_name:"",goods_price:0,goods_number:0,goods_weight:0,goods_cat:[],pics:[],goods_introduce:"",attrs:[]},addRules:{goods_name:[{required:!0,message:"请输入商品名称",trigger:"blur"},{min:2,max:20,message:"商品名称字数要求：3-20个字符",trigger:"blur"}],goods_price:[{required:!0,message:"请输入商品价格",trigger:"blur"}],goods_number:[{required:!0,message:"请输入商品数量",trigger:"blur"}],goods_weight:[{required:!0,message:"请输入商品重量",trigger:"blur"}],goods_cat:[{required:!0,message:"请选择商品分类",trigger:"blur"}]},categories:[],cateProps:{label:"cat_name",value:"cat_id",children:"children",expandTrigger:"hover"},manyTabData:[],onlyTabData:[],uploadURL:"http://127.0.0.1:8888/api/private/v1/upload",headerObj:{Authorization:window.sessionStorage.getItem("token")},priviewPath:"",previewDialogVisible:!1}},methods:{async getCategories(){const t=await Object(i["r"])();if(200!=t.meta.status)return this.$message.error(t.meta.msg);this.categories=t.data},handleChange(){3!==this.addForm.goods_cat.length&&(this.addForm.goods_cat=[])},beforeTabLeave(t,e){return"0"!==e||3===this.addForm.goods_cat.length||(this.$message.error("请先选择商品分类"),!1)},async tabClicked(){if("1"===this.activeIndex){const t=await Object(i["q"])({cateId:this.cateId,sel:"many"});if(200!==t.meta.status)return void this.$message.error(t.meta.msg);t.data.forEach(t=>{t.attr_vals=t.attr_vals.split(" ").filter(t=>t&&t.trim())}),this.manyTabData=t.data}else if("2"===this.activeIndex){const t=await Object(i["q"])({cateId:this.cateId,sel:"only"});if(200!==t.meta.status)return void this.$message.error(t.meta.msg);this.onlyTabData=t.data}},handleRemove(t){const e=t.response.data.tmp_path,a=this.addForm.pics.findIndex(t=>t.pic===e);this.addForm.pics.splice(a,1)},handlePreview(t){this.priviewPath=t.response.data.url,this.previewDialogVisible=!0},uploadSuccess(t){const e={pic:t.data.tmp_path};this.addForm.pics.push(e)},previewHandleClose(){this.previewDialogVisible=!1},add(){this.$refs.addRuleFormRef.validate(async t=>{if(!t)return this.$message.error("输入信息有误，请检查后重试");const e=l.a.cloneDeep(this.addForm);e.goods_cat=e.goods_cat.join(","),this.manyTabData.forEach(t=>{const e={attr_id:t.attr_id,attr_value:t.attr_vals.join(" ")};this.addForm.attrs.push(e)}),this.onlyTabData.forEach(t=>{const e={attr_id:t.attr_id,attr_value:t.attr_vals};this.addForm.attrs.push(e)});const a=await Object(i["b"])(e);if(201!==a.meta.status)return this.$message.error(a.meta.msg);this.$message.success(a.meta.msg),this.$router.push("/goods")})}},computed:{cateId(){return 3===this.addForm.goods_cat.length?this.addForm.goods_cat[2]:null}}},d=n,c=(a("fad8"),a("2877")),m=Object(c["a"])(d,s,r,!1,null,"4bea3bf2",null);e["default"]=m.exports},b073:function(t,e,a){"use strict";a("3ec0")},d546:function(t,e,a){"use strict";a("4111")},ebde:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t._self._c;return e("div",[e("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[e("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[t._v("首页")]),e("el-breadcrumb-item",[t._v("商品管理")]),e("el-breadcrumb-item",[t._v("编辑商品")])],1),e("el-card",[e("el-alert",{attrs:{title:"编辑商品信息",type:"info",center:"","show-icon":"",closable:""}}),e("el-steps",{attrs:{space:200,active:t.activeIndex-0,"finish-status":"success","align-center":""}},[e("el-step",{attrs:{title:"基本信息"}}),e("el-step",{attrs:{title:"商品参数"}}),e("el-step",{attrs:{title:"商品属性"}}),e("el-step",{attrs:{title:"商品图片"}}),e("el-step",{attrs:{title:"商品内容"}}),e("el-step",{attrs:{title:"完成"}})],1),e("el-form",{ref:"addRuleFormRef",attrs:{model:t.addForm,rules:t.addRules,"label-width":"120px","label-position":"top"}},[e("el-tabs",{attrs:{"tab-position":"left"},on:{"tab-click":t.tabClicked},model:{value:t.activeIndex,callback:function(e){t.activeIndex=e},expression:"activeIndex"}},[e("el-tab-pane",{attrs:{label:"基本信息",name:"0"}},[e("el-form-item",{attrs:{label:"商品名称",prop:"goods_name"}},[e("el-input",{model:{value:t.addForm.goods_name,callback:function(e){t.$set(t.addForm,"goods_name",e)},expression:"addForm.goods_name"}})],1),e("el-form-item",{attrs:{label:"商品价格",prop:"goods_price"}},[e("el-input",{model:{value:t.addForm.goods_price,callback:function(e){t.$set(t.addForm,"goods_price",e)},expression:"addForm.goods_price"}})],1),e("el-form-item",{attrs:{label:"商品数量",prop:"goods_number"}},[e("el-input",{model:{value:t.addForm.goods_number,callback:function(e){t.$set(t.addForm,"goods_number",e)},expression:"addForm.goods_number"}})],1),e("el-form-item",{attrs:{label:"商品重量",prop:"goods_weight"}},[e("el-input",{model:{value:t.addForm.goods_weight,callback:function(e){t.$set(t.addForm,"goods_weight",e)},expression:"addForm.goods_weight\t"}})],1)],1),e("el-tab-pane",{attrs:{label:"商品参数",name:"1"}},t._l(t.manyTabData,(function(a,s){return e("el-form-item",{key:s,attrs:{label:a.attr_name}},[e("el-checkbox-group",{attrs:{size:"small"},model:{value:a.attr_vals,callback:function(e){t.$set(a,"attr_vals",e)},expression:"item.attr_vals"}},t._l(a.attr_vals,(function(t,a){return e("el-checkbox",{key:a,attrs:{label:t,border:"",disabled:""}})})),1)],1)})),1),e("el-tab-pane",{attrs:{label:"商品属性",name:"2"}},t._l(t.onlyTabData,(function(a,s){return e("el-form-item",{key:s,attrs:{label:a.attr_name}},[e("el-input",{attrs:{disabled:""},model:{value:a.attr_vals,callback:function(e){t.$set(a,"attr_vals",e)},expression:"item.attr_vals"}})],1)})),1),e("el-tab-pane",{attrs:{label:"商品图片",name:"3"}},[e("el-upload",{attrs:{action:t.uploadURL,"on-preview":t.handlePreview,"on-remove":t.handleRemove,"list-type":"picture","file-list":t.fileList,headers:t.headerObj,"on-success":t.uploadSuccess}},[e("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")]),e("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传jpg/png文件，且不超过500kb")])],1)],1),e("el-tab-pane",{attrs:{label:"商品内容",name:"4"}},[e("quill-editor",{model:{value:t.addForm.goods_introduce,callback:function(e){t.$set(t.addForm,"goods_introduce",e)},expression:"addForm.goods_introduce"}}),e("el-button",{staticClass:"add-goods-btn",attrs:{type:"primary"},on:{click:t.edit}},[t._v("修改商品")])],1)],1)],1)],1),e("el-dialog",{attrs:{title:"图片预览",visible:t.previewDialogVisible,width:"50%","before-close":t.previewHandleClose},on:{"update:visible":function(e){t.previewDialogVisible=e}}},[e("img",{staticClass:"preview-img",attrs:{src:t.priviewPath}})])],1)},r=[],i=(a("14d9"),a("365c")),o=a("60bb"),l=a.n(o),n={created(){console.log(this.$route),this.goodsId=this.$route.params.goodsId,this.getGoodsInfo()},data(){return{goodsId:0,activeIndex:"0",addForm:{goods_name:"",goods_price:0,goods_number:0,goods_weight:0,goods_cat:"",pics:[],goods_introduce:"",attrs:[]},fileList:[],addRules:{goods_name:[{required:!0,message:"请输入商品名称",trigger:"blur"},{min:2,max:500,message:"商品名称字数要求：3-500个字符",trigger:"blur"}],goods_price:[{required:!0,message:"请输入商品价格",trigger:"blur"}],goods_number:[{required:!0,message:"请输入商品数量",trigger:"blur"}],goods_weight:[{required:!0,message:"请输入商品重量",trigger:"blur"}]},manyTabData:[],onlyTabData:[],uploadURL:"http://127.0.0.1:8888/api/private/v1/upload",headerObj:{Authorization:window.sessionStorage.getItem("token")},priviewPath:"",previewDialogVisible:!1}},methods:{async tabClicked(){},handleRemove(t){const e=t.response.data.tmp_path,a=this.addForm.pics.findIndex(t=>t.pic===e);this.addForm.pics.splice(a,1)},handlePreview(t){this.priviewPath=t.response.data.url,this.previewDialogVisible=!0},uploadSuccess(t){const e={pic:t.data.tmp_path};this.addForm.pics.push(e)},previewHandleClose(){this.previewDialogVisible=!1},edit(){this.$refs.addRuleFormRef.validate(async t=>{if(!t)return this.$message.error("输入信息有误，请检查后重试");const e=l.a.cloneDeep(this.addForm);this.manyTabData.forEach(t=>{const a={attr_id:t.attr_id,attr_value:t.attr_vals.join(" ")};e.attrs.push(a)}),this.onlyTabData.forEach(t=>{const a={attr_id:t.attr_id,attr_value:t.attr_vals};e.attrs.push(a)});const a=await Object(i["n"])(this.goodsId,e);if(200!==a.meta.status)return this.$message.error(a.meta.msg);this.$message.success(a.meta.msg),this.$router.push("/goods")})},async getGoodsInfo(){const t=await Object(i["s"])(this.goodsId);if(200!=t.meta.status)return this.$message.error(t.meta.msg);this.addForm.goods_name=t.data.goods_name,this.addForm.goods_number=t.data.goods_number,this.addForm.goods_weight=t.data.goods_weight,this.addForm.goods_price=t.data.goods_price,this.addForm.goods_introduce=t.data.goods_introduce,this.addForm.goods_cat=t.data.goods_cat,t.data.pics.forEach(t=>{const e={name:t.pics_big,url:t.pics_big_url};this.fileList.push(e)}),t.data.attrs.forEach(t=>{if("many"===t.attr_sel){const e={attr_name:t.attr_name,attr_id:t.attr_id,attr_vals:t.attr_vals};this.manyTabData.push(e)}else{const e={attr_name:t.attr_name,attr_id:t.attr_id,attr_vals:t.attr_vals,attr_value:t.attr_value};this.onlyTabData.push(e)}})}},computed:{}},d=n,c=(a("d546"),a("2877")),m=Object(c["a"])(d,s,r,!1,null,"1a84418c",null);e["default"]=m.exports},f6df:function(t,e,a){},fad8:function(t,e,a){"use strict";a("211e")},fb9f:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t._self._c;return e("div",[e("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[e("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[t._v("首页")]),e("el-breadcrumb-item",[t._v("商品管理")]),e("el-breadcrumb-item",[t._v("商品分类")])],1),e("el-card",[e("el-row",[e("el-button",{attrs:{type:"primary"},on:{click:t.showAddCategoryDialog}},[t._v("添加分类")])],1),e("el-row",[e("tree-table",{attrs:{data:t.categoryList,columns:t.columns,"selection-type":!1,"show-index":!0,"index-text":"#","expand-type":!1,stripe:!0,border:"","show-row-hover":!1},scopedSlots:t._u([{key:"isOk",fn:function(t){return[!1===t.row.cat_deleted?e("el-icon",{staticClass:"el-icon-success",staticStyle:{color:"lightgreen"}}):e("el-icon",{staticClass:"el-icon-error",staticStyle:{color:"red"}})]}},{key:"order",fn:function(a){return[0===a.row.cat_level?e("el-tag",[t._v("一级")]):1===a.row.cat_level?e("el-tag",{attrs:{type:"success"}},[t._v("二级")]):e("el-tag",{attrs:{type:"warning"}},[t._v("三级")])]}},{key:"operator",fn:function(a){return[e("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-edit"},on:{click:function(e){return t.showCategory(a.row)}}},[t._v("编辑 ")]),e("el-button",{attrs:{type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:function(e){return t.deleteCategoryAction(a.row.cat_id)}}},[t._v(" 删除 ")])]}}])})],1),e("el-row",[e("el-pagination",{attrs:{"current-page":t.categoryInfo.pagenum,"page-sizes":[10,20,30,40],"page-size":t.categoryInfo.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),e("el-dialog",{attrs:{title:"添加分类",visible:t.addCategoryDialogVisible,width:"50%","before-close":t.addCategoryDialogClose},on:{"update:visible":function(e){t.addCategoryDialogVisible=e}}},[e("el-form",{ref:"addCategoryRef",attrs:{model:t.addCategoryForm,"label-width":"100px",rules:t.addCategoryRules}},[e("el-form-item",{attrs:{label:"分类名称:",prop:"cat_name"}},[e("el-input",{model:{value:t.addCategoryForm.cat_name,callback:function(e){t.$set(t.addCategoryForm,"cat_name",e)},expression:"addCategoryForm.cat_name"}})],1),e("el-form-item",{attrs:{label:"父级分类:"}},[e("el-cascader",{attrs:{options:t.parentCateList,props:t.propcascaderProps,clearable:"","change-on-select":""},on:{change:t.parentChange},model:{value:t.selectCates,callback:function(e){t.selectCates=e},expression:"selectCates"}})],1)],1),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:t.addCategoryDialogClose}},[t._v("取 消")]),e("el-button",{attrs:{type:"primary"},on:{click:t.addCategoryAction}},[t._v("确 定")])],1)],1),e("el-dialog",{attrs:{title:"修改分类",visible:t.editCategoryDialogVisible,width:"50%","before-close":t.editCategoryDialogClose},on:{"update:visible":function(e){t.editCategoryDialogVisible=e}}},[e("el-form",{ref:"editCategoryRef",attrs:{model:t.editCategoryForm,"label-width":"100px",rules:t.editCategoryRules}},[e("el-form-item",{attrs:{label:"分类名称:",prop:"cat_name"}},[e("el-input",{model:{value:t.editCategoryForm.cat_name,callback:function(e){t.$set(t.editCategoryForm,"cat_name",e)},expression:"editCategoryForm.cat_name"}})],1)],1),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:t.editCategoryDialogClose}},[t._v("取 消")]),e("el-button",{attrs:{type:"primary"},on:{click:t.commitCategory}},[t._v("确 定")])],1)],1)],1)],1)},r=[],i=a("365c"),o={name:"Categories",created(){this.getCategoryList()},data(){return{categoryInfo:{type:"",pagenum:1,pagesize:10},categoryList:[],total:0,columns:[{label:"分类名称",prop:"cat_name"},{label:"是否有效",prop:"cat_deleted",type:"template",template:"isOk"},{label:"排序",prop:"cat_pid",type:"template",template:"order"},{label:"操作",prop:"cat_deleted",type:"template",template:"operator"}],addCategoryDialogVisible:!1,addCategoryForm:{cat_name:"",cat_level:0,cat_pid:0},addCategoryRules:{cat_name:[{required:!0,message:"请输入分类名称",trigger:"blur"},{min:3,max:20,message:"至少3个字符，至多20个字符",trigger:"blur"}]},cateListparentCateList:[],propcascaderProps:{expandTrigger:"hover",label:"cat_name",value:"cat_id",children:"children"},selectCates:[],editCategoryDialogVisible:!1,editCategoryForm:{cat_name:"",cat_id:0},editCategoryRules:{cat_name:[{required:!0,message:"请输入分类名称",trigger:"blur"},{min:3,max:20,message:"至少3个字符，至多20个字符",trigger:"blur"}]}}},methods:{async getCategoryList(){const t=await Object(i["r"])(this.categoryInfo);if(200!=t.meta.status)return this.$message.error(t.meta.msg);this.categoryList=t.data.result,this.total=t.data.total},handleSizeChange(t){this.categoryInfo.pagesize=t,this.getCategoryList()},handleCurrentChange(t){this.categoryInfo.pagenum=t,this.getCategoryList()},deleteCategoryAction(t){this.$confirm("此操作将永久删除该分类, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(async()=>{const e=await Object(i["g"])(t);if(200!=e.meta.status)return this.$message.error(e.meta.msg);this.$message.success(e.meta.msg),await this.getCategoryList()}).catch(()=>{this.$message({type:"info",message:"已取消删除"})})},showAddCategoryDialog(){this.getParentCateList(),this.addCategoryDialogVisible=!0},addCategoryAction(){this.$refs.addCategoryRef.validate(async t=>{if(!t)return this.$message.error("填写数据有误，请检查无误后重试");const e=await Object(i["a"])(this.addCategoryForm);if(201!=e.meta.status)return this.$message.error(e.meta.msg);this.$message.success(e.meta.msg),await this.getCategoryList(),this.addCategoryDialogClose()})},addCategoryDialogClose(){this.$refs.addCategoryRef.resetFields(),this.selectCates=[],this.parentCateList=[],this.addCategoryDialogVisible=!1},async getParentCateList(){const t=await Object(i["r"])({type:2});if(200!=t.meta.status)return this.$message.error(t.meta.msg);this.parentCateList=t.data},parentChange(){this.selectCates.length>0?(this.addCategoryForm.cat_pid=this.selectCates[this.selectCates.length-1],this.addCategoryForm.cat_level=this.selectCates.length):(this.addCategoryForm.cat_pid=0,this.addCategoryForm.cat_level=0)},showCategory(t){this.editCategoryForm.cat_id=t.cat_id,this.editCategoryForm.cat_name=t.cat_name,this.editCategoryDialogVisible=!0},editCategoryDialogClose(){this.$refs.editCategoryRef.resetFields(),this.editCategoryForm.cat_name="",this.editCategoryForm.cat_id=0,this.editCategoryDialogVisible=!1},commitCategory(){this.$refs.editCategoryRef.validate(async t=>{if(!t)return this.$message.error("填写数据有误，请检查无误后重试");const e=await Object(i["m"])(this.editCategoryForm.cat_id,this.editCategoryForm.cat_name);if(200!=e.meta.status)return this.$message.error(e.meta.msg);this.$message.success(e.meta.msg),await this.getCategoryList(),this.editCategoryDialogClose()})}}},l=o,n=(a("b073"),a("2877")),d=Object(n["a"])(l,s,r,!1,null,"3f6c0d33",null);e["default"]=d.exports}}]);
//# sourceMappingURL=goods.8ae97e20.js.map