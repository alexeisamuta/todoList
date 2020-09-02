import React, {useCallback} from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeFilterTodoListAC,
    ChangeTitleTodoListAC,
    RemoveTodoListAC
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

// export type FilterValuesType = "all" | "active" | "completed";
export type FilterValuesType = string;

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>((state) => state.todolists)

    let tasks = useSelector<AppRootStateType, TaskStateType>((state) => state.tasks)

    let dispatch = useDispatch()

    const removeTask = useCallback((taskId: string, todoListID: string) => {
        let action = removeTaskAC(taskId, todoListID)
        dispatch(action)
    },[dispatch])

    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {

        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskID: string, newTitle: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, newTitle, todoListID))
    },[dispatch])

    const addTask = useCallback((newTaskName: string, todoListID: string) => {
        let action = addTaskAC(newTaskName, todoListID)
        dispatch(action)
    },[dispatch])

    const changeFilter = useCallback((newFilterValue: FilterValuesType, todoListID: string) => {
        dispatch(ChangeFilterTodoListAC(todoListID, newFilterValue))
    },[dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        let action = RemoveTodoListAC(todoListID)
        dispatch(action)
    },[dispatch])

    const addTodoList = useCallback((title: string) => {
        let action = AddTodoListAC(title)
        dispatch(action)
    }, [dispatch])

    const changeTodoListTitle = useCallback((todoListID: string, newTitle: string) => {

        dispatch(ChangeTitleTodoListAC(todoListID, newTitle))
    },[dispatch])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>

                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>{
                    todoLists.map(tl => {
                        //
                        // let tasksForTodoList = tasks[tl.id];
                        // if (tl.filter === "active") {
                        //     tasksForTodoList = tasks[tl.id].filter(t => t.isDone === false)
                        // }
                        // if (tl.filter === "completed") {
                        //     tasksForTodoList = tasks[tl.id].filter(t => t.isDone === true)
                        // }
                        return (
                            <Grid item>
                                <Paper style={{padding: "20px"}} elevation={8}> <TodoList
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasks[tl.id]}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeStatus={changeTaskStatus}
                                    filter={tl.filter}
                                    removeTodoList={removeTodoList}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodoListTitle={changeTodoListTitle}
                                /></Paper>
                            </Grid>

                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;


