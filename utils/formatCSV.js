import { writeFile, DownloadDirectoryPath } from 'react-native-fs';
import XLSX from 'xlsx';

export default formatCSV = (formattedTransactions) => {
  
  const firstFormat = (formattedTransactions.map(transaction => {
    return {
      date: transaction.date,
      transactions: transaction.transactions.map(item => `${item.category} - ${item.amount}`)
    }
  }));

  const headers = firstFormat.map(item => item.date.split(',').join('')).join(',');
  let rows = [];
  let maxRows = 0;

  firstFormat.forEach(item => {
    if (item.transactions.length > maxRows) {
      maxRows = item.transactions.length
    }
  })

  for(let x = 0; x < maxRows; x++) {
    let curRow = firstFormat.map(item => {
      if (item.transactions[x] === undefined) {
        return ' '
      } else {
        return `${item.transactions[x]}`
      }
    });
    
    rows.push(curRow);
  }
  const data = [headers, rows.map(row => row.join(',')).join(',\n')].join(',\n');

  let wb = XLSX.utils.book_new();
  // let ws = XLSX.utils.
  const bstr = XLSX.write(wb, {type:'binary', bookType:"xlsx"});

  writeFile(
    DownloadDirectoryPath + '/test.csv',
    bstr,
    'ascii',
  ).then(res => {
    alert('Export Data Successfully');
  }).catch(e => {
    console.log('Error writeFile', e);
  })
};