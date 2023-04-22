(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["user"],{2666:function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e._self._c;return t("div",[t("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[t("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),t("el-breadcrumb-item",[e._v("用户管理")]),t("el-breadcrumb-item",[e._v("用户列表")])],1),t("el-card",[t("div",[t("el-row",{attrs:{gutter:15}},[t("el-col",{attrs:{span:7}},[t("el-input",{attrs:{clearable:"",placeholder:"请输入内容"},on:{change:e.getUsersList,clear:e.getUsersList},model:{value:e.queryInfo.query,callback:function(t){e.$set(e.queryInfo,"query",t)},expression:"queryInfo.query"}},[t("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.getUsersList},slot:"append"})],1)],1),t("el-col",{attrs:{span:4}},[t("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addDialogVisible=!0}}},[e._v("添加用户")])],1)],1),t("el-table",{attrs:{data:e.userList,border:"",stripe:""}},[t("el-table-column",{attrs:{type:"index",label:"#"}}),t("el-table-column",{attrs:{label:"姓名",prop:"username"}}),t("el-table-column",{attrs:{label:"邮箱",prop:"email"}}),t("el-table-column",{attrs:{label:"电话",prop:"mobile"}}),t("el-table-column",{attrs:{label:"角色",prop:"role_name"}}),t("el-table-column",{attrs:{label:"状态"},scopedSlots:e._u([{key:"default",fn:function(r){return[t("el-switch",{on:{change:function(t){return e.userStateChange(r.row)}},model:{value:r.row.mg_state,callback:function(t){e.$set(r.row,"mg_state",t)},expression:"scope.row.mg_state"}})]}}])}),t("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(r){return[t("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(t){return e.showEditDialog(r.row.id)}}}),t("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(t){return e.deleteUser(r.row.id)}}}),t("el-tooltip",{attrs:{effect:"dark",content:"分配角色",placement:"top",enterable:!1}},[t("el-button",{attrs:{type:"warning",icon:"el-icon-setting",size:"mini"},on:{click:function(t){return e.showAllotRoleDislog(r.row)}}})],1)]}}])})],1),t("el-pagination",{attrs:{"current-page":e.queryInfo.pagenum,"page-sizes":[2,10,20,50],"page-size":e.queryInfo.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}),t("el-dialog",{attrs:{title:"添加用户",visible:e.addDialogVisible,width:"50%"},on:{"update:visible":function(t){e.addDialogVisible=t},close:e.addDislogClosed}},[t("el-form",{ref:"addFormRef",attrs:{model:e.addForm,rules:e.addFromRules,"label-width":"70px"}},[t("el-form-item",{attrs:{label:"用户名",prop:"username"}},[t("el-input",{attrs:{clearable:""},model:{value:e.addForm.username,callback:function(t){e.$set(e.addForm,"username",t)},expression:"addForm.username"}})],1),t("el-form-item",{attrs:{label:"密码",prop:"password"}},[t("el-input",{attrs:{clearable:"",type:"password"},model:{value:e.addForm.password,callback:function(t){e.$set(e.addForm,"password",t)},expression:"addForm.password"}})],1),t("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[t("el-input",{attrs:{clearable:"",type:"email"},model:{value:e.addForm.email,callback:function(t){e.$set(e.addForm,"email",t)},expression:"addForm.email"}})],1),t("el-form-item",{attrs:{label:"手机",prop:"mobile"}},[t("el-input",{attrs:{clearable:"",type:"mobile"},model:{value:e.addForm.mobile,callback:function(t){e.$set(e.addForm,"mobile",t)},expression:"addForm.mobile"}})],1)],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:e.addDislogClosed}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:e.commitUserInfo}},[e._v("确 定")])],1)],1),t("el-dialog",{attrs:{title:"修改用户信息",visible:e.editDialogVisible,width:"50%"},on:{"update:visible":function(t){e.editDialogVisible=t},close:e.editDialogClosed}},[t("el-form",{ref:"editRuleFormRef",attrs:{model:e.editForm,rules:e.eidtRules,"label-width":"70px"}},[t("el-form-item",{attrs:{label:"用户名",prop:"username"}},[t("el-input",{attrs:{disabled:!0},model:{value:e.editForm.username,callback:function(t){e.$set(e.editForm,"username",t)},expression:"editForm.username"}})],1),t("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[t("el-input",{model:{value:e.editForm.email,callback:function(t){e.$set(e.editForm,"email",t)},expression:"editForm.email"}})],1),t("el-form-item",{attrs:{label:"手机",prop:"mobile"}},[t("el-input",{model:{value:e.editForm.mobile,callback:function(t){e.$set(e.editForm,"mobile",t)},expression:"editForm.mobile"}})],1)],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:e.editDialogClosed}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:e.commitEditInfo}},[e._v("确 定")])],1)],1),t("el-dialog",{attrs:{title:"分配角色",visible:e.editRoleDialogVisible,width:"50%"},on:{"update:visible":function(t){e.editRoleDialogVisible=t},close:e.editRoleDialogClose}},[t("div",[t("p",[e._v("当前用户："+e._s(e.editRightInfo.username))]),t("p",[e._v("当前用户角色："+e._s(e.editRightInfo.role_name))]),t("span",[e._v("分配新角色：")]),t("el-select",{attrs:{placeholder:"请选择角色"},model:{value:e.selectedRoleId,callback:function(t){e.selectedRoleId=t},expression:"selectedRoleId"}},e._l(e.rolesList,(function(e){return t("el-option",{key:e.id,attrs:{label:e.roleName,value:e.id}})})),1)],1),t("span",{attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:e.editRoleDialogClose}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:e.commitEditRoleInfo}},[e._v("确 定")])],1)])],1)])],1)},i=[],o=r("365c"),n={name:"Users",created(){this.getUsersList()},data(){return{queryInfo:{query:"",pagenum:1,pagesize:2},userList:[],total:0,addDialogVisible:!1,addForm:{username:"",password:"",email:"",mobile:""},addFromRules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:3,max:20,message:"用户名的长度在3-20个字符之间",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:20,message:"密码的长度在6-20个字符之间",trigger:"blur"}],email:[{required:!0,message:"请输入邮箱地址",trigger:"blur"},{type:"email",message:"请输入正确的邮箱地址",trigger:["blur","change"]}],mobile:[{required:!0,message:"请输入邮箱地址",trigger:"blur"},{pattern:/^1[3456789]\d{9}$/,message:"手机号码格式不正确",trigger:"blur"}]},editDialogVisible:!1,editForm:{username:"",email:"",mobile:"",id:""},eidtRules:{email:[{required:!0,message:"请输入邮箱地址",trigger:"blur"},{type:"email",message:"请输入正确的邮箱地址",trigger:["blur","change"]}],mobile:[{required:!0,message:"请输入邮箱地址",trigger:"blur"},{pattern:/^1[3456789]\d{9}$/,message:"手机号码格式不正确",trigger:"blur"}]},editRoleDialogVisible:!1,editRightInfo:{},rolesList:[],selectedRoleId:""}},methods:{async getUsersList(){const e=await Object(o["A"])(this.queryInfo);if(200!==e.meta.status)return this.$message.error(e.meta.msg);this.userList=e.data.users,this.total=e.data.total},handleSizeChange(e){this.queryInfo.pagesize=e,this.getUsersList()},handleCurrentChange(e){this.queryInfo.pagenum=e,this.getUsersList()},async userStateChange(e){const t=await Object(o["C"])(e);if(200!==t.meta.status)return e.mg_state=!e.mg_state,this.$message.error("更改用户状态失败");this.$message.success("更新用户状态成功"),console.log(t)},commitUserInfo(){this.$refs.addFormRef.validate(e=>{if(console.log(e),!e)return this.$message.error("参数错误，请检查后重试");this.addUserAction()})},addDislogClosed(){this.$refs.addFormRef.resetFields(),this.addDialogVisible=!1},async addUserAction(){const e=await Object(o["d"])(this.addForm);if(201!=e.meta.status)return this.$message.error(e.meta.msg);this.$message.success(e.meta.msg),await this.getUsersList(),this.$refs.addFormRef.resetFields(),this.addDialogVisible=!1},async showEditDialog(e){this.editDialogVisible=!0,console.log(e);const t=await Object(o["D"])(e);if(200!=t.meta.status)return this.$message.error(t.meta.msg);this.editForm.id=t.data.id,this.editForm.username=t.data.username,this.editForm.email=t.data.email,this.editForm.mobile=t.data.mobile},editDialogClosed(){this.$refs.editRuleFormRef.resetFields(),this.editDialogVisible=!1},commitEditInfo(){this.$refs.editRuleFormRef.validate(e=>{if(!e)return this.$message.error("用户信息有误，请检查后重试");this.editUserAction()})},async editUserAction(){const e=await Object(o["p"])(this.editForm);if(console.log(e),200!=e.meta.status)return this.$message.error(e.meta.msg);this.$message.success(e.meta.msg),this.editDialogClosed(),await this.getUsersList()},deleteUser(e){this.$confirm("此操作将永久删除该用户, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{this.deleteUserAction(e)}).catch(()=>{this.$message({type:"info",message:"已取消删除"})})},async deleteUserAction(e){const t=await Object(o["k"])(e);if(200!=t.meta.status)return this.$message.error(this.meta.msg);await this.getUsersList(),this.$message({type:"success",message:"删除成功!"})},async showAllotRoleDislog(e){this.editRightInfo=e;const t=await Object(o["z"])();if(200!=t.meta.status)return this.$message.error(t.meta.msg);this.rolesList=t.data,this.editRoleDialogVisible=!0},editRoleDialogClose(){this.editRoleDialogVisible=!1},async commitEditRoleInfo(){if(!this.selectedRoleId)return this.$message.error("请选择一个用户角色");const e=await Object(o["e"])(this.editRightInfo.id,this.selectedRoleId);if(200!=e.meta.status)return this.$message.error(e.meta.msg);this.$message.success(e.meta.msg),await this.getUsersList(),this.editRoleDialogClose()}}},a=n,l=r("2877"),u=Object(l["a"])(a,s,i,!1,null,"1cc9436a",null);t["default"]=u.exports},"323e":function(e,t,r){var s,i;
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */(function(o,n){s=n,i="function"===typeof s?s.call(t,r,t,e):s,void 0===i||(e.exports=i)})(0,(function(){var e={version:"0.2.0"},t=e.settings={minimum:.08,easing:"ease",positionUsing:"",speed:200,trickle:!0,trickleRate:.02,trickleSpeed:800,showSpinner:!0,barSelector:'[role="bar"]',spinnerSelector:'[role="spinner"]',parent:"body",template:'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'};function r(e,t,r){return e<t?t:e>r?r:e}function s(e){return 100*(-1+e)}function i(e,r,i){var o;return o="translate3d"===t.positionUsing?{transform:"translate3d("+s(e)+"%,0,0)"}:"translate"===t.positionUsing?{transform:"translate("+s(e)+"%,0)"}:{"margin-left":s(e)+"%"},o.transition="all "+r+"ms "+i,o}e.configure=function(e){var r,s;for(r in e)s=e[r],void 0!==s&&e.hasOwnProperty(r)&&(t[r]=s);return this},e.status=null,e.set=function(s){var a=e.isStarted();s=r(s,t.minimum,1),e.status=1===s?null:s;var l=e.render(!a),u=l.querySelector(t.barSelector),d=t.speed,c=t.easing;return l.offsetWidth,o((function(r){""===t.positionUsing&&(t.positionUsing=e.getPositioningCSS()),n(u,i(s,d,c)),1===s?(n(l,{transition:"none",opacity:1}),l.offsetWidth,setTimeout((function(){n(l,{transition:"all "+d+"ms linear",opacity:0}),setTimeout((function(){e.remove(),r()}),d)}),d)):setTimeout(r,d)})),this},e.isStarted=function(){return"number"===typeof e.status},e.start=function(){e.status||e.set(0);var r=function(){setTimeout((function(){e.status&&(e.trickle(),r())}),t.trickleSpeed)};return t.trickle&&r(),this},e.done=function(t){return t||e.status?e.inc(.3+.5*Math.random()).set(1):this},e.inc=function(t){var s=e.status;return s?("number"!==typeof t&&(t=(1-s)*r(Math.random()*s,.1,.95)),s=r(s+t,0,.994),e.set(s)):e.start()},e.trickle=function(){return e.inc(Math.random()*t.trickleRate)},function(){var t=0,r=0;e.promise=function(s){return s&&"resolved"!==s.state()?(0===r&&e.start(),t++,r++,s.always((function(){r--,0===r?(t=0,e.done()):e.set((t-r)/t)})),this):this}}(),e.render=function(r){if(e.isRendered())return document.getElementById("nprogress");l(document.documentElement,"nprogress-busy");var i=document.createElement("div");i.id="nprogress",i.innerHTML=t.template;var o,a=i.querySelector(t.barSelector),u=r?"-100":s(e.status||0),d=document.querySelector(t.parent);return n(a,{transition:"all 0 linear",transform:"translate3d("+u+"%,0,0)"}),t.showSpinner||(o=i.querySelector(t.spinnerSelector),o&&c(o)),d!=document.body&&l(d,"nprogress-custom-parent"),d.appendChild(i),i},e.remove=function(){u(document.documentElement,"nprogress-busy"),u(document.querySelector(t.parent),"nprogress-custom-parent");var e=document.getElementById("nprogress");e&&c(e)},e.isRendered=function(){return!!document.getElementById("nprogress")},e.getPositioningCSS=function(){var e=document.body.style,t="WebkitTransform"in e?"Webkit":"MozTransform"in e?"Moz":"msTransform"in e?"ms":"OTransform"in e?"O":"";return t+"Perspective"in e?"translate3d":t+"Transform"in e?"translate":"margin"};var o=function(){var e=[];function t(){var r=e.shift();r&&r(t)}return function(r){e.push(r),1==e.length&&t()}}(),n=function(){var e=["Webkit","O","Moz","ms"],t={};function r(e){return e.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,(function(e,t){return t.toUpperCase()}))}function s(t){var r=document.body.style;if(t in r)return t;var s,i=e.length,o=t.charAt(0).toUpperCase()+t.slice(1);while(i--)if(s=e[i]+o,s in r)return s;return t}function i(e){return e=r(e),t[e]||(t[e]=s(e))}function o(e,t,r){t=i(t),e.style[t]=r}return function(e,t){var r,s,i=arguments;if(2==i.length)for(r in t)s=t[r],void 0!==s&&t.hasOwnProperty(r)&&o(e,r,s);else o(e,i[1],i[2])}}();function a(e,t){var r="string"==typeof e?e:d(e);return r.indexOf(" "+t+" ")>=0}function l(e,t){var r=d(e),s=r+t;a(r,t)||(e.className=s.substring(1))}function u(e,t){var r,s=d(e);a(e,t)&&(r=s.replace(" "+t+" "," "),e.className=r.substring(1,r.length-1))}function d(e){return(" "+(e.className||"")+" ").replace(/\s+/gi," ")}function c(e){e&&e.parentNode&&e.parentNode.removeChild(e)}return e}))},"365c":function(e,t,r){"use strict";r.d(t,"B",(function(){return u})),r.d(t,"u",(function(){return d})),r.d(t,"A",(function(){return c})),r.d(t,"C",(function(){return m})),r.d(t,"d",(function(){return g})),r.d(t,"D",(function(){return p})),r.d(t,"p",(function(){return f})),r.d(t,"k",(function(){return b})),r.d(t,"e",(function(){return h})),r.d(t,"x",(function(){return v})),r.d(t,"z",(function(){return y})),r.d(t,"c",(function(){return w})),r.d(t,"y",(function(){return $})),r.d(t,"o",(function(){return F})),r.d(t,"i",(function(){return R})),r.d(t,"j",(function(){return k})),r.d(t,"E",(function(){return _})),r.d(t,"r",(function(){return D})),r.d(t,"g",(function(){return I})),r.d(t,"a",(function(){return U})),r.d(t,"m",(function(){return C})),r.d(t,"q",(function(){return S})),r.d(t,"l",(function(){return q})),r.d(t,"f",(function(){return x})),r.d(t,"F",(function(){return z})),r.d(t,"t",(function(){return L})),r.d(t,"h",(function(){return V})),r.d(t,"b",(function(){return O})),r.d(t,"s",(function(){return j})),r.d(t,"n",(function(){return E})),r.d(t,"v",(function(){return A})),r.d(t,"w",(function(){return T}));var s=r("cebe"),i=r.n(s),o=r("323e"),n=r.n(o);r("a5d8");const a=i.a.create({baseURL:"http://127.0.0.1:8888/api/private/v1/",timeout:5e3});a.interceptors.request.use(e=>(n.a.start(),e.headers.Authorization=window.sessionStorage.getItem("token"),e),e=>Promise.reject(e)),a.interceptors.response.use(e=>{n.a.done();const t=e.data;return 200===e.status?t:Promise.reject(t)},e=>Promise.reject(e));var l=a;const u=e=>l.post("/login",e),d=()=>l.get("/menus"),c=e=>l.get("users",{params:e}),m=e=>l.put(`users/${e.id}/state/${e.mg_state}`),g=e=>l.post("/users",e),p=e=>l.get("/users/"+e),f=e=>l.put("/users/"+e.id,{email:e.email,mobile:e.mobile}),b=e=>l.delete("/users/"+e),h=(e,t)=>l.put(`users/${e}/role`,{rid:t}),v=e=>l.get("/rights/"+e),y=()=>l.get("/roles"),w=e=>l.post("/roles",e),$=e=>l.get("/roles/"+e),F=e=>l.put("/roles/"+e.roleId,{roleName:e.roleName,roleDesc:e.roleDesc}),R=e=>l.delete("/roles/"+e),k=(e,t)=>l.delete(`/roles/${e}/rights/${t}`),_=e=>l.post(`/roles/${e.roleId}/rights`,{rids:e.rids}),D=e=>l.get("/categories",{params:e}),I=e=>l.delete("/categories/"+e),U=e=>l.post("/categories",e),C=(e,t)=>l.put("/categories/"+e,{cat_name:t}),S=e=>l.get(`/categories/${e.cateId}/attributes`,{params:{sel:e.sel}}),q=(e,t)=>l.post(`categories/${e}/attributes`,t),x=e=>l.delete(`categories/${e.cat_id}/attributes/${e.attr_id}`),z=(e,t,r)=>l.put(`categories/${e}/attributes/${t}`,{attr_sel:r.attr_sel,attr_name:r.attr_name,attr_vals:r.attr_vals}),L=e=>l.get("/goods",{params:e}),V=e=>l.delete("goods/"+e),O=e=>l.post("/goods",e),j=e=>l.get("/goods/"+e),E=(e,t)=>l.put("/goods/"+e,t),A=e=>l.get("/orders",{params:e}),T=()=>l.get("reports/type/1")},a5d8:function(e,t,r){}}]);
//# sourceMappingURL=user.54ee3f12.js.map