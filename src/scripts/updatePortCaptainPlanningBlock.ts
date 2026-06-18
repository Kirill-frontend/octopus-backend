import 'dotenv/config'
import { getPayload } from 'payload'

import config from '@/payload.config'

type ServicePageDoc = {
  id: number | string
  blocks?: Array<any>
}

type SeedPayload = Awaited<ReturnType<typeof getPayload>> & {
  find: (args: any) => Promise<{ docs: ServicePageDoc[] }>
  update: (args: any) => Promise<unknown>
}

const planningBlock = {
  blockType: 'centeredImageSection',
  title: 'Planning',
}

async function run() {
  const payload = (await getPayload({ config })) as SeedPayload

  const result = await payload.find({
    collection: 'servicePages',
    depth: 0,
    limit: 1,
    where: {
      slug: {
        equals: 'port-captain-service',
      },
    },
  })

  const page = result.docs[0]

  if (!page) {
    throw new Error('Service page "port-captain-service" was not found.')
  }

  const blocks: any[] = Array.isArray(page.blocks) ? [...page.blocks] : []
  const existingPlanningIndex = blocks.findIndex((block) => block?.blockType === 'centeredImageSection')

  if (existingPlanningIndex !== -1) {
    const existingPlanningBlock: any = blocks[existingPlanningIndex] ?? {}
    blocks[existingPlanningIndex] = {
      ...existingPlanningBlock,
      ...planningBlock,
      image: existingPlanningBlock.image ?? null,
    }
  } else {
    const portCaptainIndex = blocks.findIndex((block) => block?.blockType === 'portCaptainComposite')

    if (portCaptainIndex === -1) {
      throw new Error('Block "portCaptainComposite" was not found on port-captain-service.')
    }

    blocks.splice(portCaptainIndex + 1, 0, planningBlock)
  }

  await payload.update({
    collection: 'servicePages',
    id: page.id,
    data: {
      blocks,
    },
  })

  console.log('Updated port-captain-service with centeredImageSection block.')
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
