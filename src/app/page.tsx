import { getAllPublished } from "@/utils/notion";
import { Badge } from "@/components/badge";
import { Footer } from "@/components/footer";

export default async function Home() {
  const posts = await getAllPublished();

  return (
    <>
      <h1 className="text-6xl font-bold">tom&apos;s blog</h1>
      <ul className="flex flex-col gap-y-3">
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex flex-col gap-y-2 max-w-md mt-5 bg-black border-2 border-white rounded-md p-3"
          >
            <span className="text-3xl font-bold">{post.name}</span>
            <span className="text-lg">{post.description}</span>
            <div className="flex gap-x-3 gap-y-3 flex-wrap">
              {post.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <div className="flex flex-col">
              <span>Created on {post.created_at}</span>
              <span>Last updated: {post.updated_at}</span>
            </div>
          </li>
        ))}
      </ul>
      <Footer />
    </>
  );
}
