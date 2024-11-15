"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/HomeBuyer.module.css';
import { Product } from '@/interfaces/product';
import search from '../../icons/search.svg';
import shoppingCart from '../../icons/shopping-cart.svg';
import user from '../../icons/user.svg';
import ProductCardBuyer from "@/components/ProductCardBuyer";
import { useGetProducts } from "@/hooks/products/useGetProducts";
import Cookies from 'js-cookie';
import { useCreateOrder } from "@/hooks/orders/useCreateOrder";

interface CartItem {
    product: Product;
    quantity: number;
}

export default function HomeBuyerPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { getProducts } = useGetProducts();
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { createOrder } = useCreateOrder();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProducts();
                setProducts(response);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchData();
    }, [getProducts]);

    const categories = ['food', 'drink', 'books', 'electronics', 'fashion', 'sports', 'other'];

    const filteredProducts = products.filter(product => 
        (!selectedCategory || product.category === selectedCategory) &&
        (!searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleAddToCart = (product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.product.id === product.id);
            if (existingItem) {
                return prevCart.map(item => 
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { product, quantity: 1 }];
        });
    };

    const handleRemoveFromCart = (productId: string) => {
        setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    };

    const handleQuantityChange = (productId: string, delta: number) => {
        setCart(prevCart => 
            prevCart.map(item => 
                item.product.id === productId
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('currentUser');
        window.location.href = "/";
    };

    const handleCheckout = async () => {
        if (cart.length === 0) return;
        setIsLoading(true);

        try {
            const buyer = Cookies.get('currentUser');
            const buyerId = JSON.parse(buyer || '{}').id;
            
            const ordersBySeller: { [key: string]: { productId: string; quantity: number }[] } = {};
            
            cart.forEach(item => {
                const sellerId = item.product.sellerId;
                
                if (!ordersBySeller[sellerId]) {
                    ordersBySeller[sellerId] = [];
                }
                
                ordersBySeller[sellerId].push({
                    productId: item.product.id,
                    quantity: item.quantity
                });
            });
            
            for (const sellerId in ordersBySeller) {
                const orderData = {
                    buyerId: buyerId,
                    sellerId: sellerId,
                    items: ordersBySeller[sellerId]
                };
                await createOrder(orderData);
            }
            

            alert('Pedido realizado exitosamente.');

            setCart([]);
            setIsCartOpen(false);
        } catch (error) {
            console.error('Error al realizar el pedido:', error);
            alert('Hubo un error al realizar el pedido. Inténtalo nuevamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.logo}>
                        <span>Marketplace</span>
                    </div>
                    <div className={styles.headerRight}>
                        <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
                            <div className={styles.searchWrapper}>
                                <input
                                    type="search"
                                    placeholder="Buscar productos..."
                                    className={styles.searchInput}
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                                <button type="submit" className={styles.searchButton}>
                                    <Image src={search} alt="Buscar" width={16} height={16} />
                                </button>
                            </div>
                        </form>
                        <button className={styles.iconButton} onClick={() => window.location.href = "buyer/orders"}>
                            <Image src={user} alt="Usuario" width={20} height={20} />
                        </button>
                        <button className={styles.iconButton} onClick={() => setIsCartOpen(!isCartOpen)}>
                            <Image src={shoppingCart} alt="Carrito" width={20} height={20} />
                        </button>
                        <button className={styles.iconButton} onClick={handleLogout}>
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </header>
            <main className={styles.main}>
                <div className={styles.mainContent}>
                    <div className={styles.categoryNav}>
                        <button
                            className={`${styles.categoryButton} ${!selectedCategory ? styles.selected : ''}`}
                            onClick={() => setSelectedCategory(null)}
                        >
                            Todos
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`${styles.categoryButton} ${selectedCategory === category ? styles.selected : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <h1 className={styles.title}>Productos</h1>
                    <div className={styles.productGrid}>
                        {filteredProducts.map((product) => (
                            <ProductCardBuyer
                                key={product.id}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                image={product.image}
                                category={product.category}
                                onAddToCart={() => handleAddToCart(product)}
                            />
                        ))}
                    </div>
                </div>
            </main>
            <div className={`${styles.cartDrawer} ${isCartOpen ? styles.open : ''}`}>
                <div className={styles.cartHeader}>
                    <h2>Carrito</h2>
                    <button onClick={() => setIsCartOpen(false)} className={styles.closeButton}>
                        X
                    </button>
                </div>
                {cart.length === 0 ? (
                    <p className={styles.emptyCart}>El carrito está vacío.</p>
                ) : (
                    <ul className={styles.cartList}>
                        {cart.map(({ product, quantity }) => (
                            <li key={product.id} className={styles.cartItem}>
                                <div>
                                    <p className={styles.productName}>{product.name}</p>
                                    <p>${product.price} x {quantity} = ${product.price * quantity}</p>
                                    <div className={styles.quantityControls}>
                                        <button onClick={() => handleQuantityChange(product.id, -1)}>-</button>
                                        <span>{quantity}</span>
                                        <button onClick={() => handleQuantityChange(product.id, 1)}>+</button>
                                    </div>
                                </div>
                                <div className={styles.cartItemActions}>
                                    <button onClick={() => handleRemoveFromCart(product.id)} className={styles.removeButton}>Eliminar</button>
                                </div>
                            </li>
                            
                        ))}
                    </ul>
                )}
                <div className={styles.cartFooter}>
                    <p>Total: ${total.toFixed(2)}</p>
                    <button 
                        className={styles.payButton} 
                        onClick={handleCheckout}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Procesando...' : 'Pagar'}
                    </button>
                </div>
            </div>
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <p>© {new Date().getFullYear()}</p>
                </div>
            </footer>
        </div>
    );
}
