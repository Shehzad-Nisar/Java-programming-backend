import { formatCurrency } from '../utils.js'

export default function SummaryStrip({ accounts }) {
  const total = accounts.length
  const active = accounts.filter((a) => a.active).length
  const totalBalance = accounts.reduce((sum, a) => sum + Number(a.balance || 0), 0)

  return (
    <section className="summary-strip">
      <div className="summary-item">
        <p className="summary-label">Total balance</p>
        <p className="summary-value">{formatCurrency(totalBalance)}</p>
      </div>
      <div className="summary-item">
        <p className="summary-label">Accounts on file</p>
        <p className="summary-value">
          {total}
          <small>{total === 1 ? 'account' : 'accounts'}</small>
        </p>
      </div>
      <div className="summary-item">
        <p className="summary-label">Active accounts</p>
        <p className="summary-value">
          {active}
          <small>of {total}</small>
        </p>
      </div>
    </section>
  )
}
