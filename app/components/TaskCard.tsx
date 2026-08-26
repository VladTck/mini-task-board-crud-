import Link from "next/link";
import { Task } from "@/types/task";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  task: Task;
};

export default function TaskCard({ task }: Props) {
  return (
    <Card className="mb-3">
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p>{task.description}</p>

        <p className="mt-2">
          Status: {task.status}
        </p>

        <Link
          href={`/tasks/${task.id}`}
          className={buttonVariants()}
        >
          View details
        </Link>
      </CardContent>
    </Card>
  );
}