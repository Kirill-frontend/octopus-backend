import 'dotenv/config'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { createRichText } from '@/lib/richText'

const textItems = (...items: string[]) => items.map((text) => ({ text }))

type SeedPayload = Awaited<ReturnType<typeof getPayload>> & {
  create: (args: any) => Promise<{ id: string }>
  find: (args: any) => Promise<{ docs: Array<{ id: string }> }>
  update: (args: any) => Promise<{ id: string }>
  findGlobal: (args: any) => Promise<Record<string, unknown>>
  updateGlobal: (args: any) => Promise<unknown>
}

const upsertServicePage = async (
  payload: SeedPayload,
  data: Record<string, unknown> & { slug: string },
) => {
  const existing = await payload.find({
    collection: 'servicePages',
    depth: 0,
    select: {
      id: true,
    },
    where: {
      slug: {
        equals: data.slug,
      },
    },
    limit: 1,
  })

  if (existing.docs[0]) {
    return payload.update({
      collection: 'servicePages',
      id: existing.docs[0].id,
      data,
    })
  }

  return payload.create({
    collection: 'servicePages',
    data,
  })
}

const extractServiceId = (value: unknown) => {
  if (typeof value === 'number' || typeof value === 'string') {
    return value
  }

  if (value && typeof value === 'object' && 'id' in value) {
    return (value as { id?: number | string }).id
  }

  return undefined
}

