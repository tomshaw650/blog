import { Footer } from "@/components/footer";
import { getAllPublished } from "@/utils/notion";

export default async function Home() {
  const posts = await getAllPublished();
  console.log(posts);
  return (
    <>
      <h1 className="text-6xl font-bold">tom's blog</h1>
      <Footer />
    </>
  );
}
