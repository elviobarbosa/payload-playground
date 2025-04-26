import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'

type CoverProps = Extract<Page['layout'][0], { blockType: 'cover' }>

export default function CoverBlock({ block }: { block: CoverProps }) {
  return (
    <div>
      <h1>{block.heading}</h1>
      <p>{block.subheading}</p>
      {typeof block?.image === 'object' && block.image.url && (
        <img src={block.image.url} alt={block.image.alt} />
      )}
      <Link
        href={block.cta_button.url}
        style={{
          textDecoration: 'none',
          backgroundColor: 'blue',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          display: 'inline-block',
          marginTop: '20px',
        }}
      >
        {block.cta_button.label}
      </Link>
    </div>
  )
}
