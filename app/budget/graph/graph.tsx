'use client'

import ReactFlow, {
  Background,
  Controls,
  Node,
  useEdgesState,
  useNodesState,
} from 'reactflow'
import {generateEdges, initialEdges, initialNodes} from './initial-elements'
import {BudgetNode} from './budget-node'
import {TransactionNode} from './transaction-node'
import {AddTransactionsPanel} from './add-transactions-panel'

const nodeTypes = {
  budget: BudgetNode,
  transaction: TransactionNode,
}

export function Graph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const addNode = (node: Node) => {
    const newNodes = [...nodes, node]

    setNodes(newNodes)
    setEdges(generateEdges(newNodes))
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
    >
      <AddTransactionsPanel addNode={addNode} />
      <Background />
      <Controls />
    </ReactFlow>
  )
}
