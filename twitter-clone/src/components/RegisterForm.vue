<template>
 <div class="register-container">  

  <h1 class="title">
     Twitter Clone 
  </h1>

  <p class="sub-title">
    カウントを作成して始めましょう
  </p>

   <div class="register-card">

    <input
     v-model="name"
     type="text"
     placeholder="名前"
    >
    <input
     v-model="username"
     type="text"
     placeholder="ユーザー名"
    >
    <input
     v-model="email"
     type="email"
     placeholder="メールアドレス（t○○○○○@aitech.ac.jp）"
    >
    <input
     v-model="password"
     type="password"
     placeholder="パスワード"
    >
    <input
     v-model="password_confirmation"
     type="password"
     placeholder="パスワード（確認）"
    >

    <select v-model="grade" required>
      <option value="" disabled hidden>学年</option>

      <option value="1">1年</option>
      <option value="2">2年</option>
      <option value="3">3年</option>
      <option value="4">4年</option>
    </select>

    

    <input
     v-model="birthday"
     :type="birthdayType"
     :placeholder="birthdayType === 'text' ? '誕生日' : ''"
     @focus="birthdayType = 'date'"
     @blur="changeBirthdayType"
    />
    
    <button @click="register">
        登録する
    </button>
    
   </div>

   <p class="login-link">
    すでにアカウントをお持ちですか？

    <span @click="goLogin">
        ログイン
    </span>

   </p>

 </div>

</template>

<script setup>

 import { ref } from "vue"
 import { useRouter } from "vue-router"
 
 const name = ref("")
 const username = ref("") 
 const email = ref("")
 const password = ref("")
 const password_confirmation = ref("")
 const grade = ref("")
 const birthday = ref("")
 const birthdayType = ref("text")
 const router = useRouter()
 import axios, { HttpStatusCode } from "axios"

 const register = async () =>{
   try {
      const response = await axios.post(
         "http://localhost:3000/users",
         {
            user: {
               name: name.value,
               username: username.value,
               email: email.value,
               password: password.value,
               password_confirmation: password_confirmation.value,
               grade: grade.value,
               birthday: birthday.value,
            }
         }
      )

      alert(response.data.mesage)

      router.push("/login")
   } catch (error) {
      if (error.response) {
         if (error.response.data.errors) {
            alert(error.response.data.errors.join("\n"))
         }  else if (error.response.data.error) {
            alert(error.response.data.error)
         }
      } else {
         alert("サーバーに接続できませんでした。")
      }
   console.error(error)
   }
 }

 const changeBirthdayType = () => {
   if (birthday.value === "") {
      birthdayType.value = "text"
   }
 }
 const goLogin = () => {
   router.push("/login")
 }


</script>

<style scoped>
 .register-container{
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg,#0f1016,#171821,#1b1c26);
    padding: 40px;
 } 
 .title{
    color: white;
    font-size: 64px;
    font-weight: 900;
    margin-bottom: 20px;
    text-shadow: 0 4px 20px rgba(0,0,0,0.35);
 }
 .sub-title{
    font-size: 20px;
    color: #d1d5db;
    margin-bottom: 40px;
    text-align: center;
    line-height: 1.6;
 }
 .register-card{
    width: 100%;
    max-width: 520px;
    padding: 40px;
    border-radius: 20px;
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(18px);
    border: 1px solid rgba(255,255,255,0.12);
    box-shadow: 0 12px 35px rgba(0,0,0,0,45);
 }
 input{
    width: 100%;
    height: 60px;
    padding: 0 18px;
    margin-bottom: 18px;
    box-sizing: border-box;
    border: 1px solid #3f3f46;
    border-radius: 12px;
    background: rgba(255,255,255,0.05);
    color: white;
    font-size: 17px;
    outline: none;
    transition: 0.2s;
 }
 input:focus{
    border-color: #0095f6;
    box-shadow: 0 0 0 3px rgba(0,149,246,0.15);
    background: rgba(255,255,255,0.08)
 }
 select{
    width: 100%;
    height: 60px;
    padding: 0 18px;
    margin-bottom: 18px;
    box-sizing: border-box;
    border: 1px solid #3f3f46;
    border-radius: 12px;
    background: rgba(255,255,255,0.05);
    color: #9ca3af;
    font-size: 17px;
    outline: none;
    transition: 0.2s;
    appearance: none;
 }
 select:focus{
    border-color: #0095f6;
    box-shadow: 0 0 0 3px rgba(0,149,246,0.15);
 }
 select option{
    background: white;
    color: black;
 }

 select option[value=""]{
    color: #9ca3af;
}

 select:valid{
   color: white;
 }
 button{
    width: 100%;
    height: 60px;
    border: none;
    border-radius: 12px;
    background: #0095f6;
    color: white;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    transition: 0.2s;    
 }
 button:hover{
    background: #0081d6;   
 }
 button:active{
    transform:scale(0.98);
 }
 .login-link{
    margin-top:30px;
    color: #d1d5db;
    font-size: 16px;
 }

 
</style>