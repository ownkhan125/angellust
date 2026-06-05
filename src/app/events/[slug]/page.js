import { notFound } from 'next/navigation'
import { EVENTS } from '@/lib/data'
import EventDetailPage from '@/components/pages/event-detail-page'

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const event = EVENTS.find((e) => e.slug === slug)
  if (!event) return { title: 'Event not found · AngelLust for Congress' }
  return {
    title: `${event.title} · AngelLust for Congress`,
    description: event.description,
  }
}

export default async function Page({ params }) {
  const { slug } = await params
  const event = EVENTS.find((e) => e.slug === slug)
  if (!event) notFound()
  const related = EVENTS.filter((e) => e.slug !== event.slug).slice(0, 3)
  return <EventDetailPage event={event} related={related} />
}
