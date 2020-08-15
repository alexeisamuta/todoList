import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

/*export type FilterValuesType = "all" | "active" | "completed";*/
export type FilterValuesType = string;

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType

}

type TaskStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    /* let [tasks, setTasks] = useState<Array<TaskType>>([
         {id: v1(), title: "HTML", isDone: false},
         {id: v1(), title: "JS", isDone: false},
         {id: v1(), title: "CSS", isDone: false},
         {id: v1(), title: "Rest API", isDone: true},
         {id: v1(), title: "GraphQL", isDone: false},
     ])*/

    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"},
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todoListID1]: [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "CSS", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "SaSS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ]
    });

    /*let [filter, setFilter] = useState<FilterValuesType>("all")*/

    function removeTask(taskId: string, todoListID: string) {
        let todoListTasks = tasks[todoListID]
        tasks[todoListID] = todoListTasks.filter(t => t.id !== taskId)
        setTasks({...tasks})
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        let todoListTasks = tasks[todoListID]
        let task = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        let todoListTasks = tasks[todoListID]
        let task = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.title = newTitle;
            setTasks({...tasks})
        }
    }


    function addTask(newTaskName: string, todoListID: string) {
        let newTask = {id: v1(), title: newTaskName, isDone: false}
        let todoListTasks = tasks[todoListID]
        tasks[todoListID] = [newTask, ...todoListTasks]
        setTasks({...tasks})
    }

    function changeFilter(newFilterValue: FilterValuesType, todoListID: string) {
        let todoList = todoLists.find(tl => tl.id === todoListID);
        if (todoList) {
            todoList.filter = newFilterValue;
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(todoListID: string) {
        delete tasks[todoListID]
        setTasks({...tasks})
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
    }

    function addTodoList(title: string) {
        let newTodoListID = v1();
        let newTodoList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: "all"
        };
        setTodoLists([...todoLists, newTodoList])
        setTasks({
            ...tasks, [newTodoListID]: []
        })
    }

    function changeTodoListTitle(todoListID: string, newTitle: string) {
        let todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.title = newTitle;
            setTodoLists([...todoLists])
        }
    }

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

                        let tasksForTodoList = tasks[tl.id];
                        if (tl.filter === "active") {
                            tasksForTodoList = tasks[tl.id].filter(t => t.isDone === false)
                        }
                        if (tl.filter === "completed") {
                            tasksForTodoList = tasks[tl.id].filter(t => t.isDone === true)
                        }
                        return (
                            <Grid item>
                                 <Paper style={{padding: "20px"}} elevation={8}> <TodoList
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodoList}
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
                    {/*      <TodoList title={"What to learn"}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />*/}
                </Grid>
            </Container>
        </div>
    );
}

export default App;


