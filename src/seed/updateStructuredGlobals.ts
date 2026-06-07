import 'dotenv/config'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { createRichText } from '@/lib/richText'

type StructuredGlobalSlug = 'aboutPage' | 'servicesPage' | 'contactPage'

type SeedPayload = Awaited<ReturnType<typeof getPayload>> & {
  findGlobal: (args: { slug: StructuredGlobalSlug }) => Promise<Record<string, unknown>>
  updateGlobal: (args: { slug: StructuredGlobalSlug; data: Record<string, unknown> }) => Promise<unknown>
}

const pageContent: Record<
  StructuredGlobalSlug,
  {
    title: string
    lead: string
    content: ReturnType<typeof createRichText>
    extra?: Record<string, unknown>
  }
> = {
  aboutPage: {
    title: 'About Octopus Group',
    lead:
      'One Entry Point for engineering, equipment supply, fabrication support, and marine logistics coordination.',
    content: createRichText([
      'Octopus Group supports project cargo, heavy lift, offshore, and marine operations through one accountable coordination point.',
      'Our work combines engineering, certified lifting and lashing equipment, fabrication follow-up, survey attendance, port captain support, and marine consultancy.',
      'We build practical solutions around operational constraints, technical compliance, schedule pressure, and clear communication so clients can move from planning to execution with less risk and less fragmentation.',
    ]),
    extra: {
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
    },
  },
  servicesPage: {
    title: 'Services',
    lead:
      'Explore the Octopus Group service portfolio for engineering, equipment supply, fabrication, consultancy, survey, and port support.',
    content: createRichText([
      'Each service page can be managed independently in Payload while still contributing to one clear services overview.',
      'The full service structure reflects the same operating model used across the company: one coordination point, technically grounded execution, and clear commercial communication.',
      'Use this page to introduce the service portfolio at a high level, then direct visitors into the detailed service pages below.',
    ]),
    extra: {
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
    },
  },
  contactPage: {
    title: 'Contact',
    lead:
      'Tell us what operation, cargo, vessel, or equipment support you need and we will route the request through one responsible contact point.',
    content: createRichText([
      'Use this page for quote requests, technical clarifications, availability checks, and early-stage consultation.',
      'Octopus Group can coordinate engineering, lifting and lashing equipment, fabrication follow-up, survey attendance, and port captain support depending on project scope.',
      'Share the basic project details and we will help define the right next step, scope, and responsible service line.',
    ]),
    extra: {
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
    },
  },
}

async function run() {
  const payload = (await getPayload({ config })) as SeedPayload

  for (const slug of Object.keys(pageContent) as StructuredGlobalSlug[]) {
    const existing = await payload.findGlobal({ slug })
    const nextData = pageContent[slug]

    await payload.updateGlobal({
      slug,
      data: {
        ...existing,
        title: nextData.title,
        lead: nextData.lead,
        content: nextData.content,
        ...nextData.extra,
      },
    })
  }

  console.log('Structured globals updated successfully.')
}

void run().catch((error) => {
  console.error('Structured globals update failed.')
  console.error(error)
  process.exit(1)
})
