import React, {useEffect, useState} from "react";
import {taskAPI, todolistAPI} from "../api/todolist-api";


export default {
    title: 'API - TASKS'
}

export const GetTasks = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        let todoId = "8a77ec22-8fca-4583-b199-4778199d712c"
        taskAPI.getTasks(todoId)
            .then((response) => {
                setState(response.data)
            })

    }, [])


    return <div> {JSON.stringify(state)}</div>
}
export const CreateTasks = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        let todoId = "8a77ec22-8fca-4583-b199-4778199d712c"
        let title = "HOME"
        taskAPI.createTask(todoId, title)
            .then((response) => {
                setState(response.data)
            })

    }, [])


    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        let todoId = "8a77ec22-8fca-4583-b199-4778199d712c"
        let taskID = "a924aed5-db78-4a90-80d8-5b94ad48ae28"
        taskAPI.deleteTask(todoId, taskID)
            .then((response) => {
                setState(response.data)
            })

    }, [])


    return <div> {JSON.stringify(state)}</div>
}
export const updateTasks = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        let todoId = "8a77ec22-8fca-4583-b199-4778199d712c"
        let taskID = "39878c90-89c4-41a8-84c2-652c0e533423"

        let newTitleInTask = {
            title: "NEW HOME !!!!!!!!! easy",
            description: "I do it!!!!!!",
            completed: true,
            status: 1000,
            priority: 1,
            startDate: null,
            deadline: null,
        }

        taskAPI.updateTasks(todoId, taskID, newTitleInTask)
            .then((response) => {
                setState(response.data)
            })

    }, [])


    return <div> {JSON.stringify(state)}</div>
}