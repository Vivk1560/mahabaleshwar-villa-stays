export interface InternalLink {
  label: string
  href: string
  description: string
}

// ─── Root commercial landing page URLs ────────────────────────────────────────
// These are the canonical root-level SEO URLs.
// All links pointing to these pages must use the root form.
const LUXURY_VILLAS_URL = '/luxury-villas-in-mahabaleshwar'
const POOL_VILLAS_URL = '/private-pool-villas-in-mahabaleshwar'
const FAMILY_VILLAS_URL = '/villas-for-family-in-mahabaleshwar'
const MAPRO_VILLAS_URL = '/villas-near-mapro-garden'

// ─── Category page URLs (these remain under /villas/category/) ────────────────
const CAT_POOL = '/villas/category/pool-villas-in-mahabaleshwar'
const CAT_FAMILY = '/villas/category/family-villas-in-mahabaleshwar'
const CAT_COUPLE = '/villas/category/couple-villas-in-mahabaleshwar'
const CAT_GROUP = '/villas/category/group-villas-in-mahabaleshwar'
const CAT_VALLEY = '/villas/category/valley-view-villas-in-mahabaleshwar'
const CAT_BUDGET = '/villas/category/budget-villas-in-mahabaleshwar'

const CATEGORY_GUIDES: Record<string, InternalLink[]> = {
  'pool-villas-in-mahabaleshwar': [
    {
      label: 'Best villas in Mahabaleshwar for family vacations',
      href: '/blogs/best-villas-families',
      description: 'See which large villas work best when the pool is only part of the trip.',
    },
    {
      label: 'Mahabaleshwar group villa planning guide',
      href: '/blogs/group-gathering-guide',
      description: 'Useful if you are booking a larger pool villa for friends or a reunion.',
    },
  ],
  'family-villas-in-mahabaleshwar': [
    {
      label: 'Best villas in Mahabaleshwar for family vacations',
      href: '/blogs/best-villas-families',
      description: 'A practical guide to villas that work for multi-generational family trips.',
    },
    {
      label: 'Complete Mahabaleshwar travel guide',
      href: '/blogs/mahabaleshwar-complete-travel-guide',
      description: 'Plan a family itinerary that matches your villa location.',
    },
  ],
  'couple-villas-in-mahabaleshwar': [
    {
      label: 'Romantic couple retreat guide for Mahabaleshwar',
      href: '/blogs/romantic-couple-retreat',
      description: 'Use this to match the right stay with sunrise, sunset, and privacy.',
    },
    {
      label: 'Strawberry season guide for couples',
      href: '/blogs/strawberry-season-guide',
      description: 'A strong fit for honeymoon and anniversary travel planning.',
    },
  ],
  'group-villas-in-mahabaleshwar': [
    {
      label: 'Mahabaleshwar group gathering guide',
      href: '/blogs/group-gathering-guide',
      description: 'Helpful for office trips, reunions, birthdays, and large-group logistics.',
    },
    {
      label: 'Budget travel guide for Mahabaleshwar',
      href: '/blogs/budget-travel-mahabaleshwar',
      description: 'Useful when your group wants the best value per head.',
    },
  ],
  'valley-view-villas-in-mahabaleshwar': [
    {
      label: 'Valley views and photography guide',
      href: '/blogs/valley-views-photography',
      description: 'Shows when the view is best from terrace, pool, and sunrise points.',
    },
    {
      label: 'Wilson Point sunrise guide',
      href: '/blogs/wilson-point-sunrise-guide',
      description: 'A good match for view-focused stays near the plateau edge.',
    },
  ],
  'budget-villas-in-mahabaleshwar': [
    {
      label: 'Budget travel in Mahabaleshwar',
      href: '/blogs/budget-travel-mahabaleshwar',
      description: 'Shows how to keep a villa stay affordable without losing comfort.',
    },
    {
      label: 'Group gathering guide for Mahabaleshwar',
      href: '/blogs/group-gathering-guide',
      description: 'Useful when the budget villa is booked for a larger group trip.',
    },
  ],
}

