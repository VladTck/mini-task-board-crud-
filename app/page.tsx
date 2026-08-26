"use client";
import { useState } from "react";
import { useEffect } from "react";
import { tasks } from "@/data/tasks";

import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { getTasks, saveTasks } from "./utils/storage";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [status, setStatus] = useState("all");
  const [taskList, setTaskList] = useState(tasks);

  useEffect(() => {
    const savedTasks = getTasks();

    if (savedTasks.length > 0) {
    setTaskList(savedTasks);
    } else {
        saveTasks(tasks);
    }
  }, []);

  const filteredTasks =
    status === "all" ? taskList : taskList.filter((task) => task.status === status);

  function addTask(
    title: string,
    description: string,
    status: "todo" | "in-progress" | "done"
  ) {
    const newTask = {
      id: taskList.length + 1,
      title,
      description,
      status,
    };

    const updatedTasks = [...taskList, newTask];

    setTaskList(updatedTasks);

    saveTasks(updatedTasks);
  }

  return (
    <main className="p-5">
      <h1 className="text-xl font-bold mb-4">Mini Task Board</h1>
      
      <div className="mb-5 flex gap-2">
        <Button onClick={() => setStatus("all")}>
          All
        </Button>

        <Button onClick={() => setStatus("todo")}>
          Todo
        </Button>

        <Button onClick={() => setStatus("in-progress")}>
          In Progress
        </Button>

        <Button onClick={() => setStatus("done")}>
          Done
        </Button>
      </div>

      <TaskForm addTask={addTask} />

      {filteredTasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <TaskList tasks={filteredTasks} />
      )}
    </main>
  );
}
