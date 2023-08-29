// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {id, title, amount, type} = transactionDetails

  const onDeleteTransactionButton = () => {
    deleteTransaction(id)
  }

  return (
    <li className="transaction-item">
      <p className="transaction-text">{title}</p>
      <p className="transaction-text">Rs {amount}</p>
      <p className="transaction-text">Rs {type}</p>
      <div className="delete-transaction-conatainer">
        <button
          className="delete-transaction-button"
          onClick={onDeleteTransactionButton}
          data-testid="delete"
          type="button"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            className="delete-transaction-image"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
