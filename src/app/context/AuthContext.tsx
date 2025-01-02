// 파일 경로: /context/AuthContext.tsx

'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

interface AuthContextProps {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // 쿠키에서 로그인 상태 확인
  useEffect(() => {
    const id = Cookies.get('id') // 쿠키에 ID가 있는지 확인
    setIsLoggedIn(!!id) // ID가 있으면 로그인 상태로 설정
  }, [])

  const login = () => {
    setIsLoggedIn(true)
  }

  const logout = () => {
    // 쿠키 삭제
    Cookies.remove('id')
    Cookies.remove('password')
    setIsLoggedIn(false)
  }

  return <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
}

// Context를 사용하는 훅
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
