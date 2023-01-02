import { ReactElement } from "react";

const MainLayout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <div className="mx-auto mt-16 max-w-4xl px-4">
        <h1 className="text-4xl">GDSC Frontend Team 1</h1>
        <p className="mt-4 text-2xl">Algorithm/Data Structure Visualization</p>
      </div>
      <main className="mx-auto max-w-4xl px-4 py-4">{children}</main>
    </>
  );
};

export default MainLayout;
