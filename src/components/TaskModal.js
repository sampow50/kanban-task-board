import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function TaskModal({ task, user, onClose }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("task_id", task.id)
      .order("created_at");

    setComments(data || []);
  };

  const addComment = async () => {
    if (!newComment.trim()) return;

    await supabase.from("comments").insert([
      {
        task_id: task.id,
        content: newComment,
        user_id: user.id
      }
    ]);

    setNewComment("");
    fetchComments();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)"
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          right: 0,
          width: 350,
          height: "100%",
          background: "white",
          padding: 20
        }}
      >
        <h2>{task.title}</h2>

        <p>{task.description}</p>

        <h4>Comments</h4>

        {comments.map((c) => (
            <div key={c.id} style={{ marginBottom: 10 }}>
                <p style={{ margin: 0 }}>{c.content}</p>
                <small style={{ color: "#666" }}>
                {new Date(c.created_at).toLocaleString()}
                </small>
            </div>
            ))}

        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add comment"
        />

        <button onClick={addComment}>Add</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default TaskModal;