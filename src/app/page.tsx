'use client'

import { useEffect, useState } from 'react'

type Produto = {
  id: number
  nome: string
  descricao: string
  preco: number
  imagem?: { url: string }
}

export default function HomePage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [filtro, setFiltro] = useState('')
  const [carrinho, setCarrinho] = useState<Produto[]>([])

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/produtos?populate=*`
        )
        const data = await res.json()

        const produtosFormatados = data.data.map((item: any) => {
          return {
            id: item.id,
            nome: item.nome,
            descricao: item.descricao,
            preco: item.preco,
            desconto: item.desconto ?? 0,
            imagem: item.imagem
              ? { url: item.imagem.url }
              : undefined
          }
        })

        setProdutos(produtosFormatados)
      } catch (error) {
        console.error('Erro ao buscar produtos:', error)
      }
    }

    fetchProdutos()
  }, [])

  // Carregar carrinho do localStorage
  useEffect(() => {
    const cart = localStorage.getItem('carrinho')
    if (cart) {
      setCarrinho(JSON.parse(cart))
    }
  }, [])

  // Salvar carrinho no localStorage sempre que atualizar
  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho))
  }, [carrinho])

  const adicionarAoCarrinho = (produto: Produto) => {
    setCarrinho(prev => [...prev, produto])
  }

  const produtosFiltrados = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(filtro.toLowerCase())
  )

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Produtos</h1>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Buscar produto..."
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
            className="border px-3 py-2 rounded-md"
          />
          <div className="relative">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
              Carrinho ({carrinho.length})
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {produtosFiltrados.map(produto => {
          const imagemUrl = produto.imagem?.url
          const urlCompleta = imagemUrl
            ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imagemUrl}`
            : null

          return (
            <div
              key={produto.id}
              className="border rounded-lg p-4 flex flex-col"
            >
              {urlCompleta ? (
                <img
                  src={urlCompleta}
                  alt={produto.nome}
                  className="h-64 w-full object-cover mb-4 rounded-md"
                />
              ) : (
                <div className="h-64 w-full bg-gray-200 flex items-center justify-center mb-4 rounded-md">
                  <span className="text-gray-500">Sem imagem</span>
                </div>
              )}
              <h2 className="text-xl font-semibold">{produto.nome}</h2>
              <p className="text-sm text-gray-600 flex-grow">
                {produto.descricao}
              </p>
              <p className="text-lg font-bold mt-2">
                R$ {produto.preco.toFixed(2)}
              </p>
              <button
                onClick={() => adicionarAoCarrinho(produto)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md mt-4"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
