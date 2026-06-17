<template>
  <div class="timeline">

    <button
      class="post-button"
      @click="showTweetModal = true"
    >
      投稿
    </button>

    <TweetCard
      v-for="tweet in tweets"
      :key="tweet.id"
      :tweet="tweet"
      @open="openModal"
      @update="updateTweet"
    />

    <transition name="modal">
      <TweetForm
        v-if="showTweetModal"
        @close="showTweetModal = false"
        @posted="handlePosted"
      />
    </transition>

    <transition name="modal">
      <TweetModal
        v-if="selectedTweet"
        :tweet="selectedTweet"
        @close="selectedTweet = null"
        @update="updateTweet"
      />
    </transition>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import TweetForm from '../components/TweetForm.vue'
import TweetCard from '../components/TweetCard.vue'
import TweetModal from '../components/TweetModal.vue'

const tweets = ref([])
const selectedTweet = ref(null)
const showTweetModal = ref(false)


const fetchTweets = async () => {
  const res = await axios.get('http://localhost:3000/tweets', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })

  tweets.value = res.data
}

const updateTweet = (updated) => {
  const index = tweets.value.findIndex(t => t.id === updated.id)
  if (index === -1) return

  tweets.value[index] = {
    ...tweets.value[index],
    ...updated
  }

  // Vue強制更新（重要）
  tweets.value = [...tweets.value]

  // モーダルも完全同期
  if (selectedTweet.value?.id === updated.id) {
    selectedTweet.value = {
      ...selectedTweet.value,
      ...updated
    }
  }
}

const openModal = async (tweet) => {
  const res = await axios.get(
    `http://localhost:3000/tweets/${tweet.id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  )

  selectedTweet.value = res.data
}


const handlePosted = () => {
  showTweetModal.value = false
  fetchTweets()
}

onMounted(() => {
  fetchTweets()
})
</script>

<style scoped>
.timeline {
  max-width: 600px;
  margin: auto;
  min-height: 100vh;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  background: white;
  position: relative;
  padding-top: 80px;

  @keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
}

.post-button {
  position: fixed;
  bottom: 20px;
  right: 250px;
  width: 120px;
  height: 45px;
  border-radius: 9999px;
  border: 1px solid rgba(255,255,255,0.25);
  background: rgba(29, 155, 240, 0.65);
  backdrop-filter: blur(10px);
  color: white;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 6px 15px rgba(0,0,0,0.25);
  z-index: 1000;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: scale(1);
}

.timeline::before {
  content: "";
  position: fixed;
  inset: 0;

  background: linear-gradient(
    -45deg,
    #60a5fa,
    #a78bfa,
    #34d399,
    #60a5fa
  );

  background-size: 400% 400%;
  animation: gradientMove 15s ease infinite;

  opacity: 0.15;
  z-index: -1;
}
</style>