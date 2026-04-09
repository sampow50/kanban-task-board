import { useEffect, useState, useCallback } from "react";
import { supabase } from "../supabaseClient";

function TaskModal({ task, user, onClose }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");


  const fetchComments = useCallback(async () => {
    if (!task?.id) return;

    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("task_id", task.id)
      .order("created_at");

    setComments(data || []);
  }, [task?.id]);


  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

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
          background: "white",
          padding: 20,
          margin: "100px auto",
          width: 400,
          borderRadius: 8
        }}
      >
        <h2>{task.title}</h2>
        <p>{task.description}</p>

        <h3>Comments</h3>
        <div style={{ maxHeight: 200, overflowY: "auto" }}>
          {comments.map((c) => (
            <div key={c.id} style={{ marginBottom: 8 }}>
              <strong>{c.user_id}</strong>: {c.content}
            </div>
          ))}
        </div>

        <input
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={{ width: "100%", marginTop: 10 }}
        />

        <button onClick={addComment} style={{ marginTop: 10 }}>
          Add Comment
        </button>

        <button onClick={onClose} style={{ marginTop: 10, marginLeft: 10 }}>
          Close
        </button>
      </div>
    </div>
  );
}

export default TaskModal;
