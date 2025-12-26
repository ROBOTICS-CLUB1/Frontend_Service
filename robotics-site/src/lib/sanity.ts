import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: '1sm7gbez',
  dataset: 'production',
  useCdn: true, // set to false for fresh data handling
  apiVersion: '2025-12-19',
  token: import.meta.env.VITE_SANITY_API_TOKEN,
  ignoreBrowserTokenWarning: true,
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}
