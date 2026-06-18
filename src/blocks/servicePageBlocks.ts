import type { Block, Field } from 'payload'

const textItemsField = (name: string, label: string): Field => ({
  name,
  type: 'array',
  labels: {
    plural: label,
    singular: label.endsWith('s') ? label.slice(0, -1) : label,
  },
  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
    },
  ],
})

const textareaItemsField = (name: string, label: string): Field => ({
  name,
  type: 'array',
  labels: {
    plural: label,
    singular: label.endsWith('s') ? label.slice(0, -1) : label,
  },
  fields: [
    {
      name: 'text',
      type: 'textarea',
      required: true,
    },
  ],
})

const officeDetailsField = (name: string, label: string): Field => ({
  name,
  type: 'array',
  labels: {
    plural: label,
    singular: label.endsWith('s') ? label.slice(0, -1) : label,
  },
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'value', type: 'textarea', required: true },
    { name: 'link', type: 'text' },
  ],
})

export const servicePageBlocks: Block[] = [
  {
    slug: 'serviceHero',
    dbName: 'sh',
    interfaceName: 'ServiceHeroBlock',
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'subtitle', type: 'textarea' },
      { name: 'image', type: 'upload', relationTo: 'media' },
      { name: 'formTitle', type: 'text' },
      {
        name: 'formFields',
        dbName: 'ff',
        type: 'array',
        fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'label', type: 'text', required: true },
          {
            name: 'inputType',
            dbName: 'it',
            type: 'select',
            required: true,
            options: ['text', 'email', 'tel', 'textarea'],
          },
          { name: 'placeholder', type: 'text' },
          { name: 'required', type: 'checkbox', defaultValue: false },
        ],
      },
      { name: 'buttonLabel', type: 'text' },
    ],
  },
  {
    slug: 'overviewSplit',
    dbName: 'os',
    interfaceName: 'OverviewSplitBlock',
    fields: [
      { name: 'introText', type: 'richText', required: true },
      { name: 'introImage', type: 'upload', relationTo: 'media' },
      { name: 'sectionTitle', type: 'text', required: true },
      textItemsField('deliverables', 'Deliverables'),
      { name: 'outroText', type: 'richText' },
      { name: 'detailImage', type: 'upload', relationTo: 'media' },
    ],
  },
  {
    slug: 'confidenceSection',
    dbName: 'conf',
    interfaceName: 'ConfidenceSectionBlock',
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'body', type: 'textarea', required: true },
      { name: 'factsLabel', type: 'text', required: true },
      textItemsField('facts', 'Facts'),
    ],
  },
  {
    slug: 'equationStrip',
    dbName: 'eqs',
    interfaceName: 'EquationStripBlock',
    fields: [
      { name: 'leftText', type: 'text', required: true },
      { name: 'centerText', type: 'text', required: true },
      { name: 'rightText', type: 'text', required: true },
      { name: 'leftSymbol', type: 'text', defaultValue: '+' },
      { name: 'rightSymbol', type: 'text', defaultValue: '=' },
    ],
  },
  {
    slug: 'reasonsGrid',
    dbName: 'rgrid',
    interfaceName: 'ReasonsGridBlock',
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'subtitle', type: 'textarea' },
      textItemsField('topItems', 'Top Items'),
      textItemsField('bottomItems', 'Bottom Items'),
    ],
  },
  {
    slug: 'processSteps',
    dbName: 'psteps',
    interfaceName: 'ProcessStepsBlock',
    fields: [
      { name: 'title', type: 'text', required: true },
      {
        name: 'steps',
        dbName: 'psteps_items',
        type: 'array',
        fields: [
          { name: 'number', type: 'text', required: true },
          { name: 'title', type: 'text', required: true },
          { name: 'text', type: 'textarea', required: true },
        ],
      },
    ],
  },
  {
    slug: 'regionsGrid',
    dbName: 'rgns',
    interfaceName: 'RegionsGridBlock',
    fields: [{ name: 'intro', type: 'textarea', required: true }, textItemsField('regions', 'Regions')],
  },
  {
    slug: 'supplyCards',
    dbName: 'supc',
    interfaceName: 'SupplyCardsBlock',
    fields: [
      { name: 'title', type: 'text', required: true },
      {
        name: 'cards',
        dbName: 'sup_cards',
        type: 'array',
        fields: [{ name: 'title', type: 'text', required: true }, textItemsField('lines', 'Lines')],
      },
    ],
  },
  {
    slug: 'containerEquipment',
    dbName: 'ceq',
    interfaceName: 'ContainerEquipmentBlock',
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
      textItemsField('lines', 'Lines'),
      textItemsField('features', 'Features'),
    ],
  },
  {
    slug: 'workflowAlternating',
    dbName: 'walt',
    interfaceName: 'WorkflowAlternatingBlock',
    fields: [
      { name: 'title', type: 'text', required: true },
      {
        name: 'steps',
        dbName: 'wsteps_items',
        type: 'array',
        fields: [
          { name: 'number', type: 'text', required: true },
          { name: 'title', type: 'text', required: true },
          { name: 'reverse', type: 'checkbox', defaultValue: false },
          { name: 'image', type: 'upload', relationTo: 'media' },
        ],
      },
    ],
  },
  {
    slug: 'structuresCards',
    dbName: 'scards',
    interfaceName: 'StructuresCardsBlock',
    fields: [
      { name: 'introTop', type: 'textarea', required: true },
      { name: 'introBottom', type: 'textarea', required: true },
      {
        name: 'cards',
        dbName: 'struct_cards',
        type: 'array',
        fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'note', type: 'text', required: true },
        ],
      },
      { name: 'outro', type: 'textarea' },
    ],
  },
  {
    slug: 'productionComposite',
    dbName: 'prodc',
    interfaceName: 'ProductionCompositeBlock',
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'title',
            type: 'text',
            required: true,
            admin: {
              width: '50%',
            },
          },
          {
            name: 'backgroundImage',
            type: 'upload',
            relationTo: 'media',
            admin: {
              width: '50%',
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'cards',
            type: 'array',
            labels: {
              plural: 'Cards',
              singular: 'Card',
            },
            fields: [
              {
                name: 'text',
                type: 'text',
                required: true,
              },
            ],
            admin: {
              width: '50%',
            },
          },
          {
            name: 'complianceItems',
            type: 'array',
            labels: {
              plural: 'Compliance Items',
              singular: 'Compliance Item',
            },
            fields: [
              {
                name: 'text',
                type: 'text',
                required: true,
              },
            ],
            admin: {
              width: '50%',
            },
          },
        ],
      },
    ],
  },
  {
    slug: 'consultationGrid',
    dbName: 'cgrid',
    interfaceName: 'ConsultationGridBlock',
    fields: [
      { name: 'title', type: 'text' },
      { name: 'introTop', type: 'textarea', required: true },
      { name: 'introBottom', type: 'textarea', required: true },
      {
        name: 'rows',
        dbName: 'rows',
        type: 'array',
        fields: [
          {
            name: 'cards',
            dbName: 'cgrid_cards',
            type: 'array',
            fields: [
              { name: 'text', type: 'text', required: true },
              {
                name: 'tone',
                type: 'select',
                required: true,
                options: ['light', 'dark', 'ghost'],
              },
            ],
          },
        ],
      },
      { name: 'outro', type: 'textarea' },
    ],
  },
  {
    slug: 'serviceOffice',
    dbName: 'soff',
    interfaceName: 'ServiceOfficeBlock',
    fields: [
      { name: 'eyebrow', type: 'text' },
      { name: 'title', type: 'text', required: true },
      { name: 'text', type: 'textarea', required: true },
      { name: 'image', type: 'upload', relationTo: 'media' },
      { name: 'imageUrl', type: 'text' },
      { name: 'imageAlt', type: 'text' },
      officeDetailsField('details', 'Details'),
      { name: 'buttonLabel', type: 'text' },
      { name: 'buttonUrl', type: 'text' },
    ],
  },
  {
    slug: 'approachComposite',
    dbName: 'acomp',
    interfaceName: 'ApproachCompositeBlock',
    fields: [
      { name: 'topTitle', type: 'text', required: true },
      { name: 'topText', type: 'textarea', required: true },
      { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
      { name: 'reviewLabel', type: 'text', required: true },
      textItemsField('reviewItems', 'Review Items'),
      { name: 'includedTitle', type: 'text', required: true },
      { name: 'includedSubtitle', type: 'text', required: true },
      textItemsField('includedItems', 'Included Items'),
      { name: 'excludedTitle', type: 'text', required: true },
      { name: 'excludedSubtitle', type: 'text', required: true },
      textItemsField('excludedItems', 'Excluded Items'),
      { name: 'bottomLabel', type: 'text', required: true },
      textItemsField('bottomItems', 'Bottom Items'),
      { name: 'bottomTitle', type: 'text', required: true },
      { name: 'bottomText', type: 'textarea', required: true },
    ],
  },
  {
    slug: 'richTextIntro',
    dbName: 'rti',
    interfaceName: 'RichTextIntroBlock',
    fields: [
      {
        name: 'paragraphs',
        dbName: 'paras',
        type: 'array',
        fields: [{ name: 'content', type: 'richText', required: true }],
      },
    ],
  },
  {
    slug: 'overlayInfoPanel',
    dbName: 'ovip',
    interfaceName: 'OverlayInfoPanelBlock',
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'subtitle', type: 'text' },
      { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
      { name: 'introText', type: 'textarea' },
      textItemsField('services', 'Services'),
      { name: 'outroText', type: 'textarea' },
    ],
  },
  {
    slug: 'supportSplit',
    dbName: 'ssplit',
    interfaceName: 'SupportSplitBlock',
    fields: [
      { name: 'leftLabel', type: 'text', required: true },
      textItemsField('leftItems', 'Left Items'),
      { name: 'rightTitle', type: 'text', required: true },
      { name: 'rightText', type: 'textarea' },
    ],
  },
  {
    slug: 'portCaptainComposite',
    dbName: 'pcc',
    interfaceName: 'PortCaptainCompositeBlock',
    fields: [
      { name: 'approachTitle', type: 'text', required: true },
      { name: 'approachText', type: 'textarea', required: true },
      { name: 'approachImage', type: 'upload', relationTo: 'media' },
      { name: 'approachLabel', type: 'text', required: true },
      textItemsField('approachItems', 'Approach Items'),
      { name: 'supportLabel', type: 'text', required: true },
      textItemsField('supportItems', 'Support Items'),
      { name: 'supportTitle', type: 'text', required: true },
      { name: 'supportText', type: 'textarea' },
      { name: 'supportImage', type: 'upload', relationTo: 'media' },
    ],
  },
  {
    slug: 'centeredImageSection',
    dbName: 'cimg',
    interfaceName: 'CenteredImageSectionBlock',
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'image', type: 'upload', relationTo: 'media' },
    ],
  },
  {
    slug: 'ctaBanner',
    dbName: 'cta',
    interfaceName: 'CtaBannerBlock',
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea', required: true },
      { name: 'buttonLabel', type: 'text', required: true },
      { name: 'buttonUrl', type: 'text', required: true },
      { name: 'image', type: 'upload', relationTo: 'media' },
      { name: 'darkMode', type: 'checkbox', defaultValue: false },
    ],
  },
  {
    slug: 'textareaList',
    dbName: 'tlst',
    interfaceName: 'TextareaListBlock',
    fields: [{ name: 'title', type: 'text', required: true }, textareaItemsField('items', 'Items')],
  },
  {
    slug: 'featureHighlightSplit',
    dbName: 'fhs',
    interfaceName: 'FeatureHighlightSplitBlock',
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'introText', type: 'textarea', required: true },
      textItemsField('highlights', 'Highlights'),
    ],
  },
  {
    slug: 'approachSplit',
    dbName: 'aspl',
    interfaceName: 'ApproachSplitBlock',
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'text', type: 'textarea', required: true },
      { name: 'label', type: 'text', required: true },
      textItemsField('items', 'Items'),
    ],
  },
  {
    slug: 'introBadge',
    dbName: 'ibdg',
    interfaceName: 'IntroBadgeBlock',
    fields: [
      { name: 'introText', type: 'textarea', required: true },
      { name: 'badgeText', type: 'text', required: true },
    ],
  },
  {
    slug: 'titleChecklistSplit',
    dbName: 'tcs',
    interfaceName: 'TitleChecklistSplitBlock',
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
      textItemsField('items', 'Items'),
    ],
  },
]
