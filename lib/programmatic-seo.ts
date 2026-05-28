import villas from '@/lib/data/villas.json'
import type { InternalLink } from '@/lib/internal-links'

export const PROGRAMMATIC_LANDING_PAGE_SLUGS = [
  'private-pool-villas-in-mahabaleshwar',
  'luxury-villas-in-mahabaleshwar',
  'villas-for-family-in-mahabaleshwar',
  'villas-near-mapro-garden',
  'pet-friendly-villas-in-mahabaleshwar',
] as const

export type ProgrammaticLandingPageSlug =
  (typeof PROGRAMMATIC_LANDING_PAGE_SLUGS)[number]

type VillaRecord = (typeof villas)[number]

interface LandingFaq {
  q: string
  a: string
}

interface LandingHighlight {
  title: string
  body: string
}

interface LandingPageConfig {
  slug: ProgrammaticLandingPageSlug
  h1: string
  seoTitle: string
  seoDescription: string
  metaImage: string
  metaImageAlt: string
  keywords: string[]
  introParagraphs: string[]
  whyItMattersTitle: string
  whyItMattersIntro: string
  highlights: LandingHighlight[]
  featuredTitle: string
  featuredDescription: string
  featuredLabel: string
  relatedLinks: InternalLink[]
  faqItems: LandingFaq[]
  selectVillas: (items: VillaRecord[]) => VillaRecord[]
}

export interface LandingPageData extends LandingPageConfig {
  path: string
  featuredVillas: VillaRecord[]
}

function parseNumberFromText(value?: string) {
  const match = value?.match(/(\d+(?:\.\d+)?)/)
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY
}

function parsePrice(value?: string) {
  const match = value?.match(/[\d,]+/)
  return match ? Number(match[0].replace(/,/g, '')) : 0
}

function byRatingThenCapacity(a: VillaRecord, b: VillaRecord) {
  if (b.rating !== a.rating) return b.rating - a.rating
  return b.capacity - a.capacity
}

function sortByMaproDistance(a: VillaRecord, b: VillaRecord) {
  const aDistance = parseNumberFromText(a.distanceFromMapro)
  const bDistance = parseNumberFromText(b.distanceFromMapro)
  if (aDistance !== bDistance) return aDistance - bDistance
  return byRatingThenCapacity(a, b)
}

function hasPoolSignal(villa: VillaRecord) {
  return (
    villa.category === 'pool-villas' ||
    villa.amenities.some((amenity) => /pool/i.test(amenity)) ||
    villa.featuredAmenities?.some((amenity) => /pool/i.test(amenity))
  )
}

function isFamilyFriendly(villa: VillaRecord) {
  return (
    villa.category === 'family-villas' ||
    villa.bestFor?.includes('families') ||
    villa.childFriendly ||
    villa.seniorCitizenFriendly
  )
}

function isLuxuryCandidate(villa: VillaRecord) {
  return villa.category !== 'budget-villas'
}

function nearMapro(villa: VillaRecord) {
  const distance = parseNumberFromText(villa.distanceFromMapro)
  return (
    distance <= 15 ||
    /mapro/i.test(villa.location) ||
    /mapro/i.test(villa.address) ||
    /mapro/i.test(villa.description)
  )
}

function petApprovalCandidate(villa: VillaRecord) {
  return (
    villa.amenities.some((amenity) => /garden|lawn|parking/i.test(amenity)) ||
    villa.childFriendly ||
    villa.seniorCitizenFriendly ||
    /garden|bhilar|panchgani|valley/i.test(villa.location)
  )
}

function sortByLuxury(a: VillaRecord, b: VillaRecord) {
  if (b.rating !== a.rating) return b.rating - a.rating
  const bPrice = parsePrice(b.startingPrice || b.priceRange)
  const aPrice = parsePrice(a.startingPrice || a.priceRange)
  if (bPrice !== aPrice) return bPrice - aPrice
  return b.capacity - a.capacity
}

