import Sidebar from '../../layouts/Sidebar';
import HomeImage from '../../../assets/background.png'

export default function Home() {

  return (
    <>
      <Sidebar />
      <div className="page">
        <h2 className='title'>Phền mềm quản lý kinh doanh cấp nước</h2>
        <img className='home-image' src={HomeImage} alt="" />
      </div>
    </>
  )
}
