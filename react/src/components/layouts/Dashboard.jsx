import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { PieChart, Pie, Tooltip, BarChart, XAxis, YAxis, Legend, CartesianGrid, Bar, } from "recharts";
import axios from 'axios'
import { ToastContainer } from 'react-toastify';

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null)

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/dashboard`)
      .then(response => {
        setDashboard(response.data)
      })
  }, [])

  if (!dashboard) return

  const data = [
    { name: "Khách hàng", number: dashboard[0][0].so_khach_hang },
    { name: "Hợp đồng", number: dashboard[1][0].so_hop_dong },
    { name: "Khách hàng mới", number: dashboard[4][0].so_khach_hang_moi },
    { name: "Khách hàng mới không có hợp đồng", number: dashboard[5][0].so_khach_hang_moi_khong_hd },
    { name: "Hợp đồng chưa lắp đặt", number: dashboard[6][0].tong_khach_hang_co_hd_chua_lap_dat },
  ]

  const data2 = [
    { name: 'Đồng hồ khối', number: dashboard[2][0].so_dh_khoi },
    { name: 'Đồng hồ khách hàng', number: dashboard[3][0].so_dh_khach }
  ]


  return (
    <>
      <Sidebar />
      <div className='page'>
        <div className='form-container'>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PieChart width={400} height={400}>
              <Pie
                dataKey="number"
                isAnimationActive={false}
                data={data2}
                cx={200}
                cy={200}
                outerRadius={150}
                fill="#8884d8"
                label
              />
              <Tooltip />
            </PieChart>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <BarChart
              width={600}
              height={400}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 80,
                bottom: 5,
              }}
              barSize={30}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="number" fill="#8884d8" background={{ fill: "#eee" }} />
            </BarChart>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
