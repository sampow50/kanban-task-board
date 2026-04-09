import { useDraggable } from "@dnd-kit/core";

function TaskCard({ task, onClick }) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({ id: task.id });

  const isOverdue =
    task.due_date && new Date(task.due_date) < new Date();

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    padding: 12,
    margin: "10px 0",
    background: "white",
    borderRadius: 10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    cursor: "grab",
    border: isOverdue ? "2px solid red" : "none"
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onDoubleClick={() => onClick(task)}
    >
      <strong>{task.title}</strong>

      {task.description && (
        <div style={{ fontSize: 12 }}>{task.description}</div>
      )}

      <div style={{ fontSize: 12 }}>Priority: {task.priority}</div>

      {task.due_date && (
        <div style={{ fontSize: 12 }}>
          Due: {new Date(task.due_date).toLocaleDateString()}
        </div>
      )}

      {/* ✅ NEW SIMPLE ASSIGNEE DISPLAY */}
      {task.assignee_id && (
        <div style={{ fontSize: 12, marginTop: 5 }}>
          👤 {task.assignee_id}
        </div>
      )}
    </div>
  );
}

export default TaskCard;