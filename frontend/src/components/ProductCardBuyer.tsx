
import styles from '../app/styles/HomeBuyer.module.css';
import productExample from '../app/icons/productExample.svg';

interface ProductCardProps {
    name: string
    description: string
    price: number
    image: string
    category: string
    onAddToCart: () => void
}

export default function ProductCardBuyer({name, description, price, image, category, onAddToCart}: ProductCardProps) {
  return (
        <div className={styles.productCard}>
            <div className={styles.productImageWrapper}>
                    <img
                    src={image || productExample}
                    alt={name} 
                    className={styles.productImage}
                    width={500} 
                    height={500} 
                />
            </div>
            <div className={styles.productContent}>
                <h2 className={styles.productName}>{name}</h2>
                <p className={styles.productDescription}>{description}</p>
                <p className={styles.productDescription}>Categoria: {category}</p>
                <div className={styles.productFooter}>
                    <span className={styles.productPrice}>${price}</span>
                    <button className={styles.addToCartButton} onClick={onAddToCart}>
                        <span>+ Añadir</span>
                    </button>
                </div>
            </div>
        </div>
  );
};