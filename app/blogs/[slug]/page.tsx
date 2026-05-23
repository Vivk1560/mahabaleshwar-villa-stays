import Image from 'next/image'
import Link from 'next/link'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { FloatingButtons } from '@/components/FloatingButtons'
import { VillaCard } from '@/components/VillaCard'
import { Calendar, ArrowLeft } from 'lucide-react'
import blogs from '@/lib/data/blogs.json'
import villas from '@/lib/data/villas.json'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// ── Types ─────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

interface FaqItem {
  q: string
  a: string
}

// ── Per-slug FAQ content ───────────────────────────────────────────────────────
// blogs.json does not carry a faqs field; FAQs are defined here per slug
// so that FAQPage structured data is always injected on blog detail pages.

const BLOG_FAQ_MAP: Record<string, FaqItem[]> = {
  'best-villas-families': [
    {
      q: 'Which are the best family villas in Mahabaleshwar?',
      a: 'Valley View Manor (8 BHK, 25 guests), Nature Haven Villa (7 BHK, 25 guests), and Peaceful Nook Villa (7 BHK, 20 guests) are consistently the top choices for large family stays. All three include a professional cook, private pool, and caretaker.',
    },
    {
      q: 'What should I look for in a family villa in Mahabaleshwar?',
      a: 'Key features include multiple bedrooms with attached bathrooms, a private pool with shallow sections for children, a fully equipped kitchen or professional cook, an enclosed garden or lawn for safe outdoor play, and a location within 10–15 minutes of Mapro Garden.',
    },
    {
      q: 'Is a family villa in Mahabaleshwar cheaper than a hotel for large groups?',
      a: 'Yes — for groups of 15 or more, splitting a private villa per person typically costs significantly less than booking equivalent hotel rooms, while providing more space, privacy, a pool, and cook service that hotels do not offer at that price point.',
    },
    {
      q: 'What is the best time for a family vacation to Mahabaleshwar?',
      a: 'October through February is ideal for families. The weather is cool and pleasant, strawberries are in season from December through March, and all viewpoints are accessible. May is also popular during school summer holidays.',
    },
    {
      q: 'Are there activities near family villas in Mahabaleshwar for children?',
      a: 'Yes — Mapro Garden strawberry picking, Venna Lake boating and horse riding, Velocity Park amusement rides, and Wilson Point sunrise are all child-friendly and within 5–20 minutes of most villas.',
    },
  ],

  'romantic-couple-retreat': [
    {
      q: 'Which villas in Mahabaleshwar are best for couples?',
      a: 'Modern Essence Villa (near Parsi Point, valley-view pool), Artisan Villa (creative lounge, private balconies), and Riverside Hideaway (private bonfire garden) are the most popular couple-friendly properties in the Mahabaleshwar Villa Stays collection.',
    },
    {
      q: 'Is Mahabaleshwar good for a honeymoon?',
      a: 'Mahabaleshwar is one of Maharashtra\'s most popular honeymoon destinations. The cool climate, misty valleys, private pool villas, strawberry farms, and sunset viewpoints like Parsi Point create a naturally romantic setting throughout the year.',
    },
    {
      q: 'What romantic experiences can couples enjoy near Mahabaleshwar villas?',
      a: 'Private candlelit dinners arranged by the villa cook, bonfire evenings in the garden, Wilson Point sunrise visits, strawberry picking at Mapro Garden, and sunset drives to Parsi Point or Bombay Point are the most popular romantic experiences.',
    },
    {
      q: 'What is the best season for a romantic Mahabaleshwar trip?',
      a: 'October through February is the most romantic season — cool evenings, clear valley views, and the strawberry season from December through March. December and January are especially popular for honeymoons.',
    },
    {
      q: 'Can we book a couple villa in Mahabaleshwar for just 2 people?',
      a: 'Yes — while villas have higher technical capacities, smaller groups including just 2 people can book. Contact us via WhatsApp for pricing on smaller occupancy bookings.',
    },
  ],

  'group-gathering-guide': [
    {
      q: 'What is the largest group villa available in Mahabaleshwar?',
      a: 'Valley View Manor accommodates up to 25 guests across 8 bedrooms with a private pool, BBQ area, professional cook, and panoramic valley views near Mapro Garden. It is the largest single villa in the Mahabaleshwar Villa Stays portfolio.',
    },
    {
      q: 'How do I plan a corporate retreat at a Mahabaleshwar villa?',
      a: 'Book a 7–8 BHK villa at least 3–4 weeks in advance, communicate meal preferences to the cook in advance, plan structured activities in the mornings and open exploration in the afternoons, and use the bonfire area for informal team bonding in the evenings.',
    },
    {
      q: 'Are Mahabaleshwar group villas suitable for birthday party celebrations?',
      a: 'Yes — private group villas with BBQ areas, bonfire zones, private pools, and professional cooks are ideal for birthday celebrations. Inform the team when booking and the caretaker can coordinate cake delivery, basic decoration, and bonfire setup.',
    },
    {
      q: 'How far in advance should I book a group villa in Mahabaleshwar?',
      a: 'For peak season (October–February) and long weekends, book at least 3–6 weeks in advance. For weekday stays in off-peak months, 1–2 weeks is usually sufficient. Large group villas fill quickly on festive weekends.',
    },
    {
      q: 'What group transport is recommended for Mahabaleshwar from Pune?',
      a: 'A 26-seater or 32-seater Tempo Traveller is the most economical option for groups of 15–25 from Pune or Mumbai. Per-head transport cost is significantly lower than individual cabs and the group travels together.',
    },
  ],

  'budget-travel-mahabaleshwar': [
    {
      q: 'What is the cheapest way to stay in Mahabaleshwar with a private pool?',
      a: 'Book a budget villa like Mist Haven Villa (4 BHK, 15 guests), Zen Retreat Villa (3 BHK, 12 guests), or Grand Vista Palace (4 BHK, 15 guests) and split the cost across the group. Per-person cost typically undercuts mid-range hotel rooms while including a private pool.',
    },
    {
      q: 'Are budget villas in Mahabaleshwar clean and well-maintained?',
      a: 'Every villa in the Mahabaleshwar Villa Stays collection — including budget-category properties — is personally vetted for cleanliness, pool maintenance, working amenities, and caretaker responsiveness. Budget refers to price-to-value ratio, not standards.',
    },
    {
      q: 'How can I reduce costs on a Mahabaleshwar villa trip?',
      a: 'Travel in a group of 12–15 to maximise the per-person value split, use the professional cook for meals instead of dining out, book on weekdays rather than weekends when rates are lower, and book directly via WhatsApp to avoid third-party platform fees.',
    },
    {
      q: 'What free or low-cost things can I do in Mahabaleshwar?',
      a: 'Wilson Point sunrise (small entry fee), Arthur\'s Seat and Elephant\'s Head Point viewpoints (minimal entry), forest walks, the Panchganga Temple in Old Mahabaleshwar, and walking the Venna Lake perimeter path are all low-cost or free experiences.',
    },
    {
      q: 'Are budget villas near Mapro Garden in Mahabaleshwar?',
      a: 'Yes — Mist Haven Villa and Grand Vista Palace are within 5–7 minutes of Mapro Garden. Zen Retreat Villa is within 7 minutes. All three are budget-category properties that include private pools and full caretaker service.',
    },
  ],

  'valley-views-photography': [
    {
      q: 'Which Mahabaleshwar villas are best for photography?',
      a: 'Mountain Echo Residence (valley-facing pool with reflection shots), Cloud Castle Villa (cloud-level terrace), and Royal Abode Estate (grand staircase and valley-facing pool) are the most photographed properties in the portfolio.',
    },
    {
      q: 'What is the best time for photography in Mahabaleshwar?',
      a: 'Golden hour — the hour after sunrise and the hour before sunset — produces the most dramatic light on the Sahyadri valleys. On winter mornings (October–February), valley fog creates exceptional photography conditions from 6 to 8 AM.',
    },
    {
      q: 'Which are the most photogenic viewpoints in Mahabaleshwar?',
      a: 'Wilson Point (sunrise panorama), Arthur\'s Seat (sheer cliff drop), Elephant\'s Head Point (unique rock formation), and Kate\'s Point (broad valley panorama) are the four most photographed viewpoints. Each is best in early morning light.',
    },
    {
      q: 'How do I photograph the valley fog at Mahabaleshwar villas?',
      a: 'Expose for the mid-tone sky rather than the bright horizon. On phones, tap the area just above the fog layer to lock exposure. On DSLR, bracket exposures and blend — the fog is significantly brighter than the dark valley below it.',
    },
    {
      q: 'Is Mahabaleshwar good for monsoon photography?',
      a: 'Monsoon (June–September) offers dramatic photography — waterfalls at full volume, fog at terrace level, and the Sahyadri ranges in deep saturated green. The dynamic cloud formations during this season are unlike any other time of year.',
    },
  ],

  'best-time-visit-mahabaleshwar': [
    {
      q: 'What is the best month to visit Mahabaleshwar?',
      a: 'November and December are consistently rated the best months — cool weather (10–20°C), clear valley views, strawberry season beginning, and a festive atmosphere. October is excellent for post-monsoon green and lighter crowds.',
    },
    {
      q: 'Is Mahabaleshwar good to visit in monsoon?',
      a: 'Yes, for travellers who enjoy rain and dramatic landscapes. July and August see the heaviest rainfall, turning the plateau intensely green with waterfalls everywhere. Most tourist spots remain open but some outdoor activities are weather-dependent.',
    },
    {
      q: 'What is the strawberry season in Mahabaleshwar?',
      a: 'Strawberry season runs from December through March, peaking in January and February. Mapro Garden\'s farms and roadside stalls are at full production during this period, with fresh picking available at select farms.',
    },
    {
      q: 'Is Mahabaleshwar crowded in December?',
      a: 'December — particularly the Christmas and New Year period — is peak season. Wilson Point, Mapro Garden, and Venna Lake are busy on weekends. Booking villa accommodation 4–6 weeks in advance is essential during this period.',
    },
    {
      q: 'When is the least crowded time to visit Mahabaleshwar?',
      a: 'June (pre-monsoon), September (late monsoon), and weekday trips in any season see the fewest crowds. September offers the bonus of lush green scenery, waterfalls at full force, and significantly lower villa pricing.',
    },
  ],

  'mahabaleshwar-tourist-places': [
    {
      q: 'What are the must-visit tourist places in Mahabaleshwar?',
      a: 'Wilson Point (sunrise panorama), Mapro Garden (strawberry farms and products), Venna Lake (boating and horse riding), Lingmala Waterfall (seasonal cascade), Arthur\'s Seat (dramatic cliff viewpoint), and Pratapgad Fort (17th-century Maratha fort) are the essential stops.',
    },
    {
      q: 'How far is Pratapgad Fort from Mahabaleshwar?',
      a: 'Pratapgad Fort is approximately 24 kilometres from Mahabaleshwar town — about 45 minutes by road. Allow 3–4 hours for a complete visit including the 500-step climb to the upper fort and the views from the ridgeline.',
    },
    {
      q: 'Is Panchgani worth visiting from Mahabaleshwar?',
      a: 'Yes — Panchgani is 19 km from Mahabaleshwar and most itineraries include both. Table Land (Asia\'s second-largest volcanic plateau) and Sydney Point are the main Panchgani attractions, reachable in under 35 minutes from any Mahabaleshwar villa.',
    },
    {
      q: 'When is Lingmala Waterfall best to visit?',
      a: 'Lingmala Waterfall is at its most powerful between August and October when monsoon rainfall keeps it running at full volume. The forest walk to the viewing platform is also most lush during this period.',
    },
    {
      q: 'Can I visit all major tourist places in Mahabaleshwar in 2 days?',
      a: 'Yes — a focused 2-day itinerary can cover Wilson Point sunrise, Mapro Garden, Venna Lake, Arthur\'s Seat, Elephant\'s Head Point, Lingmala Waterfall, and a Panchgani Table Land visit. Pratapgad Fort benefits from a dedicated half-day.',
    },
  ],

  'mahabaleshwar-complete-travel-guide': [
    {
      q: 'How do I reach Mahabaleshwar from Pune?',
      a: 'Mahabaleshwar is approximately 120 km from Pune via NH 48 through Satara and Wai, then the scenic Panchgani ghat road. The drive takes 3 to 3.5 hours depending on traffic. Friday evening departures from Pune encounter significant highway congestion.',
    },
    {
      q: 'How do I reach Mahabaleshwar from Mumbai?',
      a: 'Mahabaleshwar is approximately 260 km from Mumbai via the Mumbai–Pune Expressway and then through Satara. Total drive time is 5 to 6 hours. The coastal route via Mahad is slightly longer but more scenic.',
    },
    {
      q: 'What is the altitude of Mahabaleshwar?',
      a: 'Mahabaleshwar sits at approximately 1,372 metres (4,501 feet) above sea level on the Western Ghats plateau. This elevation is responsible for its reliably cool climate even during Maharashtra\'s peak summer months.',
    },
    {
      q: 'Why should I choose a private villa over a hotel in Mahabaleshwar?',
      a: 'Private villas offer complete exclusivity — your own pool, your own cook, your own garden, and no shared facilities with strangers. For groups of 10 or more, per-person villa costs often undercut mid-range hotel rooms while the experience is significantly superior.',
    },
    {
      q: 'What local food is famous in Mahabaleshwar?',
      a: 'Strawberry with cream from Mapro Garden, fresh bhutta (roasted corn), malai gola with mulberry syrup, Makka Patties, local chikki, and the famous Mapro Pizza and sandwiches are the essential Mahabaleshwar food experiences.',
    },
  ],

  'perfect-travel-itinerary-mahabaleshwar': [
    {
      q: 'How many days are enough for a Mahabaleshwar trip?',
      a: 'A minimum of 2 days is needed to cover the key viewpoints and attractions. 3 days allows a more relaxed experience with time for Pratapgad Fort, Panchgani Table Land, and proper enjoyment of your villa\'s pool and bonfire. Anything more reveals the quieter, less-visited side of the hill station.',
    },
    {
      q: 'What time should I reach Wilson Point for sunrise?',
      a: 'Arrive at least 30 minutes before sunrise — in most seasons this means being at the point by 6:00 AM. In December and January, sunrise is around 6:45–7:00 AM; arrive by 6:15 AM. The pre-sunrise sky transition is worth being there for.',
    },
    {
      q: 'Is Nana\'s Chana in Old Mahabaleshwar easy to find?',
      a: 'The stall is near the Old Mahabaleshwar bus stand area and is best found by asking locals. It opens early in the morning and sells out before 11 AM. Arrive before 9 AM for the best experience and full availability.',
    },
    {
      q: 'What is the best route from Pune to Mahabaleshwar?',
      a: 'The most common route is NH 48 from Pune to Satara, then toward Wai and up the Panchgani ghat. The final stretch through Panchgani with hairpin valley views is one of the most scenic drives in Maharashtra. Total distance is approximately 120 km.',
    },
    {
      q: 'Can I visit Panchgani and Mahabaleshwar in the same trip?',
      a: 'Yes — they are 19 km apart and most 3-day itineraries include both. Table Land in Panchgani and Bhilar Book Village are the standard Panchgani inclusions. Staying in a villa on the Panchgani–Mahabaleshwar Road gives easy access to both.',
    },
  ],

  'perfect-travel-itinerary-panchgani': [
    {
      q: 'How do I reach Panchgani from Pune?',
      a: 'Panchgani is approximately 100 km from Pune via NH 48 to Satara, then through Wai and up the ghat. The drive takes 2 to 2.5 hours. The ghat section from Wai climbs nearly 1,000 metres with dramatic forested hairpin bends.',
    },
    {
      q: 'Is Panchgani worth visiting separately from Mahabaleshwar?',
      a: 'Yes — Panchgani has its own distinct character with Table Land, Sydney Point, Bhilar Book Village, the school-town food culture, and significantly fewer crowds than Mahabaleshwar. Most visitors combine both in one trip given the 19 km distance.',
    },
    {
      q: 'What is Bhilar Book Village in Panchgani?',
      a: 'Bhilar (Pustakanche Gaon) is a village between Panchgani and Mahabaleshwar where the Maharashtra government has installed Marathi-language libraries in homes and local establishments. Visitors can browse and buy. The surrounding strawberry farms are an added attraction.',
    },
    {
      q: 'What are the best viewpoints in Panchgani?',
      a: 'Sydney Point (overlooking Krishna Valley and Dhom Dam), Parsi Point (reservoir views and quieter atmosphere), and the rim of Table Land plateau are the three primary viewpoints. Each offers a different perspective of the same valley system.',
    },
    {
      q: 'Is Table Land in Panchgani safe for children?',
      a: 'Yes — the plateau is flat and fenced at the dangerous rim edges. Horse riding is supervised and handlers keep close control. Children should be kept away from the outer rim where steep drops occur, but the main plateau area is safe for all ages.',
    },
  ],

  'mahabaleshwar-market-guide': [
    {
      q: 'What should I buy at Mahabaleshwar Main Bazaar?',
      a: 'Fresh strawberries (in season December–March), handmade chikki, local tribal honey, Mapro strawberry jam and syrups, mulberry wine, and freshly made Makka Patties are the best buys. Avoid pre-packaged tourist items that are available cheaper elsewhere.',
    },
    {
      q: 'What is the right price for fresh strawberries in Mahabaleshwar?',
      a: 'Standard quality Camarosa strawberries typically sell for ₹60–100 per punnet (250–500g). Premium large berries may go up to ₹150. Prices above ₹150 without obvious quality differentiation are inflated tourist pricing — negotiate or walk.',
    },
    {
      q: 'When is Mahabaleshwar market least crowded?',
      a: 'Weekday mornings before 10 AM are the least crowded time. Produce is freshest, vendors are most patient, and prices are often slightly better. Saturday and Sunday afternoons between 11 AM and 3 PM are the most congested periods.',
    },
    {
      q: 'Is bargaining normal in Mahabaleshwar market?',
      a: 'Yes — for fresh produce and unbranded goods, light bargaining is standard and expected. For packaged branded items like Mapro products, prices are generally fixed. For woolens and clothing, bargaining can reduce prices by 20–30%.',
    },
    {
      q: 'Which Mapro products are best to buy as gifts from Mahabaleshwar?',
      a: 'Mapro strawberry jam (classic variety), strawberry crush, mulberry syrup, and the choco-strawberry spread are the most popular gift purchases. They travel well in sealed glass bottles and are widely appreciated gifts from the region.',
    },
  ],

  'mahabaleshwar-famous-food-spots': [
    {
      q: 'What is the most famous food in Mahabaleshwar?',
      a: 'Strawberry with cream from Mapro Garden is the single most famous Mahabaleshwar food experience. Makka Patties, bhutta (roasted corn), malai gola with mulberry syrup, Mapro Pizza, and Nana\'s Chana in Old Mahabaleshwar are the other essential food experiences.',
    },
    {
      q: 'Is Mapro Garden restaurant good?',
      a: 'Yes — Mapro Garden\'s restaurant is one of the most reliable dining options in Mahabaleshwar. The strawberry with cream is definitive, the pizza with strawberry sauce is genuinely good, and the milkshakes and sandwiches are consistently well-made. Arrive before 10 AM on weekends to avoid the queue.',
    },
    {
      q: 'Where can I find Makka Patties in Mahabaleshwar?',
      a: 'Makka Patties are available at stalls throughout the Main Bazaar and near the Venna Lake approach road. Follow the queue — the stall with the longest line is consistently the best one. The patties are freshest between 9 AM and noon.',
    },
    {
      q: 'What is malai gola in Mahabaleshwar and where is it best?',
      a: 'Malai gola is crushed ice packed dense, drenched in thick sweetened cream, and topped with fruit syrup — mulberry or strawberry are the local choices. The best versions are at carts near Venna Lake where the cream is visibly thick rather than watery. Eat immediately on receipt.',
    },
    {
      q: 'Is there good vegetarian food in Mahabaleshwar?',
      a: 'Mahabaleshwar is almost entirely vegetarian-friendly. The hill station\'s signature street foods, Mapro Garden\'s menu, and most restaurants default to vegetarian menus. Non-vegetarian options exist at a few restaurants but are secondary to the predominantly vegetarian food culture.',
    },
  ],

  'adventure-spots-in-mahabaleshwar': [
    {
      q: 'What adventure activities are available in Mahabaleshwar?',
      a: 'Go-karting, paragliding (tandem), horse riding, camel rides, 7D cinema simulations, rope courses, mini-golf, and boating at Venna Lake are the main adventure activities available in and around Mahabaleshwar.',
    },
    {
      q: 'Is paragliding safe in Mahabaleshwar?',
      a: 'Yes, with a certified operator. Check that the pilot holds APPI or PAHADI certification, that equipment is inspected before the flight, and that the operator cancels flights in genuinely unsafe weather rather than pressuring guests to fly. Tandem paragliding requires no prior experience.',
    },
    {
      q: 'What is the price for go-karting in Mahabaleshwar?',
      a: 'Go-karting sessions typically cost ₹150–200 for 5 minutes and ₹280–350 for 10 minutes at operators like Velocity Entertainmentz. Weekend prices may be 15–20% higher. Arrive before 10 AM on weekdays to avoid queues.',
    },
    {
      q: 'What is the best season for adventure activities in Mahabaleshwar?',
      a: 'October through February is the best season for outdoor adventure — clear skies, stable paragliding thermals, and good road conditions. Monsoon (June–September) replaces motor activities with waterfall trail walks, which are their own form of adventure.',
    },
    {
      q: 'What adventure activities are suitable for children in Mahabaleshwar?',
      a: 'Horse riding, camel rides, 7D cinema simulations, mini-golf, and Venna Lake boating are all well-suited for children. Go-karting has a minimum height requirement (approximately 140 cm for solo karts). Paragliding has minimum age requirements — check with the operator in advance.',
    },
  ],

  'wilson-point-sunrise-guide': [
    {
      q: 'What time should I arrive at Wilson Point for sunrise?',
      a: 'Arrive at minimum 30 minutes before sunrise. In most seasons this means being at the point by 6:00 AM. In December–January, sunrise is around 6:45–7:00 AM so arrive by 6:15 AM. The pre-sunrise sky transition is as photographically valuable as the sunrise itself.',
    },
    {
      q: 'Is there an entry fee at Wilson Point Mahabaleshwar?',
      a: 'Yes — a nominal Maharashtra Forest Department entry fee of approximately ₹20–30 per person applies. Parking may have a separate small charge. The gate is staffed from early morning during peak season.',
    },
    {
      q: 'What are jamun shots at Wilson Point and when are they available?',
      a: 'Jamun shots are small glasses of freshly pressed Indian blackberry juice sold by vendors along the Wilson Point path, typically for ₹20–30. They are tart, deeply coloured, and one of the most distinctly Mahabaleshwar experiences. They are seasonal — available roughly July through October when jamun ripens.',
    },
    {
      q: 'Is Wilson Point crowded?',
      a: 'On weekend mornings from November through January, Wilson Point attracts 150–200 people by 6:15 AM. Weekday visits see a fraction of that crowd. The point itself is wide enough to spread out, and the collective atmosphere of people watching the same sunrise together is positive rather than disruptive.',
    },
    {
      q: 'Is Wilson Point worth visiting outside of sunrise?',
      a: 'The viewpoint is accessible during the day but the experience differs significantly — more crowded, without the fog drama and golden light that define the sunrise. As a daytime viewpoint it is good; as a sunrise experience it is genuinely remarkable.',
    },
  ],

  'mahabaleshwar-horse-riding-experience': [
    {
      q: 'Where can I do horse riding in Mahabaleshwar?',
      a: 'Horse riding is available at Venna Lake (most popular, lakeside circuit), Kate\'s Point (ridge path with valley views), Arthur\'s Seat (shorter rides, dramatic backdrop), and Table Land in Panchgani (flat plateau, widest open terrain). Each location offers a different experience.',
    },
    {
      q: 'What is the horse riding price in Mahabaleshwar?',
      a: 'After negotiation, standard prices are ₹150–200 for a 15–20 minute ride at Venna Lake, ₹200–280 for a longer or more scenic ride at Kate\'s Point, and ₹300–400 for Table Land rides. The initial quote will be higher — negotiating is standard practice.',
    },
    {
      q: 'Is horse riding in Mahabaleshwar safe for children?',
      a: 'Yes — children aged 4 and above can ride with appropriate supervision. Very young children (under 4) can sit in front of the handler on the same horse. Handlers use their calmest, most patient horses for young riders and keep close control throughout.',
    },
    {
      q: 'What are the best times for horse riding at Venna Lake?',
      a: 'Early morning (7–9 AM) for mist, calm water reflections, and minimal crowds. Late afternoon (4–6 PM) for golden light and the sunset experience over the lake. Midday on weekends is the busiest and least atmospheric time.',
    },
    {
      q: 'Is horse riding available in Mahabaleshwar during monsoon?',
      a: 'Partially — some handlers continue operating on appropriate paths during the monsoon; others take the season off. The forest paths during this period are particularly lush and atmospheric. Check locally on arrival for current operator availability.',
    },
  ],

  'venna-lake-boat-rides-food-and-horse-riding': [
    {
      q: 'What is the boating price at Venna Lake Mahabaleshwar?',
      a: 'Rowboats cost approximately ₹80–120 for 30 minutes, paddle boats ₹80–150, and motorboats ₹200–350 per ride. Prices may vary slightly by season. Life jackets are mandatory and provided at no extra charge.',
    },
    {
      q: 'What is the best time to visit Venna Lake?',
      a: 'Early morning (7–9 AM) for calm water, mist reflections, and minimal crowds. Late afternoon (4:30–6 PM) for golden light and a quieter, more atmospheric lakeside experience. Saturday and Sunday between 11 AM and 3 PM in peak season have the longest queues.',
    },
    {
      q: 'Is there good food near Venna Lake?',
      a: 'Yes — Makka Patties and Makka Frankies from stalls near the boating counter, malai gola carts along the lakeside, bhutta sellers with coal fires, and chai stalls set up from early morning are all available and consistently good.',
    },
    {
      q: 'Can I walk around Venna Lake?',
      a: 'Yes — the perimeter path covers the full 28-acre lake circumference and takes 45–60 minutes at a leisurely pace. The northern and western banks are quieter and more forested than the busy eastern bank where the boating and horse riding activity concentrates.',
    },
    {
      q: 'Is Venna Lake open during monsoon?',
      a: 'Yes — boating continues during the monsoon season, weather permitting. The lake level rises 2–3 metres and the surrounding forest becomes intensely green. Extreme weather temporarily closes boating operations but the lakeside experience itself is beautiful during light rain.',
    },
  ],
}

