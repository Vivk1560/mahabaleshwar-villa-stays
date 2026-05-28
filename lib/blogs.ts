export interface BlogAuthorProfile {
  name: string
  role: string
  bio: string
}

export interface BlogOutlineItem {
  level: 2 | 3
  text: string
  id: string
}

const DEFAULT_AUTHOR_PROFILE: BlogAuthorProfile = {
  name: 'Mahabaleshwar Villa Stays Editorial Team',
  role: 'Travel content editor',
  bio: 'Writes travel and villa-planning guides for Mahabaleshwar, Panchgani, and nearby hill-station stays.',
}

const AUTHOR_PROFILES: Record<string, BlogAuthorProfile> = {
  'Rohan Deshmukh': {
    name: 'Rohan Deshmukh',
    role: 'Family travel writer',
    bio: 'Covers family villa stays, practical itinerary planning, and multi-generational travel in Mahabaleshwar.',
  },
  'Ananya Kulkarni': {
    name: 'Ananya Kulkarni',
    role: 'Couples travel writer',
    bio: 'Focuses on romantic stays, slower itineraries, and quiet hill-station experiences for couples.',
  },
  'Kunal Patwardhan': {
    name: 'Kunal Patwardhan',
    role: 'Group travel writer',
    bio: 'Writes about group trips, villa logistics, and large-stay planning for families and corporate teams.',
  },
  'Meera Joshi': {
    name: 'Meera Joshi',
    role: 'Seasonal travel writer',
    bio: 'Covers monsoon, winter, and strawberry-season planning for Mahabaleshwar visitors.',
  },
  'Arjun Kale': {
    name: 'Arjun Kale',
    role: 'Food and sightseeing writer',
    bio: 'Writes local food and sightseeing guides around Mahabaleshwar and Panchgani.',
  },
  'Siddharth Bhave': {
    name: 'Siddharth Bhave',
    role: 'Hill-station itinerary writer',
    bio: 'Builds day-by-day travel plans that fit Mahabaleshwar road trips and short stays.',
  },
  'Neha Ranade': {
    name: 'Neha Ranade',
    role: 'Destination writer',
    bio: 'Covers viewpoints, market stops, and scenic routes around the Western Ghats.',
  },
  'Aarav Chitale': {
    name: 'Aarav Chitale',
    role: 'Adventure travel writer',
    bio: 'Writes about activity-based travel, viewpoint photography, and outdoor experiences in Mahabaleshwar.',
  },
  'Priya Sathe': {
    name: 'Priya Sathe',
    role: 'Villa planning writer',
    bio: 'Focuses on choosing the right villa for family, couple, and budget travel intents.',
  },
  'Dev Malhotra': {
    name: 'Dev Malhotra',
    role: 'Travel editor',
    bio: 'Helps shape the main planning guides and keeps the villa recommendations practical.',
  },
  'Ishita Vartak': {
    name: 'Ishita Vartak',
    role: 'Local travel writer',
    bio: 'Writes about local routes, food stops, and smaller hill-station details that matter on the ground.',
  },
  'Neha Deshpande': {
    name: 'Neha Deshpande',
    role: 'Seasonal planning writer',
    bio: 'Covers weather, crowd timing, and how each season changes the Mahabaleshwar experience.',
  },
  'Aniket Sawant': {
    name: 'Aniket Sawant',
    role: 'Sightseeing writer',
    bio: 'Writes detailed guides for major viewpoints and classic Mahabaleshwar road-trip stops.',
  },
  'Meera Kulkarni': {
    name: 'Meera Kulkarni',
    role: 'Food and market writer',
    bio: 'Focuses on market walks, local food, and the everyday flavours of Mahabaleshwar.',
  },
  'Kavita Shinde': {
    name: 'Kavita Shinde',
    role: 'Travel planning writer',
    bio: 'Covers itinerary building, short stays, and practical visitor guidance.',
  },
  'Rohit Deshmukh': {
    name: 'Rohit Deshmukh',
    role: 'Travel writer',
    bio: 'Writes practical guides for villa guests planning hill-station trips.',
  },
  'Ravi Desai': {
    name: 'Ravi Desai',
    role: 'Travel editor',
    bio: 'Edits the longer guides and helps keep the Mahabaleshwar content useful and readable.',
  },
}

function stripBlogMarkers(content: string) {
  return content
    .replace(/TOC_START/g, ' ')
    .replace(/TOC_END/g, ' ')
    .replace(/^#{2,3}\s+/gm, ' ')
    .replace(/^CTA:\s+/gm, ' ')
}

export function estimateReadingTime(content: string) {
  const words = stripBlogMarkers(content).trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 180))
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export function buildBlogOutline(content: string) {
  const lines = content.split('\n')
  const tocEntries: BlogOutlineItem[] = []
  let inToc = false

  for (const line of lines) {
    const t = line.trim()
    if (t === 'TOC_START') {
      inToc = true
      continue
    }
    if (t === 'TOC_END') {
      inToc = false
      continue
    }
    if (inToc) continue
    if (t.startsWith('## ')) {
      const text = t.slice(3).trim()
      tocEntries.push({ level: 2, text, id: slugify(text) })
    }
    if (t.startsWith('### ')) {
      const text = t.slice(4).trim()
      tocEntries.push({ level: 3, text, id: slugify(text) })
    }
  }

  return tocEntries
}

export function getBlogAuthorProfile(author?: string): BlogAuthorProfile {
  if (!author) return DEFAULT_AUTHOR_PROFILE
  return AUTHOR_PROFILES[author] ?? { ...DEFAULT_AUTHOR_PROFILE, name: author }
}
