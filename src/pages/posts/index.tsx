import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts, Post } from 'contentlayer/generated'

export async function getStaticProps() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  return { props: { posts } }
}

function PostCard(post: Post) {
  return (
    <div className='mb-8'>
      <h2 className='text-xl'>
        <Link href={post.url}>
          <a className='text-blue-700 hover:text-blue-900'>{post.title}</a>
        </Link>
      </h2>
      <time dateTime={post.date} className='mb-2 block text-xs text-gray-600'>
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      {/* <div
        className="text-sm"
        dangerouslySetInnerHTML={{ __html: post.body.html }}
      /> */}
    </div>
  )
}

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <div className='mx-auto max-w-xl py-8'>
      <h1 className='mb-8 text-center text-3xl font-bold'>Next.js Example</h1>

      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  )
}
