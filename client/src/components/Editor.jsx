import Editor from "@monaco-editor/react";
import { useState } from "react";
import axios from "axios";

export default function CodeEditor() {
  const [code, setCode] = useState("print('Hello')");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runCode = async () => {
    setLoading(true);
    setError("");
    setOutput("");

    try {
      const res = await axios.post("http://localhost:8000/api/run/", {
        language: "python",
        code,
      });
      setOutput(res.data.stdout || res.data.stderr || "No output.");
    } catch (err) {
      setError("Failed to run code. Please check the server.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <Editor
        height="300px"
        defaultLanguage="python"
        defaultValue={code}
        onChange={(value) => setCode(value)}
      />
      <button
        onClick={runCode}
        style={{
          marginTop: "10px",
          padding: "8px 16px",
          background: "#2e7d32",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {loading ? "Running..." : "Run Code"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <pre
        style={{
          background: "#f4f4f4",
          padding: "10px",
          marginTop: "10px",
          borderRadius: "4px",
        }}
      >
        {output}
      </pre>
    </div>
  );
}
