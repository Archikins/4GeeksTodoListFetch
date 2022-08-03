import React, { useEffect, useState } from "react";

import Inputs from "./input.jsx"

const API_URL = "https://assets.breatheco.de/apis/fake/todos/user/Alex1kenobi";

//create your first component


async function fetchData() {
    const response = await fetch(API_URL).catch(() => false);
    console.log(response)
    return response ? response.json() : [];
}

const udpateFetch = (todos) =>
    fetch(API_URL, {
        method: "PUT",
        body: JSON.stringify(todos),
        headers: {
            "Content-Type": "application/json"
        }
    }).catch((err) => {
        console.log(err);
        return false;
    });

const updateData = async (todos) => {
    const resp = await udpateFetch(todos);

    if (!resp) {
        alert("Error updating data");
        return resp;
    }

    const data = await resp.json();
    alert(data.result);
    return true;
};


const TodoList = () => {

    const [value, setValue] = useState("");
    const [list, setList] = useState([() => fetchData()]);
    const [key, setKey] = useState(0);


    
    const handleValueChange = (e) => setValue(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();
        const newList = [...list, { label: value, done: false}];
        setKey(key + 1)
        setList(newList);
        setValue("");
        updateData(newList);

    };

    const handleDone = (key) => {
        const newList = list.filter((item) => item.label !== key);
        const newListDone = list.map((listItem) => {
            if (listItem.label === key)
                return {  label: listItem.label, done: true, };
            return listItem;
        });
        
        setList(newList);
        updateData(newList);
    };


    useEffect(() => {
        // Get all the data from the API  --> Pass it to my local state so I can play with it
        fetchData().then((data) => setList(data));
    }, []);
    // The initlization of our local state


    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" value={value} onChange={handleValueChange} placeholder="Add new task" />
            </form>
            {list.map((item) => (
                <div className="todoList"
                    key={item.label}
                    style={{ display: "flex", alignItems: "center" }}
                >
                    <h5>{item.label}</h5>
                    <button onClick={() => handleDone(item.label)}> x </button>
                </div>))}
        </>
    );
};

export default TodoList;