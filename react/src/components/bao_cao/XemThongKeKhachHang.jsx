import { PDFViewer } from "@react-pdf/renderer"
import PDFfile from "./PDFfile"

export default function XemThongKeKhachHang() {
  return (
    <PDFViewer style={{ width: '100vh', height: '100vh' }}>
      <PDFfile />
    </PDFViewer>
  )
}
