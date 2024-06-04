import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AuthGoogle() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  console.log(window.location.search)
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/auth/google/callback${window.location.search}`)
      .then(response => {
        //setData(response.data)
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

  console.log(data)

  return (
    <div>

    </div>
  )
}
