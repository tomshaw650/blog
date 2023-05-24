import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { Footer } from "@/components/footer";
import { LoadingPage } from "@/components/loading";
import { getPost } from "@/utils/notion";
import { Metadata } from "next";
import { Suspense } from "react";
import ReactMarkdown from "react-markdown";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: post.metadata.name,
    description: post.metadata.description,
    metadataBase: new URL("https://blog.tmsh.dev"),
    openGraph: {
      title: post.metadata.name,
      description: post.metadata.description,
      url: `blog.tmsh.dev/post/${post.metadata.slug}`,
      siteName: `blog.tmsh.dev`,
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getPost(params.slug);

  return (
    <>
      <section className="mb-10">
        <h1 className="text-5xl">{page.metadata.name}</h1>
        <h2 className="text-xl opacity-80">{page.metadata.description}</h2>
        <div className="flex items-center gap-x-5 border-2 border-white rounded-md mt-5 p-3 bg-black max-w-[15rem]">
          <Avatar>
            <AvatarImage src="https://avatars.githubusercontent.com/u/61637555?v=4" />
            <AvatarFallback>TS</AvatarFallback>
          </Avatar>
          <span>
            Written by{" "}
            <a
              className="underline"
              target="_blank"
              href="https://twitter.com/tomshawdev"
            >
              Tom Shaw
            </a>
          </span>
        </div>
      </section>
      <Suspense fallback={<LoadingPage />}>
        <ReactMarkdown className="prose-xl prose-ul:list-disc">
          {page.markdown.parent}
        </ReactMarkdown>
      </Suspense>
      <Footer />
    </>
  );
}
