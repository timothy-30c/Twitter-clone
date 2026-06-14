<template>
  <div class="tweet-card" @click="emit('open', localTweet)">

    <div class="tweet-header">
      <strong>{{ localTweet.user.name }}</strong>

      <span class="username">
        @{{ localTweet.user.username }}
      </span>
    </div>

    <div class="tweet-body">
      {{ localTweet.body }}
    </div>

    <div class="tweet-actions">

      <button class="reply-btn" @click.stop="replyTweet">
        <MessageCircle :size="18" />
        <span>{{ localTweet.replies_count || 0 }}</span>
      </button>

      <button class="retweet-btn" @click.stop="toggleRetweet">
        <Repeat2 :size="18" :class="{'rotate-retweet': rtAnim}" />
        <span>{{ localTweet.retweets_count || 0 }}</span>
      </button>

      <button class="like-btn" @click.stop="toggleLike">
        <Heart
          :size="18"
          :fill="localTweet.liked ? 'red' : 'none'"
          :class="{ 'icon-pop': likeAnim }"
        />
        <span>{{ localTweet.likes_count || 0 }}</span>
      </button>

      <button class="delete-btn" @click.stop="deleteTweet(localTweet.id)">
        <Trash2 :size="18" />
      </button>

    </div>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import api from '@/api/axios'
import {
  Heart,
  MessageCircle,
  Repeat2,
  Trash2
} from 'lucide-vue-next'

const props = defineProps({
  tweet: Object,
  deleteTweet: Function
})

const emit = defineEmits(['open', 'update'])

const localTweet = ref({ ...props.tweet })

watch(
  () => props.tweet,
  (newVal) => {
    localTweet.value = { ...newVal }
  }
)

const likeAnim = ref(false)

const toggleLike = async () => {
  likeAnim.value = true
  setTimeout(() => (likeAnim.value = false), 250)

  const isLiked = localTweet.value.liked

  const res = isLiked
    ? await api.delete(`/tweets/${localTweet.value.id}/like`)
    : await api.post(`/tweets/${localTweet.value.id}/like`)

  localTweet.value.likes_count = res.data.likes_count
  localTweet.value.liked = !isLiked

  emit('update', {
    id: localTweet.value.id,
    likes_count: localTweet.value.likes_count,
    liked: localTweet.value.liked
  })
}

const toggleRetweet = async () => {
  rtAnim.value = true
  setTimeout(() => (rtAnim.value = false), 450)

  const isRt = localTweet.value.retweeted

  const res = isRt
    ? await api.delete(`/tweets/${localTweet.value.id}/retweet`)
    : await api.post(`/tweets/${localTweet.value.id}/retweet`)

  localTweet.value.retweets_count = res.data.retweets_count
  localTweet.value.retweeted = !isRt

  emit('update', {
    id: localTweet.value.id,
    retweets_count: localTweet.value.retweets_count,
    retweeted: localTweet.value.retweeted
  })
}

const replyTweet = async () => {
  const text = prompt('返信')
  if (!text) return

  await api.post(`/tweets/${localTweet.value.id}/reply`, {
    body: text
  })

  localTweet.value.replies_count =
    (localTweet.value.replies_count || 0) + 1

  emit('update', {
    id: localTweet.value.id,
    replies_count: localTweet.value.replies_count
  })
}

const rtAnim = ref(false)
</script>

<style scoped>
.tweet-card {
  margin: 12px;
  padding: 20px;
  border-radius: 20px;

  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  border: 1px solid rgba(255, 255, 255, 0.3);

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);

  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.tweet-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
}

.tweet-header {
  display: flex;
  gap: 8px;
  align-items: center;
}

.username {
  color: gray;
  font-size: 14px;
}

.tweet-body {
  margin-top: 12px;
  font-size: 16px;
  line-height: 1.5;
}

.tweet-actions {
  display: flex;
  gap: 25px;
  margin-top: 15px;
}

.tweet-actions button {
  border: none;
  background: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 6px;

  color: #536471;

  transition: all 0.2s ease;
  padding: 6px 8px;
  border-radius: 8px;
}

.tweet-actions button:hover {
  background: rgba(0, 0, 0, 0.05);
  transform: scale(1.05);
}

.tweet-actions span {
  font-size: 13px;
}

.reply-btn:hover {
  color: #1d9bf0;
}

.retweet-btn:hover {
  color: #00ba7c;
}

.like-btn:hover {
  color: #f91880;
}

.delete-btn:hover {
  color: #ff4444;
}

.icon-pop {
  animation: pop 0.25s ease;
}

@keyframes pop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
}

.like-btn svg {
  transition: transform 0.2s ease;
}

.like-btn:hover svg {
  transform: scale(1.2);
}

.rotate-retweet {
  animation: retweetRotate 0.45s ease;
  transform-origin: center;
}

@keyframes retweetRotate {
  0% {
    transform: rotate(0deg) scale(1);
  }
  40% {
    transform: rotate(8deg) scale(1.03);
  }
  70% {
    transform: rotate(-8deg) scale(1.03);
  }
  100% {
    transform: rotate(0deg) scale(1);
  }
}

</style>