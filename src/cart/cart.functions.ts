export const singleCartProduct = (result: any) => ({
  prod_id: result.prod_id.prod_id,
  cart_id: result.cart_id,
  ammount: result.ammount,
  title: result.prod_id.title,
  price: result.prod_id.price,
  images: [result.prod_id.images[0]],
});
