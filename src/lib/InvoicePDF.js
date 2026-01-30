import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image
} from '@react-pdf/renderer';

// 🔥 AUTO DATE
const today = new Date().toLocaleDateString('en-IN');

// 🎨 STYLES
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica'
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  logo: {
    width: 80,
    height: 50
  },
  titleBox: {
    textAlign: 'right'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  date: {
    marginTop: 4,
    fontSize: 10
  },

  /* SECTION */
  section: {
    marginBottom: 12
  },
  label: {
    fontWeight: 'bold'
  },

  /* TABLE */
  table: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000'
  },
  tableRow: {
    flexDirection: 'row'
  },
  tableHeader: {
    backgroundColor: '#f0f0f0'
  },
  cell: {
    padding: 6,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
    fontSize: 10
  },
  lastCell: {
    borderRightWidth: 0
  },

  colType: { width: '40%' },
  colQty: { width: '20%', textAlign: 'center' },
  colRate: { width: '20%', textAlign: 'center' },
  colAmt: { width: '20%', textAlign: 'right' },

  /* TOTALS */
  totals: {
    marginTop: 12,
    alignItems: 'flex-end'
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%'
  },

  /* FOOTER */
  footer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  signBox: {
    textAlign: 'center'
  },
  sign: {
    width: 100,
    height: 40,
    marginBottom: 4
  },
  thankYou: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 11
  }
});

export default function InvoicePDF({ order }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* 🔝 HEADER */}
        <View style={styles.header}>
          <Image
            src="/bricks-logo.PNG"   // 🔥 put logo in /public/logo.png
            style={styles.logo}
          />

          <View style={styles.titleBox}>
            <Text style={styles.title}>RS BRICKS – INVOICE</Text>
            <Text style={styles.date}>Date: {today}</Text>
          </View>
        </View>

        {/* 👤 CUSTOMER DETAILS */}
        <View style={styles.section}>
          <Text><Text style={styles.label}>Order ID:</Text> {order.orderId}</Text>
          <Text><Text style={styles.label}>Customer:</Text> {order.name}</Text>
          <Text><Text style={styles.label}>Phone:</Text> {order.phone}</Text>
          <Text><Text style={styles.label}>Address:</Text> {order.deliveryAddress}</Text>
        </View>

        {/* 📋 TABLE */}
        <View style={styles.table}>

          {/* HEADER ROW */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.cell, styles.colType]}>Brick Type</Text>
            <Text style={[styles.cell, styles.colQty]}>Qty</Text>
            <Text style={[styles.cell, styles.colRate]}>Rate / Brick</Text>
            <Text style={[styles.cell, styles.colAmt, styles.lastCell]}>Amount</Text>
          </View>

          {/* DATA ROW */}
          <View style={styles.tableRow}>
            <Text style={[styles.cell, styles.colType]}>{order.type}</Text>
            <Text style={[styles.cell, styles.colQty]}>{order.noOfBricks}</Text>
            <Text style={[styles.cell, styles.colRate]}>₹{order.brickRate}</Text>
            <Text style={[styles.cell, styles.colAmt, styles.lastCell]}>
              ₹{order.totalAmount}
            </Text>
          </View>
        </View>

        {/* 💰 TOTALS */}
        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text>Total Amount:</Text>
            <Text>₹{order.totalAmount}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Paid:</Text>
            <Text>₹{order.paidAmount}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Balance:</Text>
            <Text>₹{order.remainingAmount}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Status:</Text>
            <Text>{order.paymentStatus.toUpperCase()}</Text>
          </View>
        </View>

        {/* ✍️ FOOTER */}
        <View style={styles.footer}>
          <View />

          <View style={styles.signBox}>
            <Image
              src="/signature.png"   // 🔥 put sign in /public/signature.png
              style={styles.sign}
            />
            <Text>Authorized Signature</Text>
          </View>
        </View>

        <Text style={styles.thankYou}>
          Thank you for choosing RS Bricks - Nellai
        </Text>

      </Page>
    </Document>
  );
}
