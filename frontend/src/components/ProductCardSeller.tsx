import { Pencil, Trash2 } from 'lucide-react';
import styles from '../app/styles/ProductCardSeller.module.css';
import productExample from '../app/icons/productExample.svg';
import Image from 'next/image';

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  category: string;
  onEdit: () => void;
  onDelete: () => void;
  stock?: number;
  status?: 'active' | 'inactive';
}

export default function ProductCardSeller({
  name,
  description,
  price,
  category,
  onEdit,
  onDelete,
  status = 'active'
}: ProductCardProps) {
  return (
    <div className={styles.productCard}>
      <div className={styles.flexContainer}>
        {/* Imagen del producto */}
        <div className={styles.imageContainer}>
          <Image
            src={productExample}
            alt={name}
            className={styles.productImage}
          />
          <div className={`${styles.statusIndicator} ${
            status === 'active' ? styles.statusActive : styles.statusInactive
          }`} />
        </div>

        {/* Información del producto */}
        <div className={styles.productInfo}>
          <div className={styles.header}>
            <h2 className={styles.productTitle}>{name}</h2>
            <div className={styles.buttonContainer}>
              <button 
                onClick={onEdit}
                className={`${styles.actionButton} ${styles.editButton}`}
              >
                <Pencil size={18} />
              </button>
              <button 
                onClick={onDelete}
                className={`${styles.actionButton} ${styles.deleteButton}`}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          
          <p className={styles.description}>{description}</p>
          
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <label>Categoría</label>
              <p className={styles.infoValue}>{category}</p>
            </div>
            <div className={styles.infoItem}>
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.priceContainer}>
              <label>Precio</label>
              <p className={styles.price}>${price}</p>
            </div>
            <div>
              <span className={`${styles.statusBadge} ${
                status === 'active' ? styles.badgeActive : styles.badgeInactive
              }`}>
                {status === 'active' ? 'Activo' : 'Inactivo'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}