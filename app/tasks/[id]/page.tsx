import Link from "next/link";
import { getTasks } from "@/lib/task-storage";
import EditTaskForm from "./EditTaskForm";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const tasks = getTasks();

  const task = tasks.find(
    (task) => task.id === Number(id)
  );

  if (!task) {
    return (
      <main className="p-5">
        <h1 className="text-xl font-bold mb-4">
          Task not found
        </h1>

        <Link href="/">
          <Button>Back</Button>
        </Link>
      </main>
    );
  }

  return <EditTaskForm task={task} />;
}