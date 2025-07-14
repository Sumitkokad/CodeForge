"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { User, LogOut } from "lucide-react"
import "./Navbar.css"

const Navbar = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    setIsLoggedIn(!!token)

    if (token) {
      fetch("/base/current_user/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user info")
          }
          return response.json()
        })
        .then((data) => {
          setUserInfo(data)
        })
        .catch((error) => {
          console.error("Error fetching user info:", error)
          setUserInfo(null)
        })
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    setIsLoggedIn(false)
    setUserInfo(null)
    setShowDropdown(false)
    navigate("/auth")
  }

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev)
  }

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="navbar-title">
            <span className="navbar-highlight">Code</span>Forge
          </span>
        </Link>

        <div className="navbar-links">
          <Link to="/chatbot">
            <Button variant="outline" className="codebot-button">
              CodeBot
            </Button>
          </Link>

          {!isLoggedIn ? (
            <Link to="/auth">
              <Button className="login-button">Login / Sign Up</Button>
            </Link>
          ) : (
            <div className="profile-container" ref={dropdownRef}>
              <Button variant="ghost" className="profile-icon-button" onClick={toggleDropdown}>
                <User size={22} />
              </Button>
              {showDropdown && (
                <div className="profile-dropdown">
                  <Button variant="ghost" onClick={handleLogout} className="logout-button">
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
