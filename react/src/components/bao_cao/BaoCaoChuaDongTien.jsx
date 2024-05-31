import LoaiKhachHang from "../select-option/LoaiKhachHang"
import Thang from "../select-option/Thang"
import Nam from "../select-option/Nam"
import { IoMdSearch } from "react-icons/io"

export default function BaoCaoChuaDongTien() {

  const handleSelectChange = (e) => {

  }

  const handleSubmit = async (e) => {

  }

  return (
    <div className='page'>
      <h2 className="title">Báo cáo thống kê khách hàng chưa đóng tiền</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Kỳ chỉ số</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '10px' }}>
            <Thang
              onChange={handleSelectChange}
              name='thang'
              require={true}
            />
            <Nam
              onChange={handleSelectChange}
              name='nam'
              require={true}
            />
          </div>
        </div>
        <div>
          <label htmlFor="">Loại khách hàng</label>
          <LoaiKhachHang
            isSearch={true}
            name='ma_hop_dong'
            onChang={handleSelectChange}
          />
        </div>
        <div>
          <button className="btn-search"><IoMdSearch style={{ transform: 'scale(1.2)' }} />
            &nbsp; Tìm kiếm</button>
        </div>
      </form>
    </div>
  )
}
