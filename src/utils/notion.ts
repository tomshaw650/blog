import { env } from "@/env.mjs";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const notion = new Client({
  auth: env.NOTION_SECRET,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

type Tag = {
  name: string;
};

const formatDate = (datestring: string) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let date = new Date();

  if (datestring) {
    date = new Date(datestring);
  }

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  let today = `${month} ${day}, ${year}`;

  return today;
};

const getPageMetaData = (post: any) => {
  const getTags = (tags: Tag[]) => {
    const allTags = tags.map((tag: Tag) => {
      return tag.name;
    });

    return allTags;
  };

  return {
    id: post.id,
    name: post.properties.name.title[0].plain_text,
    slug: post.properties.slug.rich_text[0].plain_text,
    description: post.properties.description.rich_text[0].plain_text,
    tags: getTags(post.properties.tags.multi_select),
    created_at: formatDate(post.properties.created_at.created_time),
    updated_at: dayjs(post.properties.updated_at.last_edited_time).fromNow(),
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

export const getPost = async (slug: string) => {
  const response = await notion.databases.query({
    database_id: env.DATABASE_ID,
    filter: {
      property: "slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });

  const page = response.results[0];
  const metadata = getPageMetaData(page);
  const mdblocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdblocks);

  return {
    metadata,
    markdown: mdString,
  };
};
