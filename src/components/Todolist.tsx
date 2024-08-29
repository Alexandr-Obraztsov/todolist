import * as React from 'react';
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {v1} from 'uuid';
import {useRef} from 'react';
import {Button} from "./Button";

export type FilterType = "all" | "active" | "completed";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodolistProps = {
    title: string,
    tasks: TaskType[],
    addTask: (title: string) => void,
    removeTask: (id: string) => void
};


export const Todolist = ({title, tasks, addTask, removeTask}: TodolistProps) => {

    const titleRef = useRef<HTMLInputElement>(null);

    const [filter, setFilter] = useState<FilterType>("all");

    const filterTask = (filterType: FilterType) => {
        setFilter(filterType);
    }

    let filteredTask = () => {
        switch (filter) {
            case "all":
                return tasks;
            case "active":
                return tasks.filter((task) => !task.isDone);
            case "completed":
                return tasks.filter((task) => task.isDone);
        }
    }

    const changeFilterHandler: Record<FilterType, () => void> = {
        all: () => filterTask("all"),
        active: () => filterTask("active"),
        completed: () => filterTask("completed")
    }

    const onKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") addNewTask();
    }

    const addNewTask = () => {
        if (titleRef.current) {
            addTask(titleRef.current.value);
            titleRef.current.value = "";
        }
    }

    const mappedTasks = filteredTask().map((task) => {

        const removeThisTask = () => removeTask(task.id);

        return (
            <li key={task.id}>
                <Button title="X" callback={removeThisTask}/>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
            </li>
        )
    })

    return (
        <div>
            <h1>{title}</h1>
            <input ref={titleRef} onKeyUp={onKeyUpHandler}/>
            <Button title="+" callback={addNewTask}/>
            <ul>
                {mappedTasks}
            </ul>
            <Button title="all" callback={changeFilterHandler.all}/>
            <Button title="active" callback={changeFilterHandler.active}/>
            <Button title="completed" callback={changeFilterHandler.completed}/>
        </div>
    );
};