<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像区域-->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!--头像区域-->
      <el-form
        class="login_form"
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="iconfont icon-account-fill"
            v-model="loginForm.username"
          >
          </el-input
        ></el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-password"
            v-model="loginForm.password"
            type="password"
          >
          </el-input
        ></el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: '123'
      },
      //   表单规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6-15个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6-15个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //   重置表单
    resetLoginForm () {
      //   console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return
        this.$http.post('./login', this.loginForm)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #272952;
  height: 100%;
  .login_box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 450px;
    height: 300px;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 5px;
    .avatar_box {
      box-sizing: border-box;
      height: 130px;
      width: 130px;
      border: 1px solid #ccc;
      border-radius: 50%;
      padding: 20px 15px 0;
      background-color: #eee;
      box-shadow: 0 0 10px #bbb;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        width: 100%;
      }
    }
    .login_form {
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 40px;
      .btns {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
