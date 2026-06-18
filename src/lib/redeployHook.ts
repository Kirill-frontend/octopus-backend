import type {
  CollectionAfterChangeHook,
  CollectionConfig,
  GlobalAfterChangeHook,
  GlobalConfig,
  PayloadRequest,
} from 'payload'

const deployHookUrl = process.env.DOKPLOY_DEPLOY_HOOK_URL

const triggerRedeploy = async (req: PayloadRequest, source: string) => {
  if (!deployHookUrl) {
    return
  }

  // Only admin-authenticated saves should trigger a redeploy.
  if (!req.user) {
    return
  }

  try {
    const response = await fetch(deployHookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      req.payload.logger.error(
        `Deploy hook failed for ${source}: ${response.status} ${response.statusText}`,
      )
      return
    }

    req.payload.logger.info(`Deploy hook triggered after ${source}`)
  } catch (error) {
    req.payload.logger.error({
      err: error,
      msg: `Deploy hook request failed for ${source}`,
    })
  }
}

const collectionRedeployHook: CollectionAfterChangeHook = async ({ collection, req }) => {
  await triggerRedeploy(req, `collection:${collection.slug}`)
}

const globalRedeployHook: GlobalAfterChangeHook = async ({ global, req }) => {
  await triggerRedeploy(req, `global:${global.slug}`)
}

export const withCollectionRedeployHook = (config: CollectionConfig): CollectionConfig => ({
  ...config,
  hooks: {
    ...config.hooks,
    afterChange: [...(config.hooks?.afterChange ?? []), collectionRedeployHook],
  },
})

export const withGlobalRedeployHook = (config: GlobalConfig): GlobalConfig => ({
  ...config,
  hooks: {
    ...config.hooks,
    afterChange: [...(config.hooks?.afterChange ?? []), globalRedeployHook],
  },
})
