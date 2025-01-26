// src/components/Header.tsx

import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Luigi.AI</h1>
    </header>
  );
};

export default Header;