import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import remarkHighlight from "remark-highlight.js";
import { remark } from "remark";
import { ParsedUrlQuery } from "querystring";

interface PostProps {
  content: string;
  data: {
    title: string;
    date: string;
  };
}

const Post = ({ content, data }: PostProps) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold flex items-center">{data.title}</h1>
        <button
          className="flex bg-blue-500 font-bold text-white px-4 py-2 mt-4 rounded"
          onClick={handleGoBack}
        >
          Back
        </button>
      </div>

      <p className="text-gray-500 mb-4">{data.date}</p>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), "_posts");
  const fileNames = fs.readdirSync(postsDirectory);

  const paths = fileNames.map((fileName) => ({
    params: { id: fileName.replace(".md", "") },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  const id = params?.id as string;
  const postsDirectory = path.join(process.cwd(), "_posts");
  const filePath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(fileContents);

  const processedContent = await remark()
    .use(remarkParse)
    .use(remarkHtml as any)
    .use(remarkHighlight)
    .process(content);
  const contentHtml = processedContent.toString();

  const postData: PostProps = {
    content: contentHtml,
    data: {
      title: data.title,
      date: data.date,
    },
  };

  return {
    props: postData,
  };
};

export default Post;
