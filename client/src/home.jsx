


"use client"

import { useState } from "react"
import Navbar from "./components/Navbar"
import { Button } from "./components/ui/button"
import { useNavigate } from "react-router-dom"
import "./home.css"

const languages = [
  { name: "JavaScript", value: "javascript", icon: "🟨" },
  { name: "Python", value: "python", icon: "🐍" },
  { name: "Java", value: "java", icon: "☕" },
  { name: "C++", value: "cpp", icon: "➕➕" },
  { name: "Go", value: "go", icon: "🐹" },
  { name: "TypeScript", value: "typescript", icon: "🔵" },
  { name: "Rust", value: "rust", icon: "🦀" },
  { name: "PHP", value: "php", icon: "🐘" },
]

const LanguageGrid = ({ onLanguageSelect }) => {
  return (
    <div className="language-grid">
      {languages.map((lang) => (
        <button key={lang.value} className="language-card" onClick={() => onLanguageSelect(lang.value)}>
          <span className="language-icon">{lang.icon}</span>
          <span className="language-name">{lang.name}</span>
        </button>
      ))}
    </div>
  )
}

const GradientBackground = () => {
  return <div className="gradient-background" />
}

const CodeForge = () => {
  const navigate = useNavigate()
  const [selectedLanguage, setSelectedLanguage] = useState(null)

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language)
    navigate("/editor")
  }

  const handleGetStarted = () => {
    setSelectedLanguage("javascript")
    navigate("/editor")
  }

  return (
    <main className="home-container">
      <GradientBackground />
      <Navbar />

      <div className="content-wrapper">
        <section className="intro-section">
          <div className="intro-tag">
            <span className="mr-2">💻</span>
            <span className="tag-text">Modern Code Compiler</span>
          </div>

          <h1 className="main-title">
            <span>Code</span>Forge
          </h1>

          <p className="intro-description">
            A powerful, modern code compiler with support for multiple programming languages. Write, compile, and
            execute code in your browser.
          </p>

          <div className="intro-buttons">
            <Button className="btn-get-started" onClick={handleGetStarted}>
              Get Started <span className="ml-2">➡️</span>
            </Button>

            <Button variant="outline" className="btn-explore" asChild>
              <a href="#languages">Explore Languages</a>
            </Button>
          </div>
        </section>

        <section id="languages" className="language-section">
          <h2 className="section-title">Choose Your Language</h2>
          <p className="section-description">
            Select from a wide range of programming languages to start coding right away. Our compiler supports all
            major languages with real-time execution.
          </p>

          <LanguageGrid onLanguageSelect={handleLanguageSelect} />
        </section>

        <section className="features-section">
          <div className="features-grid">
            <div className="features-text">
              <h2 className="features-title">Powerful Features</h2>
              <ul className="features-list">
                {[
                  "Real-time code compilation and execution",
                  "Support for multiple programming languages",
                  "Code highlighting and intelligent suggestions",
                  "Save and share your code snippets",
                  "Customizable editor themes and settings",
                ].map((feature, index) => (
                  <li key={index} className="feature-item">
                    <div className="feature-icon">
                      <svg
                        className="check-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="btn-explore-features">Explore All Features</Button>
            </div>

            <div className="code-preview">
              <div className="code-header">
                <div className="code-dots">
                  <div className="dot red" />
                  <div className="dot yellow" />
                  <div className="dot green" />
                </div>
                <span className="file-name">main.py</span>
              </div>
              <pre className="code-content">
                <code>{`def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Print the first 10 Fibonacci numbers
for i in range(10):
    print(fibonacci(i))
`}</code>
              </pre>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default CodeForge
