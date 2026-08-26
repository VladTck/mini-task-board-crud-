"use server";

import fs from "fs";
import path from "path";
import { Task } from "@/types/task";
import { getTasks, saveTasks } from "@/lib/task-storage";

export async function addTask(task: Task) {
  console.log("ADD ACTION:", task);

  const tasks = getTasks();

  tasks.push(task);

  saveTasks(tasks);

  console.log("TASK SAVED");
}

export async function updateTask(task: Task) {
  const tasks = getTasks();

  const index = tasks.findIndex((t) => t.id === task.id);

  if (index === -1) {
    return;
  }

  tasks[index] = task;

  saveTasks(tasks);
}

export async function deleteTask(id: number) {
  const tasks = getTasks();

  const updatedTasks = tasks.filter((task) => task.id !== id);

  saveTasks(updatedTasks);
}