<template>
  <div
    class="modal-overlay"
    @click.self="$emit('close')"
  >
    <div class="modal">

      <button
        class="close"
        @click="$emit('close')"
      >
        ×
      </button>

      <textarea
        v-model="body"
        placeholder="いまどうしてる？"
      />

      <div class="actions">
        <button @click="postTweet">
          投稿
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const emit = defineEmits(['close', 'posted'])

const body = ref('')

const postTweet = async () => {
  try {
    await axios.post(
      'http://localhost:3000/tweets',
      {
        tweet: {
          body: body.value
        }
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )

    body.value = ''

    emit('posted')
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>
.form {
  padding: 16px;
  border-bottom: 1px solid #e6ecf0;
  background: white;
}

textarea {
  width: 100%;
  border: none;
  resize: none;
  font-size: 20px;
  outline: none;
  min-height: 40px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

button {
  background: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 9999px;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}

.modal-overlay {
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 2000;

  backdrop-filter: blur(6px);
}

.modal {
  width: 600px;

  background: rgba(255, 255, 255, 0.4);

  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  border: 1px solid rgba(255,255,255,0.25);

  border-radius: 20px;

  padding: 20px;

  position: relative;

  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.close {
  display: none;
}

textarea {
  width: 100%;
  box-sizing: border-box;
  min-height: 120px;

  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 12px;

  background: rgba(255,255,255,0.25);

  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  font-size: 20px;

  outline: none;
  resize: none;

  padding: 12px;

  color: #333;
}
</style>