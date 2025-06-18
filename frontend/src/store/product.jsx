import {create} from 'zustand'

export const useProductStore = create((set)=>({
    products:[],
    setProducts: (products)=>set({products}),
    createProduct: async (newProduct) =>{
        if(!newProduct.name || !newProduct.image || !newProduct.price)
            return {success:false, message:"fill all fields"}
        const res = await fetch('/api/products',{
            method : "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body : JSON.stringify(newProduct),
        })
        const data = await res.json();
        set((state)=>({products:[...state.products,data.data] }));
        return {success:true,message:"product created"};
    },
    fetchProducts: async()=>{
        const res = await fetch('/api/products');
        const data = await res.json();
        if(!data || !data.data)return {success:false, message:"no products"}
        set({products:data.data})
        return {success:true, data:data.data}
    },
    deleteProduct: async (id) => {
        const res = await fetch(`/api/products/${id}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!data || !data.success) return { success: false, message: "product not found" };
        set((state) => ({
            products: state.products.filter((product) => product._id !== id),
        }));
        return { success: true, message: "product deleted" };
    },
    updateProduct: async (id, updatedProduct) => {
        const res = await fetch(`/api/products/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if (!data || !data.success) return { success: false, message: "product not found" };
        set((state) => ({
            products: state.products.map((product) =>
                product._id === id ? { ...product, ...updatedProduct } : product
            ),
        }));
        return { success: true, message: "product updated" };
    },
}));