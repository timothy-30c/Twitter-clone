<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const login = async () =>{
    const response = await fetch(
        'http://localhost:3000/login',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
          }
        )
        const data = await response.json()
        
        localStorage.setItem(
            'token',
            data.token
        )
        console.log('保存完了')
}
</script>

<template>
    <div>
        <h1>ログイン</h1>
        
        <input
          v-model="email"
          placeholder="メールアドレス(t○○○○○tt@aitech.ac.jp)"
          />

    <br>

    <input
      v-model="password"
      type="password"
      placeholder="パスワード"
      />
    
    <br>

    <button @click="login">
        ログイン
    </button>

    </div>   
</template>