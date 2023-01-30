import { useMutation, useQueryClient } from 'react-query'
import { createProduct } from '../api/productsAPI'

function ProductForm () {

    const queryClient = useQueryClient()

    const addProductMutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            console.log('Success!!!')
            queryClient.invalidateQueries('products')
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const newForm = new FormData(e.target)
        const product = Object.fromEntries(newForm)
        addProductMutation.mutate({
            ...product,
            inStock: true 
        })
        console.log('Handled', product)
    }

    return <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name"/>

        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description"/>

        <label htmlFor="price">Price</label>
        <input type="number" id="price" name="price"/>

        <button>Add Product</button>
    </form>
}

export default ProductForm