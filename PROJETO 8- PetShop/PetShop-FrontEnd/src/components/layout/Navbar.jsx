import { Link } from 'react-router-dom'
import React, { useContext, useState } from 'react'

import styles from './Navbar.module.css'

import Logo from '../../assets/img/logo.png'

import { Context } from '../../context/UserContext'

function Navbar() {
  const { authenticated, logout } = useContext(Context)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="Get A Pet" />
        <h2>Get A Pet</h2>
      </div>
      <button
        className={styles.mobile_menu_button}
        onClick={toggleMobileMenu}
        aria-expanded={isMobileMenuOpen}
        aria-label="Toggle navigation"
      >
        &#9776;
      </button>
      <ul className={`${styles.nav_links} ${isMobileMenuOpen ? styles.open : ''}`}>
        <li>
          <Link to="/">Adotar</Link>
        </li>
        {authenticated ? (
          <>
            <li>
              <Link to="/pet/myadoptions">Minhas Adoções</Link>
            </li>
            <li>
              <Link to="/pet/mypets">Meus Pets</Link>
            </li>
            <li>
              <Link to="/user/profile">Meu Perfil</Link>
            </li>
            <li onClick={logout}>Sair</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Entrar</Link>
            </li>
            <li>
              <Link to="/register">Registar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
