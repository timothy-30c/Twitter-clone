<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() =>{
  const token =
  localStorage.getItem('token')
  if (!token) {
    router.push('/login')
  }

  console.log(token)
})
</script>
<template>
  <div>
    <h1>ホーム</h1>
    </div>
  </template>


