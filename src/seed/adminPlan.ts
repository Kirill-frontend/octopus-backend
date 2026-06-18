import 'dotenv/config'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { createRichText } from '@/lib/richText'

const textItems = (...items: string[]) => items.map((text) => ({ text }))

type SeedPayload = Awaited<ReturnType<typeof getPayload>> & {
  create: (args: any) => Promise<{ id: string }>
  find: (args: any) => Promise<{ docs: Array<{ id: string }> }>
  update: (args: any) => Promise<{ id: string }>
  updateGlobal: (args: any) => Promise<unknown>
}

const updateGlobal = async (
  payload: SeedPayload,
  slug:
    | 'siteSettings'
    | 'header'
    | 'footer'
    | 'homePage'
    | 'aboutPage'
    | 'servicesPage'
    | 'contactPage'
    | 'faqPage',
  data: Record<string, unknown>,
) => {
  await payload.updateGlobal({ slug, data })
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

async function seed() {
  const payload = (await getPayload({ config })) as SeedPayload

  await updateGlobal(payload, 'siteSettings', {
    siteName: 'Octopus Group',
    siteUrl: 'https://octopus-group.example',
    defaultTitle: 'Octopus Group',
    titleTemplate: '%s | Octopus Group',
    defaultDescription:
      'Marine engineering, lifting and lashing equipment, consultancy, and project cargo support managed through one coordination point.',
    defaultRobots: 'index,follow',
    themeColor: '#0E3B5B',
    locale: 'en',
  })

  await updateGlobal(payload, 'header', {
    ctaLabel: 'Get a quote',
    ctaUrl: '/contact',
    navItems: [
      { label: 'Home', type: 'pageRef', pageRef: 'home', newTab: false },
      { label: 'About', type: 'pageRef', pageRef: 'about', newTab: false },
      { label: 'Services', type: 'pageRef', pageRef: 'services', newTab: false },
      { label: 'FAQ', type: 'pageRef', pageRef: 'faq', newTab: false },
      { label: 'Contact', type: 'pageRef', pageRef: 'contact', newTab: false },
    ],
  })

  await updateGlobal(payload, 'footer', {
    newsletterTitle: 'Stay in touch',
    newsletterText: 'Use this area for your newsletter or a lightweight lead capture message.',
    newsletterFormEnabled: true,
    mainLinks: [
      { label: 'Home', type: 'pageRef', pageRef: 'home' },
      { label: 'About', type: 'pageRef', pageRef: 'about' },
      { label: 'Services', type: 'pageRef', pageRef: 'services' },
      { label: 'Blog', type: 'custom', url: '/blog' },
      { label: 'Contact', type: 'pageRef', pageRef: 'contact' },
    ],
    utilityLinks: [
      { label: 'Style Guide', type: 'custom', url: '/style-guide' },
      { label: 'Start Here', type: 'custom', url: '/start-here' },
      { label: 'Licenses', type: 'custom', url: '/licenses' },
      { label: 'Changelog', type: 'custom', url: '/changelog' },
    ],
    copyrightText: 'Copyright Octopus Group. All rights reserved.',
  })

  await updateGlobal(payload, 'aboutPage', {
    title: 'About Octopus Group',
    lead:
      'One Entry Point for engineering, equipment supply, fabrication support, and marine logistics coordination.',
    content: createRichText([
      'Octopus Group supports project cargo, heavy lift, offshore, and marine operations through one accountable coordination point.',
      'Our work combines engineering, certified lifting and lashing equipment, fabrication follow-up, survey attendance, port captain support, and marine consultancy.',
      'We build practical solutions around operational constraints, technical compliance, schedule pressure, and clear communication so clients can move from planning to execution with less risk and less fragmentation.',
    ]),
    hero: {
      eyebrow: 'About us',
      title: 'About Cargo company.',
      description:
        'We combine logistics expertise, engineering support, and practical maritime knowledge to help complex cargo operations move with less friction and more confidence.',
      primaryAction: {
        label: 'Join us',
        type: 'pageRef',
        pageRef: 'contact',
        newTab: false,
      },
      secondaryAction: {
        label: 'Our values',
        type: 'custom',
        url: '#our-values',
        newTab: false,
      },
      imageUrl:
        'https://cdn.prod.website-files.com/638f532e7e769f0c4f3fbb53/6393418fb2d1c98e9359def6_about-cargo-company-cargo-x-webflow-template.png',
      imageAlt: 'Cargo company overview',
      stats: [
        {
          value: '100%',
          title: 'On time shipment',
          description: 'Reliable delivery planning and careful execution across every project.',
        },
        {
          value: '650+',
          title: 'Clients worldwide',
          description: 'Trusted by partners in multiple regions and logistics environments.',
        },
        {
          value: '30+',
          title: 'Years of experience',
          description: 'A long track record in shipping, engineering, and maritime operations.',
        },
      ],
    },
    aboutStory: {
      eyebrow: 'Our story',
      title: 'The story of how our company was founded',
      body: createRichText(
        'Netus in commodo egestas tristique augue sit odio lorem tortor facilisis in pharetra nisi leo semper in suscipit risus eu accumsan, sem proin tellus at et nisl amet morbi.',
      ),
      cta: {
        label: 'CTA',
        type: 'pageRef',
        pageRef: 'contact',
        newTab: false,
      },
      imageUrl: '/images/story2.jpg',
      imageAlt: 'Our story',
    },
    values: {
      eyebrow: 'Our values',
      title: 'The values that drive everything we do.',
      introText:
        'Our culture is built around practical excellence, accountability, and long-term relationships that make demanding work easier to deliver well.',
      items: [
        {
          title: 'Quality',
          description: 'We care about detail, durability, and dependable results.',
          iconUrl: '/images/cards-icon.svg',
          iconAlt: 'Quality',
        },
        {
          title: 'Commitment',
          description: 'We stay close to the work and follow through with discipline.',
          iconUrl: '/images/cards-icon.svg',
          iconAlt: 'Commitment',
        },
        {
          title: 'Teamwork',
          description: 'Strong outcomes come from clear communication and trust.',
          iconUrl: '/images/cards-icon.svg',
          iconAlt: 'Teamwork',
        },
        {
          title: 'Innovation',
          description: 'We keep improving how projects are planned and delivered.',
          iconUrl: '/images/cards-icon.svg',
          iconAlt: 'Innovation',
        },
        {
          title: 'Leadership',
          description: 'We take ownership and help clients move forward with clarity.',
          iconUrl: '/images/cards-icon.svg',
          iconAlt: 'Leadership',
        },
        {
          title: 'Openness',
          description: 'Transparency helps every side make better operational decisions.',
          iconUrl: '/images/cards-icon.svg',
          iconAlt: 'Openness',
        },
      ],
    },
    office: {
      eyebrow: 'Our office',
      title: 'Visit our location',
      text: 'We operate from a strategic hub that connects major sea routes and logistics centers worldwide.',
      imageUrl: '/images/visit.jpg',
      imageAlt: 'Our office',
      details: [
        {
          label: 'Email',
          value: 'corporateemail@gmail.com',
          link: 'mailto:corporateemail@gmail.com',
        },
        {
          label: 'Phone',
          value: '(415) 000 - 0000',
          link: 'tel:+14150000000',
        },
      ],
      visitLink: {
        label: 'Visit now',
        type: 'pageRef',
        pageRef: 'contact',
        newTab: false,
      },
    },
    team: {
      eyebrow: 'Our team',
      title: 'The amazing team members behind Cargo.',
      members: [
        {
          name: 'John Carter',
          role: 'CEO & Founder',
          imageUrl:
            'https://cdn.prod.website-files.com/638f532e7e769f449b3fbb56/638fa57d942b8151a99ca67b_john-carter-cargo-x-webflow-template.jpg',
          imageAlt: 'John Carter',
        },
        {
          name: 'Sophie Moore',
          role: 'Financial officer',
          imageUrl:
            'https://cdn.prod.website-files.com/638f532e7e769f449b3fbb56/638fa5253417b7ca20ec5106_sophie-moore-cargo-x-webflow-template.jpg',
          imageAlt: 'Sophie Moore',
        },
        {
          name: 'Andy Smith',
          role: 'Technology officer',
          imageUrl:
            'https://cdn.prod.website-files.com/638f532e7e769f449b3fbb56/638fa4301c7bea6e062645b1_andy-smith-cargo-x-webflow-template.jpg',
          imageAlt: 'Andy Smith',
        },
      ],
    },
    cta: {
      title: 'Ready to pull the trigger? Get a quote today.',
      description: 'Contact us for a personalized quote tailored to your needs.',
      button: {
        label: 'Get a quote',
        type: 'pageRef',
        pageRef: 'contact',
        newTab: false,
      },
      showArrow: true,
      variant: 'default',
      imageUrl: '/images/cta.jpg',
      imageAlt: 'Octopus Group team at work',
    },
    seo: {
      metaTitle: 'About Octopus Group',
    },
  })

  await updateGlobal(payload, 'servicesPage', {
    title: 'Services',
    lead:
      'Explore the Octopus Group service portfolio for engineering, equipment supply, fabrication, consultancy, survey, and port support.',
    content: createRichText([
      'Each service page can be managed independently in Payload while still contributing to one clear services overview.',
      'The full service structure reflects the same operating model used across the company: one coordination point, technically grounded execution, and clear commercial communication.',
      'Use this page to introduce the service portfolio at a high level, then direct visitors into the detailed service pages below.',
    ]),
    hero: {
      eyebrow: 'Services/',
      title: 'A comprehensive set of services',
      text: 'Since 1883, we have innovated and challenged the conservative shipping industry, providing our customers with superior solutions for moving cargo around the world.',
    },
    valuesGrid: {
      eyebrow: 'OUR VALUES/',
      title: 'The values that drive everything we do.',
      text: 'Our success at sea and on land is built on principles that guide every shipment, partnership, and decision.',
      items: [
        {
          title: 'Quality',
          text: 'We uphold the highest standards in every operation - from cargo handling to documentation - ensuring reliability and safety throughout.',
        },
        {
          title: 'Commitment',
          text: 'Every delivery is a promise. We stay dedicated to meeting deadlines and maintaining transparent communication at every stage.',
        },
        {
          title: 'Teamwork',
          text: 'Strong collaboration between our experts, partners, and clients allows us to solve challenges swiftly and effectively.',
        },
        {
          title: 'Innovation',
          text: 'We embrace modern technology and smarter logistics solutions to make global shipping faster, safer, and more efficient.',
        },
        {
          title: 'Leadership',
          text: 'With years of experience and deep industry knowledge, we guide our clients confidently through the complexities of international trade.',
        },
        {
          title: 'Openness',
          text: 'We believe in honest partnerships, open dialogue, and full visibility - building trust that lasts beyond a single voyage.',
        },
      ],
    },
    cta: {
      title: 'Octopus Group - One Entry Point',
      description: 'for engineering you can rely on - technically and contractually',
      button: {
        label: 'Get a quote',
        type: 'pageRef',
        pageRef: 'contact',
        newTab: false,
      },
      showArrow: false,
      variant: 'service',
      imageUrl: '/images/cta.jpg',
      imageAlt: 'Octopus Group team at work',
    },
    seo: {
      metaTitle: 'Services',
    },
  })

  await updateGlobal(payload, 'contactPage', {
    title: 'Contact',
    lead:
      'Tell us what operation, cargo, vessel, or equipment support you need and we will route the request through one responsible contact point.',
    content: createRichText([
      'Use this page for quote requests, technical clarifications, availability checks, and early-stage consultation.',
      'Octopus Group can coordinate engineering, lifting and lashing equipment, fabrication follow-up, survey attendance, and port captain support depending on project scope.',
      'Share the basic project details and we will help define the right next step, scope, and responsible service line.',
    ]),
    hero: {
      eyebrow: 'Contact us',
      title: 'Contact us',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit mauris donec dictum sit consequat auctor enim.',
      contactMethods: [
        {
          href: 'mailto:info@cargo.com',
          label: 'Send me an email',
          value: 'info@cargo.com',
          icon: 'email',
        },
        {
          href: 'tel:+14149464530',
          label: 'Give me a call',
          value: '(414) 946 - 4530',
          icon: 'phone',
        },
      ],
      form: {
        namePlaceholder: 'Full name',
        emailPlaceholder: 'Email address',
        phonePlaceholder: 'Phone number',
        subjectPlaceholder: 'Subject',
        messagePlaceholder: 'Please type your message here...',
        submitLabel: 'Send message',
      },
    },
    office: {
      eyebrow: 'Our office',
      title: 'Visit our location',
      text: 'We operate from a strategic hub that connects major sea routes and logistics centers worldwide.',
      imageUrl: '/images/visit.jpg',
      imageAlt: 'Our office',
      details: [
        {
          label: 'Email',
          value: 'corporateemail@gmail.com',
          link: 'mailto:corporateemail@gmail.com',
        },
        {
          label: 'Phone',
          value: '(415) 000 - 0000',
          link: 'tel:+14150000000',
        },
      ],
      visitLink: {
        label: 'Visit now',
        type: 'pageRef',
        pageRef: 'contact',
        newTab: false,
      },
    },
    partners: {
      eyebrow: 'Our partners',
      title: 'Brands & companies we worked with.',
      text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit tincidunt ut pellentesque dis massa elementum velit lacus et aenean.',
      logos: [
        {
          imageUrl:
            'https://cdn.prod.website-files.com/638f532e7e769f0c4f3fbb53/6553c913c893896a3a7d308a_agency-logo-cargo-x-webflow-template.svg',
          imageAlt: 'Agency',
        },
        {
          imageUrl:
            'https://cdn.prod.website-files.com/638f532e7e769f0c4f3fbb53/6553c9148833410d1758f432_application-logo-cargo-x-webflow-template.svg',
          imageAlt: 'Application',
        },
        {
          imageUrl:
            'https://cdn.prod.website-files.com/638f532e7e769f0c4f3fbb53/6553c9144a0df8b19a406ae1_business-logo-cargo-x-webflow-template.svg',
          imageAlt: 'Business',
        },
        {
          imageUrl:
            'https://cdn.prod.website-files.com/638f532e7e769f0c4f3fbb53/6553c913150e64e2950a466b_company-logo-cargo-x-webflow-template.svg',
          imageAlt: 'Company',
        },
        {
          imageUrl:
            'https://cdn.prod.website-files.com/638f532e7e769f0c4f3fbb53/6553c9135b8879d94e9d05a1_enterprise-logo-cargo-x-webflow-template.svg',
          imageAlt: 'Enterprise',
        },
        {
          imageUrl:
            'https://cdn.prod.website-files.com/638f532e7e769f0c4f3fbb53/6553c9139e8e1f9e7c4f8978_intitute-logo-cargo-x-webflow-template.svg',
          imageAlt: 'Institute',
        },
        {
          imageUrl:
            'https://cdn.prod.website-files.com/638f532e7e769f0c4f3fbb53/6553c914e233e11840add95b_organization-logo-cargo-x-webflow-template.svg',
          imageAlt: 'Organization',
        },
        {
          imageUrl:
            'https://cdn.prod.website-files.com/638f532e7e769f0c4f3fbb53/6553c9138d91055267249add_startup-logo-cargo-x-webflow-template.svg',
          imageAlt: 'Startup',
        },
        {
          imageUrl:
            'https://cdn.prod.website-files.com/638f532e7e769f0c4f3fbb53/6553c9144b2d70d8afc76026_studio-logo-cargo-x-webflow-template.svg',
          imageAlt: 'Studio',
        },
        {
          imageUrl:
            'https://cdn.prod.website-files.com/638f532e7e769f0c4f3fbb53/6553c9148d4d499632b03b26_venture-logo-cargo-x-webflow-template.svg',
          imageAlt: 'Venture',
        },
      ],
    },
    cta: {
      title: 'Ready to pull the trigger? Get a quote today.',
      description: 'Contact us for a personalized quote tailored to your needs.',
      button: {
        label: 'Get a quote',
        type: 'pageRef',
        pageRef: 'contact',
        newTab: false,
      },
      showArrow: true,
      variant: 'default',
      imageUrl: '/images/cta.jpg',
      imageAlt: 'Octopus Group team at work',
    },
    seo: {
      metaTitle: 'Contact',
    },
  })

  await updateGlobal(payload, 'faqPage', {
    title: 'FAQ',
    lead: 'Common questions can be managed as structured FAQ items here.',
    content: createRichText(
      'Use this singleton global for a lightweight FAQ page while keeping service pages block-based.',
    ),
    items: [
      {
        question: 'What services can be managed from Payload?',
        answer: 'Singleton pages are globals and repeatable service detail pages live in the servicePages collection.',
      },
    ],
    seo: {
      metaTitle: 'FAQ',
    },
  })

  const engineeringSolutions = await upsertServicePage(payload, {
    title: 'Engineering Solutions',
    slug: 'engineering-solutions',
    shortLabel: 'Engineering',
    excerpt:
      'Precision, accountability, and safety coordinated through one entry point.',
    cardLabel: 'Engineering Solutions',
    showInHomepagePicker: true,
    showInServicesPage: true,
    sortOrder: 10,
    seo: {
      metaTitle: 'Engineering Solutions',
      metaDescription:
        'Engineering solutions for stowage, lifting, rigging, and cargo securing with operationally grounded documentation.',
    },
    blocks: [
      {
        blockType: 'serviceHero',
        title: 'Engineering Solutions',
        subtitle: 'Precision, accountability and safety coordinated through One Entry Point.',
        buttonLabel: 'Receive a call',
      },
      {
        blockType: 'overviewSplit',
        introText: createRichText([
          'Octopus Group develops practical engineering packages for real cargo operations.',
          'Every deliverable is aligned with vessel capability, port constraints, weather windows, and timeline pressure.',
        ]),
        sectionTitle: 'What we deliver',
        deliverables: textItems(
          'Method Statements according to IMO, DNV/GL, and EN standards',
          'Lifting and Rigging Plans for cranes and lifting tools',
          'Stowage and Securing Design aligned with vessel capabilities',
          'Load Spreading Layouts and deck strength verification',
          'Structural support elements for sea fastening',
          'Technical project support from tender through execution',
        ),
        outroText: createRichText(
          'All documents reflect real operational constraints: port capability, vessel geometry, weather windows, timeline, and equipment availability.',
        ),
      },
      {
        blockType: 'confidenceSection',
        title: 'Professional Accountability',
        body: 'All engineering prepared by Octopus Group is protected with Professional Liability Insurance up to 1,000,000 USD.',
        factsLabel: 'This means:',
        facts: textItems(
          'If an engineering error leads to loss, the client is protected.',
          'Our responsibility is backed by real financial security.',
          'Decisions are supported by insurance, not assumptions.',
        ),
      },
      {
        blockType: 'equationStrip',
        leftText: 'Expertise',
        centerText: 'Insurance',
        rightText: 'True engineering confidence',
        leftSymbol: '+',
        rightSymbol: '=',
      },
      {
        blockType: 'reasonsGrid',
        title: 'Why Octopus Group',
        topItems: textItems(
          'One Entry Point - unified coordination with clear responsibility',
          'Trusted global engineering partners',
          'Work designed for real operations, not theoretical success',
        ),
        bottomItems: textItems(
          'Strong technical communication throughout project lifecycle',
          'Risk and downtime reduction through proper planning',
        ),
      },
      {
        blockType: 'processSteps',
        title: 'How we work',
        steps: [
          {
            number: '1',
            title: 'Free Consultation',
            text: 'High-level evaluation of feasibility and operational risks.',
          },
          {
            number: '2',
            title: 'Engineering Scope Definition',
            text: 'Clear deliverables, pricing, and alignment with the project plan.',
          },
          {
            number: '3',
            title: 'Execution and Delivery',
            text: 'Certified documentation ready for approval and operations.',
          },
        ],
      },
      {
        blockType: 'ctaBanner',
        title: 'Octopus Group - One Entry Point',
        description: 'For engineering you can rely on technically and contractually.',
        buttonLabel: 'Get a quote',
        buttonUrl: '/contact',
      },
    ],
  })

  const liftingEquipment = await upsertServicePage(payload, {
    title: 'Lifting and Lashing Equipment',
    slug: 'lifting-and-lashing-equipment',
    shortLabel: 'Equipment',
    excerpt: 'Certified lifting and lashing equipment with fast regional deployment.',
    cardLabel: 'Lifting and Lashing Equipment',
    showInHomepagePicker: true,
    showInServicesPage: true,
    sortOrder: 20,
    seo: {
      metaTitle: 'Lifting and Lashing Equipment',
      metaDescription:
        'Certified lifting and lashing equipment, container securing systems, and fast regional supply coordinated through one entry point.',
    },
    blocks: [
      {
        blockType: 'serviceHero',
        title: 'Lifting and Lashing Equipment',
        subtitle:
          'Certified equipment supply for marine, project, and container cargo operations - delivered through one accountable coordination point.',
        formTitle: 'Request equipment support',
        buttonLabel: 'Get a quote',
      },
      {
        blockType: 'regionsGrid',
        intro:
          'Octopus Group supplies certified lifting and lashing equipment from our EU warehouse in Bulgaria, providing fast and cost-efficient delivery across:',
        regions: textItems(
          'Black Sea',
          'Marmara',
          'Mediterranean',
          'Central and Eastern Europe',
          'Southern Europe',
        ),
      },
      {
        blockType: 'supplyCards',
        title: 'What we supply',
        cards: [
          {
            title: 'EU Stock - ready for urgent deployment',
            lines: textItems(
              'Lashing chains and binders',
              'Turnbuckles / tensioners',
              'D-rings, stoppers, lash plates',
              'Webbing straps and securing accessories',
            ),
          },
          {
            title: 'Custom Manufacturing - Asia and UAE',
            lines: textItems(
              'Shackles, lifting points, chain systems',
              'Wire rope slings and grommets',
              'Spreader beams and special tools',
            ),
          },
        ],
      },
      {
        blockType: 'containerEquipment',
        title: 'Container Vessel Equipment',
        lines: textItems(
          'We also supply a full range of container securing systems, including:',
          'Twistlocks (manual, semi-auto, fully automatic)',
          'Lashing rods and turnbuckles',
          'Foundation sockets and pedestal fittings',
          'Locking devices for deck stacks',
          'Accessories for safe container stowage and securing',
        ),
        features: textItems(
          'Compliant with ISO, EN, and DNV/GL',
          'Full traceability and certificates',
          'Suitable for both feeder and deep-sea container vessels',
        ),
      },
      {
        blockType: 'featureHighlightSplit',
        title: 'Newbuilding Packages in China',
        introText:
          'For shipowners and shipyards in China, Octopus Group delivers:\nComplete sets of lashing and lifting equipment\nContainer securing systems (when required by vessel type)\nDocumentation and certificates for class approval\nDelivery directly to shipyard before sea trials',
        highlights: textItems(
          'This eliminates sourcing problems after delivery',
          'Reduces cost and speeds up vessel readiness for commercial operations',
        ),
      },
      {
        blockType: 'reasonsGrid',
        title: 'Why Octopus Group',
        topItems: textItems(
          'Strong price advantage thanks to direct sourcing from manufacturers',
          'Multiple delivery hubs - EU / Asia / UAE',
          'Integration with Engineering and Port Captain services',
        ),
        bottomItems: textItems(
          'One contact - full supply chain responsibility',
          'Delivery to vessel / terminal / warehouse / shipyard',
        ),
      },
      {
        blockType: 'workflowAlternating',
        title: 'How we work',
        steps: [
          { number: '1', title: 'Requirements review', reverse: false },
          { number: '2', title: 'Best hub selection (EU / UAE / Asia)', reverse: true },
          { number: '3', title: 'Certificates and compliance check', reverse: false },
          { number: '4', title: 'Fast dispatch', reverse: true },
          { number: '5', title: 'Optional: support on-site during operations', reverse: false },
        ],
      },
      {
        blockType: 'ctaBanner',
        title: 'Octopus Group - One Entry Point',
        description:
          'For lifting and lashing equipment you can rely on - technically and logistically.',
        buttonLabel: 'Get a quote',
        buttonUrl: '/contact',
        darkMode: false,
      },
    ],
  })

  const steelStructures = await upsertServicePage(payload, {
    title: 'Manufacture of Steel Structures',
    slug: 'manufacture-of-steel-structures',
    shortLabel: 'Steel Structures',
    excerpt: 'Fabrication support for marine, project cargo, yacht, and offshore operations.',
    cardLabel: 'Manufacture of Steel Structures',
    showInHomepagePicker: true,
    showInServicesPage: true,
    sortOrder: 30,
    seo: {
      metaTitle: 'Manufacture of Steel Structures',
      metaDescription:
        'Certified fabrication of sea fastening structures, transport cradles, and custom steel supports for marine and project cargo operations.',
    },
    blocks: [
      {
        blockType: 'serviceHero',
        title: 'Manufacture of Steel Structures',
        subtitle:
          'Certified fabrication support for project cargo, yacht transport, offshore operations, and marine engineering execution.',
        formTitle: 'Request fabrication support',
        buttonLabel: 'Get a quote',
      },
      {
        blockType: 'structuresCards',
        introTop:
          'Octopus Group cooperates with trusted fabrication partners in Turkey and China to provide high-quality metal structures for project, yacht, and offshore cargo handling.',
        introBottom:
          'We manufacture based on Octopus Group engineering or client-provided drawings, supplying both:',
        cards: [
          { title: 'Prefabricated units', note: 'Ready for immediate installation' },
          {
            title: 'Modular / knock-down constructions',
            note: 'For assembly onboard or at terminal',
          },
        ],
        outro: 'All structures are produced and certified according to the required technical standards.',
      },
      {
        blockType: 'productionComposite',
        title: 'What we produce',
        cards: textItems(
          'Large sea fastening stoppers',
          'Yacht transport cradles (modular and fixed)',
          'Stanchions and bedding constructions',
          'Spreader beams, lifting frames, and A-frames',
          'Stools and support foundations',
          'Custom steel structures for project cargo securing',
        ),
        complianceItems: textItems(
          'Compliant with ISO, EN, and DNV/GL',
          'Full traceability and certificates',
          'Produced according to project-specific operational requirements',
        ),
      },
      {
        blockType: 'reasonsGrid',
        title: 'Why Octopus Group',
        topItems: textItems(
          'Strong price advantage thanks to direct sourcing from manufacturers',
          'Multiple delivery hubs - EU / Asia / UAE',
          'Integration with Engineering and Port Captain services',
        ),
        bottomItems: textItems(
          'One contact - full supply chain responsibility',
          'Delivery to vessel / terminal / warehouse / shipyard',
        ),
      },
      {
        blockType: 'workflowAlternating',
        title: 'How we work',
        steps: [
          { number: '1', title: 'Design review / engineering support', reverse: false },
          { number: '2', title: 'Fabrication plan and quotation', reverse: true },
          { number: '3', title: 'Quality control during production', reverse: false },
          { number: '4', title: 'Logistics coordination', reverse: true },
          { number: '5', title: 'Optional: on-site installation supervision', reverse: false },
        ],
      },
      {
        blockType: 'ctaBanner',
        title: 'Octopus Group - One Entry Point',
        description:
          'From engineering to fabrication follow-up, we keep steel structure delivery coordinated through one accountable hub.',
        buttonLabel: 'Get a quote',
        buttonUrl: '/contact',
        darkMode: false,
      },
    ],
  })

  const marineConsultancy = await upsertServicePage(payload, {
    title: 'Marine Consultancy',
    slug: 'marine-consultancy',
    shortLabel: 'Consultancy',
    excerpt: 'Operational feasibility, compliance, and planning guidance before execution.',
    cardLabel: 'Marine Consultancy',
    showInHomepagePicker: true,
    showInServicesPage: true,
    sortOrder: 40,
    seo: {
      metaTitle: 'Marine Consultancy',
      metaDescription:
        'Marine logistics consultation focused on feasibility, operational risk, compliance, and practical planning before execution.',
    },
    blocks: [
      {
        blockType: 'serviceHero',
        title: 'Marine Consultancy',
        subtitle:
          'Early-stage operational guidance that helps clients understand feasibility, constraints, and risk before committing to execution.',
        formTitle: 'Book consultation',
        buttonLabel: 'Book consultation',
      },
      {
        blockType: 'consultationGrid',
        introTop:
          'Octopus Group provides Marine Consultancy services focused on safe and efficient planning of heavy lift, project, and offshore cargo operations.',
        introBottom: 'Our Free Marine Logistics Consultation covers:',
        rows: [
          {
            cards: [
              { text: 'Feasibility of loading and discharge operations', tone: 'ghost' },
              { text: 'Commercial and operational scenario framing', tone: 'dark' },
              { text: 'Cargo handling limitations and safety requirements', tone: 'light' },
              { text: 'Stowage, lifting, and lashing concept review (high-level)', tone: 'dark' },
            ],
          },
          {
            cards: [
              { text: 'Risk awareness and operational recommendations', tone: 'dark' },
              { text: 'Survey and supervision needs', tone: 'light' },
              { text: 'Port restrictions and compliance overview', tone: 'dark' },
              { text: 'Stakeholder alignment before execution', tone: 'ghost' },
            ],
          },
        ],
        outro: 'This gives you clarity to make the right decisions without any initial cost.',
      },
      {
        blockType: 'approachComposite',
        topTitle: 'Our Approach',
        topText: 'Our focus is to identify risks early and ensure operational efficiency.',
        reviewLabel: 'We review:',
        reviewItems: textItems(
          'Cargo information and drawings',
          'Vessel and lifting equipment compatibility',
          'Terminal capabilities and local restrictions',
          'Environmental and navigational factors',
          'Applicable standards: IMO, ISO, DNV, OCIMF',
        ),
        includedTitle: 'What is Included',
        includedSubtitle: 'Free',
        includedItems: textItems(
          'High-level operational recommendations',
          'Feasibility overview and risk awareness',
          'Clear next steps for safe execution',
          'Transparent cost expectations for further services',
        ),
        excludedTitle: 'What is Not Included',
        excludedSubtitle: 'Paid Services',
        excludedItems: textItems(
          'Engineering design and calculations',
          'Detailed stowage plans',
          'Lifting and rigging plans',
          'Lashing calculations',
          'Full site supervision and reporting',
        ),
        bottomLabel: 'Once aligned on the operational concept, Octopus Group can deliver:',
        bottomItems: textItems(
          'Port Captain attendance',
          'Survey services',
          'Engineering and technical planning',
          'Lifting and lashing equipment supply',
          'Agency services and local coordination',
        ),
        bottomTitle: "One Entry Point - Full Support When You're Ready",
        bottomText: 'You decide how far to proceed - we remain the single coordination hub.',
      },
      {
        blockType: 'reasonsGrid',
        title: 'Why Octopus Group',
        topItems: textItems(
          'Free entry consultation',
          'Clear scope separation - no hidden costs',
          'Global trusted partners and experts',
        ),
        bottomItems: textItems(
          'Fast response, strong communication',
          'One contact. One responsibility.',
        ),
      },
      {
        blockType: 'ctaBanner',
        title: 'Octopus Group - One Entry Point',
        description:
          'Clarity first, execution second - we help you understand the operation before you commit resources.',
        buttonLabel: 'Book consultation',
        buttonUrl: '/contact',
        darkMode: false,
      },
    ],
  })

  const portCaptain = await upsertServicePage(payload, {
    title: 'Port Captain Service',
    slug: 'port-captain-service',
    shortLabel: 'Port Captain',
    excerpt: 'Supervision, coordination, and cargo control throughout port operations.',
    cardLabel: 'Port Captain Service',
    showInHomepagePicker: true,
    showInServicesPage: true,
    sortOrder: 50,
    seo: {
      metaTitle: 'Port Captain Service',
      metaDescription:
        'Worldwide port captain support for supervision, cargo coordination, loading control, and operational accountability.',
    },
    blocks: [
      {
        blockType: 'serviceHero',
        title: 'Port Captain Service',
        subtitle:
          'On-site operational supervision and cargo coordination for heavy lift, project, offshore, and wind cargo movements.',
        formTitle: 'Request support',
        buttonLabel: 'Request support',
      },
      {
        blockType: 'richTextIntro',
        paragraphs: [
          {
            content: createRichText(
              'Octopus Group provides comprehensive Port Captain services, ensuring full supervision and coordination of loading, securing, and discharge operations for heavy lift, project, offshore, and wind cargoes.',
            ),
          },
          {
            content: createRichText(
              'We develop custom stowage solutions using advanced engineering software such as AutoCAD and Load Planner CAD. Our network includes both in-house Port Captains and trusted partners located worldwide. Octopus Group is the One Entry Point for customers who demand safety, predictability, and full cargo control throughout the voyage.',
            ),
          },
        ],
      },
      {
        blockType: 'portCaptainComposite',
        approachTitle: 'Our Approach',
        approachText: 'Our focus is to identify risks early and ensure operational efficiency',
        approachLabel: 'We review:',
        approachItems: textItems(
          'Cargo information and drawings',
          'Vessel and lifting equipment compatibility',
          'Terminal capabilities and local restrictions',
          'Environmental and navigational factors',
          'Applicable standards: IMO, ISO, DNV, OCIMF',
        ),
        supportLabel: 'Once aligned on the operational concept, Octopus Group can deliver:',
        supportItems: textItems(
          'Port Captain attendance',
          'Survey services',
          'Engineering and technical planning',
          'Lifting and lashing equipment supply',
          'Agency services and local coordination',
        ),
        supportTitle: "One Entry Point - Full Support When You're Ready",
        supportText: 'You decide how far to proceed - we remain the single coordination hub.',
      },
      {
        blockType: 'centeredImageSection',
        title: 'Planning',
      },
      {
        blockType: 'reasonsGrid',
        title: 'Reporting',
        subtitle: 'Upon completion:',
        topItems: textItems(
          'Full operational report',
          'Photo documentation',
          'Technical comments and recommendations',
        ),
        bottomItems: [],
      },
      {
        blockType: 'ctaBanner',
        title: 'Octopus Group - One Entry Point',
        description:
          'When operational control matters on the quay, onboard, or during discharge, we stay accountable from start to finish.',
        buttonLabel: 'Request support',
        buttonUrl: '/contact',
        darkMode: false,
      },
    ],
  })

  const surveyServices = await upsertServicePage(payload, {
    title: 'Survey Services',
    slug: 'survey-services',
    shortLabel: 'Survey',
    excerpt: 'Survey and supervision support for cargo safety, documentation, and execution.',
    cardLabel: 'Survey Services',
    showInHomepagePicker: true,
    showInServicesPage: true,
    sortOrder: 60,
    seo: {
      metaTitle: 'Survey Services',
      metaDescription:
        'Independent survey attendance, cargo condition checks, supervision, and reporting for marine and project cargo operations.',
    },
    blocks: [
      {
        blockType: 'serviceHero',
        title: 'Survey Services',
        subtitle:
          'Independent survey support for cargo condition, loading supervision, lashing checks, and operational reporting.',
        formTitle: 'Request survey',
        buttonLabel: 'Request survey',
      },
      {
        blockType: 'introBadge',
        introText:
          'Octopus Group provides cargo, vessel, and equipment surveys to ensure compliance, safety, and operational efficiency during transport.',
        badgeText: 'We follow global standards: IMO, ISO, OCIMF.',
      },
      {
        blockType: 'titleChecklistSplit',
        title: 'What we inspect:',
        items: textItems(
          'Cargo condition and packaging',
          'Stowage and lashing compliance',
          'Vessel holds and deck equipment',
          'Handling safety during loading/discharge',
        ),
      },
      {
        blockType: 'supportSplit',
        leftLabel: 'Once aligned on the operational concept, Octopus Group can deliver:',
        leftItems: textItems(
          'Pre-survey review and planning',
          'Independent on-site inspection',
          'High-quality photo/video evidence',
          'Detailed reporting with technical remarks',
        ),
        rightTitle: 'Our Approach',
        rightText: '',
      },
      {
        blockType: 'reasonsGrid',
        title: 'Why Octopus Group',
        topItems: textItems(
          'One Entry Point - we coordinate all survey activities',
          'Independent and unbiased reporting',
          'Rapid response worldwide',
        ),
        bottomItems: textItems('Trusted surveyor network across major ports'),
      },
      {
        blockType: 'processSteps',
        title: 'How we work',
        steps: [
          {
            number: '1',
            title: 'Pre-survey preparation',
            text: 'We align the scope, documentation, attendance plan, and operational expectations before mobilization.',
          },
          {
            number: '2',
            title: 'On-site attendance',
            text: 'Independent survey attendance captures real handling conditions, observations, and evidence on site.',
          },
          {
            number: '3',
            title: 'Final report completion',
            text: 'Evidence, findings, and technical remarks are compiled into a clear final survey report.',
          },
        ],
      },
      {
        blockType: 'ctaBanner',
        title: 'Octopus Group - One Entry Point',
        description:
          'For independent survey support, supervision, and operational reporting you can rely on during critical cargo movements.',
        buttonLabel: 'Request survey',
        buttonUrl: '/contact',
        darkMode: false,
      },
    ],
  })

  await updateGlobal(payload, 'homePage', {
    hero: {
      title: 'Octopus Group',
      subtitle: 'One Entry Point for engineering, equipment, and marine logistics support.',
    },
    featuredServices: [
      { service: engineeringSolutions.id, position: 'top', isVisible: true },
      { service: liftingEquipment.id, position: 'left-upper', isVisible: true },
      { service: steelStructures.id, position: 'right-upper', isVisible: true },
      { service: marineConsultancy.id, position: 'left-lower', isVisible: true },
      { service: portCaptain.id, position: 'center-lower', isVisible: true },
      { service: surveyServices.id, position: 'right-lower', isVisible: true },
    ],
    seo: {
      metaTitle: 'Octopus Group',
    },
  })

  console.log('Payload admin plan seed completed successfully.')
}

void seed().catch((error) => {
  console.error('Payload admin plan seed failed.')
  console.error(error)
  process.exit(1)
})
