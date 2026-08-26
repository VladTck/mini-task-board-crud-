"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Props = {
  addTask: (
    title: string,
    description: string,
    status: "todo" | "in-progress" | "done"
  ) => void;
};

export default function TaskForm({ addTask }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] =
    useState<"todo" | "in-progress" | "done">("todo");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (title === "" || description === "") {
      alert("Fill all fields");
      return;
    }

    addTask(title, description, status);

    setTitle("");
    setDescription("");
    setStatus("todo");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Select
        value={status}
        onValueChange={(value) =>
          setStatus(value as "todo" | "in-progress" | "done")
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="todo">Todo</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="done">Done</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit">
        Add task
      </Button>
    </form>
  );
}