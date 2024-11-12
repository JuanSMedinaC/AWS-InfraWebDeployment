import Image from 'next/image';
import styles from '../app/styles/HomeBuyer.module.css';
import productExample from '../app/icons/productExample.svg';

interface ProductCardProps {
    name: string
    description: string
    price: number
    category: string
  //  category: ['food', 'drink', 'books', 'electronics', 'fashion', 'sports', 'other']
    onChangePage: () => void
}

export default function ProductCardBuyer({name, description, price, category, onChangePage}: ProductCardProps) {
  return (
        <div className={styles.productCard}>
            <div className={styles.productImageWrapper}>
                <Image
                src={productExample}
                alt={name}
                width={50}
                height={50}
                className={styles.productImage}
            />
            </div>
            <div className={styles.productContent}>
                <h2 className={styles.productName}>{name}</h2>
                <p className={styles.productDescription}>{description}</p>
                <p className={styles.productDescription}>Categoria: {category}</p>
                <div className={styles.productFooter}>
                    <span className={styles.productPrice}>${price}</span>
                    <button className={styles.addToCartButton} onClick={onChangePage}>
                        <span>+ Añadir</span>
                    </button>
                </div>
            </div>
        </div>
  );
};