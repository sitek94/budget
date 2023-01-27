import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

import { createTransaction, transactionSchema } from "~/transactions.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const description = formData.get("description");
  const price = formData.get("price");

  const date = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  console.log({ description, price, date });

  const transaction = transactionSchema.parse({
    id: "",
    description,
    price,
    date,
  });

  await createTransaction(transaction);

  return redirect(`/expenses`);
}

export default function NewExpensePage() {
  return (
    <Form method="post">
      <label>
        <div>Description</div>
        <input type="text" name="description" required />
      </label>

      <label>
        <div>Price</div>
        <input type="text" name="price" required />
      </label>

      <button className="block bg-primary-500 text-white" type="submit">
        Save
      </button>
    </Form>
  );
}
