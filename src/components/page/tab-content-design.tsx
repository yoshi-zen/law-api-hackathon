import TabContentDefault from "./tab-content-default";

export default function TabContentDesign() {
  return (
    <main>
      <div className="bg-slate-200 rounded-md relative w-full h-[calc(100vh-5.5rem)] flex">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-full h-full">
            <TabContentDefault />
          </div>
        </div>
      </div>
    </main>
  );
}
