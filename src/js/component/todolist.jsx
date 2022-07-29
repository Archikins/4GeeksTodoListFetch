import React, { useEffect, useState } from "react";

import Inputs from "./input.jsx"

//create your first component
const TodoList = () => {
    const [value, setValue] = useState("");
    const [list, setList] = useState([]);
    const [key, setKey] = useState(0);

    const handleValueChange = (e) => setValue(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();
        const newList = [...list, { label: value, done: false, key: key }];
        setKey(key + 1)
        setList(newList);
        setValue("");
    };

    const handleDone = (key) => {
        const newList = list.filter((item) => item.key !== key);
        const newListDone = list.map((listItem) => {
            if (listItem.key === key)
                return { key: listItem.key, label: listItem.label, done: true, };
            return listItem;
        });
        setList(newList);
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" value={value} onChange={handleValueChange} placeholder="Add new task" />
            </form>
            {list.map((item) => (
                <div className="todoList"
                    key={item.key}
                    style={{display: "flex", alignItems: "center" }}
                >
                    <h5>{item.label}</h5>
                    <button onClick={() => handleDone(item.key)}> x </button>
                </div>))}
        </>
    );
};

export default TodoList;