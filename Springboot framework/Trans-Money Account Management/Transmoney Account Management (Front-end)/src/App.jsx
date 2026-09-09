import { useEffect, useMemo, useState, useCallback, useRef } from 'react'
import { AccountAPI } from './api.js'
import { ACCOUNT_TYPES } from './utils.js'
import Masthead from './components/Masthead.jsx'
import SummaryStrip from './components/SummaryStrip.jsx'
import AccountLedger from './components/AccountLedger.jsx'
import AccountPanel from './components/AccountPanel.jsx'
import ConfirmDialog from './components/ConfirmDialog.jsx'
import ToastStack from './components/ToastStack.jsx'

export default function App() {
  const [accounts, setAccounts] = useState([])
  const [connectionStatus, setConnectionStatus] = useState('loading')
  const [loadError, setLoadError] = useState('')

  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const [panelAccount, setPanelAccount] = useState(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const [pendingDelete, setPendingDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const [toasts, setToasts] = useState([])
  const toastId = useRef(0)

  const pushToast = useCallback((message, type = 'success') => {
    const id = ++toastId.current
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3200)
  }, [])

  const loadAccounts = useCallback(async () => {
    setConnectionStatus('loading')
    setLoadError('')
    try {
      const data = await AccountAPI.list()
      setAccounts(Array.isArray(data) ? data : [])
      setConnectionStatus('connected')
    } catch (err) {
      setConnectionStatus('error')
      setLoadError(
        err.message === 'Failed to fetch'
          ? "Can't reach the account service. Confirm the backend is running and CORS is enabled."
          : err.message
      )
    }
  }, [])

  useEffect(() => {
    loadAccounts()
  }, [loadAccounts])

  const filteredAccounts = useMemo(() => {
    return accounts.filter((account) => {
      const matchesSearch =
        search.trim() === '' ||
        account.customerName?.toLowerCase().includes(search.toLowerCase()) ||
        account.accountNumber?.toLowerCase().includes(search.toLowerCase())
      const matchesType = typeFilter === 'All' || account.accountType === typeFilter
      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Active' && account.active) ||
        (statusFilter === 'Inactive' && !account.active)
      return matchesSearch && matchesType && matchesStatus
    })
  }, [accounts, search, typeFilter, statusFilter])

  function openCreatePanel() {
    setPanelAccount(null)
    setPanelOpen(true)
  }

  function openEditPanel(account) {
    setPanelAccount(account)
    setPanelOpen(true)
  }

  function closePanel() {
    setPanelOpen(false)
    setPanelAccount(null)
  }

  async function handleSubmit(payload) {
    setSaving(true)
    try {
      if (payload.id) {
        const updated = await AccountAPI.update(payload.id, payload)
        setAccounts((prev) => prev.map((a) => (a.id === payload.id ? updated || payload : a)))
        pushToast(`Saved changes to ${payload.customerName}.`)
      } else {
        const created = await AccountAPI.create(payload)
        setAccounts((prev) => [...prev, created])
        pushToast(`Opened account for ${payload.customerName}.`)
      }
      closePanel()
    } catch (err) {
      pushToast(err.message || 'Something went wrong.', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleConfirmDelete() {
    if (!pendingDelete) return
    setDeleting(true)
    try {
      await AccountAPI.remove(pendingDelete.id)
      setAccounts((prev) => prev.filter((a) => a.id !== pendingDelete.id))
      pushToast(`Deleted ${pendingDelete.accountNumber}.`)
      setPendingDelete(null)
    } catch (err) {
      pushToast(err.message || 'Could not delete the account.', 'error')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="app-shell">
      <Masthead status={connectionStatus} />
      <SummaryStrip accounts={accounts} />

      <div className="toolbar">
        <div className="toolbar-filters">
          <div className="search-field">
            <input
              type="search"
              placeholder="Search by name or account number"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search accounts"
            />
          </div>
          <div className="select-field">
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} aria-label="Filter by type">
              <option value="All">All types</option>
              {ACCOUNT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="select-field">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by status"
            >
              <option value="All">All statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        <button className="btn btn-primary" onClick={openCreatePanel} type="button">
          New account
        </button>
      </div>

      <AccountLedger
        accounts={filteredAccounts}
        loading={connectionStatus === 'loading' && accounts.length === 0}
        error={connectionStatus === 'error' ? loadError : ''}
        onRetry={loadAccounts}
        onEdit={openEditPanel}
        onDelete={setPendingDelete}
        hasAnyAccounts={accounts.length > 0}
      />

      {panelOpen && (
        <AccountPanel account={panelAccount} onClose={closePanel} onSubmit={handleSubmit} saving={saving} />
      )}

      {pendingDelete && (
        <ConfirmDialog
          account={pendingDelete}
          onCancel={() => setPendingDelete(null)}
          onConfirm={handleConfirmDelete}
          working={deleting}
        />
      )}

      <ToastStack toasts={toasts} />
    </div>
  )
}
