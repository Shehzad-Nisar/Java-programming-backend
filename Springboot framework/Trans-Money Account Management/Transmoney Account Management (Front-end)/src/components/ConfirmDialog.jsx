export default function ConfirmDialog({ account, onCancel, onConfirm, working }) {
  return (
    <>
      <div className="scrim" onClick={onCancel} />
      <div className="confirm-box" role="alertdialog" aria-modal="true" aria-label="Confirm deletion">
        <h3>Delete this account?</h3>
        <p>
          This removes <strong>{account.accountNumber}</strong> for {account.customerName} from the
          ledger. This can't be undone.
        </p>
        <div className="confirm-actions">
          <button className="btn btn-ghost" onClick={onCancel} type="button">
            Cancel
          </button>
          <button
            className="btn btn-primary"
            style={{ background: 'var(--danger)' }}
            onClick={onConfirm}
            type="button"
            disabled={working}
          >
            {working ? 'Deleting…' : 'Delete account'}
          </button>
        </div>
      </div>
    </>
  )
}
