import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

import { createTransaction } from "~/models/transaction.server";
import { requireUserId } from "~/session.server";

export async function action({ request }: ActionArgs) {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const description = formData.get("description");
  const price = formData.get("price");

  const transaction = {
    description: description as string,
    price: Number(price),
    userId,
  };

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
