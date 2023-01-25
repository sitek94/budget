import * as google from '@googleapis/sheets'

const credentialsFilename = process.env.CREDENTIALS_FILENAME
const spreadsheetId = process.env.SPREADSHEET_ID
const scopes = process.env.SCOPES

const auth = new google.auth.GoogleAuth({
  keyFilename: credentialsFilename,
  scopes,
})

const sheets = google.sheets({
  version: 'v4',
  auth,
})

export default async function Expenses() {
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId,
  })

  const {title} = spreadsheet.data.sheets?.[0].properties || {}

  const data = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${title}!A1:B10`,
  })

  return (
    <>
      <h1>Expenses</h1>
      <pre>{JSON.stringify(data.data, null, 2)}</pre>
    </>
  )
}
