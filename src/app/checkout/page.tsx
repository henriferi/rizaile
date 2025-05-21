// app/checkout/page.tsx
'use client'

import { useCart } from "../context/CartContext"

const CheckoutPage = () => {
  const { cart, clearCart } = useCart()

  const total = cart.reduce((sum, item) => sum + item.preco * item.quantidade, 0)

  const handleCheckout = () => {
    const message = cart
      .map(item => `🛍️ ${item.nome} - ${item.quantidade}x - R$${item.preco}`)
      .join('\n')

    const encodedMessage = encodeURIComponent(
      `Olá! Gostaria de comprar:\n\n${message}\n\nTotal: R$${total.toFixed(2)}`
    )

    const whatsappNumber = '81986223012' // coloque o número da loja com DDD
    const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

    window.open(url, '_blank')
    clearCart()
  }

  if (cart.length === 0) return <p>Seu carrinho está vazio.</p>

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Resumo do Pedido</h1>
      <ul className="mb-4">
        {cart.map(item => (
          <li key={item.id}>
            {item.nome} - {item.quantidade}x - R${item.preco}
          </li>
        ))}
      </ul>
      <p className="mb-4 font-semibold">Total: R${total.toFixed(2)}</p>
      <button
        onClick={handleCheckout}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Finalizar pelo WhatsApp
      </button>
    </div>
  )
}

export default CheckoutPage
