import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AuthGoogle() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/auth/google/callback`)
      .then(response => {
        setData(response.data)
        navigate('/home')
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
