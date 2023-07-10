import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { GetStaticProps } from "next";

interface Post {
  id: number;
  title: string;
  date: string;
  description: string;
}

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <div className="container max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold my-8">프론트엔드 글 목록</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <div key={post.id} className="border border-gray-300 rounded p-6">
            <h2 className="text-2xl font-bold mb-2">
              <Link
                href={`/${post.id}`}
                className="text-blue-600 hover:underline"
              >
                {post.title}
              </Link>
            </h2>
            <div className="text-gray-600">
              <p>{post.description}</p>
              <p className="text-sm">{post.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const postsDirectory = path.join(process.cwd(), "_posts");
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      id: fileName.replace(".md", ""),
      title: data.title,
      date: data.date,
      description: data.description,
    };
  });

  return {
    props: {
      posts,
    },
  };
};
