import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type PropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: PropsType) {

    let [itemName, setItemName] = useState<string>("")
    let [error, setError] = useState<string | null>(null)

    function onItemNameChanged(e: ChangeEvent<HTMLInputElement>) {
        setItemName(e.currentTarget.value);
        setError(null)
    }

    function onAddItemKeyPressed(e: KeyboardEvent<HTMLInputElement>) {
        if (e.charCode === 13) {
            addItem()
        }
    }

    function addItem()  {
        if (itemName.trim()) {
            props.addItem(itemName.trim());
            setItemName("");
        } else {
            setError("Title is required!")
        }
    }

    return (
        <div>
            <TextField
                size={"small"}
                variant={"outlined"}
                value={itemName}
                onChange={onItemNameChanged}
                onKeyPress={onAddItemKeyPressed}
                // className={error ? "error" : ""}
                error={!!error}
                label={"Title"}
                helperText={error}
            />
            {/*<input
                value={itemName}
                onChange={onItemNameChanged}
                onKeyPress={onAddItemKeyPressed}
                className={error ? "error" : ""}
            />*/}
            <IconButton onClick={addItem} color="primary">
                <AddBox />
            </IconButton>
            {/*<button onClick={addItem}>+</button>*/}
            {/*{error && <div className={"error-message"}>{error}</div>}*/}
        </div>
    )
}

export default AddItemForm;