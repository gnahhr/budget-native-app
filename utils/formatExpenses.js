import { formatDate } from "./dateFunctions";

export default formatExpenses = (data) => {
  const categories = data.map((data) => data.category);
  const dates = data.map((data) => formatDate(data.createdAt));
  const reduceDates = [...new Set(dates)];
  const tabs = [...new Set(categories)];

  return reduceDates.map((date) => {
    const transactions = tabs.map((category) => {
      const total = data.reduce((sum, object) => {
        if ((object['category'] === category) && (formatDate(object.createdAt) === date)) {
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

