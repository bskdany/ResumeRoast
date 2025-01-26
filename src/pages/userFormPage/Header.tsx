// src/components/Header.tsx

import React from 'react';
import styles from './Header.module.css'; // Importing CSS module for styling
import logo from "../../assets/logo.png"

/**
 * Header Component
 * Displays the application title and a logo.
 */
const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Luigi AI</h1>
      <div className={styles.logoPlaceholder}>
        <img src={logo} alt="Luigui AI Logo" className={styles.logo} />
      </div>
    </header>
  );
};

export default Header;