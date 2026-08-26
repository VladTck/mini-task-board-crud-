import TaskCard from "./TaskCard";
import { Task } from "@/types/task";

type Props = {
  tasks: Task[];
};

export default function TaskList({ tasks }: Props) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
        />
      ))}
    </div>
  );
}