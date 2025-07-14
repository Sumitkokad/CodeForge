"use client"

import { useState } from "react"
import Editor from "@monaco-editor/react"
import axios from "axios"
import "./CodeEditor.css" // Import the external CSS
import Navbar from "../../components/Navbar"

export default function CodeEditorPage() {
  const [code, setCode] = useState("print('Hello')")
  const [output, setOutput] = useState("")
  const [language, setLanguage] = useState("python")
  const [loading, setLoading] = useState(false)

  // Combined input/output area content
  const [ioText, setIoText] = useState("")

  const runCode = async () => {
    setLoading(true)
    try {
      const res = await axios.post("http://localhost:8000/api/run/", {
        language,
        code,
        input: ioText, // send combined input from ioText
      })
      setOutput(res.data.output || "No output")
      setIoText(res.data.output || "") // update ioText with output after run
    } catch (err) {
      console.error("Error:", err.response?.data || err.message)
      setOutput(err.response?.data?.error || "Unknown error occurred")
      setIoText(err.response?.data?.error || "Unknown error occurred")
    }
    setLoading(false)
  }

  const languageTemplates = {
    python: "print('Hello from Python!')",
    c: `#include <stdio.h>\nint main() {\n  printf("Hello from C!\\n");\n  return 0;\n}`,
    cpp: `#include <iostream>\nint main() {\n  std::cout << "Hello from C++!" << std::endl;\n  return 0;\n}`,
    java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello from Java!");\n  }\n}`,
    sql: `CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT, age INTEGER);\nINSERT INTO students (name, age) VALUES ('John', 25), ('Alice', 30);\nSELECT * FROM students;`,
    javascript: `console.log("Hello from JavaScript!");`,
  }

  const handleLanguageChange = (e) => {
    const lang = e.target.value
    setLanguage(lang)
    setCode(languageTemplates[lang])
  }

  return (
    <div className="editor-page">
      <Navbar />
      <div className="code-editor-container">
        <div className="editor-header">
          <h2 className="editor-title">Code Compiler</h2>
          <div className="language-selector">
            <select onChange={handleLanguageChange} value={language}>
              <option value="python">Python</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="sql">SQL</option>
              <option value="javascript">JavaScript</option>
            </select>
          </div>
        </div>

        <div className="editor-content">
          <div className="editor-wrapper">
            <Editor
              height="100%"
              language={language === "cpp" ? "cpp" : language}
              value={code}
              theme="vs-dark"
              onChange={(value) => setCode(value)}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "'Fira Code', monospace",
                scrollBeyondLastLine: false,
                lineNumbers: "on",
                roundedSelection: true,
                automaticLayout: true,
                cursorBlinking: "phase",
              }}
            />
          </div>

          <div className="output-section">
            <button onClick={runCode} className={`run-button ${loading ? "loading" : ""}`} disabled={loading}>
              {loading ? "Executing..." : "Run Code"}
            </button>

            <h3 className="output-header">Output / Input</h3>
            <textarea
              className="output-container"
              placeholder="Output will appear here. You can also type input here for the program."
              value={ioText}
              onChange={(e) => setIoText(e.target.value)}
              rows={10}
              // style={{ width: "100%", padding: "8px", fontFamily: "'Fira Code', monospace", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc", marginTop: "8px", whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}



