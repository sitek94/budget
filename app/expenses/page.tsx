import * as google from '@googleapis/sheets'
import {z} from 'zod'

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

const Transaction = z.object({
  id: z.string(),
  description: z.string(),
  price: z.string(),
  date: z.string(),
})

async function fetchTransactionsSheetValues() {
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId,
  })

  const {title} = spreadsheet.data.sheets?.[0].properties || {}

  const data = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${title}!A1:C10`,
  })

  const values = data.data.values
  if (!values) {
    throw new Error('"Transactions" sheet is empty')
  }

  return values
}

const columnOrder = ['description', 'price', 'date'] as const
const columnIndexMap = columnOrder.reduce(
  (acc, column, index) => ({...acc, [column]: index}),
  {} as Record<(typeof columnOrder)[number], number>,
)

const getTransactionsTable = (
  data: Awaited<ReturnType<typeof fetchTransactionsSheetValues>>,
) => {
  const [columnNames, ...rows] = data

  const transactions = rows.map((row, index) => {
    const description = row[columnIndexMap.description]
    const price = row[columnIndexMap.price]
    const date = row[columnIndexMap.date]

    return Transaction.parse({
      id: String(index),
      description,
      price,
      date,
    })
  })

  return {
    columnNames,
    transactions,
  }
}

export default async function Expenses() {
  const sheetValues = await fetchTransactionsSheetValues()
  const {columnNames, transactions} = getTransactionsTable(sheetValues)

  return (
    <>
      <h1>Expenses</h1>
      <table>
        <thead>
          <tr>
            {columnNames.map(columnName => (
              <th key={columnName}>{columnName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions.map(({id, description, price, date}) => (
            <tr key={id}>
              <td>{description}</td>
              <td>{price}</td>
              <td>{date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
