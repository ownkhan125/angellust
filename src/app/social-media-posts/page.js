import SocialMediaPostsPage from '@/components/pages/social-media-posts-page'
import { SOCIAL_POSTS, SOCIAL_POST_CATEGORIES } from '@/lib/social-posts'

export const metadata = {
  title: 'Social Media Posts · AngelLust for Congress',
  description:
    'A curated library of campaign-ready feed posts and vertical stories from AngelLust for Congress.',
}

export default function Page() {
  return <SocialMediaPostsPage posts={SOCIAL_POSTS} categories={SOCIAL_POST_CATEGORIES} />
}
