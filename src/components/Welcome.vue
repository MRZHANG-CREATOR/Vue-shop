<template>
  <div>
    <h1>Welcome</h1>
  </div>
</template>

<script>
export default {
  created() {
    window.sessionStorage.removeItem('activePath')
  }
}
</script>

<style lang="less" scoped></style>
