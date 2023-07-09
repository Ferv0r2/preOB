import { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  description: string;
}

const posts: Post[] = [
  {
    slug: "frontend-basics",
    title: "프론트엔드 기초 개념",
    description: "프론트엔드 개발에 대한 기본 개념을 알아봅니다.",
  },
  {
    slug: "modern-javascript",
    title: "현대 JavaScript 개발",
    description: "모던 JavaScript 개발에 대한 다양한 내용을 다룹니다.",
  },
  {
    slug: "react-hooks",
    title: "React Hooks 소개",
    description:
      "React Hooks를 사용하여 컴포넌트 상태를 관리하는 방법을 알아봅니다.",
  },
  {
    slug: "responsive-design",
    title: "반응형 웹 디자인",
    description:
      "다양한 기기에 대응하는 반응형 웹 디자인의 기본 원칙과 기술을 소개합니다.",
  },
  {
    slug: "frontend-testing",
    title: "프론트엔드 테스팅",
    description:
      "프론트엔드 애플리케이션을 테스트하기 위한 다양한 도구와 방법을 알아봅니다.",
  },
];

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-8">프론트엔드 글 목록</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <div key={post.slug} className="border border-gray-300 rounded p-6">
              <h2 className="text-2xl font-bold mb-2">
                <Link href={`/${post.slug}`}>
                  <p className="text-blue-600 hover:underline">{post.title}</p>
                </Link>
              </h2>
              <p className="text-gray-600">{post.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
