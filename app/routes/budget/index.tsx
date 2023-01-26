import { Graph } from "~/lib/graph";
import styles from "reactflow/dist/base.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
export default function Budget() {
  return (
    <>
      <Graph />
    </>
  );
}
