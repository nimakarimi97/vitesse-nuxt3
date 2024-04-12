import { defineStore } from 'pinia'
import { Client, Databases } from 'appwrite'

export const useTasksStore = defineStore('tasks', () => {
  const client = new Client()
  const config = useRuntimeConfig()

  client
    .setEndpoint(config.public.APPWRITE_ENDPOINT)
    .setProject(config.public.APPWRITE_PROJECT_ID)

  const db = new Databases(client)

  const tasks = ref([])
  const tasksCount = ref(0)
  const loading = ref(false)
  const error = ref(null)

  async function fetchTasks() {
    loading.value = true
    error.value = null

    try {
      const response = await db.listDocuments(config.public.DATABASE_ID, config.public.TASK_COLLECTION_ID)

      tasks.value = response.documents
      tasksCount.value = response.total
    }
    catch (err) {
      error.value = err.message
    }
    finally {
      loading.value = false
    }
  }

  async function addTasks() {
    if (!body.value) {
      error.value = 'Task cannot be empty'

      setTimeout(() => {
        error.value = ''
      }, 5000)
    }

    await db.createDocument(config.public.DATABASE_ID, config.public.TASK_COLLECTION_ID, 'unique()', {
      body: body.value,
    })

    body.value = ''
    fetchTasks()
  }

  async function deleteTask(id) {
    await db.deleteDocument(config.public.DATABASE_ID, config.public.TASK_COLLECTION_ID, id)
    fetchTasks()
  }

  async function toggleTask(id, completed) {
    await db.updateDocument(config.public.DATABASE_ID, config.public.TASK_COLLECTION_ID, id, {
      completed: !completed,
    })
    fetchTasks()
  }

  return {
    client,
    db,
    tasks,
    tasksCount,
    loading,
    error,
    fetchTasks,
    addTasks,
    deleteTask,
    toggleTask,

  }
})
