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
    isAllow: [1, 0],
    subNav: [
      {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <MdIcons.MdOutlineSpaceDashboard />
      },
      {
        title: 'Người dùng',
        path: '/nguoi_dung',
        icon: <FaIcons.FaUsers />,
        maQuyen: 1
      },
      {
        title: 'Quyền',
        path: '/quyen',
        icon: <MdIcons.MdManageAccounts />,
        maQuyen: 1
      },
      {
        title: 'Phân quyền',
        path: '/quan_ly_phan_quyen',
        icon: <TbIcons.TbSubtask />,
        maQuyen: 1
      },
      {
        title: 'Đổi mật khẩu',
        path: '/doi_mat_khau',
        icon: <RiIcons.RiLockPasswordLine />
      }
    ]
  },
  {
    title: 'Danh Mục',
    // path: '/reports',
    icon: <AiIcons.AiFillBook />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    isAllow: [2, 6, 5],
    subNav: [
      {
        title: 'Chi nhánh',
        path: '/chi_nhanh',
        icon: <MdIcons.MdLocationCity />,
        maQuyen: 2
      },
      {
        title: 'Tổ quản lý',
        path: '/to_quan_ly',
        icon: <Fa6Icons.FaMapLocationDot />,
        maQuyen: 2
      },
      {
        title: 'Tuyến đọc',
        path: '/tuyen_doc',
        icon: <Fa6Icons.FaTimeline />,
        maQuyen: 2
      },
      {
        title: 'Quận huyện',
        path: '/quan_huyen',
        icon: <Fa6Icons.FaTreeCity />,
        maQuyen: 2
      },
      {
        title: 'Phường xã',
        path: '/phuong_xa',
        icon: <BiIcons.BiBuildingHouse />,
        maQuyen: 2
      },
      {
        title: 'Loại khách hàng',
        path: '/loai_khach_hang',
        icon: <Fa6Icons.FaUsersGear />,
        maQuyen: 6
      },
      {
        title: 'Loại đồng hồ',
        path: '/loai_dong_ho',
        icon: <FaIcons.FaStopwatch />,
        maQuyen: 5
      },
      {
        title: 'Nhà cung cấp đồng hồ',
        path: '/nha_cung_cap',
        icon: <TbIcons.TbBrandDatabricks />,
        maQuyen: 5
      },
      {
        title: 'Cỡ đồng hồ',
        path: '/co_dong_ho',
        icon: <TbIcons.TbRulerMeasure />,
        maQuyen: 5
      },
      {
        title: 'Phương thức thanh toán',
        path: '/phuong_thuc_thanh_toan',
        icon: <MdIcons.MdOutlinePayment />,
        maQuyen: 6
      },
    ]
  },
  {
    title: 'Khách Hàng',
    // path: '/overview',
    icon: <MdIcons.MdOutlinePayment />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    isAllow: [15, 16, 17, 18],
    subNav: [
      {
        title: 'Giá Nước',
        path: '/gia_nuoc',
        icon: <IoIcons.IoIosPricetags />,
        maQuyen: 18
      },
      {
        title: 'Khách Hàng',
        path: '/khach_hang',
        icon: <Fa6Icons.FaPeopleGroup />,
        maQuyen: 15
      },
      {
        title: 'Hợp đồng',
        path: '/hop_dong',
        icon: <FaIcons.FaFileContract />,
        maQuyen: 16
      },
      {
        title: 'Hóa đơn',
        path: '/hoa_don',
        icon: <FaIcons.FaFileInvoiceDollar />,
        maQuyen: 17
      },
      {
        title: 'Thanh toán',
        path: '/thanh_toan',
        icon: <FaIcons.FaFileInvoiceDollar />,
        maQuyen: 17
      }
    ]
  },
  {
    title: 'Đồng Hồ Và Lắp Đặt',
    // path: '/overview',
    icon: <FaIcons.FaStopwatch />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    isAllow: [8, 14],
    subNav: [
      {
        title: 'Đồng hồ khối',
        path: '/dong_ho_khoi',
        icon: <FaIcons.FaStopwatch />,
        maQuyen: 8
      },
      {
        title: 'Lắp đặt ĐH khối',
        path: '/lap_dat_dh_khoi',
        icon: <IoIcons.IoMdBuild />,
        maQuyen: 8
      },
      {
        title: 'Ghi chỉ số ĐH khối',
        path: '/ghi_chi_so_dh_khoi',
        icon: <TfiIcons.TfiWrite />,
        maQuyen: 14
      },
      {
        title: 'Đồng hồ khách hàng',
        path: '/dong_ho_khach',
        icon: <FaIcons.FaStopwatch />,
        maQuyen: 8
      },
      {
        title: 'Lắp đặt ĐH khách',
        path: '/lap_dat_dh_khach',
        icon: <IoIcons.IoMdBuild />,
        maQuyen: 8
      },
      {
        title: 'Ghi chỉ số ĐH khách',
        path: '/ghi_chi_so_dh_khach',
        icon: <TfiIcons.TfiWrite />,
        maQuyen: 14
      },
    ]
  },
  {
    title: 'Báo cáo thống kê',
    // path: '/overview',
    icon: <BiIcons.BiSolidReport />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    isAllow: [7],
    subNav: [
      {
        title: 'Công tác thu đọc',
        path: '/bao_cao_thu_doc',
        icon: <TbIcons.TbReportAnalytics />,
        maQuyen: 7
      },
      {
        title: 'Thất thoát nước',
        path: '/bao_cao_that_thoat_nuoc',
        icon: <TbIcons.TbReportAnalytics />,
        maQuyen: 7
      },
      {
        title: 'Sử dụng bất thường',
        path: '/bao_cao_su_dung_bat_thuong',
        icon: <TbIcons.TbReportAnalytics />,
        maQuyen: 7
      },
      {
        title: 'Chưa đóng tiền',
        path: '/bao_cao_chua_dong_tien',
        icon: <TbIcons.TbReportAnalytics />,
        maQuyen: 7
      },
      {
        title: 'Quản lý thu tiền',
        path: '/bao_cao_quan_ly_thu_tien',
        icon: <TbIcons.TbReportAnalytics />,
        maQuyen: 7
      },
      {
        title: 'Chưa có hợp đồng',
        path: '/bao_cao_chua_co_hop_dong',
        icon: <TbIcons.TbReportAnalytics />,
        maQuyen: 7
      },
      {
        title: 'Thống kê khách hàng',
        path: '/thong_ke_khach_hang',
        icon: <TbIcons.TbReportAnalytics />,
        maQuyen: 7
      },
    ]
  },
]