<template>

  <div class="welcome">

    <!--左６０％-->
    <section class="intro">

      <div class="intro-content">

      <h1>
      Twitter Clone
      </h1>

      <p>
      思ったことを、すぐ共有。
      </p>

      </div>

      <div class="description">
      友達の投稿を見て、学校の様子をのぞいてみよう。
      </div>

    </section>

    <section class="login">
      
      <LoginView />

    </section>

  </div>

</template>


<script setup>

  import LoginView from "./LoginView.vue"

</script>


<style scoped>

  .welcome{
    display: flex;
    height: 100vh;
    background: #fafafa;
  }
  
  .intro{
    display: flex;
    flex: 6;
    justify-content: center;
    align-items: center;
    padding:60px;
    background: linear-gradient(180deg,#ffffff,#f6f8fb);
  }

  .intro-content{
    max-width: 600px;
  }

  .intro h1{
    font-size: 72px;
    font-weight: 900;
    margin-bottom: 24px;
    color: #111;
    text-shadow: 0 4px 16px rgba(0,0,0,0.15);
  }

  .intro p{
    font-size: 42px;
    margin-bottom: 18px;
    color: #222;
    text-shadow: 0 4px 16px rgba(0,0,0,0.15)
  }
  
  .description{
    font-size: 42px;
    line-height: 2;
    color: #666;
    text-shadow: 0 4px 16px rgba(0,0,0,0.15)
  }

  .login{
    display: flex;
    flex: 4;
    justify-content: center;
    align-items: center;
    padding: 40px;
    border-left: 1px solid #e5e7eb;
    background: white;
    }

</style>
























<!--前のやつの記録
<template>
  <div class="home">

    <header class="top-header">

     <button
     class="profile-button"
     @click="goProfile">

     <div class="profile-icon">

      <div class="head"></div>
      <div class="body"></div>

     </div>

     </button>

  
    <div class ="logo">

    Twitter Clone
    
    </div>


    <button
    class="logout-button"
    @click="logout">

    ログアウト

    </button>

    </header>

    <div class="content">

      <TimeLine />

    </div>
  
  </div>

</template>

<script setup>
 import TimeLine from "./TimeLine.vue"
 import { useRouter } from "vue-router"

  const router = useRouter()

  function goProfile(){
    router.push(
      "/profile")

  }
  
  function logout(){

    localStorage.removeItem(
      "token")

    router.push(
      "/login")

  }


</script>

<style scoped>

.home{
  min-height: 100vh;
  background: linear-gradient(180deg,#f6f7fb,#edf2f7);
}

.top-header{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(255,255,255,0.2);
  z-index: 1000;
}

.logo{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 34px;
  font-weight: 900;
  padding: 10px 26px;
  border-radius: 18px;
  color: #d7d7d7;
  background: linear-gradient(145deg,#050505,#242424,#111111);
  background-image: linear-gradient(145deg,#111,#222),
                    linear-gradient(110deg,transparent 42%,rgba(255,255,255,0.08)44%,transparent 46%),
                    linear-gradient(80deg,transparent 68%,rgba(255,255,255,0.1)70%,transparent 72%);
  box-shadow: inset -4px -4px 10px rgba(255,255,255,0.05),
              inset 6px 6px 18px rgba(0,0,0,0.9),0 10px 20px rgba(0,0,0,0.4);
  letter-spacing: 2px;
  text-transform: uppercase;
  text-shadow: 0 1px 1px rgba(255,255,255,0.08),0 5px 15px rgba(0,0,0,0.9);
}

.profile-button{
  position: absolute;
  left: 20px;
  width: 58px;
  height: 58px;
  border: none;
  background: none;
  cursor: pointer;
}

.profile-icon{
  position: relative;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: #cfd4db;
  overflow: hidden;
}

.head{
  position: absolute;
  top: 11px;
  left: 50%;
  transform: translateX(-50%);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
}

.body{
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 36px;
  height:24px;
  background: white;
  border-radius: 50% 50% 0 0;
}

.logout-button{
  position: absolute;
  right: 20px;
  width: 90px;
  height: 34px;
  border: none;
  border-radius: 999px;
  background: rgba(239,68,68,0.92);
  color: white;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.logout-button:hover{
  transform: scale(1.05);  
}

.content{
  padding-top: 120px;
  display: flex;
  justify-content: center;
}

</style>-->