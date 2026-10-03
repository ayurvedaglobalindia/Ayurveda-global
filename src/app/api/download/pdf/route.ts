import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(req: NextRequest) {
  try {
    const pdfPath = path.join(process.cwd(), 'public', 'Ayur_Veda_Global_Website_Links.pdf')
    
    // Fallback to Download folder if not in public
    const fallbackPath = '/storage/emulated/0/Download/Ayur_Veda_Global_Website_Links.pdf'
    const finalPath = fs.existsSync(pdfPath) ? pdfPath : fallbackPath

    if (!fs.existsSync(finalPath)) {
      return new NextResponse('PDF file not found', { status: 404 })
    }

    const fileBuffer = fs.readFileSync(finalPath)

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Ayur_Veda_Global_Website_Links.pdf"',
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    console.error('Error serving PDF:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
