//pages/sitemap.xml.js
const EXTERNAL_URL = process.env.EXTERNAL_URL as string

if (!EXTERNAL_URL) {
  throw 'EXTERNAL_URL missing'
}

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>${EXTERNAL_URL}</loc>
     </url>
     <url>
       <loc>${EXTERNAL_URL}/tos</loc>
     </url>
     <url>
       <loc>${EXTERNAL_URL}/privacy-policy</loc>
     </url>
     ${posts
       .map(({ id }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_URL}/${id}`}</loc>
       </url>
     `
       })
       .join('')}
   </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  // const request = await fetch(EXTERNAL_URL);
  // const posts = await request.json();
  const posts = []

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts)

  res.setHeader('Content-Type', 'text/xml')
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