// ─── Blog → Commercial landing page links (root routes) ───────────────────────
// These appear in the "Need a villa base for this trip?" section on each blog.
// All hrefs must use root-level commercial URLs.
const BLOG_CATEGORY_LINKS: Record<string, InternalLink[]> = {
  'best-villas-families': [
    {
      label: 'Family villas in Mahabaleshwar',
      href: FAMILY_VILLAS_URL,
      description: 'Browse villas designed for joint-family trips and shared meals.',
    },
    {
      label: 'Private pool villas in Mahabaleshwar',
      href: POOL_VILLAS_URL,
      description: 'Compare family-friendly villas with private pools and outdoor space.',
    },
  ],
  'romantic-couple-retreat': [
    {
      label: 'Couple villas in Mahabaleshwar',
      href: CAT_COUPLE,
      description: 'Find private villas that suit honeymoons and anniversary escapes.',
    },
    {
      label: 'Valley view villas in Mahabaleshwar',
      href: CAT_VALLEY,
      description: 'Use this if the view matters as much as the stay itself.',
    },
  ],
  'group-gathering-guide': [
    {
      label: 'Group villas in Mahabaleshwar',
      href: CAT_GROUP,
      description: 'Good for corporate retreats, reunions, and birthday trips.',
    },
    {
      label: 'Budget villas in Mahabaleshwar',
      href: CAT_BUDGET,
      description: 'A practical option if the group wants lower per-head cost.',
    },
  ],
  'budget-travel-mahabaleshwar': [
    {
      label: 'Budget villas in Mahabaleshwar',
      href: CAT_BUDGET,
      description: 'See the current low-cost private villa options first.',
    },
    {
      label: 'Group villas in Mahabaleshwar',
      href: CAT_GROUP,
      description: 'Useful if you want to spread cost across more guests.',
    },
  ],
  'valley-views-photography': [
    {
      label: 'Valley view villas in Mahabaleshwar',
      href: CAT_VALLEY,
      description: 'Find villas positioned for sunrise, mist, and ridgeline views.',
    },
    {
      label: 'Private pool villas in Mahabaleshwar',
      href: POOL_VILLAS_URL,
      description: 'Look for properties where the pool also faces the valley.',
    },
  ],
  'perfect-travel-itinerary-mahabaleshwar': [
    {
      label: 'Family villas in Mahabaleshwar',
      href: FAMILY_VILLAS_URL,
      description: 'A sensible base if the itinerary is built around family travel.',
    },
    {
      label: 'Group villas in Mahabaleshwar',
      href: CAT_GROUP,
      description: 'Best if the itinerary is for a larger party or reunion.',
    },
  ],
  'wilson-point-sunrise-guide': [
    {
      label: 'Valley view villas in Mahabaleshwar',
      href: CAT_VALLEY,
      description: 'Stays that make early sunrise departures easier and more rewarding.',
    },
    {
      label: 'Couple villas in Mahabaleshwar',
      href: CAT_COUPLE,
      description: 'A strong fit for guests planning quiet sunrise trips together.',
    },
  ],
  'mahabaleshwar-market-guide': [
    {
      label: 'Villas near Mapro Garden',
      href: MAPRO_VILLAS_URL,
      description: 'Stay close to Mapro Garden — the heart of the market area.',
    },
    {
      label: 'Family villas in Mahabaleshwar',
      href: FAMILY_VILLAS_URL,
      description: 'Useful when the market trip is part of a wider family stay.',
    },
  ],
  'mahabaleshwar-famous-food-spots': [
    {
      label: 'Villas near Mapro Garden',
      href: MAPRO_VILLAS_URL,
      description: 'Stay within minutes of Mahabaleshwar\'s most famous food destination.',
    },
    {
      label: 'Family villas in Mahabaleshwar',
      href: FAMILY_VILLAS_URL,
      description: 'A good base if the trip is built around shared meals and local food.',
    },
  ],
  'monsoon-in-mahabaleshwar': [
    {
      label: 'Valley view villas in Mahabaleshwar',
      href: CAT_VALLEY,
      description: 'The best category if mist and ridgeline views matter most.',
    },
    {
      label: 'Private pool villas in Mahabaleshwar',
      href: POOL_VILLAS_URL,
      description: 'Great for rain-heavy stays where the villa itself matters more.',
    },
  ],
  'strawberry-season-guide': [
    {
      label: 'Couple villas in Mahabaleshwar',
      href: CAT_COUPLE,
      description: 'Works well for romantic winter and strawberry-season stays.',
    },
    {
      label: 'Family villas in Mahabaleshwar',
      href: FAMILY_VILLAS_URL,
      description: 'Ideal if strawberry season is part of a larger family holiday.',
    },
  ],
  'mahabaleshwar-real-food-guide': [
    {
      label: 'Villas near Mapro Garden',
      href: MAPRO_VILLAS_URL,
      description: 'A sensible base for longer stays built around food outings.',
    },
    {
      label: 'Family villas in Mahabaleshwar',
      href: FAMILY_VILLAS_URL,
      description: 'Useful when the whole trip is planned around eating together.',
    },
  ],
  'adventure-activities-mahabaleshwar-guide': [
    {
      label: 'Group villas in Mahabaleshwar',
      href: CAT_GROUP,
      description: 'Good for active groups that need space and shared common areas.',
    },
    {
      label: 'Family villas in Mahabaleshwar',
      href: FAMILY_VILLAS_URL,
      description: 'Useful when the adventure itinerary includes children and elders.',
    },
  ],
  'wilson-point-complete-guide': [
    {
      label: 'Valley view villas in Mahabaleshwar',
      href: CAT_VALLEY,
      description: 'Choose a stay that makes sunrise and ridge views easier to enjoy.',
    },
    {
      label: 'Couple villas in Mahabaleshwar',
      href: CAT_COUPLE,
      description: 'A natural fit for quiet dawn visits and smaller bookings.',
    },
  ],
  'mahabaleshwar-horse-riding-experience': [
    {
      label: 'Family villas in Mahabaleshwar',
      href: FAMILY_VILLAS_URL,
      description: 'A practical choice when horse riding is part of a wider family trip.',
    },
    {
      label: 'Group villas in Mahabaleshwar',
      href: CAT_GROUP,
      description: 'Useful for larger groups planning lakeside activities together.',
    },
  ],
  'venna-lake-boat-rides-food-and-horse-riding': [
    {
      label: 'Villas near Mapro Garden',
      href: MAPRO_VILLAS_URL,
      description: 'Conveniently located for Venna Lake and Mapro Garden in one trip.',
    },
    {
      label: 'Family villas in Mahabaleshwar',
      href: FAMILY_VILLAS_URL,
      description: 'A good base for a family itinerary around Venna Lake and nearby spots.',
    },
  ],
  'mahabaleshwar-complete-travel-guide': [
    {
      label: 'Luxury villas in Mahabaleshwar',
      href: LUXURY_VILLAS_URL,
      description: 'Start here if you want to match the guide with the right stay.',
    },
    {
      label: 'Family villas in Mahabaleshwar',
      href: FAMILY_VILLAS_URL,
      description: 'Best for larger trips that need a proper base in the hills.',
    },
  ],
  'adventure-spots-in-mahabaleshwar': [
    {
      label: 'Group villas in Mahabaleshwar',
      href: CAT_GROUP,
      description: 'Good for active groups that need space and shared common areas.',
    },
    {
      label: 'Private pool villas in Mahabaleshwar',
      href: POOL_VILLAS_URL,
      description: 'Perfect for adventure groups who want a pool to return to.',
    },
  ],
  'best-time-visit-mahabaleshwar': [
    {
      label: 'Luxury villas in Mahabaleshwar',
      href: LUXURY_VILLAS_URL,
      description: 'Browse available villas once you have picked your season.',
    },
    {
      label: 'Villas near Mapro Garden',
      href: MAPRO_VILLAS_URL,
      description: 'Conveniently placed for any season of visit.',
    },
  ],
  'mahabaleshwar-tourist-places': [
    {
      label: 'Villas near Mapro Garden',
      href: MAPRO_VILLAS_URL,
      description: 'The closest villa base to the main tourist corridor.',
    },
    {
      label: 'Luxury villas in Mahabaleshwar',
      href: LUXURY_VILLAS_URL,
      description: 'Premium stays that make sightseeing a more relaxed experience.',
    },
  ],
  'perfect-travel-itinerary-panchgani': [
    {
      label: 'Family villas in Mahabaleshwar',
      href: FAMILY_VILLAS_URL,
      description: 'A practical base for families covering both Panchgani and Mahabaleshwar.',
    },
    {
      label: 'Villas near Mapro Garden',
      href: MAPRO_VILLAS_URL,
      description: 'Convenient for guests exploring Panchgani and Mapro in one trip.',
    },
  ],
}

