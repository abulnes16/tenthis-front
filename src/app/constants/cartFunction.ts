
export function addToCart(productId) {
  const cart = localStorage.getItem('cart');
  let products = [];
  if (!cart) {
    products = [productId];
  } else {
    products = [...JSON.parse(cart).cart, productId];
  }
  localStorage.setItem('cart', JSON.stringify({ cart: products }));
  alert('Producto agregado con exito');
}