import { formatDate, extractMonth, extractYear } from "./dateFunctions";

export default formatExpenses = (data, type='Daily') => {
  // Kuha lahat ng categories
  const categories = data.map((data) => data.category);

  // Different date formats for different types
  const formatFunctions = {
    'Daily': formatDate,
    'Weekly': formatDate,
    'Monthly': extractMonth,
    'Yearly': extractYear,
  }

  // Kinukuha lahat ng dates para ma-store separately then para ma filter yung same dates
  const dates = data.map((data) => formatFunctions[type](data.createdAt))
  // filter dates
  const reduceDates = [...new Set(dates)];
  // filter ng categories
  const tabs = [...new Set(categories)];

  // Summation ng expenses per category, if same yung dates from reduceDates sa buong array ng transactions,
  // Mag add lang sila ng costs
  // Nirereturn niya is object data na kasama yung date then list of transactions
  return reduceDates.map((date) => {
    const transactions = tabs.map((category) => {
      const total = data.reduce((sum, object) => {
        if ((object['category'] === category) && (formatFunctions[type](object.createdAt) === date)) {
          return Number(sum) + Number(object['amount'])
        } else {
          return Number(sum)
        }
      }, 0)

      return {
        category: category,
        amount: total,
      }
    })

    const filterTransactions = transactions.filter(transaction => transaction.amount > 0);

    return {
      date: date,
      transactions: filterTransactions,
    }
  })
}