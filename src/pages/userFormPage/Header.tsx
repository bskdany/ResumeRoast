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
      <h1 className={styles.title}>Luigi.AI</h1>
    </header>
  );
};

export default Header;