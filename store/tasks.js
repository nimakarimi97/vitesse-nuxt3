import { defineStore } from 'pinia'
import { Query } from 'appwrite'

export const useTasksStore = defineStore('tasks', () => {
  const config = useRuntimeConfig()
  const { client, databases } = useAppwrite()

  const tasks = ref([])
  const tasksCount = ref(0)
  const loading = ref(false)
  const error = ref(null)

  async function fetchTasks() {
    loading.value = true
    error.value = null

    try {
      const response = await databases.listDocuments(config.public.DATABASE_ID, config.public.TASK_COLLECTION_ID, [Query.orderDesc('$createdAt'), Query.limit(10)])

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

  async function addTask(body) {
    await databases.createDocument(config.public.DATABASE_ID, config.public.TASK_COLLECTION_ID, 'unique()', {
      body,
    })

    fetchTasks()
  }

  async function deleteTask(id) {
    await databases.deleteDocument(config.public.DATABASE_ID, config.public.TASK_COLLECTION_ID, id)
    fetchTasks()
  }

  async function toggleTask(id, completed) {
    await databases.updateDocument(config.public.DATABASE_ID, config.public.TASK_COLLECTION_ID, id, {
      completed: !completed,
    })
    fetchTasks()
  }

  return {
    client,
    db: databases,
    tasks,
    tasksCount,
    loading,
    error,
    fetchTasks,
    addTask,
    deleteTask,
    toggleTask,

  }
})
