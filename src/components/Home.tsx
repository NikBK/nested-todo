import { Navigate } from "react-router-dom";
import { useGlobalContext } from "./Context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Todo from "./Todo";
import { useState } from "react";
import { findAndDeleteTodo } from "../utils/todoFunctions";

export const Home = () => {
    const { loggedIn, todos, setTodos } = useGlobalContext();
    const [input, setInput] = useState<string>("");

    function deleteTodo(id: string): void {
        const newTodo = findAndDeleteTodo(todos, id);
        setTodos({ ...newTodo });
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function addTodo(): void {
        if (input && input.trim().length > 0) {
            const newTodo = {
                id: new Date().getTime().toString(),
                name: input,
                items: []
            }
            setTodos({ ...todos, items: [...todos.items, newTodo] });
            localStorage.setItem("todos", JSON.stringify(todos));
            setInput("");
        }
    }

    return (
        <>
            {!loggedIn ? (
                <Navigate to="/signIn" />
            ) : (
                <>
                    <div className="home">
                        <div id="tasker" className="tasker">
                            <div id="error" className="error">Please Enter a Task</div>
                            <div id="todo-header" className="todo-header">
                                <input
                                    type="text"
                                    id="input-task"
                                    value={input}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            addTodo();
                                        }
                                    }}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Enter Your Task" />
                                <button id="add-task" onClick={addTodo}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                        </div>
                        <div className="todo-lists">
                            <h2>My Todos</h2>
                            {todos?.items?.map((todo: { name: string, id: string, items: [] }) => (
                                <Todo todo={todo} deleteTodo={deleteTodo} key={todo.id} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};