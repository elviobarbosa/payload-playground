import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'
import { Page } from '@/payload-types'
import HeroBlock from './components/blocks/CoverBlock'
import ContentBlock from './components/blocks/ContentBlock'
import ContactFormBlock from './components/blocks/ContactFormBlock'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const {
    docs: [page],
  } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'teste',
      },
    },
  })

  if (!page) {
    return <div>Page not found</div>
  }

  const renderBlocks = (block: Page['layout'][0]) => {
    switch (block.blockType) {
      case 'cover':
        return <HeroBlock block={block} key={block.id} />
      case 'content':
        return <ContentBlock block={block} key={block.id} />
      case 'contact-form':
        return <ContactFormBlock block={block} key={block.id} />
      default:
        return null
    }
  }

  return (
    <div>
      <h1>{page.title}</h1>
      <div className="page">{page.layout.map((block) => renderBlocks(block))}</div>
      {/* <div dangerouslySetInnerHTML={{ __html: page.content }} /> */}
    </div>
  )
}
