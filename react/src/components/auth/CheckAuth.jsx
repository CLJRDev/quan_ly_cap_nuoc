export default function CheckAuth(quyen) {
  const user = localStorage.getItem('user')
  const quyensArray = JSON.parse(localStorage.getItem('quyens'))
  return !user ? 1 : quyensArray.includes(quyen) ? 2 : 3
}
