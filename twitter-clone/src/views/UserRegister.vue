<template>
    <div class="register-page">
        <RegisterForm />
    </div>
</template>

<script setup>
import RegisterForm from '../components/RegisterForm.vue'
</script>

<style scoped>
.register-page{
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg, #111111, #1b1b1b, #000000);
    padding: 40px;
}
</style>



















<!--<template>

    <div class="register-box">

        <h1>新規登録</h1>

        <input

        />

        <input
        v-model = "name"
        type = "text"
        placeholder = "ユーザー名"
        />

        <input
        v-model = "email"
        type = "email"
        placeholder = "メールアドレス(愛知工業大学のメールアドレスのみ登録可能)"

        />

        <br><br>

        <input
        v-model = "password"
        type = "password"
        placeholder = "パスワード" 
        />

        <button @click = "register">
            アカウント作成
        </button>

    </div>

</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const email = ref('')
const password = ref('')





</script>-->


