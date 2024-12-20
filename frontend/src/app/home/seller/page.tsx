"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/HomeSeller.module.css';
import { Product } from '@/interfaces/product';
import search from '../../icons/search.svg';
import user from '../../icons/user.svg';
import ProductCardSeller from "@/components/ProductCardSeller";
import { useGetProductsByUser } from "@/hooks/products/useGetProductsByUser";
import { useDeleteProduct } from "@/hooks/products/useDeleteProduct";
import Cookies from 'js-cookie';

export default function HomeSellerPage(){
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { getProductsByUser } = useGetProductsByUser();
    const [products, setProducts] = useState<Product[]>([]);
    const { deleteProduct } = useDeleteProduct();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProductsByUser();
                setProducts(response);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchData();
    }, [getProductsByUser]);

    const categories = ['food', 'drink', 'books', 'electronics', 'fashion', 'sports', 'other'];

    const filteredProducts = products.filter(product => 
        (!selectedCategory || product.category === selectedCategory) &&
        (!searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('currentUser');
        window.location.href = "/";
    };

    const confirmDelete = async (id: string) => {
        if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            try {
                await deleteProduct(id);
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    }

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
                        <button className={styles.iconButton} onClick={() => window.location.href = "seller/orders"}>
                            <Image src={user} alt="Usuario" width={20} height={20} />
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
                    <h1 className={styles.title}>Mis Productos</h1>
                    <button className={styles.addProductButton}>
                        <a href="seller/create">+ Añadir</a>
                    </button>
                    <div className={styles.productGrid}>
                        {filteredProducts.map((product) => (
                            <ProductCardSeller
                                key={product.id}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                image={product.image}
                                category={product.category}
                                onDelete={() => confirmDelete(product.id)}
                            />
                        ))}
                    </div>
                </div>
            </main>
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <p>© {new Date().getFullYear()}</p>
                </div>
            </footer>
        </div>
    );
};

