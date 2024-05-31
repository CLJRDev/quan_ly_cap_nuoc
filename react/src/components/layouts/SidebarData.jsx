import * as FaIcons from 'react-icons/fa'
import * as Fa6Icons from 'react-icons/fa6'
import * as AiIcons from 'react-icons/ai'
import * as RiIcons from 'react-icons/ri'
import * as TbIcons from 'react-icons/tb'
import * as MdIcons from "react-icons/md"
import * as BiIcons from "react-icons/bi"
import * as IoIcons from "react-icons/io"
import * as TfiIcons from "react-icons/tfi"

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
        title: 'Quyền',
        path: '/quyen',
        icon: <MdIcons.MdManageAccounts />,
      },
      {
        title: 'Phân quyền',
        path: '/quan_ly_phan_quyen',
        icon: <TbIcons.TbSubtask />,
      }
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
        path: '/nha_cung_cap',
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
    title: 'Khách Hàng',
    // path: '/overview',
    icon: <MdIcons.MdOutlinePayment />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Giá Nước',
        path: '/gia_nuoc',
        icon: <IoIcons.IoIosPricetags />,
      },
      {
        title: 'Khách Hàng',
        path: '/khach_hang',
        icon: <Fa6Icons.FaPeopleGroup />,
      },
      {
        title: 'Hợp đồng',
        path: '/hop_dong',
        icon: <FaIcons.FaFileContract />,
      },
      {
        title: 'Hóa đơn',
        path: '/hoa_don',
        icon: <FaIcons.FaFileInvoiceDollar />,
      }
    ]
  },
  {
    title: 'Đồng Hồ Và Lắp Đặt',
    // path: '/overview',
    icon: <FaIcons.FaStopwatch />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Đồng hồ khối',
        path: '/dong_ho_khoi',
        icon: <FaIcons.FaStopwatch />,
      },
      {
        title: 'Lắp đặt ĐH khối',
        path: '/lap_dat_dh_khoi',
        icon: <IoIcons.IoMdBuild />,
      },
      {
        title: 'Ghi chỉ số ĐH khối',
        path: '/ghi_chi_so_dh_khoi',
        icon: <TfiIcons.TfiWrite />,
      },
      {
        title: 'Đồng hồ khách hàng',
        path: '/dong_ho_khach',
        icon: <FaIcons.FaStopwatch />,
      },
      {
        title: 'Lắp đặt ĐH khách',
        path: '/lap_dat_dh_khach',
        icon: <IoIcons.IoMdBuild />,
      },
      {
        title: 'Ghi chỉ số ĐH khách',
        path: '/ghi_chi_so_dh_khach',
        icon: <TfiIcons.TfiWrite />,
      },
    ]
  },
  {
    title: 'Báo cáo thống kê',
    // path: '/overview',
    icon: <BiIcons.BiSolidReport />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Công tác thu đọc',
        path: '/bao_cao_thu_doc',
        icon: <TbIcons.TbReportAnalytics />,
      },
      {
        title: 'Thất thoát nước',
        path: '/bao_cao_that_thoat_nuoc',
        icon: <TbIcons.TbReportAnalytics />,
      },
      {
        title: 'Sử dụng bất thường',
        path: '/bao_cao_su_dung_bat_thuong',
        icon: <TbIcons.TbReportAnalytics />,
      },
      {
        title: 'Chưa đóng tiền',
        path: '/bao_cao_chua_dong_tien',
        icon: <TbIcons.TbReportAnalytics />,
      },
      {
        title: 'Quản lý thu tiền',
        path: '/bao_cao_quan_ly_thu_tien',
        icon: <TbIcons.TbReportAnalytics />,
      }
    ]
  },
]