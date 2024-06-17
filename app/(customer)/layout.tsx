import { Headers } from "@/features/layout/Headers";
import type { LayoutParams } from "@/types/next";

export default async function RouteLayout(props: LayoutParams<{}>) {
  return (
    <div className="h-full">
      <Headers />
      {props.children}
    </div>
  );
}
