<template>
  <div>

    <!--      顶部导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <div>

        <!--        添加角色区域-->
        <el-row>
          <el-col>
            <el-button type="primary" @click="addRoleDialogVisible = true">添加角色</el-button>
          </el-col>
        </el-row>

        <!--        列表区域-->
        <el-table border stripe :data="rolesList">
          <el-table-column type="expand">
            <template v-slot:default="scope">

              <el-row :class="['bdbottom', i === 0 ? 'bdtop' : '', 'vcenter']" v-for="(item, i) in scope.row.children"
                      :key="item.id">

                <!--                渲染一级权限-->
                <el-col :span='4' :offset="1">
                  <el-tag closable @close="removeRightbyId(scope.row,item.id)">{{ item.authName }}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>

                <!--                渲染二级/ 三级权限  -->
                <el-col :span='19'>
                  <el-row :class="[si === (item.children.length-1) ? '' : 'bdbottom', 'vcenter']"
                          v-for="(sitem, si) in item.children" :key="sitem.id">
                    <el-col :span="6">
                      <el-tag type="success" closable @close="removeRightbyId(scope.row,sitem.id)">{{
                          sitem.authName
                        }}
                      </el-tag>
                      <i class="el-icon-caret-right"></i>
                    </el-col>

                    <el-col :span="18">

                      <el-tag closable
                              type="warning"
                              v-for="(titem) in sitem.children"
                              :key="titem.id" @close="removeRightbyId(scope.row,titem.id)">{{ titem.authName }}
                      </el-tag>
                    </el-col>

                    <el-row></el-row>
                  </el-row>


                </el-col>

              </el-row>

            </template>
          </el-table-column>
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column label="角色名称" prop="roleName"></el-table-column>
          <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
          <el-table-column label="操作">
            <template v-slot:default="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="editRoleInfo(scope.row.id)">编辑
              </el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteRoleAction(scope.row.id)">删除
              </el-button>
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRightDialog(scope.row)">分配权限
              </el-button>
            </template>
          </el-table-column>

        </el-table>

        <!--        添加角色弹框-->
        <el-dialog
                title="添加角色"
                :visible.sync="addRoleDialogVisible"
                width="50%" @close="addRoleDialogClose">

          <el-form :model="addRole"
                   :rules="addRoleRules"
                   ref="addRoleRef"
                   label-width="100px">
            <el-form-item label="权限名称" prop="roleName">
              <el-input clearable v-model="addRole.roleName"></el-input>
            </el-form-item>

            <el-form-item label="权限描述" prop="roleDesc">
              <el-input clearable v-model="addRole.roleDesc"></el-input>
            </el-form-item>
          </el-form>

          <span slot="footer">
            <el-button @click="addRoleDialogClose">取 消</el-button>
            <el-button type="primary" @click="commitAddRoleInfo">确 定</el-button>
          </span>
        </el-dialog>

        <!--        编辑角色弹框-->
        <el-dialog title="修改角色"
                   :visible.sync="editRoleDialogVisible"
                   width="50%" @close="editRoleDialogClose">
          <el-form :model="editRole"
                   :rules="editRoleRules"
                   ref="editRoleRef"
                   label-width="100px">
            <el-form-item label="权限名称" prop="roleName">
              <el-input clearable v-model="editRole.roleName"></el-input>
            </el-form-item>

            <el-form-item label="权限描述" prop="roleDesc">
              <el-input clearable v-model="editRole.roleDesc"></el-input>
            </el-form-item>
          </el-form>

          <span slot="footer">
            <el-button @click="editRoleDialogClose">取 消</el-button>
            <el-button type="primary" @click="commitEditRoleInfo">确 定</el-button>
          </span>
        </el-dialog>


        <!--        修改权限弹框 @node-click="handleNodeClick"-->
        <el-dialog
                title="修改权限"
                :visible.sync="editRightDialogVisible"
                width="50%" @close="editRightDialogClose">

          <!-- 树形控件-->
          <el-tree :data="rightList"
                   :props="treeProps"
                   show-checkbox
                   node-key="id"
                   default-expand-all
                   :default-checked-keys="defkeys" ref="treeRef"></el-tree>

          <span slot="footer">
            <el-button @click="editRightDialogClose">取 消</el-button>
            <el-button type="primary" @click="commitEditRightInfo">确 定</el-button>
          </span>
        </el-dialog>


      </div>

    </el-card>

  </div>
</template>

<script>
import {
  getRoles,
  addRole,
  getRole,
  editRoleApi,
  deleteRole,
  deleteRoleRight,
  getRights,
  setRoleRight,
} from "@/api";

