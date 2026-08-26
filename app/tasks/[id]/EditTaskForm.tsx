"use client";

import { useState } from "react";
import Link from "next/link";

import { updateTask } from "@/app/actions/tasks";
import { Task } from "@/types/task";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  task: Task;
};

export default function EditTaskForm({ task }: Props) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] =
    useState<"todo" | "in-progress" | "done">(task.status);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Fill all fields");
      return;
    }

    const updatedTask: Task = {
      id: task.id,
      title,
      description,
      status,
    };

    await updateTask(updatedTask);

    alert("Task updated");
  }

  return (
    <main className="p-5 max-w-2xl">
      <h1 className="text-xl font-bold mb-4">
        Edit task
      </h1>

      <form
        onSubmit={handleUpdate}
        className="flex flex-col gap-4"
      >
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <Textarea
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          placeholder="Description"
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value as
                | "todo"
                | "in-progress"
                | "done"
            )
          }
          className="border p-2 rounded"
        >
          <option value="todo">Todo</option>
          <option value="in-progress">
            In Progress
          </option>
          <option value="done">Done</option>
        </select>

        <div className="flex gap-2">
          <Button type="submit">
            Save changes
          </Button>

          <Link href="/">
            <Button type="button" variant="outline">
              Back
            </Button>
          </Link>
        </div>
      </form>
    </main>
  );
}