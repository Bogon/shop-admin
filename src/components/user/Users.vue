<template>
  <div>
    <!--    面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--    卡片试图-->
    <el-card>
      <div>
        <!--     搜索区域   -->
        <el-row :gutter="15">
          <el-col :span="7">
            <el-input
                    clearable
                    placeholder="请输入内容"
                    v-model="queryInfo.query"
                    @change="getUsersList"
                    @clear="getUsersList">
              <el-button slot="append" icon="el-icon-search" @click="getUsersList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
          </el-col>
        </el-row>

        <!--        用户列表区域-->
        <el-table :data="userList" border stripe>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="姓名" prop="username"></el-table-column>
          <el-table-column label="邮箱" prop="email"></el-table-column>
          <el-table-column label="电话" prop="mobile"></el-table-column>
          <el-table-column label="角色" prop="role_name"></el-table-column>
          <el-table-column label="状态">
            <template v-slot:default="scope">
              <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot:default="scope">
              <!--              {{scope}}-->
              <!--              修改按钮-->
              <el-button type="primary" icon="el-icon-edit" size="mini"
                         @click="showEditDialog(scope.row.id)"></el-button>
              <!--              删除按钮-->
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.id)"></el-button>
              <!--              分配角色按钮-->
              <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <!--        分页-->
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[2, 10, 20, 50]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>

        <!--        添加用户对话框信息-->
        <el-dialog
                title="添加用户"
                :visible.sync="addDialogVisible"
                width="50%" @close="addDislogClosed">

          <el-form :model="addForm"
                   :rules="addFromRules"
                   ref="addFormRef"
                   label-width="70px">
            <el-form-item label="用户名" prop="username">
              <el-input clearable v-model="addForm.username"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input clearable v-model="addForm.password" type="password"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
              <el-input clearable v-model="addForm.email" type="email"></el-input>
            </el-form-item>

            <el-form-item label="手机" prop="mobile">
              <el-input clearable v-model="addForm.mobile" type="mobile"></el-input>
            </el-form-item>

          </el-form>

          <!--          底部区域-->
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDislogClosed">取 消</el-button>
            <el-button type="primary" @click="commitUserInfo">确 定</el-button>
          </span>
        </el-dialog>

        <!--        修改用户对话框信息-->
        <el-dialog
                title="修改用户信息"
                :visible.sync="editDialogVisible"
                width="50%"
                @close="editDialogClosed">

          <!--          修改用户内容区域-->
          <el-form
                  :model="editForm"
                  :rules="eidtRules"
                  ref="editRuleFormRef"
                  label-width="70px">

            <el-form-item label="用户名" prop="username">
              <el-input v-model="editForm.username" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
              <el-input v-model="editForm.email"></el-input>
            </el-form-item>

            <el-form-item label="手机" prop="mobile">
              <el-input v-model="editForm.mobile"></el-input>
            </el-form-item>

          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogClosed">取 消</el-button>
            <el-button type="primary" @click="commitEditInfo">确 定</el-button>
          </span>
        </el-dialog>

      </div>
    </el-card>


  </div>
</template>

<script>
import {
  getUserList,
  modifyUserStatus,
  addUser,
  queryUser,
  editUser,
  deleteUser,
} from "@/api";

export default {
  name: "Users",

  created() {
    this.getUsersList()
  },

  data() {

    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2,
      },
      userList: [],
      total: 0,
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      addFromRules: {
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"},
          {min: 3, max: 20, message: "用户名的长度在3-20个字符之间", trigger: "blur"}
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"},
          {min: 6, max: 20, message: "密码的长度在6-20个字符之间", trigger: "blur"}
        ],
        email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ],
        mobile: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur'}
        ]
      },
      // 显示/隐藏
      editDialogVisible: false,
      editForm: {
        username: '',
        email: '',
        mobile: '',
        id: ''
      },
      eidtRules: {
        email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ],
        mobile: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur'}
        ]
      }
    }
  },

  methods: {
    async getUsersList() {
      const result = await getUserList(this.queryInfo)
      if (result.meta.status !== 200) return this.$message.error(result.meta.msg)
      this.userList = result.data.users
      this.total = result.data.total
    },

    // 监听 size 改变
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUsersList()
    },

    // 修改page
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getUsersList()

    },

    // 状态改变
    async userStateChange(userInfo) {
      const result = await modifyUserStatus(userInfo)
      if (result.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error("更改用户状态失败")
      }
      this.$message.success("更新用户状态成功")
      console.log(result)
    },

    //  提交创建用户信息
    commitUserInfo() {
      this.$refs.addFormRef.validate((valid) => {
        console.log(valid)
        if (!valid) {
          return this.$message.error('参数错误，请检查后重试')
        }
        //   提交新增信息
        this.addUserAction()
      })
    },

    // 关闭对话框
    addDislogClosed() {
      this.$refs.addFormRef.resetFields()
      this.addDialogVisible = false
    },

    async addUserAction() {
      const result = await addUser(this.addForm)

      if (result.meta.status != 201) {
        return this.$message.error(result.meta.msg)
      }

      this.$message.success(result.meta.msg)
      await this.getUsersList()
      this.$refs.addFormRef.resetFields()
      this.addDialogVisible = false

    },

    // 修改用户信息
    async showEditDialog(id) {
      this.editDialogVisible = true
      console.log(id)
      const userInfo = await queryUser(id)
      if (userInfo.meta.status != 200) {
        return this.$message.error(userInfo.meta.msg)
      }

      this.editForm.id = userInfo.data.id
      this.editForm.username = userInfo.data.username
      this.editForm.email = userInfo.data.email
      this.editForm.mobile = userInfo.data.mobile

    },

    // 关闭编辑信息对话框
    editDialogClosed() {
      this.$refs.editRuleFormRef.resetFields()
      this.editDialogVisible = false
    },

    // 提交修改用户信息
    commitEditInfo() {

      this.$refs.editRuleFormRef.validate((valid) => {
        if (!valid) {
          return this.$message.error('用户信息有误，请检查后重试')
        }
        this.editUserAction()
      })

    },

    async editUserAction() {
      const result = await editUser(this.editForm)
      console.log(result)
      if (result.meta.status != 200) return this.$message.error(result.meta.msg)
      this.$message.success(result.meta.msg)
      this.editDialogClosed()
      //   更新列表信息
      await this.getUsersList()

    },

    // 删除用户
    deleteUser(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteUserAction(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    async deleteUserAction(id) {
      const result = await deleteUser(id)
      if (result.meta.status != 200) return this.$message.error(this.meta.msg)
      await this.getUsersList()
      this.$message({type: 'success', message: '删除成功!'});
    }

  }
}
</script>

<style lang="less" scoped>

</style>