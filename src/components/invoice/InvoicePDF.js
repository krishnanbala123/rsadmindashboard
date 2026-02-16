// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   Image
// } from '@react-pdf/renderer';

// const today = new Date().toLocaleDateString('en-IN');

// const styles = StyleSheet.create({
//   page: {
//     padding: 40,
//     fontSize: 11,
//     fontFamily: 'Helvetica'
//   },

//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20
//   },

//   logo: {
//     width: 90,
//     height: 50
//   },

//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'right'
//   },

//   date: {
//     fontSize: 10,
//     textAlign: 'right',
//     marginTop: 4
//   },

//   section: {
//     marginBottom: 12
//   },

//   label: {
//     fontWeight: 'bold'
//   },

//   table: {
//     borderWidth: 1,
//     marginTop: 10
//   },

//   row: {
//     flexDirection: 'row'
//   },

//   cell: {
//     padding: 6,
//     borderRightWidth: 1,
//     borderBottomWidth: 1
//   },

//   hrow: {
//     backgroundColor: '#eee',
//     fontWeight: 'bold'
//   },

//   type: { width: '40%' },
//   qty: { width: '20%', textAlign: 'center' },
//   rate: { width: '20%', textAlign: 'center' },
//   amt: { width: '20%', textAlign: 'right', borderRightWidth: 0 },

//   totals: {
//     marginTop: 12,
//     alignItems: 'flex-end'
//   },

//   trow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '40%'
//   },

//   footer: {
//     marginTop: 40,
//     flexDirection: 'row',
//     justifyContent: 'flex-end'
//   },

//   sign: {
//     width: 100,
//     height: 40
//   },

//   thanks: {
//     textAlign: 'center',
//     marginTop: 30
//   }
// });

// export default function InvoicePDF({ order }) {
//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>

//         {/* HEADER */}
//         <View style={styles.header}>
//           <Image src="/logo.png" style={styles.logo} />
//           <View>
//             <Text style={styles.title}>RS BRICKS - INVOICE</Text>
//             <Text style={styles.date}>Date: {today}</Text>
//           </View>
//         </View>

//         {/* CUSTOMER */}
//         <View style={styles.section}>
//           <Text><Text style={styles.label}>Order ID:</Text> {order.orderId}</Text>
//           <Text><Text style={styles.label}>Customer:</Text> {order.name}</Text>
//           <Text><Text style={styles.label}>Phone:</Text> {order.phone}</Text>
//           <Text><Text style={styles.label}>Address:</Text> {order.deliveryAddress}</Text>
//         </View>

//         {/* TABLE */}
//         <View style={styles.table}>
//           <View style={[styles.row, styles.hrow]}>
//             <Text style={[styles.cell, styles.type]}>Bricks Type</Text>
//             <Text style={[styles.cell, styles.qty]}>Quantity</Text>
//             <Text style={[styles.cell, styles.rate]}>Bricks Rate</Text>
//             <Text style={[styles.cell, styles.amt]}>Total Amount</Text>
//           </View>

// <View style={styles.row}>
//   <Text style={[styles.cell, styles.type]}>
//     {order.items?.[0]?.type || '-'}
//   </Text>

//   <Text style={[styles.cell, styles.qty]}>
//     {order.items?.[0]?.quantity || 0}
//   </Text>

//   <Text style={[styles.cell, styles.rate]}>
//     ₹{order.items?.[0]?.rate || 0}
//   </Text>

//   <Text style={[styles.cell, styles.amt]}>
//     ₹{order.totalAmount || 0}
//   </Text>
// </View>

//         </View>

//         {/* TOTALS */}
//         <View style={styles.totals}>
//           <View style={styles.trow}>
//             <Text>Total:</Text>
//             <Text>₹{order.totalAmount}</Text>
//           </View>
//           <View style={styles.trow}>
//             <Text>Paid:</Text>
//             <Text>₹{order.paidAmount}</Text>
//           </View>
//           <View style={styles.trow}>
//             <Text>Balance:</Text>
//             <Text>₹{order.remainingAmount}</Text>
//           </View>
//           <View style={styles.trow}>
//             <Text>Status:</Text>
//             <Text>{order.paymentStatus.toUpperCase()}</Text>
//           </View>
//         </View>

//         {/* SIGN */}
//         <View style={styles.footer}>
//           <View>
//             <Image src="/signature.png" style={styles.sign} />
//             <Text>Authorized Signature</Text>
//           </View>
//         </View>

//         <Text style={styles.thanks}>
//           Thank you for choosing RS Bricks
//         </Text>

//       </Page>
//     </Document>
//   );
// }

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image
} from '@react-pdf/renderer';

