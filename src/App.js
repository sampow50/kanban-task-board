import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { DndContext, closestCenter } from "@dnd-kit/core";
import Column from "./components/Column";
import TaskModal from "./components/TaskModal";
import Sidebar from "./components/Sidebar";

function App() {
  const columns = [
    { label: "To Do", value: "todo" },
    { label: "In Progress", value: "in_progress" },
    { label: "In Review", value: "in_review" },
    { label: "Done", value: "done" }
  ];

  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");
  const [assignee, setAssignee] = useState("");

  const [search, setSearch] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.signInAnonymously();
      setUser(data.user);
    };
    init();
  }, []);

  useEffect(() => {
    if (user) fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    const { data } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id);

    setTasks(data || []);
  };

  const handleAddTask = async () => {
    if (!newTask.trim()) return;

    await supabase.from("tasks").insert([
      {
        title: newTask,
        description,
        status: "todo",
        user_id: user.id,
        priority,
        due_date: dueDate || null,
        assignee_id: assignee || null // now just text
      }
    ]);

    setNewTask("");
    setDescription("");
    setPriority("low");
    setDueDate("");
    setAssignee("");

    fetchTasks();
  };

  const handleDragEnd = async ({ active, over }) => {
    if (!over) return;

    const taskId = active.id;
    const target = over.id;

    if (target === "trash") {
      await supabase.from("tasks").delete().eq("id", taskId);
    } else {
      await supabase
        .from("tasks")
        .update({ status: target })
        .eq("id", taskId);
    }

    fetchTasks();
  };

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex" }}>
      {/* SIDEBAR */}
      <Sidebar tasks={tasks} />

      {/* MAIN */}
      <div style={{ flex: 1, padding: 20 }}>
        <h1>Task Board</h1>
        <p style={{ color: "#666" }}>
          Double click on a task to add or see comments
        </p>

        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: 10, padding: 8 }}
        />

        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <input
            placeholder="Title"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <input
            placeholder="Assign to (type name)"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          />

          <button onClick={handleAddTask}>+ Add</button>
        </div>

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div style={{ display: "flex", gap: 20 }}>
            {columns.map((col) => (
              <Column
                key={col.value}
                column={col}
                tasks={filteredTasks}
                onTaskClick={setSelectedTask}
              />
            ))}

            {/* TRASH */}
            <Column
              column={{ label: "Trash", value: "trash" }}
              tasks={[]}
              onTaskClick={setSelectedTask}
            />
          </div>
        </DndContext>

        {selectedTask && (
          <TaskModal
            task={selectedTask}
            user={user}
            onClose={() => setSelectedTask(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;