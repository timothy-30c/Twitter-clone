<!-- ツイートを押した時に画面の手前にツイートの詳細を表示させる -->
 <template>
  <div class="overlay" @click.self="emit('close')">
    <div class="modal">

      <button class="close" @click="emit('close')">×</button>

      <div class="header">
        <strong>{{ localTweet.user.name }}</strong>
        <span class="username">@{{ localTweet.user.username }}</span>
      </div>

      <div class="body">
        {{ localTweet.body }}
      </div>

      <div class="actions">
        <button @click="toggleLike">
          <Heart :size="18" :fill="localTweet.liked ? 'red' : 'none'" />
          {{ localTweet.likes_count || 0 }}
        </button>

        <button @click="replyTweet">
          <MessageCircle :size="18" />
          {{ localTweet.replies_count || 0 }}
        </button>

        <button @click="toggleRetweet">
          <Repeat2 :size="18" />
          {{ localTweet.retweets_count || 0 }}
        </button>
      </div>

      <div class="replies">
        <h3>返信</h3>

        <div
          v-for="r in replies"
          :key="r.id"
          class="reply"
        >
          <strong>{{ r.user.username }}</strong>
          <p>{{ r.body }}</p>
        </div>

        <p v-if="replies.length === 0" class="empty">
          まだ返信はありません
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import api from '@/api/axios'
import {
  Heart,
  MessageCircle,
  Repeat2
} from 'lucide-vue-next'

const props = defineProps({
  tweet: Object
})

const emit = defineEmits(['close', 'update'])

const localTweet = ref({ ...props.tweet })
const replies = ref([])

watch(
  () => props.tweet,
  (newVal) => {
    localTweet.value = { ...newVal }
    fetchReplies()
  }
)

onMounted(() => {
  fetchReplies()
})

const fetchReplies = async () => {
  try {
    const res = await api.get(`/tweets/${localTweet.value.id}`)
    replies.value = res.data.replies || []
  } catch (e) {
    console.error(e)
  }
}

const toggleLike = async () => {
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

    const res = await api.post(`/tweets/${localTweet.value.id}/reply`, {
        tweet: { body: text }
    })

    const newReply = res.data

    replies.value.unshift(newReply)

    localTweet.value.replies_count =
        (localTweet.value.replies_count || 0) + 1

    emit('update', {
        id: localTweet.value.id,
        replies_count: localTweet.value.replies_count
    })
}

</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.25);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1000;

  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.modal {
  width: 600px;
  max-width: 90%;

  background: rgba(255, 255, 255, 0.4);

  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  border: 1px solid rgba(255,255,255,0.25);

  border-radius: 20px;

  padding: 20px;

  position: relative;

  box-shadow: 0 10px 30px rgba(0,0,0,0.2);

  animation: popup 0.2s ease;
}

.close {
  position: absolute;
  top: 20px;
  right: 20px;

  border: none;
  background: none;

  font-size: 24px;
  cursor: pointer;
}

.header {
  margin-bottom: 20px;
}

.username {
  color: gray;
  margin-left: 10px;
}

.body {
  font-size: 20px;
  margin-bottom: 30px;
}

.actions button {
  padding: 6px 10px;
  border-radius: 8px;
  background: rgba(255,255,255,0.3);
}

button {
  border: none;
  background: none;
  cursor: pointer;
}

@keyframes popup {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.replies {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid rgba(0,0,0,0.1);
}

.reply {
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  background: rgba(255,255,255,0.25);
}

.reply strong {
  font-size: 14px;
}

.reply p {
  margin: 5px 0 0;
}

.empty {
  color: gray;
  font-size: 14px;
}
</style>