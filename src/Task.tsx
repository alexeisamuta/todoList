import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./App";

export type TaskPropsType = {
    todolistID: string
    task: TaskType
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void

}

export const Task = React.memo((props: TaskPropsType) => {

    let removeTask = useCallback(() => {
        props.removeTask(props.task.id, props.todolistID)
    },[])

    let changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newCheckBoxValue = e.currentTarget.checked
        props.changeStatus(props.task.id, newCheckBoxValue, props.todolistID)
    },[])

    let changeTaskTitle = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todolistID)
    },[props.task.id, props.changeTaskTitle, props.todolistID])

    return (
        <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            <Checkbox
                color={"primary"}
                checked={props.task.isDone}
                onChange={changeStatus}
            />
            <EditableSpan title={props.task.title} saveNewTitle={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    )
})