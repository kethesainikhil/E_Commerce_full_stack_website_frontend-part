


export function AddToCart(item) {
  return new Promise(async(resolve) =>{
    const response = await fetch('http://localhost:8000/cart',{
      method:"POST",
      body:JSON.stringify(item),
      headers:{'content-type':'application/json'}
    });
    const data = await response.json()
    resolve({data})
  })
}
export function updateCart(update) {
  return new Promise(async(resolve) =>{
    const response = await fetch('http://localhost:8000/cart/'+update.id,{
      method:"PATCH",
      body:JSON.stringify(update),
      headers:{'content-type':'application/json'}
    });
    const data = await response.json()
    resolve({data})
  })
}
export function deleteItemCart(id) {
  return new Promise(async(resolve) =>{
    const response = await fetch('http://localhost:8000/cart/'+id,{
      method:"DELETE",
      headers:{'content-type':'application/json'}
    });
    const data = await response.json()
    resolve({id:data.id})
  })
}
export function fetchItemsById(id) {
  return new Promise(async(resolve) =>{
    const response = await fetch(`http://localhost:8000/cart?user=${id}`);
    const data = await response.json()
    resolve({data})
  })
}
export function resetItems(id) {
  return new Promise(async(resolve) =>{
    const items = await fetchItemsById(id);
    const data = items.data
    for(let item in data){
      await deleteItemCart(data[item].id);
    }
    resolve({status:"message"})
  })
}