import { ContentBlock } from '@/blocks/ContentBlock'
import { CoverBlock } from '@/blocks/CoverBlock'
import { FormBlock } from '@/blocks/FormBlock'
import { CollectionConfig } from 'payload'

const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [CoverBlock, ContentBlock, FormBlock],
    },
  ],
}
export default Pages
