<script setup>
import {ref, onMounted } from 'vue'
import TweetCard from './components/TweetCard.vue'
const tweets = ref([])
const newTweet = ref('')
const fetchTweets = async () => {
    const response = await fetch('http://localhost:3000/tweets')
    const data = await response.json()
    tweets.value = data
}
const createTweet = async () => {
    await fetch('http://localhost:3000/tweets',{
        method: 'POST',

        headers: {
            'content-Type': 'application/json'
           },

           body: JSON.stringify({
             tweet: {
                body: newTweet.value
             }
        })
    })

    newTweet.value = ''
       
    fetchTweets()
}
onMounted(() => {
    fetchTweets()
})
const deleteTweet = async (id) =>{
    await fetch(`http://localhost:3000/tweets/${id}`, {
        method:'DELETE'
    })
    tweets.value = tweets.value.filter(
    tweet => tweet.id !==id
    )
}
</script>

<template>
    <div>
        <h1>Twetter Clone</h1>

        <input
        v-model="newTweet"
        placeholder="今なにしてる？"
        />
      <button @click="createTweet">
        投稿
      </button>

      <hr />

      <TweetCard
      v-for="tweet in tweets"
      :key="tweet.id"
      :tweet="tweet"
      :deleteTweet="deleteTweet"
      />
    </div>
</template>