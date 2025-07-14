




"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Send, CornerDownLeft, Bot } from "lucide-react"
import { cn } from "./lib/utils"
import "./Chatbot.css"
import { askAI } from "./lib/api" // Import backend API call
import Navbar from "./components/Navbar"

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      content: "Hi there! I'm CodeBot, your coding assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (input.trim() === "") return

    const userMessage = {
      id: Date.now().toString(),
      content: input.trim(),
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await askAI(userMessage.content) // Fetch from Django backend
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content: "⚠️ Sorry, there was an error connecting to the assistant.",
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    }

    setIsLoading(false)
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="chatbot-container">
      <Navbar />

      <div className="chatbot-scroll-area" ref={scrollAreaRef}>
        <div className="chatbot-messages-container">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn("chatbot-message", message.isBot ? "chatbot-message-bot" : "chatbot-message-user")}
              style={{ maxWidth: "85%" }}
            >
              {message.isBot && (
                <div className="chatbot-avatar">
                  <Bot className="chatbot-avatar-icon" />
                </div>
              )}
              <div className="chatbot-message-content">
                <p className="chatbot-message-text">{message.content}</p>
                <p className="chatbot-message-timestamp">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="chatbot-message chatbot-message-bot chatbot-loading" style={{ maxWidth: "85%" }}>
              <div className="chatbot-avatar">
                <Bot className="chatbot-avatar-icon" />
              </div>
              <div className="chatbot-loading-dots">
                <div className="chatbot-loading-dot" style={{ animationDelay: "0ms" }}></div>
                <div className="chatbot-loading-dot" style={{ animationDelay: "150ms" }}></div>
                <div className="chatbot-loading-dot" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="chatbot-footer">
        <form onSubmit={handleSubmit} className="chatbot-input-form">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="chatbot-input"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || input.trim() === ""}>
            {isLoading ? <CornerDownLeft className="chatbot-send-icon" /> : <Send className="chatbot-send-icon" />}
          </Button>
        </form>
        <p className="chatbot-footer-info">CodeBot can help with coding questions and provide suggestions</p>
      </footer>
    </div>
  )
}

export default Chatbot
