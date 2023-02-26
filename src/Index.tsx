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
    title: "DFS/BFS",
    content: "DFS/BFS visualized by",
    author: "Chaejun Lee",
    githubId: "chaejunlee",
    link: "chaejunlee",
  },
  {
    title: "Binary Tree",
    content: "Binary Tree visualized by",
    author: "Hyeonwook Jung",
    githubId: "hyeonwook",
    link: "hyeonwook",
  },
  {
    title: "Sorting",
    content: "Sorting visualized by",
    author: "Dahye Lee",
    githubId: "leedahye",
    link: "dahye",
  },
  {
    title: "Study Projects",
    content: "Archive of study projects",
    author: "Team 1",
    githubId: "orgs/GDSC-KNU/teams/study-frontend-1",
    link: "src",
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
