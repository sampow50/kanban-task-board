import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

function Column({ column, tasks, onTaskClick, team }) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.value
  });

  const isTrash = column.value === "trash";

  const columnTasks = tasks.filter(
    (t) => String(t.status) === String(column.value)
  );

  return (
    <div
      ref={setNodeRef}
      style={{
        width: 260,
        background: isTrash ? "#ffe5e5" : "#ffffff",
        borderRadius: 10,
        padding: 15,
        minHeight: 400,
        border: isOver ? "3px solid red" : "none"
      }}
    >
      <h3>{column.label}</h3>

      {isTrash ? (
        <div
          style={{
            height: 300,
            background: isOver ? "#ffcccc" : "#fff0f0",
            border: "2px dashed red",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold"
          }}
        >
          🗑 Drop here to delete
        </div>
      ) : (
        columnTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={onTaskClick}
          />
        ))
      )}
    </div>
  );
}

export default Column;