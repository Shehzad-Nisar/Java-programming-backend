import { useEffect, useState } from 'react'
import { ACCOUNT_TYPES } from '../utils.js'

const emptyForm = {
  customerName: '',
  accountType: ACCOUNT_TYPES[0],
  balance: '',
  active: true,
}

export default function AccountPanel({ account, onClose, onSubmit, saving }) {
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const isEdit = Boolean(account)

  useEffect(() => {
    if (account) {
      setForm({
        customerName: account.customerName || '',
        accountType: account.accountType || ACCOUNT_TYPES[0],
        balance: String(account.balance ?? ''),
        active: Boolean(account.active),
      })
    } else {
      setForm(emptyForm)
    }
    setError('')
  }, [account])

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.customerName.trim()) {
      setError('Enter the customer name.')
      return
    }
    if (form.balance === '' || Number.isNaN(Number(form.balance))) {
      setError('Enter a valid balance.')
      return
    }
    setError('')
    onSubmit({
      ...(isEdit ? { id: account.id, accountNumber: account.accountNumber } : {}),
      customerName: form.customerName.trim(),
      accountType: form.accountType,
      balance: Number(form.balance),
      active: form.active,
    })
  }

  return (
    <>
      <div className="scrim" onClick={onClose} />
      <div className="panel" role="dialog" aria-modal="true" aria-label={isEdit ? 'Edit account' : 'Open account'}>
        <div className="panel-header">
          <div>
            <h2>{isEdit ? 'Edit account' : 'Open new account'}</h2>
            <p>{isEdit ? account.accountNumber : 'An account number is assigned automatically.'}</p>
          </div>
          <button className="panel-close" onClick={onClose} type="button" aria-label="Close">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} id="account-form">
          <div className="panel-body">
            {error && <div className="form-error">{error}</div>}

            <div className="field">
              <label htmlFor="customerName">Customer name</label>
              <input
                id="customerName"
                type="text"
                value={form.customerName}
                onChange={(e) => update('customerName', e.target.value)}
                placeholder="e.g. Priya Desai"
                autoFocus
              />
            </div>

            <div className="field">
              <label htmlFor="accountType">Account type</label>
              <select
                id="accountType"
                value={form.accountType}
                onChange={(e) => update('accountType', e.target.value)}
              >
                {ACCOUNT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="balance">{isEdit ? 'Balance' : 'Opening balance'}</label>
              <div className="balance-input">
                <span>$</span>
                <input
                  id="balance"
                  type="number"
                  step="0.01"
                  value={form.balance}
                  onChange={(e) => update('balance', e.target.value)}
                  placeholder="0.00"
                />
              </div>
              <p className="field-hint">Enter the amount in US dollars.</p>
            </div>

            <div className="toggle-row">
              <div>
                <strong>Active</strong>
                <p>Inactive accounts are kept on file but flagged as closed.</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => update('active', e.target.checked)}
                />
                <span className="switch-track" />
              </label>
            </div>
          </div>
        </form>

        <div className="panel-footer">
          <button className="btn btn-ghost" onClick={onClose} type="button">
            Cancel
          </button>
          <button className="btn btn-primary" type="submit" form="account-form" disabled={saving}>
            {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Open account'}
          </button>
        </div>
      </div>
    </>
  )
}
