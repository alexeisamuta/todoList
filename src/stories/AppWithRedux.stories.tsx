import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default {
    title: 'TodoList/AppWithRedux Stories',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}


export const AppWithReduxBaseExample = (props: any) => {
    return (
        <AppWithRedux />
    )
}
