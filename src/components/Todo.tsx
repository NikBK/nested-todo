// import { faCodeMerge } from "@fortawesome/free-solid-svg-icons";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle, faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useGlobalContext } from "./Context";
import { appendSubTodo } from "../utils/todoFunctions";

type Props = {
    todo: {
        id: string;
        name: string;
        items: []
    },
    deleteTodo: (id: string) => void;
}
const Todo = ({ todo, deleteTodo }: Props) => {
    const [subTask, setSubTask] = useState<string>("");
    const { todos, setTodos } = useGlobalContext();

    function clearSubTask(): void {
        setSubTask("");
    }

    function addSubTask(): void {
        if (subTask && subTask.trim().length > 0) {
            const newTodo = appendSubTodo(todos, todo.id, subTask);
            setTodos(newTodo);
            setSubTask("");
        }
    }

    return (
        <div className="task">
            <div className="task-box" id={todo.id}>
                <div className="task-detail">
                    {/* <FontAwesomeIcon icon={faCodeMerge} /> */}
                    <span className="task-name">{todo.name}</span>
                    <span className="delete-icon" onClick={() => deleteTodo(todo.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </span>
                </div>
                <label>
                    <input
                        type="text"
                        onChange={(e) => setSubTask(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                addSubTask();
                            }
                        }}
                        value={subTask}
                        className="subtask-input"
                        placeholder="Add subtask..." />
                    {subTask &&
                        <>
                            <span className="save-icon" onClick={addSubTask}><FontAwesomeIcon icon={faCheckCircle} /></span>
                            <span className="cancel-icon" onClick={clearSubTask}><FontAwesomeIcon icon={faCircleXmark} /></span>
                        </>
                    }
                </label>
            </div>
            {todo.items.map((subtask: { id: string, name: string, items: [] }) => (
                <Todo todo={subtask} deleteTodo={deleteTodo} key={subtask.id} />
            ))}
        </div>
    )
}

export default Todo;
