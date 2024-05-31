<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="padding: 0;
  margin: 0;
  box-sizing: border-box;">
	<div style="display:flex;justify-content:center;">
		<div style="width: 900px; border: 1px solid #0051a9; color: #0051a9; font-family: 'Times New Roman', Times, serif; font-size: 18px;">
			<div style="border-bottom: 3px solid #0051a9; display: grid; grid-template-columns: 1.5fr 8.5fr; padding: 1rem;">
				<div style="padding: 0 2rem;">
					<img src="https://scontent.fhph1-3.fna.fbcdn.net/v/t39.30808-6/305500337_569995271589033_3699167684644876986_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHc2mQr4kVCK-k7nJYhoWzfIQ1MfCznOoUhDUx8LOc6hTokRQBjt-HXr_E61cND6ud-Fh0OsnvJ2fP7BovDD6Dq&_nc_ohc=8dODrWd2R-AQ7kNvgH_5k77&_nc_ht=scontent.fhph1-3.fna&oh=00_AYBSUBN19xMqdIf5GsiKT4C02SD23_MTzxf4TXx1HRRhFw&oe=665F7C65" style="width: 100px;"/>
					<div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 5px;">
						<h3 style="text-transform: uppercase; margin: 0;">Công ty cổ phần cấp nước hải phòng</h3>
						<h4 style="text-transform: uppercase; margin: 0;">Hai phong water joint stock company</h4>
					</div>
					<div>
						<p style="white-space: nowrap; margin: 0;">
							Địa chỉ: Số 54 Đinh Tiên Hoàng - Phường Hoàng Văn Thụ, Quận Hồng Bàng, TP Hải Phòng <br />
							Mã số thuế: <strong>0200171274</strong> <br />
							Số tài khoản: 1120 0000 9342 Ngân hàng TMCP Công thương Việt Nam - CN Hải Phòng <br />
							Website: <a href="http://www.capnuochaiphong.com.vn">www.capnuochaiphong.com.vn</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E-mail: <a href="mailto:cnhp@vnn.vn">cnhp@vnn.vn</a> <br />
							Trung tâm hỗ trợ khách hàng - Call Center &nbsp;&nbsp;&nbsp;<strong>Tel 0225 3 51 58 58</strong> - Fax: 0225 3 823 748
						</p>
					</div>
				</div>
			</div>
			<div style="padding: 1rem;">
				<div style="text-align:center;">
					<h3 style="color: red; text-transform: uppercase; margin: 0;">Hóa đơn giá trị gia tăng tiền nước</h3>
					<p style="font-style: italic; margin: 0;">Ngày {{$thong_tin['day']}} tháng {{$thong_tin['month']}} năm {{$thong_tin['year']}}</p>
					<div>
						Số HĐ: {{$thong_tin['ma_hop_dong']}}
					</div>
				</div>
				<div>
					<p style="line-height: 25px;">
						Tên khách hàng: {{$thong_tin['ten_khach_hang']}}<br />
						Địa chỉ: {{$thong_tin['dia_chi_khach']}}<br />
						Địa chỉ điểm dùng nước: {{$thong_tin['dia_chi_hop_dong']}}<br />
						Số điện thoại: {{$thong_tin['sdt']}} <br />
						Mã khách hàng: {{$thong_tin['ma_khach_hang']}}
					</p>
				</div>
				<div style="margin-top: 10px;">
					<table style="border-collapse: collapse; width: 100%; table-layout: fixed;">
						<tbody>
							<tr>
								<td style="border: 2px solid #0051a9; text-align: left; width: 25%;">Kỳ hóa đơn: {{$thong_tin['ky_hoa_don']}}</td>
								<td style="border: 2px solid #0051a9; text-align: left; width: 25%;">Từ ngày: {{$thong_tin['tu_ngay']}}</td>
								<td style="border: 2px solid #0051a9; text-align: left; width: 25%;">Chỉ số cũ: {{$thong_tin['chi_so_cu']}}</td>
								<td style="border: 2px solid #0051a9; text-align: left; width: 25%;">Tuyến: {{$thong_tin['ten_tuyen']}}</td>
							</tr>
							<tr>
								<td style="border: 2px solid #0051a9; text-align: left; width: 25%;">Mã hóa đơn: {{$thong_tin['ma_hoa_don']}}</td>
								<td style="border: 2px solid #0051a9; text-align: left; width: 25%;">Đến ngày: {{$thong_tin['den_ngay']}}</td>
								<td style="border: 2px solid #0051a9; text-align: left; width: 25%;">Chỉ số mới: {{$thong_tin['chi_so_moi']}}</td>
								<td style="border: 2px solid #0051a9; text-align: left; width: 25%;">Số m³ tiêu thụ: {{$thong_tin['so_tieu_thu']}}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div style="margin-top: 15px;">
					<table style="border-collapse: collapse; width: 100%;">
						<tbody>
							<tr>
								<td style="border: 2px solid #0051a9; text-align: left; width: 50px;">STT</td>
								<td style="border: 2px solid #0051a9; text-align: left; width: 200px;">Tên hàng hóa, dịch vụ</td>
								<td style="border: 2px solid #0051a9; text-align: left; width: 80px;">Số lượng (m³)</td>
								<td style="border: 2px solid #0051a9; text-align: left; width: 100px;">Đơn giá (đ/m³)</td>
								<td style="border: 2px solid #0051a9; text-align: left; width: 120px;">Thành tiền chưa có thuế GTGT (đ)</td>
								<td style="border: 2px solid #0051a9; text-align: left; width: 80px;">Thuế suất GTGT (%)</td>
								<td style="border: 2px solid #0051a9; text-align: left; width: 100px;">Tiền thuế GTGT (đ)</td>
								<td style="border: 2px solid #0051a9; text-align: left; width: 100px;">Thành tiền có thuế GTGT(đ)</td>
							</tr>
							<tr>
								<td style="border: 2px solid #0051a9; text-align: left;">1</td>
								<td style="border: 2px solid #0051a9; text-align: left;">Nước tiêu thụ</td>
								<td style="border: 2px solid #0051a9; text-align: left;">{{$thong_tin['so_tieu_thu']}}</td>
								<td style="border: 2px solid #0051a9; text-align: left;">{{$thong_tin['gia_ban']}}</td>
								<td style="border: 2px solid #0051a9; text-align: left;">{{$thong_tin['tong_tien_truoc_thue']}}</td>
								<td style="border: 2px solid #0051a9; text-align: left;">{{($thong_tin['hs_thue'])*100}}</td>
								<td style="border: 2px solid #0051a9; text-align: left;">{{$thong_tin['tong_tien_thue']}}</td>
								<td style="border: 2px solid #0051a9; text-align: left;">{{$thong_tin['tong_cong']}}</td>
							</tr>
							<tr>
								<td style="border: 2px solid #0051a9; text-align: left;" colspan="7">Tổng tiền chưa có thuế GTGT:</td>
								<td style="border: 2px solid #0051a9; text-align: right;">{{$thong_tin['tong_tien_truoc_thue']}}</td>
							</tr>
							<tr>
								<td style="border: 2px solid #0051a9; text-align: left;" colspan="7">Tổng tiền thuế GTGT:</td>
								<td style="border: 2px solid #0051a9; text-align: right;">{{$thong_tin['tong_tien_thue']}}</td>
							</tr>
							<tr>
								<td style="border: 2px solid #0051a9; text-align: left; color: red;" colspan="7"><strong>Tổng cộng:</strong></td>
								<td style="border: 2px solid #0051a9; text-align: right; color: red;"><strong>{{$thong_tin['tong_cong']}}</strong></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div style="padding: 1rem;">
				<p><strong>Ký bởi: Công ty cổ phần cấp nước Hải Phòng</strong></p>
				<p><strong>Ký ngày: </strong></p>
			</div>
		</div>
	</div>
</body>
</html>

