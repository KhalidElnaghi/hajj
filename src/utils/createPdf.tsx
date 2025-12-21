/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useTranslations } from 'next-intl';
import { Page, Text, View, Font, Document, StyleSheet } from '@react-pdf/renderer';

Font.register({
  family: 'Amiri',
  fonts: [
    {
      src: '/fonts/Amiri-Regular.ttf',
      fontWeight: 'normal',
    },
    {
      src: '/fonts/Amiri-Bold.ttf',
      fontWeight: 'bold',
    },
  ],
});

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
    fontFamily: 'Amiri',
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    border: '1px solid #000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #000',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
    padding: 5,
    borderRight: '1px solid #000',
  },
  tableCellLast: {
    flex: 1,
    fontSize: 10,
    padding: 5,
  },
});
type columnType = {
  header: string;
  key: string;
  format?: (value: string) => void;
};
const PdfComp = ({ data, columns, title }: any) => {
  const t = useTranslations();
  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        <Text style={styles.header}>{t(title)}</Text>

        {/* Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            {columns?.map((column: columnType) => (
              <Text style={styles.tableCell}>{t(column?.header)}</Text>
            ))}
          </View>

          {/* Loop through orders and generate table rows */}
          {data.map((item: any, index: number) => (
            <View key={index} style={styles.tableRow}>
              {columns?.map((col: columnType) => {
                const cellValue = item[col?.key];

                // Check if the value is undefined or null
                const isValueMissing = cellValue === undefined || cellValue === null;

                // Format the value if a format function is provided
                const formattedValue =
                  col?.format && typeof col?.format === 'function'
                    ? col.format(cellValue)
                    : cellValue;

                // Display the value, or 'N/A' if the value is missing
                return (
                  <Text key={col.key} style={styles.tableCell}>
                    {isValueMissing ? 'N/A' : formattedValue}
                  </Text>
                );
              })}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PdfComp;
