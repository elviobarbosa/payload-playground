import { Block } from 'payload'

export const FormBlock: Block = {
  slug: 'contact-form',
  fields: [
    { name: 'heading', type: 'text', required: false },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: false,
    },
  ],
}
