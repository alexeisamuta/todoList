import React from "react";
import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";


/*

type ActionType = {
    type: string
    [key: string]: any
}
*/

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

type ActionType = ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType
    | AddTodoListActionType
    | RemoveTodoListActionType


export const todolistsReducer = (state: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            let newTodoList: TodoListType = {
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }
            return [...state, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            let todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title;
                return [...state];
            }
            return state;
        case 'CHANGE-TODOLIST-FILTER':
            let todolist = state.find(tl => tl.id === action.id);
            if (todolist){
                todolist.filter = action.filter
                return [...state]
            }
            return state;
        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodoListAC = (id: string) : RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: id}
}
export const AddTodoListAC = (title: string) : AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const ChangeTitleTodoListAC = (id: string, title: string) : ChangeTodoListTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const ChangeFilterTodoListAC = (id: string, filter: FilterValuesType) : ChangeTodoListFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}