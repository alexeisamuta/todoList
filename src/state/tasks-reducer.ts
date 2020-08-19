import React from "react";
import {v1} from "uuid";
import {FilterValuesType, TaskStateType, TaskType, TodoListType} from "../App";
import {act} from "react-dom/test-utils";
import createSpacing from "@material-ui/core/styles/createSpacing";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolist-reducer";


/*

type ActionType = {
    type: string
    [key: string]: any
}
*/

export type removeTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListId: string
}
export type addTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListId: string
}
export type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    isDone: boolean
    todoListId: string
}
export type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    title: string
    todoListId: string
}


type ActionType = removeTaskActionType
    | addTaskActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType


export const tasksReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let newTodolist = [...state[action.todoListId].filter(task => task.id !== action.taskId)]
            return {...state, [action.todoListId]: newTodolist}
        case 'ADD-TASK':
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}

        case "CHANGE-TASK-STATUS":
            return {
                ...state, [action.todoListId]: ChangeTitleAndStatus(state[action.todoListId], action.taskID, action.isDone)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state, [action.todoListId]: ChangeTitleAndStatus(state[action.todoListId], action.taskID, action.title)
            }
        case "ADD-TODOLIST":
            return {
                ...state, [action.todolistId]: []
            }

        case "REMOVE-TODOLIST":
            let newState = {...state}
            delete newState[action.id]
            return newState
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): removeTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todoListId}
}
export const addTaskAC = (title: string, todoListId: string): addTaskActionType => {
    return {type: 'ADD-TASK', title, todoListId}
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListId: string): changeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskID, isDone, todoListId}
}
export const changeTaskTitleAC = (taskID: string, title: string, todoListId: string): changeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskID, title, todoListId}
}

let ChangeTitleAndStatus = (tasks: Array<TaskType>, taskId: string, property: string | boolean) : Array<TaskType> => {
    let propertyName = typeof property === "string" ? "title" : "isDone"
    return tasks.map(task => {
        if (task.id !== taskId) {
            return task
        } else {
            return {...task, [propertyName]: property}
        }
    })

    }
