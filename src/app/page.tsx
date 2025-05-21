'use client'

import { useEffect, useState } from 'react'

export default function HomePage() {
  const [produtos, setProdutos] = useState([])

  useEffect(() => {
    fetch('/api/produtos')
      .then(res => res.json())
      .then(data => setProdutos(data.data))
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Produtos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {produtos.map((item: any) => {
          const imagemUrl = item.imagem?.url
          const urlCompleta = imagemUrl
            ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imagemUrl}`
            : null

          return (
            <div key={item.id} className="border rounded-lg p-4">
              {urlCompleta ? (
                <img
                  src={urlCompleta}
                  alt={item.nome}
                  className="h-64 w-full object-cover mb-4"
                />
              ) : (
                <div className="h-64 w-full bg-gray-200 flex items-center justify-center mb-4">
                  <span className="text-gray-500">Sem imagem</span>
                </div>
              )}
              <h2 className="text-xl font-semibold">{item.nome}</h2>
              <p className="text-sm text-gray-600">{item.descricao}</p>
              <p className="text-lg font-bold mt-2">
                R${item.preco.toFixed(2)}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
