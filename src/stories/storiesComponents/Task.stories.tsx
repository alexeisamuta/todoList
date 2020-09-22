import React from "react";
import {Story, Meta} from '@storybook/react/types-6-0';

import AddItemForm from "../../AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task} from "../../Task";

export default {
    title: 'TodoList/Task Stories',
    component: Task
} as Meta;

const removeCallback = action("Remove Button inside Task clicked")
const changeStatusCallback = action("Status change inside Task")
const changeTitleCallback = action("Title change inside Task")


export const TaskBaseExample = (props: any) => {
    return (
        <div>
            <Task task={{id: "1", isDone: true, title: "CSS"}}
                  todolistID={"todolistId1"}
                  removeTask={removeCallback}
                  changeTaskTitle={changeTitleCallback}
                  changeStatus={changeStatusCallback}
            />
            <Task task={{id: "2", isDone: false, title: "JS"}}
                  todolistID={"todolistId2"}
                  removeTask={removeCallback}
                  changeTaskTitle={changeTitleCallback}
                  changeStatus={changeStatusCallback}
            />
        </div>
    )
}
