import MainLayout from "./layouts/MainLayout";

interface IPostProps {
  title: string;
  content: string;
  author: string;
  githubId: string;
  link: string;
}

const posts: Array<IPostProps> = [
  {
    title: "B+-Tree",
    content: "B+-Tree visualized by",
    author: "Chaejun Lee",
    githubId: "chaejunlee",
    link: "chaejunlee",
  },
  {
    title: "Algorithm 2",
    content: "Algorithm 2 visualized by",
    author: "Hyeonwook Jung",
    githubId: "hyeonwook",
    link: "hyeonwook",
  },
  {
    title: "Algorithm 3",
    content: "Algorithm 3 visualized by",
    author: "Minju Kim",
    githubId: "minju",
    link: "minju",
  },
  {
    title: "Algorithm 4",
    content: "Algorithm 4 visualized by",
    author: "Dahye Lee",
    githubId: "dahye",
    link: "dahye",
  },
];

const Index = () => {
  return (
    <MainLayout>
      <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {posts.map(({ title, content, author, githubId, link }) => {
          return (
            <div
              key={link}
              className="flex w-full flex-col gap-4 rounded-md border-2 border-gray-400 p-4 shadow-md"
            >
              <h2 className="text-3xl font-bold">{title}</h2>
              <a
                href={link}
                className="flex min-h-[200px] w-full items-center justify-center rounded-md bg-green-300 text-gray-800"
              >
                Go to the page
              </a>
              <p>
                {content}{" "}
                <a
                  className="underline"
                  href={`https://github.com/${githubId}`}
                >
                  {author}
                </a>
              </p>
            </div>
          );
        })}
      </section>
    </MainLayout>
  );
};

export default Index;
