import MainLayout from "../layouts/MainLayout";

const Study = () => {
  return (
    <MainLayout>
      <>
        <h1 className="mb-6 text-4xl font-bold">Study Projects</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded border-2 p-4">
            <a href="study/chaejunlee/ProgressBar/">
              <h3 className="mb-2 text-lg font-bold">chaejunlee</h3>
              <p className="text-3xl text-blue-600 underline">ProgressBar</p>
            </a>
          </div>
          <div className="rounded border-2 p-4">
            <a href="study/LeeDaHye/Scroll-Section/scroll-section.html">
              <h3 className="mb-2 text-lg font-bold">LeeDaHye</h3>
              <p className="text-3xl text-blue-600 underline">ScrollSection</p>
            </a>
          </div>
          <div className="rounded border-2 p-4">
            <a href="study/JungHyeonwook/Carousel/">
              <h3 className="mb-2 text-lg font-bold">JungHyeonwook</h3>
              <p className="text-3xl text-blue-600 underline">Carousel</p>
            </a>
          </div>
          <div className="rounded border-2 p-4">
            <a href="study/JungHyeonwook/LanguageSearch/">
              <h3 className="mb-2 text-lg font-bold">JungHyeonwook</h3>
              <p className="text-3xl text-blue-600 underline">LanguageSearch</p>
            </a>
          </div>
          <div className="rounded border-2 p-4">
            <a href="study/JungHyeonwook/Pagination2/">
              <h3 className="mb-2 text-lg font-bold">JungHyeonwook</h3>
              <p className="text-3xl text-blue-600 underline">Pagination2</p>
            </a>
          </div>
          <div className="rounded border-2 p-4">
            <a href="study/KimMinju/online_profile_card/member1.html">
              <h3 className="mb-2 text-lg font-bold">KimMinju</h3>
              <p className="text-3xl text-blue-600 underline">
                online_profile_card
              </p>
            </a>
          </div>
        </div>
      </>
    </MainLayout>
  );
};
export default Study;
