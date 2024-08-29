import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {v1} from "uuid";

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'Hello world', isDone: true},
        {id: v1(), title: 'I am Happy', isDone: true},
        {id: v1(), title: 'Yo', isDone: false},
        {id: v1(), title: 'Yoshkin code', isDone: false},
        {id: v1(), title: 'Ph', isDone: false}
    ]);

    const removeTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false};
        setTasks([newTask, ...tasks]);
    }

    return (
        <div className="App">
            <Todolist title="Hello worlds" tasks={tasks} addTask={addTask} removeTask={removeTask}/>
        </div>
    );
}

export default App;
