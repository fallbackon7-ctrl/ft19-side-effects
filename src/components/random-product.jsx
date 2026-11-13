
import { useEffect, useState } from 'react';
import ProductCard from './product-card';

export default function RandomProduct() {
    const [productId, setProductId] = useState(1);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const controller = new AbortController();

        async function fetchProduct() {
            setLoading(true);
            setError('');

            try {
                const response = await fetch(
                    `https://fakestoreapi.com/products/${productId}`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch product.');
                }

                const data = await response.json();
                setProduct(data);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError('Unable to load the product. Please try again.');
                    setProduct(null);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        fetchProduct();

        return () => controller.abort();
    }, [productId]);

    function randomize() {
        const randomId = Math.floor(Math.random() * 20) + 1;
        setProductId(randomId);
    }

    return (
        <section className="mx-auto max-w-md p-4">
            <h1 className="mb-4 text-2xl font-bold">
                Discover a Random Product
            </h1>

            <button
                type="button"
                onClick={randomize}
                className="mb-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
                Randomize Product
            </button>

            {loading && <p>Loading product...</p>}

            {error && (
                <p role="alert" className="text-red-500">
                    {error}
                </p>
            )}

            {!loading && !error && product && (
                <ProductCard
                    title={product.title}
                    price={product.price}
                    image={product.image}
                    description={product.description}
                    category={product.category}
                    rating={product.rating}
                />
            )}
        </section>
    );
}
