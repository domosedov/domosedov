import { defineDocumentType, makeSource } from "contentlayer/source-files";

const Post = defineDocumentType(() => ({
  name: "Post",
  contentType: "markdown",
  filePathPattern: `posts/**/*.md`,
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
      resolve: (doc) => doc._raw.flattenedPath,
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
});
