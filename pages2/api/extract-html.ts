import { NextApiHandler } from 'next'
import puppeteer from 'puppeteer'

const Handler: NextApiHandler = async (req, res) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('http://localhost:3000')
  await page.emulateMediaType('screen')

  const pageSourceHTML = await page.content()

  console.log(pageSourceHTML)

  const pdfBuffer = await page.pdf({ format: 'A4' })

  res.send(pdfBuffer)

  await browser.close()
}

export default Handler
