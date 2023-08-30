import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    transactionsList: [],
    inputTitle: '',
    inputAmount: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  getUserBalanceAmount = () => {
    const {transactionsList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount
    return balanceAmount
  }

  getUserIncomeAmount = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  getUserExpensesAmount = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })
    return expensesAmount
  }

  onChangeInputTitle = event => {
    this.setState({inputTitle: event.target.value})
  }

  onChangeInputAmount = event => {
    this.setState({inputAmount: event.target.value})
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {inputTitle, inputAmount, optionId} = this.state
    const {displayText} = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const newTransaction = {
      id: uuidv4(),
      title: inputTitle,
      amount: parseInt(inputAmount),
      type: displayText,
    }
    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      inputTitle: '',
      inputAmount: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onDeleteTransaction = id => {
    const {transactionsList} = this.state
    const updatedTransactionsList = transactionsList.filter(
      eachTransaction => eachTransaction.id !== id,
    )
    this.setState({
      transactionsList: updatedTransactionsList,
    })
  }

  render() {
    const {inputTitle, inputAmount, optionId, transactionsList} = this.state
    const balanceAmount = this.getUserBalanceAmount()
    const incomeAmount = this.getUserIncomeAmount()
    const expensesAmount = this.getUserExpensesAmount()
    return (
      <div className="money-manager-app-container">
        <div className="money-manager-responsive-container">
          <div className="money-manager-header-container">
            <h1 className="header-heading">Hi, Richard</h1>
            <p className="header-content">
              Welcome back to your
              <span className="header-text"> Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
          />
          <div className="money-manager-transaction-details">
            <form
              className="transaction-form-container"
              onSubmit={this.onAddTransaction}
            >
              <h1 className="transaction-heading">Add Transaction</h1>
              <label className="transaction-label" htmlFor="title">
                TITLE
              </label>
              <input
                type="text"
                className="transaction-input"
                id="title"
                value={inputTitle}
                onChange={this.onChangeInputTitle}
                placeholder="TITLE"
              />
              <label className="transaction-label" htmlFor="amount">
                AMOUNT
              </label>
              <input
                type="text"
                className="transaction-input"
                id="amount"
                value={inputAmount}
                onChange={this.onChangeInputAmount}
                placeholder="AMOUNT"
              />
              <label className="transaction-label" htmlFor="type">
                TYPE
              </label>
              <select
                className="transcation-input"
                id="type"
                value={optionId}
                onChange={this.onChangeOptionId}
              >
                {transactionTypeOptions.map(eachTransactionType => (
                  <option
                    key={eachTransactionType.optionId}
                    value={eachTransactionType.optionId}
                  >
                    {eachTransactionType.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="add-transaction-button">
                Add
              </button>
            </form>
            <div className="transactions-history-conatiner">
              <h1 className="transaction-heading">History</h1>
              <div className="transactions-table-container">
                <ul className="transactions-table">
                  <li className="transactions-table-header">
                    <p className="table-header-name">Title</p>
                    <p className="table-header-name">Amount</p>
                    <p className="table-header-name">Type</p>
                  </li>
                  {transactionsList.map(eachTransaction => (
                    <TransactionItem
                      key={eachTransaction.id}
                      transactionDetails={eachTransaction}
                      deleteTransaction={this.onDeleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
