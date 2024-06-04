import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer'
import { Font } from '@react-pdf/renderer';
import MyCustomFont from './Anton-Regular.ttf';

Font.register({
  family: 'AntonFamily',
  src: MyCustomFont
})

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "AntonFamily",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "AntonFamily",

  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
    fontFamily: "AntonFamily",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
    fontFamily: "AntonFamily",
  },
});


export default function PDFfile() {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed>Thống kê danh sách khách hàng khu vực 1</Text>
        <Text style={styles.text}>ABCD</Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
      </Page>
    </Document>
  )
}