export default {
  name: "Roles",

  created() {
    this.getRolesList()
  },

  data() {
    return {
      rolesList: [],
      addRoleDialogVisible: false,
      addRole: {
        roleName: '',
        roleDesc: ''
      },
      addRoleRules: {
        roleName: [
          {required: true, message: "请输入权限名称", trigger: "blur"},
          {min: 2, max: 20, message: "权限名称的长度在1-20个字符之间", trigger: "blur"}
        ],
        roleDesc: [
          {required: false, message: "请输入权限描述", trigger: "blur"},
          {min: 3, max: 20, message: "权限描述的长度在3-20个字符之间", trigger: "blur"}
        ]
      },

      editRoleDialogVisible: false,
      editRole: {},
      editRoleRules: {
        roleName: [
          {required: true, message: "请输入权限名称", trigger: "blur"},
          {min: 2, max: 20, message: "权限名称的长度在1-20个字符之间", trigger: "blur"}
        ],
        roleDesc: [
          {required: false, message: "请输入权限描述", trigger: "blur"},
          {min: 3, max: 20, message: "权限描述的长度在3-20个字符之间", trigger: "blur"}
        ]
      },
      editRightDialogVisible: false,
      rightList: [],
      treeProps: {
        children: 'children',
        label: 'authName'
      },
      defkeys: [],
      giveRoleForm: {
        roleId: 0,
        rids: ''
      }

    }
  },

  methods: {
    //   获取角色类表信息
    async getRolesList() {
      const result = await getRoles()
      if (result.meta.status != 200) return this.$message.error(result.meta.msg)
      this.rolesList = result.data
    },

    // 关闭弹框
    addRoleDialogClose() {
      this.$refs.addRoleRef.resetFields()
      this.addRoleDialogVisible = false
    },

    // 提交信息
    commitAddRoleInfo() {
      this.$refs.addRoleRef.validate((valid) => {
        if (!valid) {
          return this.$message.error('输入信息有误，请确认后重试')
        }
        this.addRoleAction()
      })
    },

    //   添加角色
    async addRoleAction() {
      const result = await addRole(this.addRole)
      if (result.meta.status != 201) return this.$message.error(result.meta.msg)
      await this.getRolesList()
      this.addRoleDialogClose()
    },

    // 编辑角色
    async editRoleInfo(roleId) {
      this.editRoleDialogVisible = true
      //   获取信息
      const roleInfo = await getRole(roleId)
      if (roleInfo.meta.status !== 200) return this.$message.error(roleInfo.meta.msg)
      this.editRole = roleInfo.data

    },

    // 关闭弹框
    editRoleDialogClose() {
      this.$refs.editRoleRef.resetFields()
      this.editRoleDialogVisible = false
    },

    commitEditRoleInfo() {
      this.$refs.editRoleRef.validate(async (valid) => {
        if (!valid) {
          return this.$message.error('输入信息有误，请检查后重试')
        }
        const result = await editRoleApi(this.editRole)
        if (result.meta.status != 200) return this.$message.error(result.meta.msg)
        this.$message.success(result.meta.msg)
        await this.getRolesList()
        this.editRoleDialogClose()
      })
    },

    //   删除 Role
    deleteRoleAction(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const result = await deleteRole(id)
        if (result.meta.status != 200) return this.$message.error(result.meta.msg)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        await this.getRolesList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // 删除权限
    removeRightbyId(role, rightId) {
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const result = await deleteRoleRight(role.id, rightId)
        if (result.meta.status != 200) return this.$message.error(result.meta.msg)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        role.children = result.data
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // 分配权限
    async showSetRightDialog(role) {
      const result = await getRights('tree')
      if (result.meta.status != 200) return this.$message.error(result.meta.msg)
      this.rightList = result.data
      this.getLeafKeys(role, this.defkeys)
      this.giveRoleForm = {roleId: role.id, rids: this.defkeys.join(',')}
      this.editRightDialogVisible = true
    },

    // 关闭修改权限弹框
    editRightDialogClose() {
      this.editRightDialogVisible = false
      this.defkeys = []
      this.giveRoleForm = {}
    },

    // 提交修改权限数据
    async commitEditRightInfo() {
      const keys = [...this.$refs.treeRef.getCheckedKeys(), ...this.$refs.treeRef.getHalfCheckedKeys()]
      this.giveRoleForm.rids = keys.join(',')
      const result = await setRoleRight(this.giveRoleForm)
      if (result.meta.status != 200) return this.$message.error(result.meta.msg)
      this.$message.success(result.meta.msg)
      await this.getRolesList()
      this.editRightDialogClose()

    },

    getLeafKeys(node, keys) {
      if (!node.children) {
        return keys.push(node.id)
      }

      node.children.forEach(item => this.getLeafKeys(item, keys))
    }
  },
}
</script>

<style lang="less" scoped>

.el-tag {
  margin-top: 15px;
  margin-bottom: 15px;
  margin-right: 15px;
}

.col-left {
  margin-left: 50px;
}

.vcenter {
  display: flex;
  align-items: center;
}

</style>