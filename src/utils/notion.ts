import { env } from "@/env.mjs";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: env.NOTION_SECRET,
});

type Tag = {
  name: string;
};

const getPageMetaData = (post: any) => {
  const getTags = (tags: Tag[]) => {
    const allTags = tags.map((tag: Tag) => {
      return tag.name;
    });

    return allTags;
  };

  return {
    id: post.properties.slug.number,
    name: post.properties.name.title[0].plain_text,
    slug: post.properties.slug.number,
    description: post.properties.description.rich_text[0].plain_text,
    tags: getTags(post.properties.tags.multi_select),
    created_at: post.properties.created_at.created_time,
    updated_at: post.properties.updated_at.last_edited_time,
  };
};

export const getAllPublished = async () => {
  const posts = await notion.databases.query({
    database_id: env.DATABASE_ID,
    filter: {
      property: "published",
      checkbox: {
        equals: true,
      },
    },
  });

  const allPosts = posts.results;

  return allPosts.map((post) => {
    return getPageMetaData(post);
  });
};
