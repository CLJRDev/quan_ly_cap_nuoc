import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AuthFacebook() {
  const navigate = useNavigate()
  console.log(window.location.search)
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/auth/facebook/callback${window.location.search}`)
      .then(response => {
        console.log(response)
        const quyens = JSON.stringify(response.data.quyen)
        localStorage.setItem('quyens', quyens)
        localStorage.setItem('user', response.data.nguoi_dung)
        navigate('/dashboard')
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <div>

    </div>
  )
}
