import { defineDocumentType, makeSource } from "contentlayer/source-files";
import highlight from "rehype-highlight";

const Post = defineDocumentType(() => ({
  name: "Post",
  contentType: "mdx",
  filePathPattern: `posts/**/*.mdx`,
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => "/" + doc._raw.flattenedPath,
    },
    pathSegments: {
      type: "json",
      resolve: (doc) => doc._raw.flattenedPath.split("/"),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [highlight],
  },
});