const LANDING_PAGE_CONFIGS: Record<ProgrammaticLandingPageSlug, LandingPageConfig> = {
  'private-pool-villas-in-mahabaleshwar': {
    slug: 'private-pool-villas-in-mahabaleshwar',
    h1: 'Private Pool Villas in Mahabaleshwar',
    seoTitle: 'Private Pool Villas in Mahabaleshwar | Book Direct with Mahabaleshwar Villa Stays',
    seoDescription:
      'Browse private pool villas in Mahabaleshwar with exclusive use pools, valley views, caretakers, and direct WhatsApp booking for families, couples, and groups.',
    metaImage: '/images/villa-listing-1.jpg',
    metaImageAlt: 'Private pool villa in Mahabaleshwar with valley views',
    keywords: [
      'private pool villas Mahabaleshwar',
      'pool villas in Mahabaleshwar',
      'Mahabaleshwar villas with private pool',
      'valley view pool villa Mahabaleshwar',
    ],
    introParagraphs: [
      'A private pool villa in Mahabaleshwar is the simplest way to turn a hill-station stay into a proper group experience. You are not sharing a pool timetable with strangers, and you are not trying to coordinate hotel checkout and lobby logistics between breakfast and sunset.',
      'The strongest pool-villa bookings in this region are the ones that combine water, view, and privacy in one address. That usually means an elevated site, a caretaker who handles pool upkeep, and a layout that lets guests move between terrace, living room, and pool without the property feeling split into separate zones.',
    ],
    whyItMattersTitle: 'What makes a pool villa worth booking here',
    whyItMattersIntro:
      'Mahabaleshwar pool searches are usually about more than the pool itself. Guests want the pool to be the centre of the stay, not just one amenity on a long list. These are the features that matter most.',
    highlights: [
      {
        title: 'Private, not shared',
        body: 'The pool should be exclusive to your group for the full stay. That matters for families, bachelor trips, and friend groups alike.',
      },
      {
        title: 'Works in every season',
        body: 'Winter swims are sharp and clear, monsoon swims are mist-heavy and atmospheric, and shoulder season brings the best mix of comfort and privacy.',
      },
      {
        title: 'Close to the sightseeing belt',
        body: 'A pool villa near Mapro Garden, Panchgani Road, or the valley-view stretches keeps the rest of the itinerary easy.',
      },
    ],
    featuredTitle: 'Best pool villas to compare first',
    featuredDescription:
      'These villas have the strongest pool-and-view combination in the current portfolio.',
    featuredLabel: 'Pool villa shortlist',
    relatedLinks: [
      {
        label: 'Pool villas in Mahabaleshwar category',
        href: '/villas/category/pool-villas-in-mahabaleshwar',
        description: 'A category view if you want every current pool villa in one place.',
      },
      {
        label: 'Family villas in Mahabaleshwar',
        href: '/villas/category/family-villas-in-mahabaleshwar',
        description: 'Useful when the pool villa is for a larger family stay.',
      },
      {
        label: 'Budget travel guide for Mahabaleshwar',
        href: '/blogs/budget-travel-mahabaleshwar',
        description: 'Helpful if you are balancing pool quality with per-head cost.',
      },
    ],
    faqItems: [
      {
        q: 'Are the pools completely private?',
        a: 'Yes. The villas shortlisted on this page are intended for exclusive use, so the pool is reserved for your group during the stay.',
      },
      {
        q: 'When is the best time to book a pool villa in Mahabaleshwar?',
        a: 'October to February is the most popular booking window, but monsoon stays can be exceptional if you want mist, rain, and a quieter hill station.',
      },
      {
        q: 'Should I choose a pool villa near Mapro Garden or farther out?',
        a: 'Near-Mapro properties reduce driving time and make food stops simpler. Farther properties can be better if you want a quieter setting and larger valley views.',
      },
    ],
    selectVillas: (items) =>
      items
        .filter(hasPoolSignal)
        .sort(sortByMaproDistance)
        .slice(0, 6),
  },
  'luxury-villas-in-mahabaleshwar': {
    slug: 'luxury-villas-in-mahabaleshwar',
    h1: 'Luxury Villas in Mahabaleshwar',
    seoTitle: 'Luxury Villas in Mahabaleshwar | Premium Private Stays with Views',
    seoDescription:
      'Explore luxury villas in Mahabaleshwar with premium interiors, private pools, large common areas, professional cook service, and elevated valley-view settings.',
    metaImage: '/images/villa-listing-2.jpg',
    metaImageAlt: 'Luxury villa in Mahabaleshwar with premium interiors and views',
    keywords: [
      'luxury villas Mahabaleshwar',
      'premium villas Mahabaleshwar',
      'high-end villa stay Mahabaleshwar',
      'luxury villa with valley view',
    ],
    introParagraphs: [
      'Luxury in Mahabaleshwar is not only about price. It is about the feeling that the property can hold a proper family gathering, a quiet couple escape, or a milestone celebration without the stay ever feeling cramped.',
      'The best luxury villas in the hill station have a different rhythm from budget properties. They usually have stronger view lines, better common-room proportions, more deliberate interiors, and a layout that gives guests a reason to stay on the property for longer parts of the day.',
    ],
    whyItMattersTitle: 'What signals a true premium stay',
    whyItMattersIntro:
      'This search intent is usually about space, finish, and how the villa feels after dark. The shortlist below is built from the strongest-rated high-end options in the portfolio.',
    highlights: [
      {
        title: 'Quality of the common space',
        body: 'A luxury villa should make group dining and lounging feel natural, not forced.',
      },
      {
        title: 'View and privacy together',
        body: 'The premium experience usually comes from a villa that has both a strong outlook and enough seclusion to keep the stay quiet.',
      },
      {
        title: 'Service that removes friction',
        body: 'Cook, caretaker, parking, and check-in all need to feel simple. That is what separates luxury from just a large house.',
      },
    ],
    featuredTitle: 'Top luxury-style villas to short-list',
    featuredDescription:
      'These are the strongest premium candidates from the current villa set, ordered by overall quality signals.',
    featuredLabel: 'Luxury villa shortlist',
    relatedLinks: [
      {
        label: 'Valley view villas in Mahabaleshwar',
        href: '/villas/category/valley-view-villas-in-mahabaleshwar',
        description: 'Best if the luxury brief is view-first.',
      },
      {
        label: 'Group villas in Mahabaleshwar',
        href: '/villas/category/group-villas-in-mahabaleshwar',
        description: 'Useful if the premium stay is for a large group or reunion.',
      },
      {
        label: 'Valley views and photography guide',
        href: '/blogs/valley-views-photography',
        description: 'Helps pair a premium villa with the best visual moments in the area.',
      },
    ],
    faqItems: [
      {
        q: 'What makes a villa feel luxury in Mahabaleshwar?',
        a: 'The strongest signals are view quality, room proportions, service quality, and how well the property handles group life without feeling crowded.',
      },
      {
        q: 'Are luxury villas always the most expensive villas?',
        a: 'Not always. Some of the best premium stays are priced more moderately but still feel luxurious because of layout and view.',
      },
      {
        q: 'Is luxury the same as a valley-view villa?',
        a: 'Often they overlap, but not always. Luxury is about the overall stay experience; valley view is one of the strongest supporting signals.',
      },
    ],
    selectVillas: (items) =>
      items
        .filter(isLuxuryCandidate)
        .sort(sortByLuxury)
        .slice(0, 6),
  },
  'villas-for-family-in-mahabaleshwar': {
    slug: 'villas-for-family-in-mahabaleshwar',
    h1: 'Villas for Family in Mahabaleshwar',
    seoTitle: 'Villas for Family in Mahabaleshwar | Large Family Stays and Private Pools',
    seoDescription:
      'Find family villas in Mahabaleshwar with large bedrooms, private pools, cook service, safe garden spaces, and easy access to Mapro Garden and Venna Lake.',
    metaImage: '/images/villa-listing-1.jpg',
    metaImageAlt: 'Family villa in Mahabaleshwar with private pool and garden',
    keywords: [
      'family villas Mahabaleshwar',
      'villas for family in Mahabaleshwar',
      'Mahabaleshwar family stay',
      'joint family villa Mahabaleshwar',
    ],
    introParagraphs: [
      'Family travel in Mahabaleshwar works best when the whole group stays together. A villa gives grandparents, parents, and children one shared base, which removes the daily friction of coordinating separate hotel rooms, breakfast timings, and luggage moves.',
      'The family-friendly villas in this portfolio are the ones that support real group rhythm: a professional cook, a caretaker who can help without hovering, and enough garden or pool space that children can move around without turning the trip into a constant supervision exercise.',
    ],
    whyItMattersTitle: 'What families usually need first',
    whyItMattersIntro:
      'For family searches, space and predictability matter more than flash. A good family villa makes meals, naps, pool time, and sightseeing fit into the same day without stress.',
    highlights: [
      {
        title: 'One roof for everyone',
        body: 'A single villa keeps the trip coordinated and avoids splitting the family across multiple hotel bookings.',
      },
      {
        title: 'Cook and caretaker included',
        body: 'That combination simplifies meals, early breakfasts, and late-night requests for a big group.',
      },
      {
        title: 'Easy access to family attractions',
        body: 'Mapro Garden, Venna Lake, and short scenic drives are the usual family trip anchors.',
      },
    ],
    featuredTitle: 'Family villas to compare first',
    featuredDescription:
      'These are the strongest current family stays based on capacity, convenience, and service setup.',
    featuredLabel: 'Family villa shortlist',
    relatedLinks: [
      {
        label: 'Family villas category page',
        href: '/villas/category/family-villas-in-mahabaleshwar',
        description: 'The category hub for every current family-oriented villa.',
      },
      {
        label: 'Best villas for family vacations',
        href: '/blogs/best-villas-families',
        description: 'A longer guide that explains why some villas work better for family groups.',
      },
      {
        label: 'Complete Mahabaleshwar travel guide',
        href: '/blogs/mahabaleshwar-complete-travel-guide',
        description: 'Helps families connect the villa stay with sightseeing and food planning.',
      },
    ],
    faqItems: [
      {
        q: 'What size villa works best for a family trip?',
        a: 'For most joint-family trips, a 4 to 8 BHK villa works best depending on the guest count and whether you want more private rooms or more common space.',
      },
      {
        q: 'Are these villas suitable for children and elders?',
        a: 'Yes. Family-focused villas in this portfolio are chosen for practical access, gardens, and easier shared living spaces.',
      },
      {
        q: 'Do family villas usually include a cook?',
        a: 'Most of the best family options do. That is a major convenience on multi-day hill-station trips.',
      },
    ],
    selectVillas: (items) =>
      items
        .filter(isFamilyFriendly)
        .sort((a, b) => {
          if (b.capacity !== a.capacity) return b.capacity - a.capacity
          return byRatingThenCapacity(a, b)
        })
        .slice(0, 6),
  },
  'villas-near-mapro-garden': {
    slug: 'villas-near-mapro-garden',
    h1: 'Villas Near Mapro Garden',
    seoTitle: 'Villas Near Mapro Garden Mahabaleshwar | Stay Close to Sightseeing and Food',
    seoDescription:
      'Book villas near Mapro Garden in Mahabaleshwar for easy access to strawberry food stops, sightseeing routes, and quick drives to Venna Lake and Wilson Point.',
    metaImage: '/images/blogs/Venna-Lake.jpg',
    metaImageAlt: 'Mahabaleshwar villas near Mapro Garden and Venna Lake routes',
    keywords: [
      'villas near Mapro Garden',
      'Mahabaleshwar villas near Mapro Garden',
      'Mapro Garden stay Mahabaleshwar',
      'Mapro Garden villa booking',
    ],
    introParagraphs: [
      'Mapro Garden is one of the most practical landmarks in Mahabaleshwar travel. A villa near Mapro Garden makes food stops, sightseeing, and arrival-day logistics much easier because you are already in the area that most visitors eventually drive to anyway.',
      'For many guests, a near-Mapro stay is less about being next to a single attraction and more about reducing friction. It shortens the drive to Venna Lake, keeps Wilson Point and the main market within easy reach, and makes strawberry-season outings feel like a quick errand instead of a half-day trip.',
    ],
    whyItMattersTitle: 'Why Mapro Garden proximity matters',
    whyItMattersIntro:
      'This landing page works because the search intent is practical. People want to know which villas reduce driving time and keep the trip centered around the most visited stretch of Mahabaleshwar.',
    highlights: [
      {
        title: 'Less time on the road',
        body: 'Shorter drives leave more of the day for the villa, the pool, and sightseeing.',
      },
      {
        title: 'Better food-stop access',
        body: 'Mapro Garden is a central stop for many itineraries, especially in strawberry season.',
      },
      {
        title: 'Easy route to other key spots',
        body: 'A near-Mapro villa usually sits on the same travel corridor used for Venna Lake and Wilson Point.',
      },
    ],
    featuredTitle: 'Closest villas to Mapro Garden',
    featuredDescription:
      'These villas have the shortest Mapro Garden drives in the current data set.',
    featuredLabel: 'Mapro Garden shortlist',
    relatedLinks: [
      {
        label: 'Pool villas in Mahabaleshwar',
        href: '/villas/category/pool-villas-in-mahabaleshwar',
        description: 'Often the best fit when a Mapro-side stay also needs a pool.',
      },
      {
        label: 'Valley view villas in Mahabaleshwar',
        href: '/villas/category/valley-view-villas-in-mahabaleshwar',
        description: 'A strong match if you want convenience and a view together.',
      },
      {
        label: 'Strawberry season guide',
        href: '/blogs/strawberry-season-guide',
        description: 'Best for planning a Mapro Garden stay during peak fruit season.',
      },
    ],
    faqItems: [
      {
        q: 'How close are these villas to Mapro Garden?',
        a: 'The featured properties are typically within 5 to 15 minutes by car, depending on traffic and the exact route.',
      },
      {
        q: 'Is Mapro Garden the best area for first-time visitors?',
        a: 'It is one of the easiest areas for first-time visitors because it reduces driving complexity and keeps several major attractions nearby.',
      },
      {
        q: 'Does staying near Mapro Garden help with sightseeing?',
        a: 'Yes. It keeps your base close to a central road network used for many of the hill station’s most popular attractions.',
      },
    ],
    selectVillas: (items) =>
      items
        .filter(nearMapro)
        .sort(sortByMaproDistance)
        .slice(0, 6),
  },
  'pet-friendly-villas-in-mahabaleshwar': {
    slug: 'pet-friendly-villas-in-mahabaleshwar',
    h1: 'Pet-Friendly Villas in Mahabaleshwar',
    seoTitle: 'Pet-Friendly Villas in Mahabaleshwar | Ask About Current Pet Policy',
    seoDescription:
      'Looking for pet-friendly villas in Mahabaleshwar? Explore properties with gardens, calmer surroundings, and current pet policy guidance. Contact us to confirm approval.',
    metaImage: '/images/villa-listing-2.jpg',
    metaImageAlt: 'Mahabaleshwar villa with garden space for pet travel planning',
    keywords: [
      'pet friendly villas Mahabaleshwar',
      'pet friendly villa Mahabaleshwar',
      'Mahabaleshwar stay with pets',
      'villa with pet policy Mahabaleshwar',
    ],
    introParagraphs: [
      'Pet travel in a hill station is less about a label and more about whether the property layout can actually support the stay. A good pet-friendly villa needs enough outdoor space, easier access for walks, and a booking process that clearly confirms current approval before you arrive.',
      'Because pet policy can change by villa, season, and guest mix, the safest approach is to use this page as a shortlist and then confirm approval directly. That keeps the site honest and avoids the common problem of showing a page title that overpromises what a property can actually deliver.',
    ],
    whyItMattersTitle: 'What to check before booking with a pet',
    whyItMattersIntro:
      'This landing page is intentionally practical. It is designed to help guests ask the right questions before they commit to a stay.',
    highlights: [
      {
        title: 'Confirm approval in writing',
        body: 'Pet-friendly should never be assumed. Confirm the policy before payment so there are no surprises at check-in.',
      },
      {
        title: 'Look for outdoor space',
        body: 'Gardens, lawns, and easier parking are usually the first signs that a villa may work better for pets.',
      },
      {
        title: 'Choose a calmer route',
        body: 'Quieter areas and less crowded access roads tend to make the arrival experience easier for pets and owners.',
      },
    ],
    featuredTitle: 'Villas to ask about pet approval',
    featuredDescription:
      'These are the strongest current candidates to shortlist when you want to ask about pet stays.',
    featuredLabel: 'Pet stay shortlist',
    relatedLinks: [
      {
        label: 'Family villas in Mahabaleshwar',
        href: '/villas/category/family-villas-in-mahabaleshwar',
        description: 'Good if the pet trip is part of a larger family holiday.',
      },
      {
        label: 'Group villas in Mahabaleshwar',
        href: '/villas/category/group-villas-in-mahabaleshwar',
        description: 'Useful when the pet stays needs more space and a larger compound.',
      },
      {
        label: 'Contact Mahabaleshwar Villa Stays',
        href: '/contact',
        description: 'The fastest way to confirm current pet approval for specific dates.',
      },
    ],
    faqItems: [
      {
        q: 'Do you guarantee pet-friendly availability on every villa?',
        a: 'No. Pet approval is handled case by case because policies can vary by property, season, and booking context.',
      },
      {
        q: 'What should I ask before booking a pet stay?',
        a: 'Confirm whether pets are allowed at all, whether there is any extra fee, whether there are breed or size restrictions, and whether the property has an outdoor area suitable for walks.',
      },
      {
        q: 'Why do you still have a pet-friendly landing page if policies vary?',
        a: 'Because pet travel is a real search intent. The page helps guests find the right route to a confirmed answer without creating misleading claims.',
      },
    ],
    selectVillas: (items) =>
      items
        .filter(petApprovalCandidate)
        .sort((a, b) => {
          if (b.rating !== a.rating) return b.rating - a.rating
          const aDistance = parseNumberFromText(a.distanceFromMapro)
          const bDistance = parseNumberFromText(b.distanceFromMapro)
          return aDistance - bDistance
        })
        .slice(0, 6),
  },
}

export function getProgrammaticLandingPageData(
  slug: ProgrammaticLandingPageSlug
): LandingPageData {
  const config = LANDING_PAGE_CONFIGS[slug]
  return {
    ...config,
    path: `/villas/${slug}`,
    featuredVillas: config.selectVillas(villas),
  }
}

export function getProgrammaticLandingPageSlugs() {
  return [...PROGRAMMATIC_LANDING_PAGE_SLUGS]
}
