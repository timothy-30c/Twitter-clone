<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const goRegister = () => {
  router.push("/register")
}

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
  <div><!--class="login-container">-->

    <h1>ログイン</h1>

    <input
      v-model="email"
      placeholder="メールアドレス(愛知工業大学のメールアドレスのみ登録可能)"
    />

    <br><br>

    <input
      v-model="password"
      type="password"
      placeholder="パスワード" 
    />
<!--パスワードは文字数や記号を含めるなどの制限のコメントが下に必要-->
    <br><br>

    <button @click="login">
      ログイン
    </button>
    
    <p class="register-link">
      アカウントをお持ちでないですか？
      <span @click="goRegister">
        新規登録
      </span>
    </p>

    <br><br>

    <!-- 仮ボタン -->
    <button @click="goTimeline">
      タイムラインへ（仮）
    </button>

  </div>
</template>

<style scoped>

  input{
    width: 100%;
    max-width: 820px;
    height: 74px;
    display: block;
    margin: 20px auto;
    padding: 0 28px;
    box-sizing: border-box;
    border-radius: 22px;
    border: 1px solid#d4d7de;
    background: linear-gradient(180deg,#ffffff,#f7f8fb);
    font-size: 24px;
    color: #262626;
    transition: 0.2s;
    box-shadow: inset 0 1px 2px rgba(255,255,255,0.9),0 2px 10px rgba(0,0,0,0.03);
  }
  input::placeholder{
    color: #8e8e93;
  }
  input:focus{
    outline: none;
    background: white;
    border: 2px solid#0095f6;
    box-shadow: 0 0 0 5px rgba(0,149,246,0.12);
  }
  button{
    width: 50%;
    max-width: 820px;
    height: 74px;
    display: block;
    margin: 28px auto 0;
    border: none;
    border-radius: 999px;
    background: linear-gradient(180deg,#498cd9,#2f6fd6);
    color: white;
    font-size: 28px;
    font-weight: 700;
    cursor: pointer;
    transition: 0.2s;
    box-shadow: 0 6px 18px rgba(0,95,246,0.18);
  }
  button:hover{
    transform: translateY(-1px);
    background: linear-gradient(180deg,#2a6fe0,#1659c0);
  }
  button:active{
    transform: scale(0.985);
  }
  .register-link{
    margin-top: 30px;
    text-align: center;
    color: #d1d5db;
    font-size: 16px;
  }
  .register-link span{
    color: #0095f6;
    font-weight: 700;
    cursor: pointer;
  }
  .register-link span:hover{
    text-decoration: underline;
  }

</style>

<!--
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
-->