// ── Static params ──────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}

// ── Keyword map ───────────────────────────────────────────────────────────────

const BLOG_KEYWORDS: Record<string, string> = {
  'best-villas-families':
    'best family villas Mahabaleshwar, family vacation Mahabaleshwar, villas for families hill station, Mahabaleshwar family trip, large villa Mahabaleshwar',
  'romantic-couple-retreat':
    'romantic villas Mahabaleshwar, couple villa Mahabaleshwar, honeymoon villa Mahabaleshwar, romantic getaway hill station Maharashtra',
  'group-gathering-guide':
    'group villas Mahabaleshwar, large group stay Mahabaleshwar, corporate retreat Mahabaleshwar, team outing villa Maharashtra',
  'budget-travel-mahabaleshwar':
    'budget villas Mahabaleshwar, affordable villas Mahabaleshwar, cheap villa Mahabaleshwar, budget stay hill station Maharashtra',
  'valley-views-photography':
    'Mahabaleshwar photography guide, valley views Mahabaleshwar, best viewpoints Mahabaleshwar, villa photography hill station',
  'best-time-visit-mahabaleshwar':
    'best time to visit Mahabaleshwar, Mahabaleshwar weather, Mahabaleshwar season guide, when to visit Mahabaleshwar',
  'mahabaleshwar-tourist-places':
    'tourist places Mahabaleshwar, Mahabaleshwar sightseeing, things to do Mahabaleshwar, Wilson Point Mapro Garden Venna Lake',
  'mahabaleshwar-complete-travel-guide':
    'Mahabaleshwar travel guide 2026, how to reach Mahabaleshwar, Mahabaleshwar trip planning, complete guide Mahabaleshwar',
  'perfect-travel-itinerary-mahabaleshwar':
    'Mahabaleshwar itinerary, Mahabaleshwar travel plan, Wilson Point sunrise guide, Pratapgad Fort Mahabaleshwar trip',
  'perfect-travel-itinerary-panchgani':
    'Panchgani itinerary, things to do Panchgani, Table Land Panchgani guide, Bhilar book village Panchgani travel',
  'mahabaleshwar-market-guide':
    'Mahabaleshwar market guide, what to buy Mahabaleshwar, Mahabaleshwar bazaar, strawberry market Mahabaleshwar chikki',
  'mahabaleshwar-famous-food-spots':
    'Mahabaleshwar food guide, what to eat Mahabaleshwar, Mapro Garden food, Makka Patties Mahabaleshwar street food',
  'adventure-spots-in-mahabaleshwar':
    'adventure activities Mahabaleshwar, paragliding Mahabaleshwar, go karting Mahabaleshwar, horse riding Mahabaleshwar',
  'wilson-point-sunrise-guide':
    'Wilson Point sunrise Mahabaleshwar, Wilson Point timing, jamun shots Wilson Point, sunrise point Mahabaleshwar guide',
  'mahabaleshwar-horse-riding-experience':
    'horse riding Mahabaleshwar, Venna Lake horse riding price, horse riding Kate\'s Point, Mahabaleshwar horse riding guide',
  'venna-lake-boat-rides-food-and-horse-riding':
    'Venna Lake boating price, Venna Lake Mahabaleshwar, boat rides Venna Lake, Venna Lake food horse riding guide',
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params

  const blog = blogs.find((b) => b.slug === slug)

  if (!blog) {
    return {
      title: 'Blog Not Found',
    }
  }

  const keywords =
    BLOG_KEYWORDS[slug] ||
    'Mahabaleshwar villas, luxury villas Mahabaleshwar'

  const imageUrl = blog.banner.startsWith('http')
    ? blog.banner
    : `https://www.mahabaleshwarvillastays.com${blog.banner}`

  return {
    title: blog.title,
    description: blog.excerpt,
    keywords,
    authors: [{ name: 'Mahabaleshwar Villa Stays' }],

    alternates: {
      canonical: `https://www.mahabaleshwarvillastays.com/blogs/${slug}`,
    },

    openGraph: {
      type: 'article',
      url: `https://www.mahabaleshwarvillastays.com/blogs/${slug}`,
      siteName: 'Mahabaleshwar Villa Stays',
      title: `${blog.title} | Mahabaleshwar Villa Stays`,
      description: blog.excerpt,
      publishedTime: blog.date,
      modifiedTime: blog.date,

      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: `${blog.title} | Mahabaleshwar Villa Stays`,
      description: blog.excerpt,
      images: [imageUrl],
    },
  }
}

