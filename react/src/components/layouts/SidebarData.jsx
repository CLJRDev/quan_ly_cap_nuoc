import * as FaIcons from 'react-icons/fa'
import * as Fa6Icons from 'react-icons/fa6'
import * as AiIcons from 'react-icons/ai'
import * as RiIcons from 'react-icons/ri'
import * as TbIcons from 'react-icons/tb'
import * as MdIcons from "react-icons/md"
import * as BiIcons from "react-icons/bi"

export const SidebarData = [
  {
    title: 'Hệ Thống',
    // path: '/overview',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Người dùng',
        path: '/nguoi_dung',
        icon: <FaIcons.FaUsers />,
      },
      {
        title: 'Phân quyền',
        path: '/phan_quyen',
        icon: <TbIcons.TbSubtask />,
      },
    ]
  },
  {
    title: 'Danh Mục',
    // path: '/reports',
    icon: <AiIcons.AiFillBook />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Chi nhánh',
        path: '/chi_nhanh',
        icon: <MdIcons.MdLocationCity />,
      },
      {
        title: 'Tổ quản lý',
        path: '/to_quan_ly',
        icon: <Fa6Icons.FaMapLocationDot />,
      },
      {
        title: 'Tuyến đọc',
        path: '/tuyen_doc',
        icon: <Fa6Icons.FaTimeline />,
      },
      {
        title: 'Quận huyện',
        path: '/quan_huyen',
        icon: <Fa6Icons.FaTreeCity />,
      },
      {
        title: 'Phường xã',
        path: '/phuong_xa',
        icon: <BiIcons.BiBuildingHouse />,
      },
      {
        title: 'Loại khách hàng',
        path: '/loai_khach_hang',
        icon: <Fa6Icons.FaUsersGear />,
      },
      {
        title: 'Loại đồng hồ',
        path: '/loai_dong_ho',
        icon: <FaIcons.FaStopwatch />,
      },
      {
        title: 'Nhà cung cấp đồng hồ',
        path: '/nha_cung_cap_dong_ho',
        icon: <TbIcons.TbBrandDatabricks />,
      },
      {
        title: 'Cỡ đồng hồ',
        path: '/co_dong_ho',
        icon: <TbIcons.TbRulerMeasure />,
      },
      {
        title: 'Phương thức thanh toán',
        path: '/phuong_thuc_thanh_toan',
        icon: <MdIcons.MdOutlinePayment />,
      },
    ]
  },
  {
    title: 'Đồng Hồ Và Lắp Đặt',
    // path: '/overview',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Người dùng',
        path: '/nguoi_dung',
        icon: <FaIcons.FaUser />,
      },
      {
        title: 'Phân quyền',
        path: '/phan_quyen',
        icon: <TbIcons.TbSubtask />,
      },
    ]
  },
]