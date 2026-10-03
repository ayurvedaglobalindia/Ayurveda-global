import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(req: NextRequest) {
  try {
    const pdfPath = path.join(process.cwd(), 'public', 'Client_Requirements_Ayur_Veda_Global.pdf')
    
    // Fallback to Download folder if not in public
    const fallbackPath = '/storage/emulated/0/Download/Client_Requirements_Ayur_Veda_Global.pdf'
    const finalPath = fs.existsSync(pdfPath) ? pdfPath : fallbackPath

    if (!fs.existsSync(finalPath)) {
      return new NextResponse('PDF file not found', { status: 404 })
    }

    const fileBuffer = fs.readFileSync(finalPath)

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Client_Requirements_Ayur_Veda_Global.pdf"',
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    console.error('Error serving Client Requirements PDF:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