// ── Page Component ────────────────────────────────────────────────────────────

export default async function BlogDetailPage({
  params,
}: PageProps) {
  const { slug } = await params

  const blog = blogs.find((b) => b.slug === slug)

  if (!blog) {
    notFound()
  }

  const relatedVillas = villas.filter((villa) =>
    blog.relatedVillas.includes(villa.id)
  )

  const imageUrl = blog.banner.startsWith('http')
    ? blog.banner
    : `https://www.mahabaleshwarvillastays.com${blog.banner}`

  // ── Resolve FAQs for this slug ─────────────────────────────────────────────
  // Source: BLOG_FAQ_MAP (defined above). blogs.json does not carry a faqs field.
  const pageFaqs: FaqItem[] = BLOG_FAQ_MAP[slug] ?? []

  // ── Structured Data ────────────────────────────────────────────────────────

  // ✅ Article schema — unique to each blog post
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    image: imageUrl,
    datePublished: blog.date,
    dateModified: blog.date,

    author: {
      '@type': 'Organization',
      name: 'Mahabaleshwar Villa Stays',
    },

    publisher: {
      '@type': 'Organization',
      name: 'Mahabaleshwar Villa Stays',

      logo: {
        '@type': 'ImageObject',
        url: 'https://www.mahabaleshwarvillastays.com/logo.jpeg',
      },
    },

    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.mahabaleshwarvillastays.com/blogs/${blog.slug}`,
    },
  }

  // ✅ Single BreadcrumbList — one per page
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',

    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.mahabaleshwarvillastays.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blogs',
        item: 'https://www.mahabaleshwarvillastays.com/blogs',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: blog.title,
        item: `https://www.mahabaleshwarvillastays.com/blogs/${blog.slug}`,
      },
    ],
  }

  // ✅ FAQPage — injected when pageFaqs is non-empty (guaranteed for all slugs
  //    present in BLOG_FAQ_MAP; gracefully absent for any future slugs not yet mapped)
  const faqSchema =
    pageFaqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',

          mainEntity: pageFaqs.map((faq) => ({
            '@type': 'Question',

            name: faq.q,

            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.a,
            },
          })),
        }
      : null

  const contentBlocks = blog.content
    .split('\n\n')
    .filter(Boolean)

  return (
    <main className="min-h-screen bg-background">
      {/* ✅ Article schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      {/* ✅ Single BreadcrumbList schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* ✅ FAQPage schema — rendered when pageFaqs is non-empty */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      <NavBar />

      {/* Banner */}
      <section className="pt-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-elevated mb-8">
            <Image
              src={blog.banner}
              alt={blog.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 space-y-4">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blogs
            </Link>

            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground leading-tight">
              {blog.title}
            </h1>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />

              <time dateTime={blog.date}>
                {new Date(blog.date).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>

            <p className="text-xl text-muted-foreground leading-relaxed border-l-4 border-primary pl-4">
              {blog.excerpt}
            </p>
          </div>

          {/* Blog Article */}
          <article className="space-y-5 mb-16">
            {contentBlocks.map((block, i) => {
              const trimmed = block.trim()

              const isHeading =
                trimmed.length < 80 &&
                !trimmed.endsWith('.') &&
                !trimmed.endsWith('?') &&
                !trimmed.endsWith('!') &&
                i > 0

              if (isHeading) {
                return (
                  <h2
                    key={i}
                    className="font-playfair text-2xl md:text-3xl font-bold text-foreground mt-10 mb-2"
                  >
                    {trimmed}
                  </h2>
                )
              }

              const lines = trimmed.split('\n')

              return (
                <p
                  key={i}
                  className="text-lg text-foreground leading-relaxed"
                >
                  {lines.map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < lines.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              )
            })}
          </article>

          {/* Related Villas */}
          {relatedVillas.length > 0 && (
            <div className="mt-12 pt-12 border-t border-border">
              <h2 className="font-playfair text-3xl font-bold text-foreground mb-8">
                Featured Villas from This Article
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {relatedVillas.map((villa) => (
                  <VillaCard
                    key={villa.id}
                    id={villa.id}
                    name={villa.name}
                    location={villa.location}
                    rating={villa.rating}
                    capacity={villa.capacity}
                    amenities={villa.amenities}
                    image={villa.images.listing}
                    category={villa.category}
                  />
                ))}
              </div>
            </div>
          )}

          {/* FAQ Section — UI accordion rendered from BLOG_FAQ_MAP */}
          {/* Schema is injected separately above as FAQPage JSON-LD */}
          {pageFaqs.length > 0 && (
            <section className="mt-16 pt-12 border-t border-border">
              <h2 className="font-playfair text-3xl font-bold text-foreground mb-8">
                Frequently Asked Questions
              </h2>

              <div className="space-y-5">
                {pageFaqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group border border-border rounded-2xl p-6 bg-card"
                  >
                    <summary className="flex justify-between items-center cursor-pointer list-none">
                      <h3 className="font-semibold text-lg text-foreground pr-5">
                        {faq.q}
                      </h3>

                      <span className="text-primary text-2xl font-bold group-open:rotate-45 transition-transform">
                        +
                      </span>
                    </summary>

                    <p className="mt-5 text-muted-foreground leading-7">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Back Button */}
          <div className="mt-16 text-center">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-all font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              View All Blogs
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  )
}
