import React, {ChangeEvent, useState, KeyboardEvent, useCallback} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStateType, TodoListType} from "./AppWithRedux";
import {Task} from "./Task";

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (newTaskName: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
}

const TodoList = React.memo((props: PropsType) => {
    console.log("Todolist called")

    const onAllClickHandler = useCallback(() => {
        props.changeFilter("all", props.id)
    },[props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("active", props.id)
    },[props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter("completed", props.id)
    },[props.changeFilter, props.id])

    function onClickRemoveTodoList() {
        props.removeTodoList(props.id)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    },[props.addTask, props.id])

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    },[props.changeTodoListTitle, props.id])


    let allTodolistTasks = props.tasks;
    let tasksForTodoList = allTodolistTasks;

    if (props.filter === "active") {
        tasksForTodoList = allTodolistTasks.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        tasksForTodoList = allTodolistTasks.filter(t => t.isDone === true)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} saveNewTitle={changeTodoListTitle}/>
                {/*<button onClick={onClickRemoveTodoList}>X</button>*/}
                <IconButton onClick={onClickRemoveTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            {/*<div>
                <input
                    value={taskName}
                    onChange={onTaskNameChanged}
                    onKeyPress={onAddTaskKeyPressed}
                    className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>*/}
            <div>
                {tasksForTodoList.map((t) => {
                    return <Task task={t}
                                 changeTaskTitle={props.changeTaskTitle}
                                 removeTask={props.removeTask}
                                 changeStatus={props.changeStatus}
                                 todolistID={props.id}
                                 key={t.id}
                                 />

                })}

            </div>
            <div>
                <Button
                    className={props.filter === "all" ? "active-filter" : ""}
                    onClick={onAllClickHandler}
                    variant={props.filter === "all" ? "contained" : "outlined"}
                    color={props.filter === "all" ? "secondary" : "primary"}>All
                </Button>
                <Button
                    onClick={onActiveClickHandler}
                    variant={props.filter === "active" ? "contained" : "outlined"}
                    color={props.filter === "active" ? "secondary" : "primary"}>Active
                </Button>
                <Button
                    className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}
                    variant={props.filter === "completed" ? "contained" : "outlined"}
                    color={props.filter === "completed" ? "secondary" : "primary"}>Completed
                </Button>
            </div>
        </div>
    )
})

export default TodoList;