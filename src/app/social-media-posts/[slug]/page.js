import { notFound } from 'next/navigation'
import SocialMediaPostDetailPage from '@/components/pages/social-media-post-detail-page'
import {
  SOCIAL_POSTS,
  getSocialPost,
  getSocialPostNeighbours,
} from '@/lib/social-posts'

export function generateStaticParams() {
  return SOCIAL_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getSocialPost(slug)
  if (!post) return { title: 'Post not found · AngelLust for Congress' }
  return {
    title: `${post.title} · Social Posts · AngelLust for Congress`,
    description: post.tagline,
  }
}

export default async function Page({ params }) {
  const { slug } = await params
  const post = getSocialPost(slug)
  if (!post) notFound()

  const { prev, next, index } = getSocialPostNeighbours(slug)

  // Related = three posts in the same format (excluding current), wrapping around.
  const sameFormat = SOCIAL_POSTS.filter((p) => p.format.id === post.format.id && p.slug !== slug)
  const related = sameFormat.slice(0, 3)

  return (
    <SocialMediaPostDetailPage
      post={post}
      prev={prev}
      next={next}
      index={index}
      total={SOCIAL_POSTS.length}
      related={related}
    />
  )
}
