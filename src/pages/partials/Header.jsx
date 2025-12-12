import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      {/* Linke Seite: Logo / Titel */}
      <div className={styles.logo}>
        <span className={styles.logoIcon}>👥</span> TeamManager
      </div>

      {/* Rechte Seite: Links */}
      <div className={styles.navLinks}>
        
        {/* Link zur Startseite */}
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
        >
          Übersicht
        </NavLink>

        {/* Link zum Erstellen - als Button gestylt */}
        <NavLink 
          to="/employees/new" 
          className={({ isActive }) => isActive ? `${styles.cta} ${styles.activeCta}` : styles.cta}
        >
          + Neu
        </NavLink>
      </div>
    </nav>
  );
}