const today = new Date().toLocaleDateString('en-IN');

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica'
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },

  logo: {
    width: 90,
    height: 50
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right'
  },

  date: {
    fontSize: 10,
    textAlign: 'right',
    marginTop: 4
  },

  section: {
    marginBottom: 12
  },

  label: {
    fontWeight: 'bold'
  },

  table: {
    borderWidth: 1,
    marginTop: 10
  },

  row: {
    flexDirection: 'row'
  },

  cell: {
    padding: 6,
    borderRightWidth: 1,
    borderBottomWidth: 1
  },

  hrow: {
    backgroundColor: '#eee',
    fontWeight: 'bold'
  },

  type: { width: '40%' },
  qty: { width: '15%', textAlign: 'center' },
  rate: { width: '20%', textAlign: 'center' },
  amt: { width: '25%', textAlign: 'right', borderRightWidth: 0 },

  totals: {
    marginTop: 15,
    alignItems: 'flex-end'
  },

  trow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '45%',
    marginBottom: 3
  },

  footer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

  sign: {
    width: 150,
    height: 40,
    paddingRight: 20
  },
  signText: {
      width: 150,
    height: 40,
    paddingRight: 20
  },

  thanks: {
    textAlign: 'center',
    marginTop: 30
  }
});

export default function InvoicePDF({ order }) {

  const items = order.items || [];

  // 🔥 Calculate material total properly
  const materialTotal = items.reduce(
    (sum, item) =>
      sum +
      Number(item.quantity || 0) *
      Number(item.rate || 0),
    0
  );

  const delivery = Number(order.delAmount || 0);
  const grandTotal = Number(order.totalAmount || 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* HEADER */}
        <View style={styles.header}>
          <Image src="/logo.png" style={styles.logo} />
          <View>
            <Text style={styles.title}>RS BRICKS - INVOICE</Text>
            <Text style={styles.date}>Date: {today}</Text>
          </View>
        </View>

        {/* CUSTOMER DETAILS */}
        <View style={styles.section}>
          <Text><Text style={styles.label}>Order ID:</Text> {order.orderId}</Text>
          <Text><Text style={styles.label}>Customer:</Text> {order.name}</Text>
          <Text><Text style={styles.label}>Phone:</Text> {order.phone}</Text>
          <Text><Text style={styles.label}>Address:</Text> {order.deliveryAddress}</Text>
        </View>

        {/* TABLE */}
        <View style={styles.table}>

          <View style={[styles.row, styles.hrow]}>
            <Text style={[styles.cell, styles.type]}>Brick Type</Text>
            <Text style={[styles.cell, styles.qty]}>Qty</Text>
            <Text style={[styles.cell, styles.rate]}>Rate</Text>
            <Text style={[styles.cell, styles.amt]}>Amount</Text>
          </View>

          {items.map((item, index) => {
            const amount =
              Number(item.quantity || 0) *
              Number(item.rate || 0);

            return (
              <View style={styles.row} key={index}>
                <Text style={[styles.cell, styles.type]}>
                  {item.type}
                </Text>

                <Text style={[styles.cell, styles.qty]}>
                  {item.quantity}
                </Text>

                <Text style={[styles.cell, styles.rate]}>
                  ₹{item.rate}
                </Text>

                <Text style={[styles.cell, styles.amt]}>
                  ₹{amount}
                </Text>
              </View>
            );
          })}
        </View>

        {/* TOTAL SUMMARY */}
        <View style={styles.totals}>

          <View style={styles.trow}>
            <Text>Material Total:</Text>
            <Text>₹{materialTotal}</Text>
          </View>

          <View style={styles.trow}>
            <Text>Delivery Charge:</Text>
            <Text>₹{delivery}</Text>
          </View>

          <View style={styles.trow}>
            <Text style={{ fontWeight: 'bold' }}>
              Grand Total:
            </Text>
            <Text style={{ fontWeight: 'bold' }}>
              ₹{grandTotal}
            </Text>
          </View>

          <View style={styles.trow}>
            <Text>Paid Amount:</Text>
            <Text>₹{order.paidAmount}</Text>
          </View>

          <View style={styles.trow}>
            <Text>Balance:</Text>
            <Text>₹{order.remainingAmount}</Text>
          </View>

          <View style={styles.trow}>
            <Text>Status:</Text>
            <Text>{order.paymentStatus?.toUpperCase()}</Text>
          </View>

        </View>

        {/* SIGNATURE */}
        <View style={styles.footer}>
          <View>
            <Image src="/balasign.png" style={styles.sign}  />
            <Text style={styles.signText}>Authorized Signature</Text>
          </View>
        </View>

        <Text style={styles.thanks}>
          Thank you for choosing RS Bricks
        </Text>

      </Page>
    </Document>
  );
}

