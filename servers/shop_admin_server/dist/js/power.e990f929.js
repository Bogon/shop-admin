(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["power"],{"17a0":function(e,t,s){"use strict";s("afc9")},3024:function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e._self._c;return t("div",[t("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[t("el-breadcrumb-item",{attrs:{to:"/home"}},[e._v("首页")]),t("el-breadcrumb-item",[e._v("权限管理")]),t("el-breadcrumb-item",[e._v("角色列表")])],1),t("el-card",[t("div",[t("el-row",[t("el-col",[t("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addRoleDialogVisible=!0}}},[e._v("添加角色")])],1)],1),t("el-table",{attrs:{border:"",stripe:"",data:e.rolesList}},[t("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(s){return e._l(s.row.children,(function(i,l){return t("el-row",{key:i.id,class:["bdbottom",0===l?"bdtop":"","vcenter"]},[t("el-col",{attrs:{span:4,offset:1}},[t("el-tag",{attrs:{closable:""},on:{close:function(t){return e.removeRightbyId(s.row,i.id)}}},[e._v(e._s(i.authName))]),t("i",{staticClass:"el-icon-caret-right"})],1),t("el-col",{attrs:{span:19}},e._l(i.children,(function(l,a){return t("el-row",{key:l.id,class:[a===i.children.length-1?"":"bdbottom","vcenter"]},[t("el-col",{attrs:{span:6}},[t("el-tag",{attrs:{type:"success",closable:""},on:{close:function(t){return e.removeRightbyId(s.row,l.id)}}},[e._v(e._s(l.authName)+" ")]),t("i",{staticClass:"el-icon-caret-right"})],1),t("el-col",{attrs:{span:18}},e._l(l.children,(function(i){return t("el-tag",{key:i.id,attrs:{closable:"",type:"warning"},on:{close:function(t){return e.removeRightbyId(s.row,i.id)}}},[e._v(e._s(i.authName)+" ")])})),1),t("el-row")],1)})),1)],1)}))}}])}),t("el-table-column",{attrs:{label:"#",type:"index"}}),t("el-table-column",{attrs:{label:"角色名称",prop:"roleName"}}),t("el-table-column",{attrs:{label:"角色描述",prop:"roleDesc"}}),t("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(s){return[t("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(t){return e.editRoleInfo(s.row.id)}}},[e._v("编辑 ")]),t("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(t){return e.deleteRoleAction(s.row.id)}}},[e._v("删除 ")]),t("el-button",{attrs:{type:"warning",icon:"el-icon-setting",size:"mini"},on:{click:function(t){return e.showSetRightDialog(s.row)}}},[e._v("分配权限 ")])]}}])})],1),t("el-dialog",{attrs:{title:"添加角色",visible:e.addRoleDialogVisible,width:"50%"},on:{"update:visible":function(t){e.addRoleDialogVisible=t},close:e.addRoleDialogClose}},[t("el-form",{ref:"addRoleRef",attrs:{model:e.addRole,rules:e.addRoleRules,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"权限名称",prop:"roleName"}},[t("el-input",{attrs:{clearable:""},model:{value:e.addRole.roleName,callback:function(t){e.$set(e.addRole,"roleName",t)},expression:"addRole.roleName"}})],1),t("el-form-item",{attrs:{label:"权限描述",prop:"roleDesc"}},[t("el-input",{attrs:{clearable:""},model:{value:e.addRole.roleDesc,callback:function(t){e.$set(e.addRole,"roleDesc",t)},expression:"addRole.roleDesc"}})],1)],1),t("span",{attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:e.addRoleDialogClose}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:e.commitAddRoleInfo}},[e._v("确 定")])],1)],1),t("el-dialog",{attrs:{title:"修改角色",visible:e.editRoleDialogVisible,width:"50%"},on:{"update:visible":function(t){e.editRoleDialogVisible=t},close:e.editRoleDialogClose}},[t("el-form",{ref:"editRoleRef",attrs:{model:e.editRole,rules:e.editRoleRules,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"权限名称",prop:"roleName"}},[t("el-input",{attrs:{clearable:""},model:{value:e.editRole.roleName,callback:function(t){e.$set(e.editRole,"roleName",t)},expression:"editRole.roleName"}})],1),t("el-form-item",{attrs:{label:"权限描述",prop:"roleDesc"}},[t("el-input",{attrs:{clearable:""},model:{value:e.editRole.roleDesc,callback:function(t){e.$set(e.editRole,"roleDesc",t)},expression:"editRole.roleDesc"}})],1)],1),t("span",{attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:e.editRoleDialogClose}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:e.commitEditRoleInfo}},[e._v("确 定")])],1)],1),t("el-dialog",{attrs:{title:"修改权限",visible:e.editRightDialogVisible,width:"50%"},on:{"update:visible":function(t){e.editRightDialogVisible=t},close:e.editRightDialogClose}},[t("el-tree",{ref:"treeRef",attrs:{data:e.rightList,props:e.treeProps,"show-checkbox":"","node-key":"id","default-expand-all":"","default-checked-keys":e.defkeys}}),t("span",{attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:e.editRightDialogClose}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:e.commitEditRightInfo}},[e._v("确 定")])],1)],1)],1)])],1)},l=[],a=(s("14d9"),s("365c")),o={name:"Roles",created(){this.getRolesList()},data(){return{rolesList:[],addRoleDialogVisible:!1,addRole:{roleName:"",roleDesc:""},addRoleRules:{roleName:[{required:!0,message:"请输入权限名称",trigger:"blur"},{min:2,max:20,message:"权限名称的长度在1-20个字符之间",trigger:"blur"}],roleDesc:[{required:!1,message:"请输入权限描述",trigger:"blur"},{min:3,max:20,message:"权限描述的长度在3-20个字符之间",trigger:"blur"}]},editRoleDialogVisible:!1,editRole:{},editRoleRules:{roleName:[{required:!0,message:"请输入权限名称",trigger:"blur"},{min:2,max:20,message:"权限名称的长度在1-20个字符之间",trigger:"blur"}],roleDesc:[{required:!1,message:"请输入权限描述",trigger:"blur"},{min:3,max:20,message:"权限描述的长度在3-20个字符之间",trigger:"blur"}]},editRightDialogVisible:!1,rightList:[],treeProps:{children:"children",label:"authName"},defkeys:[],giveRoleForm:{roleId:0,rids:""}}},methods:{async getRolesList(){const e=await Object(a["z"])();if(200!=e.meta.status)return this.$message.error(e.meta.msg);this.rolesList=e.data},addRoleDialogClose(){this.$refs.addRoleRef.resetFields(),this.addRoleDialogVisible=!1},commitAddRoleInfo(){this.$refs.addRoleRef.validate(e=>{if(!e)return this.$message.error("输入信息有误，请确认后重试");this.addRoleAction()})},async addRoleAction(){const e=await Object(a["c"])(this.addRole);if(201!=e.meta.status)return this.$message.error(e.meta.msg);await this.getRolesList(),this.addRoleDialogClose()},async editRoleInfo(e){this.editRoleDialogVisible=!0;const t=await Object(a["y"])(e);if(200!==t.meta.status)return this.$message.error(t.meta.msg);this.editRole=t.data},editRoleDialogClose(){this.$refs.editRoleRef.resetFields(),this.editRoleDialogVisible=!1},commitEditRoleInfo(){this.$refs.editRoleRef.validate(async e=>{if(!e)return this.$message.error("输入信息有误，请检查后重试");const t=await Object(a["o"])(this.editRole);if(200!=t.meta.status)return this.$message.error(t.meta.msg);this.$message.success(t.meta.msg),await this.getRolesList(),this.editRoleDialogClose()})},deleteRoleAction(e){this.$confirm("此操作将永久删除该角色, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(async()=>{const t=await Object(a["i"])(e);if(200!=t.meta.status)return this.$message.error(t.meta.msg);this.$message({type:"success",message:"删除成功!"}),await this.getRolesList()}).catch(()=>{this.$message({type:"info",message:"已取消删除"})})},removeRightbyId(e,t){this.$confirm("此操作将永久删除该权限, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(async()=>{const s=await Object(a["j"])(e.id,t);if(200!=s.meta.status)return this.$message.error(s.meta.msg);this.$message({type:"success",message:"删除成功!"}),e.children=s.data}).catch(()=>{this.$message({type:"info",message:"已取消删除"})})},async showSetRightDialog(e){const t=await Object(a["x"])("tree");if(200!=t.meta.status)return this.$message.error(t.meta.msg);this.rightList=t.data,this.getLeafKeys(e,this.defkeys),this.giveRoleForm={roleId:e.id,rids:this.defkeys.join(",")},this.editRightDialogVisible=!0},editRightDialogClose(){this.editRightDialogVisible=!1,this.defkeys=[],this.giveRoleForm={}},async commitEditRightInfo(){const e=[...this.$refs.treeRef.getCheckedKeys(),...this.$refs.treeRef.getHalfCheckedKeys()];this.giveRoleForm.rids=e.join(",");const t=await Object(a["E"])(this.giveRoleForm);if(200!=t.meta.status)return this.$message.error(t.meta.msg);this.$message.success(t.meta.msg),await this.getRolesList(),this.editRightDialogClose()},getLeafKeys(e,t){if(!e.children)return t.push(e.id);e.children.forEach(e=>this.getLeafKeys(e,t))}}},r=o,n=(s("17a0"),s("2877")),c=Object(n["a"])(r,i,l,!1,null,"c9945748",null);t["default"]=c.exports},a766:function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e._self._c;return t("div",[t("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[t("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),t("el-breadcrumb-item",[e._v("权限管理")]),t("el-breadcrumb-item",[e._v("权限列表")])],1),t("el-card",[t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.rights,border:"",stripe:""}},[t("el-table-column",{attrs:{type:"index",label:"#",width:"60px"}}),t("el-table-column",{attrs:{prop:"authName",label:"权限名称"}}),t("el-table-column",{attrs:{prop:"path",label:"路径"}}),t("el-table-column",{attrs:{prop:"level",label:"权限等级"},scopedSlots:e._u([{key:"default",fn:function(s){return["0"===s.row.level?t("el-tag",[e._v("一级")]):"1"===s.row.level?t("el-tag",{attrs:{type:"success"}},[e._v("二级")]):t("el-tag",{attrs:{type:"warning"}},[e._v("三级")])]}}])})],1)],1)],1)},l=[],a=s("365c"),o={name:"Rights",data(){return{rights:[]}},created(){this.getRights()},methods:{async getRights(){const e=await Object(a["x"])("list");if(200!=e.meta.status)return this.$message.error(e.meta.msg);this.rights=e.data}}},r=o,n=s("2877"),c=Object(n["a"])(r,i,l,!1,null,"483b52dc",null);t["default"]=c.exports},afc9:function(e,t,s){}}]);
//# sourceMappingURL=power.e990f929.js.map