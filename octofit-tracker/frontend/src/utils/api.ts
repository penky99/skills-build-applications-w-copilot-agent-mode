/**
 * API Configuration for Octofit Tracker
 * 
 * Uses Vite environment variable VITE_CODESPACE_NAME for Codespaces support.
 * Define VITE_CODESPACE_NAME in .env.local (example: VITE_CODESPACE_NAME=my-codespace)
 * 
 * If VITE_CODESPACE_NAME is not set, falls back to localhost:8000
 */

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

console.log(`API Base URL: ${apiBaseUrl}`)

/**
 * Fetch data from API endpoint
 * Handles both paginated responses (object with array values) and direct array responses
 */
export const fetchApiData = async <T>(
  endpoint: string
): Promise<T[]> => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/${endpoint}`)
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

export const getApiBaseUrl = () => apiBaseUrl
