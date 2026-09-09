const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

async function handle(response, fallbackMessage) {
  if (!response.ok) {
    let message = fallbackMessage
    try {
      const text = await response.text()
      if (text) message = text
    } catch {
      // ignore body parse failure, keep fallback
    }
    throw new Error(message)
  }
  if (response.status === 204) return null
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) return response.json()
  return null
}

export const AccountAPI = {
  async list() {
    const res = await fetch(`${BASE_URL}/account/allaccounts`)
    return handle(res, 'Could not load accounts.')
  },

  async create(account) {
    const res = await fetch(`${BASE_URL}/account/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(account),
    })
    return handle(res, 'Could not create the account.')
  },

  async update(id, account) {
    const res = await fetch(`${BASE_URL}/account/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(account),
    })
    return handle(res, 'Could not update the account.')
  },

  async remove(id) {
    const res = await fetch(`${BASE_URL}/account/delete/${id}`, {
      method: 'DELETE',
    })
    return handle(res, 'Could not delete the account.')
  },
}
