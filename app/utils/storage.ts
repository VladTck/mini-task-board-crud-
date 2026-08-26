import { Task } from "@/types/task";

export function getTasks(): Task[] {
  if (typeof window === "undefined") {
  return [];
}

const data = localStorage.getItem("tasks");

  if (data) {
    return JSON.parse(data);
  }

  return [];
}

export function saveTasks(tasks: Task[]) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
}