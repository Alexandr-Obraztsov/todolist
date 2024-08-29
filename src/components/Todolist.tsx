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
    removeTask: (id: string) => void,
    changeTaskStatus: (id: string, isDone: boolean) => void
};


export const Todolist = ({title, tasks, addTask, removeTask, changeTaskStatus}: TodolistProps) => {

    const titleRef = useRef<HTMLInputElement>(null);

    const [filter, setFilter] = useState<FilterType>("all");

    const [inputError, setInputError] = useState<string|null>(null);

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
        if (!titleRef.current) return;

        if (!titleRef.current.value.trim()) {
            setInputError("Title is required");
            return;
        }

        addTask(titleRef.current.value);
        titleRef.current.value = "";
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (inputError) setInputError(null);
    }

    const mappedTasks = filteredTask().map((task) => {

        const removeThisTask = () => removeTask(task.id);
        const changeStatus = () => changeTaskStatus(task.id, !task.isDone);

        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone} onChange={changeStatus}/>
                <span>{task.title}</span>
                <Button title="X" callback={removeThisTask}/>
            </li>
        )
    })

    return (
        <div>
            <h1>{title}</h1>
            <input ref={titleRef} onChange={onChangeHandler} onKeyUp={onKeyUpHandler} className={inputError ? "error" : ""}/>
            <Button title="+" callback={addNewTask}/>
            {inputError && <div className="error-message">{inputError}</div>}
            <ul>
                {mappedTasks}
            </ul>
            <Button title="all" className={filter === "all" ? "active-button" : ""} callback={changeFilterHandler.all}/>
            <Button title="active" className={filter === "active" ? "active-button" : ""} callback={changeFilterHandler.active}/>
            <Button title="completed" className={filter === "completed" ? "active-button" : ""} callback={changeFilterHandler.completed}/>
        </div>
    );
};