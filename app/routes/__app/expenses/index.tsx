import { json } from "@remix-run/node";

import { useLoaderData } from "@remix-run/react";
import { getTransactionsTable } from "~/transactions.server";

export async function loader() {
  const table = await getTransactionsTable();

  return json(table);
}

export default function Expenses() {
  const { columnNames, transactions } = useLoaderData<typeof loader>();

  return (
    <>
      <h1>Expenses</h1>
      <table>
        <thead>
          <tr>
            {columnNames.map((columnName) => (
              <th key={columnName}>{columnName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions.map(({ id, description, price, date }) => (
            <tr key={id}>
              <td>{description}</td>
              <td>{price}</td>
              <td>{date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
