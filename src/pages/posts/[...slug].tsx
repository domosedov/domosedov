import type { GetStaticPaths, NextPage } from 'next'
import Head from 'next/head'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { format, parseISO } from 'date-fns'
import { allPosts, Post } from 'contentlayer/generated'
import { GetStaticProps } from 'next'
import { notFount } from 'src/shared/helpers/not_found'
import { getPostSlug } from '~/shared/helpers/get_slug'
import { isUndefined } from '~/shared/helpers/is_undefined'
import { Button } from '~/components/button'
import React from 'react'
import clsx from 'clsx'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allPosts.map(post => ({
    params: { slug: post.pathSegments.slice(1) },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = getPostSlug(params?.slug)

  if (isUndefined(slug)) return notFount()

  const post = allPosts.find(post => post.pathSegments.slice(1).join('/') === slug)

  if (!post) return notFount()

  return {
    props: {
      post,
    },
  }
}

const Paragraph: React.FC<React.ComponentProps<'p'>> = ({ className, ...restProps }) => {
  return <p className={clsx('uppercase', className)} {...restProps} />
}

const mdxComponents = { Button, p: Paragraph }

const PostLayout: NextPage<{ post: Post }> = ({ post }) => {
  const MDXComponent = useMDXComponent(post.body.code)
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article className='prose prose-lime mx-auto px-4'>
        <div className='mb-8 text-center'>
          <time dateTime={post.date} className='mb-1 text-xs text-gray-600'>
            {format(parseISO(post.date), 'LLLL d, yyyy')}
          </time>
          <h1>{post.title}</h1>
        </div>
        <MDXComponent components={mdxComponents} />
      </article>
    </>
  )
}

export default PostLayout
