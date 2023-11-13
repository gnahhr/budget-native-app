import c503020 from '../assets/chart/503020.png';
import c602020 from '../assets/chart/602020.png';
import c702010 from '../assets/chart/702010.png'; 

const suggestionList = [
  {
    name: '50/30/20',
    description: "50/30/20 budget ratio is a good starting point for most people, but you may need to adjust it based on your individual circumstances. For example, if you have a lot of debt, you may want to allocate more of your income to debt repayment. Or, if you have young children, you may need to allocate more of your income to childcare.",
    chart: c503020,
    needs: 50,
    want: 20,
    saving: 30
  },
  {
    name: '60/20/20',
    description: "60/20/20 budget rule is a flexible budgeting method that can be tailored to your individual needs and circumstances. If you have a large amount of debt, you may want to allocate more of your income towards debt repayment. If you're saving for a specific goal, you may want to allocate more of your income towards savings.",
    chart: c602020,
    needs: 60,
    want: 20,
    saving: 20
  },
  {
    name: '70/20/10 ',
    description: "70/20/10 budget rule is a flexible budgeting guideline that can be customized to fit your individual needs and financial goals. For example, if you have a lot of debt, you may want to allocate more of your income to debt repayment. Or, if you're saving for a specific goal, such as a down payment on a house, you may want to allocate more of your income to savings.",
    chart: c702010,
    needs: 70,
    want: 10,
    saving: 20
  },
]

export {
  suggestionList
}