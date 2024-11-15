import React from 'react';
import styles from '../app/styles/OrderBuyerPage.module.css';

interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`${styles.card} ${className}`}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children?: React.ReactNode;
}

const CardHeader: React.FC<CardHeaderProps> = ({ children }) => {
  return (
    <div className={styles.cardHeader}>
      {children}
    </div>
  );
};

interface CardTitleProps {
  children?: React.ReactNode;
}

const CardTitle: React.FC<CardTitleProps> = ({ children }) => {
  return (
    <h3 className={styles.cardTitle}>{children}</h3>
  );
};

interface CardContentProps {
  children?: React.ReactNode;
}

const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return (
    <div className={styles.cardContent}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardContent };