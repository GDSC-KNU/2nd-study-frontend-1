import { ReactElement } from "react";

const MainLayout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <div className="mx-auto mt-8 max-w-4xl px-4">
        <h3 className="text-2xl">GDSC Frontend Team 1</h3>
        <p className="text-lg">Algorithm/Data Structure Visualization</p>
      </div>
      <main className="mx-auto max-w-4xl px-4 py-6">{children}</main>
    </>
  );
};

export default MainLayout;
