import EventsListPage from '@/components/pages/events-list-page'
import { EVENTS } from '@/lib/data'

export const metadata = {
  title: 'Events · AngelLust for Congress',
  description:
    'Town halls, listening sessions, and community events with AngelLust across District 1.',
}

export default function Page() {
  return <EventsListPage events={EVENTS} />
}
