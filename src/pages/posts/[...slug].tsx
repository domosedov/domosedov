import type { GetStaticPaths, NextPage } from "next";
import Head from "next/head";
import { format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";
import { GetStaticProps } from "next";
import { notFount } from "src/shared/helpers/not_found";
import { getPostSlug } from "src/shared/helpers/get_slug";
import { isUndefined } from "src/shared/helpers/is_undefined";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allPosts.map((post) => ({
    params: { slug: post.pathSegments.slice(1) },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = getPostSlug(params?.slug);

  if (isUndefined(slug)) return notFount();

  const post = allPosts.find(
    (post) => post.pathSegments.slice(1).join("/") === slug
  );

  if (!post) return notFount();

  return {
    props: {
      post,
    },
  };
};

const PostLayout: NextPage<{ post: Post }> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article className="prose prose-lime mx-auto px-4">
        <div className="text-center mb-8">
          <time dateTime={post.date} className="text-xs text-gray-600 mb-1">
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </time>
          <h1>{post.title}</h1>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
      </article>
    </>
  );
};

export default PostLayout;
