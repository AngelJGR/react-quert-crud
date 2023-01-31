// import React from "react";
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { deleteProduct, getProducts } from '../api/productsAPI'

function Products () {

    const queryClient = useQueryClient()
    const {isLoading, data: products, isError, error} = useQuery({
        queryKey: 'products',
        queryFn: getProducts,
        select: products => products.sort((a, b) => b.id - a.id)
    })

    const deleteProductMutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries('products')
        }
    })

    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error: { error.message }</div>


    return products.map((product) => <div key={product.id}>
        <h3>{ product.name }</h3>
        <p>{ product.description }</p>
        <p>{ product.price }</p>
        <button onClick={() => deleteProductMutation.mutate(product.id)}>delete</button>
        <input type="checkbox" />
        <label htmlFor="">In Stock</label>
        <hr />
    </div>)
}

export default Products