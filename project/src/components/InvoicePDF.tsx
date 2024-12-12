import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import { InvoiceData } from '../types/invoice';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 'auto',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    paddingRight: 20,
  },
  label: {
    fontSize: 10,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 12,
    marginBottom: 8,
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  description: { flex: 2 },
  quantity: { flex: 1, textAlign: 'center' },
  price: { flex: 1, textAlign: 'right' },
  amount: { flex: 1, textAlign: 'right' },
  summary: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  summaryLabel: {
    width: 100,
  },
  summaryValue: {
    width: 100,
    textAlign: 'right',
  },
});

interface Props {
  data: InvoiceData;
}

export default function InvoicePDF({ data }: Props) {
  const subtotal = data.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const vatAmount = subtotal * (data.vatRate / 100);
  const total = subtotal + vatAmount;

  return (
    <PDFViewer style={{ width: '100%', height: '600px' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            {data.logo && (
              <Image src={data.logo} style={styles.logo} />
            )}
            <Text style={styles.title}>INVOICE</Text>
          </View>

          <View style={styles.grid}>
            <View style={styles.column}>
              <Text style={styles.label}>From:</Text>
              <Text style={styles.value}>{data.company.name}</Text>
              <Text style={styles.value}>{data.company.address}</Text>
              <Text style={styles.value}>VAT: {data.company.vatNumber}</Text>
              <Text style={styles.value}>{data.company.email}</Text>
              <Text style={styles.value}>{data.company.phone}</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Bill To:</Text>
              <Text style={styles.value}>{data.client.name}</Text>
              <Text style={styles.value}>{data.client.address}</Text>
              <Text style={styles.value}>VAT: {data.client.vatNumber}</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Invoice Details:</Text>
              <Text style={styles.value}>Number: {data.invoiceDetails.number}</Text>
              <Text style={styles.value}>Date: {data.invoiceDetails.date}</Text>
              <Text style={styles.value}>Due Date: {data.invoiceDetails.dueDate}</Text>
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.description}>Description</Text>
              <Text style={styles.quantity}>Quantity</Text>
              <Text style={styles.price}>Price</Text>
              <Text style={styles.amount}>Amount</Text>
            </View>

            {data.items.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                <Text style={styles.amount}>
                  ${(item.quantity * item.price).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal:</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>VAT ({data.vatRate}%):</Text>
              <Text style={styles.summaryValue}>${vatAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total:</Text>
              <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}