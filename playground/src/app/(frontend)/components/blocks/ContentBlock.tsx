/* eslint-disable @typescript-eslint/no-explicit-any */
import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

type ContentProps = Extract<Page['layout'][0], { blockType: 'content' }>

export default function ContentBlock({ block }: { block: ContentProps }) {
  return (
    <div>
      <RichText data={block.content as any} />
    </div>
  )
}
