import axios from "axios";


type TodoType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type CommonResponseType<T = {}> = {
    resultCode: number
    messages: number[]
    data: T
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'e346c4e6-cb05-4091-a8ca-5562e317b58c'
    }
})

export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodoType>>("todo-lists")
    },
    CreateTodolist(title: string) {
        return instance.post<CommonResponseType<{item: TodoType}>>("todo-lists",{title})
    },
    DeleteTodolist(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    UpdateTodolistTitle(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title})
    }
}

type TasksType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetResponseTasksType = {
    items: TasksType[]
    totalCount: number
    error: string
}

type PostResponseTasksType<T = {}> = {
    resultCode: number
    messages: number[]
    data: T
}

type newTitleInTaskType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string | null
    deadline: string | null

}

export const taskAPI = {
    getTasks(todoId: string) {
        return instance.get<GetResponseTasksType>(`todo-lists/${todoId}/tasks`)
    },
    createTask(todoId: string, title: string) {
        return instance.post<PostResponseTasksType<{items: TasksType}>>(`todo-lists/${todoId}/tasks`,{title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<PostResponseTasksType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTasks(todolistId: string, taskId: string, newTitleInTask: newTitleInTaskType) {
        return instance.put<PostResponseTasksType>(`todo-lists/${todolistId}/tasks/${taskId}`, newTitleInTask)
    }
}