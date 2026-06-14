<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')

const router = useRouter()

const login = async () => {
  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const data = await response.json()

    if (!response.ok) {
      alert('ログイン失敗')
      return
    }

    localStorage.setItem('token', data.token)

    console.log('保存完了')

    // ★ログイン成功したら自動遷移（本命）
    router.push('/timeline')

  } catch (err) {
    console.error(err)
    alert('エラーが発生しました')
  }
}

// ★仮ボタン
const goTimeline = () => {
  router.push('/timeline')
}
</script>

<template>
  <div class="login-container">

    <h1>ログイン</h1>

    <input
      v-model="email"
      placeholder="メールアドレス(t○○○○○tt@aitech.ac.jp)"
    />

    <br><br>

    <input
      v-model="password"
      type="password"
      placeholder="パスワード"
    />

    <br><br>

    <button @click="login">
      ログイン
    </button>

    <br><br>

    <!-- 仮ボタン -->
    <button @click="goTimeline">
      タイムラインへ（仮）
    </button>

  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 80px auto;
  padding: 30px;

  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(10px);

  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.1);

  text-align: center;
}

input {
  width: 100%;
  padding: 10px;
  margin: 5px 0;

  border-radius: 8px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 16px;
  border-radius: 8px;
  border: none;

  background: #1d9bf0;
  color: white;

  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  opacity: 0.9;
}
</style>