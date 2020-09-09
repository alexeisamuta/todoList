import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import AddItemForm from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import EditableSpan from "../EditableSpan";

export default {
    title: 'TodoList/EditableSpan Stories',
    component: EditableSpan
} as Meta;


export const EditableSpanFormBaseExample = (props: any) => {
    return (
        <EditableSpan saveNewTitle={action("value change")} title={"StartValue"}/>
    )
}
