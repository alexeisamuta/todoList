import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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

function TodoList(props: PropsType) {

    /*let [taskName, setTaskName] = useState<string>("")
    let [error, setError] = useState<string | null>(null)*/

    /*let addTask = () => {
        if (taskName.trim()) {
            props.addTask(taskName, props.id);
            setTaskName("");
        } else {
            setError("Title is required!")
        }
    }*/

    /*function onTaskNameChanged(e: ChangeEvent<HTMLInputElement>) {
        setTaskName(e.currentTarget.value);
        setError(null)
    }*/

    /*function onAddTaskKeyPressed(e: KeyboardEvent<HTMLInputElement>) {
        if (e.charCode === 13) {
            addTask()
        }
    }*/

    function onAllClickHandler() {
        props.changeFilter("all", props.id)
    }

    function onActiveClickHandler() {
        props.changeFilter("active", props.id)
    }

    function onCompletedClickHandler() {
        props.changeFilter("completed", props.id)
    }

    function onClickRemoveTodoList() {
        props.removeTodoList(props.id)
    }

    function addTask(title: string) {
        props.addTask(title, props.id)
    }

    function changeTodoListTitle(newTitle: string) {
        props.changeTodoListTitle(props.id, newTitle)

    }

    return (
        <div>
            <h3><EditableSpan title={props.title} saveNewTitle={changeTodoListTitle}/>
                <button onClick={onClickRemoveTodoList}>X</button>
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
            <ul>
                {props.tasks.map((t) => {
                    let removeTask = () => {
                        props.removeTask(t.id, props.id)
                    }
                    let changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        let newCheckBoxValue = e.currentTarget.checked
                        props.changeStatus(t.id, newCheckBoxValue, props.id)
                    }
                    let changeTaskTitle = (newTitle: string) => {
                        props.changeTaskTitle(t.id, newTitle, props.id)
                    }
                    return (
                        <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={changeStatus}
                            />
                            <EditableSpan title={t.title} saveNewTitle={changeTaskTitle}/>
                           {/* <span>{t.title}</span>*/}
                            <button onClick={removeTask}>x</button>
                        </li>
                    )
                })}

            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
                </button>
                <button
                    className={props.filter === "active" ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;