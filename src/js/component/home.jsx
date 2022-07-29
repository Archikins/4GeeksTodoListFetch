import React from "react";

//include images into your bundle
import TodoList from "./todolist.jsx";

//create your first component
const Home = () => {
	return (
		<div className="container text-center">
			<h1 className="text-center mt-5">Todos</h1>
			<TodoList />
		</div>
	);
};

export default Home;
