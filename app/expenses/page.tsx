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

  const [header, ...rows] = data.data.values || []

  return (
    <>
      <h1>Expenses</h1>
      <table>
        <thead>
          <tr>
            {header.map((cell, index) => (
              <th key={index}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
