"use client";

import Link from "next/link";
import { Task } from "@/types/task";
import { deleteTask } from "@/app/actions/tasks";
import { Button } from "@/components/ui/button";

type Props = {
  task: Task;
  onDelete: (id: number) => void;
};

export default function TaskCard({ task, onDelete }: Props) {
  async function handleDelete() {
    await deleteTask(task.id);
    onDelete(task.id);
  }

  return (
    <div className="border p-3 mb-3">
      <h2 className="font-bold">{task.title}</h2>

      <p>{task.description}</p>

      <p>Status: {task.status}</p>

      <div className="flex gap-2 mt-2">
        <Link href={`/tasks/${task.id}`}>
          <Button>
            View details
          </Button>
        </Link>

        <Button onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}