const BLOG_RELATED_BLOGS: Record<string, InternalLink[]> = {
  'best-villas-families': [
    {
      label: 'Mahabaleshwar group gathering guide',
      href: '/blogs/group-gathering-guide',
      description: 'Useful if the family trip includes a larger reunion or shared stay.',
    },
    {
      label: 'Complete Mahabaleshwar travel guide',
      href: '/blogs/mahabaleshwar-complete-travel-guide',
      description: 'A wider planning guide that pairs well with family villa research.',
    },
  ],
  'romantic-couple-retreat': [
    {
      label: 'Mahabaleshwar strawberry season guide',
      href: '/blogs/strawberry-season-guide',
      description: 'A natural follow-up if the couple trip is planned for winter months.',
    },
    {
      label: 'Mahabaleshwar itinerary for couples and weekend trips',
      href: '/blogs/perfect-travel-itinerary-mahabaleshwar',
      description: 'Adds a day-by-day plan that supports the romantic getaway theme.',
    },
  ],
  'group-gathering-guide': [
    {
      label: 'Budget travel in Mahabaleshwar',
      href: '/blogs/budget-travel-mahabaleshwar',
      description: 'Useful when the group wants to reduce per-head cost.',
    },
    {
      label: 'Complete Mahabaleshwar travel guide',
      href: '/blogs/mahabaleshwar-complete-travel-guide',
      description: 'A broader planning guide for large groups and long weekends.',
    },
  ],
  'budget-travel-mahabaleshwar': [
    {
      label: 'Mahabaleshwar group gathering guide',
      href: '/blogs/group-gathering-guide',
      description: 'Pairs well with group logistics and villa planning.',
    },
    {
      label: 'Best villas in Mahabaleshwar for family vacations',
      href: '/blogs/best-villas-families',
      description: 'Shows how value stays can still work for family travel.',
    },
  ],
  'valley-views-photography': [
    {
      label: 'Wilson Point sunrise guide',
      href: '/blogs/wilson-point-sunrise-guide',
      description: 'A helpful next read for photographers chasing early light.',
    },
    {
      label: 'Monsoon in Mahabaleshwar guide',
      href: '/blogs/monsoon-in-mahabaleshwar',
      description: 'Useful if you want to compare winter clarity with monsoon mist.',
    },
  ],
  'perfect-travel-itinerary-mahabaleshwar': [
    {
      label: 'Complete Mahabaleshwar travel guide',
      href: '/blogs/mahabaleshwar-complete-travel-guide',
      description: 'A wider overview that complements the structured itinerary.',
    },
    {
      label: 'Wilson Point complete guide',
      href: '/blogs/wilson-point-complete-guide',
      description: 'Adds a focused sunrise destination to the trip plan.',
    },
  ],
  'wilson-point-sunrise-guide': [
    {
      label: 'Wilson Point complete guide',
      href: '/blogs/wilson-point-complete-guide',
      description: 'A deeper look at the same sunrise destination.',
    },
    {
      label: 'Valley views and photography guide',
      href: '/blogs/valley-views-photography',
      description: 'Useful if you are planning photography around the sunrise trip.',
    },
  ],
  'mahabaleshwar-market-guide': [
    {
      label: 'Mahabaleshwar famous food spots',
      href: '/blogs/mahabaleshwar-famous-food-spots',
      description: 'Pairs naturally with a guide to the main market area.',
    },
    {
      label: 'Mahabaleshwar real food guide',
      href: '/blogs/mahabaleshwar-real-food-guide',
      description: 'Good if you want more local eating recommendations.',
    },
  ],
  'mahabaleshwar-famous-food-spots': [
    {
      label: 'Mahabaleshwar market guide',
      href: '/blogs/mahabaleshwar-market-guide',
      description: 'The market and the food spots fit together naturally.',
    },
    {
      label: 'Mahabaleshwar real food guide',
      href: '/blogs/mahabaleshwar-real-food-guide',
      description: 'A broader food guide that complements the spot list.',
    },
  ],
  'monsoon-in-mahabaleshwar': [
    {
      label: 'Valley views and photography guide',
      href: '/blogs/valley-views-photography',
      description: 'A useful companion if you are planning mist and cloud photography.',
    },
    {
      label: 'Complete Mahabaleshwar travel guide',
      href: '/blogs/mahabaleshwar-complete-travel-guide',
      description: 'Helps compare the monsoon season with the rest of the year.',
    },
  ],
  'strawberry-season-guide': [
    {
      label: 'Romantic couple retreat guide',
      href: '/blogs/romantic-couple-retreat',
      description: 'The obvious next step if you are planning a winter couple trip.',
    },
    {
      label: 'Best villas in Mahabaleshwar for family vacations',
      href: '/blogs/best-villas-families',
      description: 'Useful if the strawberry trip is a larger family stay.',
    },
  ],
  'mahabaleshwar-real-food-guide': [
    {
      label: 'Mahabaleshwar famous food spots',
      href: '/blogs/mahabaleshwar-famous-food-spots',
      description: 'A tighter list of the same eating theme.',
    },
    {
      label: 'Mahabaleshwar market guide',
      href: '/blogs/mahabaleshwar-market-guide',
      description: 'Good if you want to combine food stops with the evening market.',
    },
  ],
  'adventure-activities-mahabaleshwar-guide': [
    {
      label: 'Mahabaleshwar itinerary guide',
      href: '/blogs/perfect-travel-itinerary-mahabaleshwar',
      description: 'Shows where the adventure fits into a full trip plan.',
    },
    {
      label: 'Complete Mahabaleshwar travel guide',
      href: '/blogs/mahabaleshwar-complete-travel-guide',
      description: 'Broadens the trip beyond activities alone.',
    },
  ],
  'wilson-point-complete-guide': [
    {
      label: 'Wilson Point sunrise guide',
      href: '/blogs/wilson-point-sunrise-guide',
      description: 'A more focused sunrise-specific read.',
    },
    {
      label: 'Valley views and photography guide',
      href: '/blogs/valley-views-photography',
      description: 'Good if photography is part of the plan.',
    },
  ],
  'mahabaleshwar-horse-riding-experience': [
    {
      label: 'Venna Lake boat rides and food guide',
      href: '/blogs/venna-lake-boat-rides-food-and-horse-riding',
      description: 'A natural companion for lakeside activities.',
    },
    {
      label: 'Adventure activities in Mahabaleshwar',
      href: '/blogs/adventure-activities-mahabaleshwar-guide',
      description: 'Useful if you want a broader activity list.',
    },
  ],
  'venna-lake-boat-rides-food-and-horse-riding': [
    {
      label: 'Mahabaleshwar horse riding experience',
      href: '/blogs/mahabaleshwar-horse-riding-experience',
      description: 'A more focused read on the horse riding part of the trip.',
    },
    {
      label: 'Complete Mahabaleshwar travel guide',
      href: '/blogs/mahabaleshwar-complete-travel-guide',
      description: 'Helps place Venna Lake inside the wider itinerary.',
    },
  ],
  'mahabaleshwar-complete-travel-guide': [
    {
      label: 'Perfect Mahabaleshwar itinerary',
      href: '/blogs/perfect-travel-itinerary-mahabaleshwar',
      description: 'A day-by-day route after you read the master guide.',
    },
    {
      label: 'Valley views and photography guide',
      href: '/blogs/valley-views-photography',
      description: 'Useful if your trip also prioritizes photography.',
    },
  ],
  'adventure-spots-in-mahabaleshwar': [
    {
      label: 'Mahabaleshwar itinerary guide',
      href: '/blogs/perfect-travel-itinerary-mahabaleshwar',
      description: 'Shows where adventure fits into the full trip.',
    },
    {
      label: 'Complete Mahabaleshwar travel guide',
      href: '/blogs/mahabaleshwar-complete-travel-guide',
      description: 'The master reference for planning any Mahabaleshwar trip.',
    },
  ],
  'best-time-visit-mahabaleshwar': [
    {
      label: 'Complete Mahabaleshwar travel guide',
      href: '/blogs/mahabaleshwar-complete-travel-guide',
      description: 'The broader planning context once you have picked a season.',
    },
    {
      label: 'Monsoon in Mahabaleshwar guide',
      href: '/blogs/monsoon-in-mahabaleshwar',
      description: 'Useful if you are specifically considering a monsoon trip.',
    },
  ],
  'mahabaleshwar-tourist-places': [
    {
      label: 'Perfect Mahabaleshwar itinerary',
      href: '/blogs/perfect-travel-itinerary-mahabaleshwar',
      description: 'Puts the tourist places into a day-by-day trip structure.',
    },
    {
      label: 'Wilson Point sunrise guide',
      href: '/blogs/wilson-point-sunrise-guide',
      description: 'Expands on the most iconic sightseeing stop.',
    },
  ],
  'perfect-travel-itinerary-panchgani': [
    {
      label: 'Perfect Mahabaleshwar itinerary',
      href: '/blogs/perfect-travel-itinerary-mahabaleshwar',
      description: 'The companion guide covering Mahabaleshwar side of the same trip.',
    },
    {
      label: 'Complete Mahabaleshwar travel guide',
      href: '/blogs/mahabaleshwar-complete-travel-guide',
      description: 'Broadens the scope beyond Panchgani alone.',
    },
  ],
}

const VILLA_CATEGORY_TO_PAGE: Record<string, keyof typeof CATEGORY_GUIDES> = {
  'pool-villas': 'pool-villas-in-mahabaleshwar',
  'family-villas': 'family-villas-in-mahabaleshwar',
  'couple-villas': 'couple-villas-in-mahabaleshwar',
  'group-villas': 'group-villas-in-mahabaleshwar',
  'valley-view-villas': 'valley-view-villas-in-mahabaleshwar',
  'budget-villas': 'budget-villas-in-mahabaleshwar',
}

export function getCategoryGuideLinks(categorySlug: string) {
  return CATEGORY_GUIDES[categorySlug] ?? []
}

export function getBlogCategoryLinks(blogSlug: string) {
  return BLOG_CATEGORY_LINKS[blogSlug] ?? []
}

export function getVillaGuideLinks(categorySlug: string) {
  const pageSlug = VILLA_CATEGORY_TO_PAGE[categorySlug]
  return pageSlug ? CATEGORY_GUIDES[pageSlug] : []
}

export function getBlogRelatedLinks(blogSlug: string) {
  return BLOG_RELATED_BLOGS[blogSlug] ?? []
}
