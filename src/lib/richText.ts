const createTextNode = (text: string) => ({
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  text,
  type: 'text',
  version: 1,
})

export const createRichText = (paragraphs: string | string[]) => {
  const items = Array.isArray(paragraphs) ? paragraphs : [paragraphs]

  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: items.map((paragraph) => ({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        children: [createTextNode(paragraph)],
        direction: 'ltr',
        textFormat: 0,
        textStyle: '',
      })),
      direction: 'ltr',
    },
  }
}
