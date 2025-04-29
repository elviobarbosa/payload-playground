/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { useState } from 'react'

type BlockProps = Extract<Page['layout'][0], { blockType: 'contact-form' }>

type FormStatus = {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}

export default function ContactFormBlock({ block }: { block: BlockProps }) {
  const [formStatus, setFormStatus] = useState<FormStatus>({
    isLoading: false,
    isSuccess: false,
    isError: false,
  })
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!block.form || typeof block.form !== 'object') return

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())
    setFormStatus({
      isLoading: true,
      isSuccess: false,
      isError: false,
    })
    try {
      const response = await fetch('/api/form-submissions', {
        method: 'POST',
        body: JSON.stringify({
          form: block.form.id,
          submissionData: Object.entries(data).map(([field, value]) => ({
            field,
            value,
          })),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setFormStatus({
        isLoading: false,
        isSuccess: true,
        isError: false,
      })
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      console.error('Error submitting form:', error)
      setFormStatus({
        isLoading: false,
        isSuccess: false,
        isError: true,
      })
    }
  }
  return (
    <div>
      {typeof block?.form === 'object' && block?.form?.title === 'contact-form' && (
        <div>
          <h2>{block.heading}</h2>
          <form className="form" onSubmit={handleSubmit}>
            {block.form.fields?.map((field: any) => (
              <div key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <input type={field.blockType} id={field.name} name={field.name} />
              </div>
            ))}

            {formStatus.isError && <p>Something went wrong</p>}
            {formStatus.isSuccess ? (
              <>
                <div style={{ color: 'green' }}>
                  <RichText data={block.form.confirmationMessage!} />
                </div>
              </>
            ) : (
              <button type="submit">{block.form.submitButtonLabel || 'Submit'}</button>
            )}
          </form>
        </div>
      )}
    </div>
  )
}
