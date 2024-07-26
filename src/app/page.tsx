"use client"
import Footer from "@components/Footer";
import Header from "@components/Header";
import Task from "@components/Task";
import TaskInput from "@components/TaskInput";

import { nanoid } from "nanoid";
import { useState } from "react";

export default function Home() {
  // Define the interface of task-item object
  interface TaskItem {
    id: string;
    title: string;
    completed: boolean;
    deleteTaskFunc: (taskId: string) => void; // callback function
    toggleDoneTaskFunc: (taskId: string) => void; // callback function
  }

  // useState hook for an array of task-item objects
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [count, setCount] = useState(0);

  // Define the function with proper type
  const addTask = (newTaskTitle : string) => {
    const newTask = { id: nanoid(), 
                      title: newTaskTitle, 
                      completed: false,
                      deleteTaskFunc : deleteTask, 
                      toggleDoneTaskFunc : toggleDoneTask};
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
  };

  // Define the function with proper type
  const deleteTask = (taskId : string) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
    const count = tasks.length;
    setCount(count-1);
  };

  // Define the function with proper type
  const toggleDoneTask = (taskId : string) => {
    //structuredClone will copy an array or an object "deeply"
    //So objects within an object will be copied too
    // console.log(tasks);
    // const newTasks = structuredClone(tasks);
    //search for a task based on condition
    const newTask = tasks.find((x) => x.id === taskId);
    if(newTask !== undefined){
    newTask.completed = !newTask.completed;
    setTasks(tasks);
    addCountDone();
    }
  };

  const addCountDone = () => {
    const countUpdate = tasks.filter(task => task.completed).length;
    setCount(countUpdate);
  }

  return (
    // Main container
    <div className="container mx-auto">
      {/* header section */}
      <Header />
      {/* tasks container */}
      <div style={{ maxWidth: "400px" }} className="mx-auto">
        {/* Task summary */}
        <p className="text-center text-secondary fst-italic">
          All ({tasks.length}) Done ({count})
        </p>
        {/* task input */}
        <TaskInput addTaskFunc={addTask} />

        {/* tasks mapping*/}
        {tasks.map((task) => (
          <Task
            id={task.id}
            title={task.title}
            deleteTaskFunc={deleteTask}
            toggleDoneTaskFunc={toggleDoneTask}
            completed={task.completed}
            key={task.id}
          />
        ))}
      </div>

      {/* //footer section */}
      <Footer year="2024" fullName="Jiradate Oratai" studentId="640610287" />
    </div>
  );
}
