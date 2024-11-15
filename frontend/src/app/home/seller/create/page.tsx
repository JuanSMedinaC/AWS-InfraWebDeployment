"use client";

import React, { useState } from 'react';
import styles from '../../../styles/CreateProduct.module.css';
import Cookies from 'js-cookie';
import { CreateProductDto } from '@/dto/orders/createProdcut.dto';
import { useCreateProduct } from '@/hooks/products/useCreateProduct';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('food');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const { createProduct } = useCreateProduct();

  const categories = ['food', 'drink', 'books', 'electronics', 'fashion', 'sports', 'other'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentUser = Cookies.get("currentUser");
    if (!currentUser) {
        console.error("No se encontró el usuario actual en las cookies");
        return;
    }

    const user = JSON.parse(currentUser);
    const sellerId = user.id;

    const createProductDto: CreateProductDto = {
        sellerId: sellerId,
        name: name,
        category: category,
        description: description,
        price: price,
        image: image,
    };

    console.log("Objeto Body enviado:", createProductDto);
    try {
        await createProduct(createProductDto);
        window.location.href = "/home/seller";
    } catch (error) {
        console.error("Error al crear el producto:", error);
    }

    
  };

  return (
    <div className={styles.body}>
        <div className={styles.container}>
            <h1 className={styles.title}>Crear un Producto</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Nombre</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.input}
                />
                </div>
                <div className={styles.formGroup}>
                <label htmlFor="description" className={styles.label}>Descripción</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={styles.input}
                ></textarea>
                </div>
                <div className={styles.formGroup}>
                <label htmlFor="category" className={styles.label}>Selecciona una Categoria</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={styles.input}
                >
                    {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                </div>
                <div className={styles.formGroup}>
                <label htmlFor="price" className={styles.label}>Precio</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    className={styles.input}
                />
                </div>
                <div className={styles.formGroup}>
                <label htmlFor="image" className={styles.label}>URL de la Imagen</label>
                <input
                    type="text"
                    id="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className={styles.input}
                />
                </div>
                <div className={styles.buttonContainer}>
                <button className={styles.button}><a href="/home/seller" className={styles.button}>Atrás</a></button>
                <button type="submit" className={styles.button}>Crear</button>
                </div>
            </form>
        </div>
    </div>
    
  );
};

export default CreateProduct;