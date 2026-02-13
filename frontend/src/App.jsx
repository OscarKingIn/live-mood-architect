import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [feeling, setFeeling] = useState("");
  const [affirmation, setAffirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!name.trim() || !feeling.trim()) {
      setError("Please enter your name and how you are feeling.");
      return;
    }

    setLoading(true);
    setError("");
    setAffirmation("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/affirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, feeling }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Something went wrong.");
      }

      const data = await response.json();
      setAffirmation(data.affirmation);
    } catch (err) {
      setError(err.message || "Failed to generate affirmation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Live Mood Architect</h1>

      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />

      <textarea
        placeholder="How are you feeling?"
        value={feeling}
        onChange={(e) => setFeeling(e.target.value)}
        style={styles.textarea}
      />

      <button onClick={handleGenerate} disabled={loading} style={styles.button}>
        {loading ? "Generating..." : "Generate Affirmation"}
      </button>

      {error && <p style={styles.error}>{error}</p>}

      {affirmation && (
        <div style={styles.result}>
          <p>{affirmation}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    fontFamily: "Arial",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  textarea: {
    padding: "10px",
    fontSize: "16px",
    minHeight: "80px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },
  error: {
    color: "red",
  },
  result: {
    backgroundColor: "#f0f0f0",
    padding: "15px",
    borderRadius: "5px",
  },
};

export default App;
