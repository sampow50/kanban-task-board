function Sidebar({ tasks }) {
  const total = tasks.length;
  const todo = tasks.filter((t) => t.status === "todo").length;
  const inProgress = tasks.filter((t) => t.status === "in_progress").length;
  const done = tasks.filter((t) => t.status === "done").length;

  const overdue = tasks.filter(
    (t) => t.due_date && new Date(t.due_date) < new Date()
  ).length;

  return (
    <div
      style={{
        width: 220,
        background: "#1f2937",
        color: "white",
        padding: 20,
        minHeight: "100vh"
      }}
    >
      <h2>Stats</h2>

      <p>Total: {total}</p>
      <p>To Do: {todo}</p>
      <p>In Progress: {inProgress}</p>
      <p>Done: {done}</p>
      <p style={{ color: "red" }}>Overdue: {overdue}</p>
    </div>
  );
}

export default Sidebar;