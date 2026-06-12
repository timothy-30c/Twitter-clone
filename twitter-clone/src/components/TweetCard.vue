<script setup>
defineProps({
    tweet: Object,
    deleteTweet: Function
})
</script>

<template>
  <div class="Tweet-card">
    <h3>{{ tweet.user.name }}</h3>

    <button @click="deleteTweet(tweet.id)">
        削除
        </button>
        <hr />
  </div>
</template>

<style scoped>
.Tweet-card {
    padding:10px;
}
</style>