import TabContentDefault from "./tab-content-default";

export default function TabContentDesign() {
  return (
    <div className="relative flex w-full rounded-md bg-slate-200">
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-full w-full">
          <TabContentDefault />
        </div>
      </div>
    </div>
  );
}
