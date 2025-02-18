import { GoLaw } from "react-icons/go";

export default function TabContentDefault() {
  return (
    <main className=" relative h-full">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="text-[200%] mb-4">
          <GoLaw />
        </div>
        <div>法令を指定してください</div>
      </div>
    </main>
  );
}
