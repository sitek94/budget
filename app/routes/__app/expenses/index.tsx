import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getTransactions } from "~/models/transaction.server";
import { requireUserId } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const transactions = await getTransactions({ userId });
  console.log(transactions);

  return json(transactions);
}

export default function Expenses() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <h1>Expenses</h1>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{formatDate(new Date(transaction.createdAt))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

// Format date to dd/mm/yyyy using Intl.DateTimeFormat
function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}
