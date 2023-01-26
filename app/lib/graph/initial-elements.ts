import colors from "tailwindcss/colors";
import type { Node } from "reactflow";
import { MarkerType } from "reactflow";
import { createExpenseNode, createIncomeNode } from "./utils";

let id = 0;

const budgetNode = {
  id: "budget",
  type: "budget" as const,
  position: { x: 250, y: 300 },
  data: {
    label: "Budget",
  },
};

export const initialNodes: Node[] = [
  budgetNode,
  createIncomeNode({
    amount: 1000,
    position: { x: 100, y: 100 },
  }),
  createExpenseNode({
    amount: 500,
    position: { x: 100, y: 500 },
  }),
];

export const generateEdges = (nodes: Node[]) => {
  let edges = [];

  const incomeNodes = nodes.filter((node) => node.data.type === "income");
  const expenseNodes = nodes.filter((node) => node.data.type === "expense");

  for (const incomeNode of incomeNodes) {
    edges.push({
      id: `edge-${id++}`,
      source: incomeNode.id,
      target: budgetNode.id,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 10,
        height: 10,
        color: colors.green[500],
      },
      style: {
        strokeWidth: 2,
        stroke: colors.green[500],
      },
    });
  }

  for (const expenseNode of expenseNodes) {
    edges.push({
      id: `edge-${id++}`,
      source: budgetNode.id,
      target: expenseNode.id,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 10,
        height: 10,
        color: colors.red[500],
      },
      style: {
        strokeWidth: 2,
        stroke: colors.red[500],
      },
    });
  }

  return edges;
};

export const initialEdges = generateEdges(initialNodes);
