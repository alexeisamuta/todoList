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