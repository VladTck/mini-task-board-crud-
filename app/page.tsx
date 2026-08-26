import { getTasks } from "@/lib/task-storage";
import HomeClient from "./components/HomeClient";

export default function Home() {
  const tasks = getTasks();

  return <HomeClient initialTasks={tasks} />;
}