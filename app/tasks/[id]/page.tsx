"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getTasks } from "@/app/utils/storage";
import { Task } from "@/types/task";

export default function Page() {
  const params = useParams();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tasks = getTasks();

    const foundTask = tasks.find(
      (t) => t.id === Number(params.id)
    );

    if (foundTask) {
      setTask(foundTask);
    }

    setLoading(false);
  }, [params.id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!task) {
    return (
      <main className="p-5">
        <h1>Task not found</h1>
        <Link href="/">Back</Link>
      </main>
    );
  }

  return (
    <main className="p-5">
      <h1>{task.title}</h1>

      <p>{task.description}</p>

      <p>Status: {task.status}</p>

      <Link href="/">Back</Link>
    </main>
  );
}