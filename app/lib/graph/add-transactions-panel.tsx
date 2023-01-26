import type { Node } from "reactflow";
import { Panel } from "reactflow";
import { createExpenseNode, createIncomeNode } from "./utils";

export function AddTransactionsPanel({
  addNode,
}: {
  addNode: (node: Node) => void;
}) {
  return (
    <Panel position="top-left" className="flex gap-2">
      <button
        className="rounded bg-green-500 p-2 text-white shadow"
        onClick={() => addNode(createIncomeNode())}
      >
        Add Income
      </button>
      <button
        className="rounded bg-red-500 p-2 text-white shadow"
        onClick={() => addNode(createExpenseNode())}
      >
        Add Expense
      </button>
    </Panel>
  );
}
