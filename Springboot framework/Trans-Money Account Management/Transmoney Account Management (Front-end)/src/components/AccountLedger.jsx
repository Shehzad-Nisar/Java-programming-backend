import { formatCurrency } from '../utils.js'

export default function AccountLedger({ accounts, loading, error, onRetry, onEdit, onDelete, hasAnyAccounts }) {
  if (loading) {
    return <div className="ledger-loading">Loading accounts…</div>
  }

  if (error) {
    return (
      <div className="ledger-error">
        <span>{error}</span>
        <button className="btn-text" onClick={onRetry} type="button">
          Retry
        </button>
      </div>
    )
  }

  if (accounts.length === 0) {
    return (
      <div className="ledger-empty">
        <h3>{hasAnyAccounts ? 'No accounts match your filters' : 'No accounts yet'}</h3>
        <p>
          {hasAnyAccounts
            ? 'Try a different search term or reset the filters.'
            : 'Open the first account to see it appear here.'}
        </p>
      </div>
    )
  }

  return (
    <div className="ledger">
      <div className="ledger-row ledger-head" role="row">
        <span>Account</span>
        <span>Customer</span>
        <span>Type</span>
        <span>Status</span>
        <span style={{ textAlign: 'right' }}>Balance</span>
        <span />
      </div>
      {accounts.map((account) => (
        <div className="ledger-row" role="row" key={account.id}>
          <span className="col-number">{account.accountNumber}</span>
          <span className="col-name">{account.customerName}</span>
          <span className="col-type">{account.accountType}</span>
          <span className="col-status">
            <span className={`status-pill ${account.active ? 'active' : 'inactive'}`}>
              <span className="dot" />
              {account.active ? 'Active' : 'Inactive'}
            </span>
          </span>
          <span className={`col-balance ${Number(account.balance) < 0 ? 'negative' : ''}`}>
            {formatCurrency(account.balance)}
          </span>
          <span className="col-actions">
            <button className="btn-text" onClick={() => onEdit(account)} type="button">
              Edit
            </button>
            <button className="btn-danger-text" onClick={() => onDelete(account)} type="button">
              Delete
            </button>
          </span>
        </div>
      ))}
    </div>
  )
}