async function seed() {
  const payload = (await getPayload({ config })) as SeedPayload

  const flyingSquad = await upsertServicePage(payload, {
    title: 'Flying Squad',
    slug: 'flying-squad',
    shortLabel: 'Flying Squad',
    excerpt:
      'Rapid-response onboard specialist teams for welding, hold cleaning, crane operation, and marine machinery repair.',
    cardLabel: 'Flying Squad',
    showInHomepagePicker: true,
    showInServicesPage: true,
    sortOrder: 70,
    seo: {
      metaTitle: 'Flying Squad',
      metaDescription:
        'Rapid-response flying squad teams for sea fastening, hold cleaning, crane operation, and onboard machinery repair worldwide.',
    },
    blocks: [
      {
        blockType: 'serviceHero',
        title: 'Flying Squad',
        subtitle:
          'Rapid-response specialist teams deployed worldwide to keep vessels operational, compliant, and ready for cargo operations.',
        formTitle: 'Request flying squad support',
        buttonLabel: 'Receive a call',
      },
      {
        blockType: 'richTextIntro',
        paragraphs: [
          {
            content: createRichText(
              'When time is critical and delays are not an option, Octopus Group provides rapid-response Flying Squad teams to support vessels anywhere in the world.',
            ),
          },
          {
            content: createRichText(
              'Our Flying Squad consists of highly experienced, proven specialists who can be deployed quickly to perform essential onboard work, ensuring your vessel remains operational, compliant, and ready for cargo operations.',
            ),
          },
          {
            content: createRichText(
              'We work only with trusted professionals with real shipboard experience and a strong track record in marine operations.',
            ),
          },
          {
            content: createRichText(
              'Deployment is available in China, Turkey, the Black Sea region, Europe, and worldwide.',
            ),
          },
        ],
      },
      {
        blockType: 'featureHighlightSplit',
        title: 'Sea Fastening & Welding Team',
        introText:
          'Improper or delayed sea fastening can result in serious safety risks, cargo damage, and costly delays.\n\nOur Flying Welding Teams provide professional onboard fabrication and installation of sea fastening arrangements for heavy lift and project cargo.',
        highlights: textItems(
          'Fabrication of sea fastening structures onboard',
          'Installation of stoppers, cradles, stools, and supports',
          'Modification of existing sea fastening',
          'Steel repairs related to cargo securing',
          'Voyage repairs and urgent reinforcement',
        ),
      },
      {
        blockType: 'titleChecklistSplit',
        title: 'Available in:',
        items: textItems('China', 'Turkey', 'Black Sea region', 'Europe', 'Worldwide'),
      },
      {
        blockType: 'reasonsGrid',
        title: 'Cargo Hold Cleaning Team (Bulk Carriers)',
        subtitle:
          'Cargo hold cleanliness is critical for bulk carriers, especially before loading sensitive cargoes such as:',
        topItems: textItems('Grain', 'Food-grade cargoes', 'Agricultural products'),
        bottomItems: [],
      },
      {
        blockType: 'overviewSplit',
        introText: createRichText([
          'Our Flying Hold Cleaning Teams provide professional cargo hold cleaning to meet charterers’ and surveyors’ requirements.',
          'Services include:',
          'Cleaning after dirty cargoes such as coal, petcoke, ore, fertilizers',
          'Preparation for grain and food cargo inspections',
          'Full washing, cleaning, and preparation of holds',
          'Removal of residues, loose rust, and contamination',
        ]),
        sectionTitle: 'Available in',
        deliverables: textItems('China', 'Turkey', 'Black Sea region', 'Europe', 'Worldwide'),
        outroText: createRichText(
          'We use professional cleaning equipment and tools to ensure efficient and compliant cleaning.',
        ),
      },
      {
        blockType: 'overlayInfoPanel',
        title: 'Flying Crane Operators',
        subtitle: 'Available worldwide.',
        introText:
          'Heavy lift and project cargo operations require experienced crane operators who understand the risks and precision involved.\n\nOur Flying Crane Operators provide safe and efficient crane handling onboard vessels.',
        services: textItems(
          'Ship crane operation during loading and discharge',
          'Heavy lift and oversized cargo handling',
          'Support during complex lifting operations',
          'Assistance during project cargo operations',
        ),
        outroText: 'All operators are experienced in marine heavy lift operations.',
      },
      {
        blockType: 'consultationGrid',
        title: 'Marine Engine and Auxiliary Machinery Repair Team',
        introTop:
          'Unexpected machinery failure can lead to costly off-hire time and operational disruption.',
        introBottom:
          'Our Flying Marine Engine Repair Teams provide fast, professional onboard repair and maintenance of main engines and auxiliary machinery. Services include:',
        rows: [
          {
            cards: [
              { text: 'Feasibility of loading & discharge operations', tone: 'ghost' },
              { text: 'Main Engine repair and overhaul', tone: 'dark' },
              { text: 'Auxiliary engines repair', tone: 'light' },
              { text: 'Pumps and compressors repair', tone: 'dark' },
            ],
          },
          {
            cards: [
              { text: 'Hydraulic systems repair', tone: 'dark' },
              { text: 'Troubleshooting and diagnostics', tone: 'light' },
              { text: 'Emergency repair attendance', tone: 'dark' },
              { text: 'Voyage repair', tone: 'light' },
            ],
          },
          {
            cards: [
              { text: 'Port repair', tone: 'light' },
              { text: 'Riding squads', tone: 'dark' },
              { text: 'Planned maintenance support', tone: 'light' },
              { text: ' ', tone: 'ghost' },
            ],
          },
        ],
        outro:
          'Our engineers are experienced marine professionals capable of working under operational conditions onboard.',
      },
      {
        blockType: 'serviceOffice',
        eyebrow: 'Our office',
        title: 'Marine Engine and Auxiliary Machinery Repair Team',
        text: 'Our engineers are experienced marine professionals capable of working under operational conditions onboard.',
        imageUrl: '/images/story.jpg',
        imageAlt: 'Marine engineering support',
        details: [
          {
            label: 'Available in',
            value: 'Europe\nWorldwide',
          },
        ],
        buttonLabel: 'Get a quote',
        buttonUrl: '/contact',
      },
      {
        blockType: 'reasonsGrid',
        title: 'Why Choose Octopus Group Flying Squad',
        topItems: textItems(
          'Fast mobilization worldwide',
          'Proven and trusted specialists',
          'Professional equipment and tools',
        ),
        bottomItems: textItems(
          'Reduced vessel downtime',
          'Reliable onboard execution',
          'One point of contact for all services',
        ),
      },
      {
        blockType: 'textareaList',
        title: 'Operational support you can rely on',
        items: [
          {
            text: 'As your single point of entry, Octopus Group ensures fast response, professional execution, and full operational support wherever your vessel is located.',
          },
        ],
      },
      {
        blockType: 'ctaBanner',
        title: 'Octopus Group - One Entry Point',
        description:
          'For engineering you can rely on technically and contractually, with one coordination point for rapid-response vessel support.',
        buttonLabel: 'Get a quote',
        buttonUrl: '/contact',
        darkMode: false,
      },
    ],
  })

  const homePage = await payload.findGlobal({
    slug: 'homePage',
    depth: 0,
  })

  const featuredServices = Array.isArray(homePage.featuredServices)
    ? homePage.featuredServices.filter(
        (item: unknown) =>
          (item as { position?: string } | null)?.position !== 'center-upper' &&
          extractServiceId((item as { service?: unknown } | null)?.service) !== flyingSquad.id,
      )
    : []

  featuredServices.push({
    service: Number(flyingSquad.id),
    position: 'center-upper',
    isVisible: true,
  })

  await payload.updateGlobal({
    slug: 'homePage',
    data: {
      ...homePage,
      featuredServices,
    },
  })

  console.log('Flying Squad service page upsert completed successfully.')
  process.exit(0)
}

void seed().catch((error) => {
  console.error('Flying Squad service page upsert failed.')
  console.error(error)
  process.exit(1)
})
