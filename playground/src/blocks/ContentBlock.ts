import { Block } from 'payload'

export const ContentBlock: Block = {
  slug: 'content',
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'content',
      type: 'richText',
    },
  ],
}
