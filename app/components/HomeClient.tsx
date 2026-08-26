"use client";

import { useState } from "react";
import { Task } from "@/types/task";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import { addTask, deleteTask } from "@/app/actions/tasks";
import { Button } from "@/components/ui/button";

type Props = {
  initialTasks: Task[];
};

export default function HomeClient({ initialTasks }: Props) {
  const [status, setStatus] = useState("all");
  const [taskList, setTaskList] = useState(initialTasks);

  async function handleAddTask(
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

    await addTask(newTask);

    setTaskList([...taskList, newTask]);
  }

  async function handleDeleteTask(id: number) {
    await deleteTask(id);

    setTaskList(taskList.filter((task) => task.id !== id));
  }

  const filteredTasks =
    status === "all"
      ? taskList
      : taskList.filter((task) => task.status === status);

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

      <TaskForm addTask={handleAddTask} />

      {filteredTasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onDelete={handleDeleteTask}
        />
      )}
    </main>
  );
}