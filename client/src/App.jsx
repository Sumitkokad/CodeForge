import { Routes, Route } from 'react-router-dom';
import "./App.css";
import CodeForge from "./home";
import Auth from "./auth_part1";
import Chatbot from './Chatbot';
// import CodeEditor from './components/Editor';
// import CodeEditor from './CodeEditor';
import CodeEditor from './components/editor/CodeEditor';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CodeForge />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/editor" element={<CodeEditor/>}/>
        

      </Routes>
    </div>
  );
}

export default App;
