import { formatDate } from "./dateFunctions";

export default formatExpenses = (data) => {
  const categories = data.map((data) => data.category);
  const dates = data.map((data) => formatDate(data.createdAt));
  const reduceDates = [...new Set(dates)];
  const tabs = [...new Set(categories)];

  return reduceDates.map((date) => {
    const transactions = tabs.map((category) => {
      const total = data.reduce((sum, object) => {
        if (object['category'] === category) {
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

    return {
      date: date,
      transactions: transactions,
    }
  })
}