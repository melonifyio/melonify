import Grid2 from "@mui/material/Unstable_Grid2";
import { Summary } from "features/summary";
import { Task } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useTasksCount } from "./get-tasks-count";

export function TasksSummary() {
  const router = useRouter();

  const [totalTasks, isLoading] = useTasksCount();

  return (
    <Grid2 container spacing={2}>
      <Grid2 xs={3}>
        <Summary
          title="Tasks"
          total={totalTasks || 0}
          icon={<Task />}
          color="primary"
          isLoading={isLoading}
          onClick={() => {
            router.push("/tasks");
          }}
        />
      </Grid2>
    </Grid2>
  );
}
