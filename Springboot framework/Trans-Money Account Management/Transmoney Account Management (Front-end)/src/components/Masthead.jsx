export default function Masthead({ status }) {
  const statusCopy = {
    connected: 'Connected to account service',
    loading: 'Connecting to account service…',
    error: 'Account service unreachable',
  }[status]

  const dotClass =
    status === 'connected' ? 'dot' : status === 'loading' ? 'dot dot-pending' : 'dot dot-down'

  return (
    <header className="masthead">
      <div className="masthead-mark">
        <h1>TransMoney</h1>
        <span>Account management</span>
      </div>
      <div className="masthead-status">
        <span className={dotClass} />
        {statusCopy}
      </div>
    </header>
  )
}
