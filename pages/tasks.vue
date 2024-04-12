<script setup>
import { useTasksStore } from '~/store/tasks'

const tasksStore = useTasksStore()

definePageMeta({
  layout: 'home',
})

const body = ref('')
const error = ref('')

onMounted(async () => {
  await tasksStore.fetchTasks()
})
</script>

<template>
  <div>
    <span v-if="error" class="error">{{ error }}</span>

    <div class="new-task-container">
      <input v-model="body" type="text" class="new-task" placeholder="Add task" @keyup.enter="tasksStore.addTasks">
      <button class="new-task" type="submit" :disabled="!body" @click="tasksStore.addTasks">
        <p class="submit">
          submit
        </p>
      </button>
    </div>

    <div>
      <span class="p2 bg-amber rounded-1">
        {{ tasksStore.tasksCount || 'loading...' }}
      </span>
      <button type="button" @click="tasksStore.fetchTasks">
        fetchTasks
      </button>
    </div>

    <div class="task-wrapper">
      <div v-for="task in tasksStore.tasks" :key="task.$id" class="task">
        <input
          type="checkbox" name="task" :checked="task.completed"
          @click="tasksStore.toggleTask(task.$id, task.completed)"
        >
        <p :class="task.completed ? 'completed' : ''">
          {{ task.body }}
        </p>
        <strong :id="`delete-${task.$id}`" class="delete" @click="tasksStore.deleteTask(task.$id)">x</strong>
      </div>
    </div>

    <div>
      <NuxtLink class="m-3 text-sm btn" to="/">
        Back
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.new-task-container {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;

  input.new-task {
    border: none;
    outline: none;
    border-radius: 15px;
    padding: 1em;
    background-color: #ccc;
    box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.3);
    transition: 300ms ease-in-out;

    &:focus {
      background-color: rgb(197, 197, 197);
      color: black;
      transform: scale(1.05);
      box-shadow:
        0px 0px 6px #969696,
        1px 2px 12px #ffffff;
    }
  }

  button.new-task {
    width: 90px;
    height: 40px;
    position: relative;
    font-family: var(--font);
    color: #3b82f6 !important;
    font-weight: 600;
    background-color: #fff;
    border: none;
    overflow: hidden;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
    transition: all ease 100ms;

    p {
      margin: 0;
    }
  }

  button:hover {
    background-color: #cbdcf8;
  }

  button:focus {
    background-color: #cbdcf8;
  }

  button::before {
    content: 'done✅';
    position: absolute;
    color: #3b82f6;
    left: 0;
    top: -14px;
    right: 0;
    transition: all ease 300ms;
    opacity: 0%;
  }

  button:focus::before {
    opacity: 100%;
    transform: translateY(23px);
  }

  .submit {
    transition: all ease 100ms;
    opacity: 100%;
    color: #3b82f6 !important;
  }

  button:focus > .submit {
    opacity: 0%;
  }
}

.task-wrapper {
  .task {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    align-items: center;
    padding: 0.4rem;
    border-radius: 10px;
    border: 1px solid var(--color-dark);
    margin: 1rem 0;
    gap: 1rem;
    max-width: 300px;

    p {
      margin: 0 0.5rem;
      text-align: start;
    }

    .delete {
      color: #fe4e6f;
      font-size: 22px;
      cursor: pointer;
      margin: 0 5% 0 auto;
    }

    .completed {
      text-decoration: line-through;
      text-decoration-thickness: 2px;
      text-decoration-color: var(--color-dark);
      font-style: italic;
    }
  }
}

.error {
  color: white;
  position: absolute;
  top: 1rem;
  left: 3%;
  background-color: #d41010;
  padding: 0.5rem;
  border-radius: 5px;
  text-align: center;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
  margin: 1rem;
}

button:hover {
  border-color: #646cff;
}

button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
</style>
