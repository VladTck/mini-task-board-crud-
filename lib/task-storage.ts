import fs from "fs";
import path from "path";
import { Task } from "@/types/task";

const filePath = path.join(process.cwd(), "data", "tasks.json");

export function getTasks(): Task[] {
  const data = fs.readFileSync(filePath, "utf-8");

  return JSON.parse(data);
}

export function saveTasks(tasks: Task[]) {
  fs.writeFileSync(
    filePath,
    JSON.stringify(tasks, null, 2),
    "utf-8"
  );
}