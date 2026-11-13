
import { useEffect, useState } from 'react';
import ProductCard from './components/product-card';
import RandomProduct from './components/random-product';

const BASE_URL = 'https://fakestoreapi.com';

function App() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}/products`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch products');
                }
                return res.json();
            })
            .then((data) => setProducts(data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="min-h-screen p-5">
            <RandomProduct />

            <h2 className="my-6 text-2xl font-bold">All Products</h2>

            <div className="grid grid-cols-2 gap-5 xl:grid-cols-4">
                {products.map((product) => (
                    <ProductCard {...product} key={product.id} />
                ))}
            </div>
        </div>
    );
}

export default App;
