// app/api/produtos/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await fetch(`${process.env.STRAPI_API_URL}/api/produtos?populate=*`, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
      }
    })

    if (!res.ok) {
      const error = await res.text()
      console.error("Erro da API do Strapi:", res.status, error)
      return NextResponse.json({ error: true, status: res.status, message: error }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err: any) {
    console.error("Erro inesperado:", err)
    return NextResponse.json({ error: true, message: err.message }, { status: 500 })
  }
}
