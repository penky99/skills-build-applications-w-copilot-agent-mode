/**
 * API Configuration for Octofit Tracker
 *
 * Uses Vite environment variables for Codespaces or explicit backend URL configuration.
 * Define VITE_CODESPACE_NAME in .env.local for Codespaces support.
 * Optionally define VITE_API_BASE_URL to override the backend base URL.
 *
 * If VITE_CODESPACE_NAME is unset, the frontend falls back to a relative /api path.
 */

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const envApiBaseUrl = import.meta.env.VITE_API_BASE_URL
const codespaceApiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : ''
const apiBaseUrl = envApiBaseUrl || codespaceApiBaseUrl || ''

console.log(`API Base URL: ${apiBaseUrl || '(relative /api path)'}`)

/**
 * Fetch data from API endpoint
 * Handles both paginated responses (object with array values) and direct array responses
 */
export const fetchApiData = async <T>(
  endpoint: string
): Promise<T[]> => {
  try {
    const normalized = endpoint.replace(/^\/+|\/+$/g, '')
    const baseUrl = apiBaseUrl.replace(/\/+$/g, '')
    const apiUrl = baseUrl
      ? `${baseUrl}/api/${normalized}/`
      : `/api/${normalized}/`

    const response = await fetch(apiUrl)
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()

    // Handle paginated responses (e.g., { users: [...] })
    if (typeof data === 'object' && !Array.isArray(data)) {
      const values = Object.values(data)
      return values[0] as T[]
    }

    // Handle direct array responses
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error)
    return []
  }
}

export const getApiBaseUrl = () => apiBaseUrl || '/api'
