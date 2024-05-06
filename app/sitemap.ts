import { MetadataRoute } from 'next'

const EXTERNAL_URL = process.env.EXTERNAL_URL as string

if (!EXTERNAL_URL) {
  throw 'EXTERNAL_URL missing'
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${EXTERNAL_URL}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${EXTERNAL_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${EXTERNAL_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}
