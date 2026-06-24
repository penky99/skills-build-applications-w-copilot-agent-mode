export const codespaceName = process.env.CODESPACE_NAME
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const port = process.env.PORT ? Number(process.env.PORT) : 8000
export const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'
