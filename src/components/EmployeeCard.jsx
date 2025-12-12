import styles from "./EmployeeCard.module.css";
// Pfad ggf. anpassen, je nachdem wo dein Bild liegt!
import placeholderImg from "../assets/user-placeholder.jpg";
import { Link } from "react-router-dom";

export default function EmployeeCard({ id, name, role, isActive, imageUrl, onDelete, onEdit, onClick }) {
  const statusStyle = isActive ? styles.active : styles.inactive;
  const imageSource = imageUrl || placeholderImg;

  return (
      <div
        className={styles.card}
        onClick={onClick ? () => onClick(id) : undefined}
        // Optional: Cursor ändern, wenn klickbar
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      >

        <img src={imageSource} alt={name} className={styles.profileImage} />
        <h3 className={styles.name}>{name}</h3>
        <p>{role}</p>
        <span className={`${styles.badge} ${statusStyle}`}>
          {isActive ? "Aktiv" : "Abwesend"}
        </span>

        <div className={styles.actionButtons}>
          <button 
            className={styles.editBtn}
            onClick={(e) => {
                e.stopPropagation(); // WICHTIG: Verhindert, dass der Karten-Klick feuert
                onEdit(id);
            }}
          >
            Bearbeiten
          </button>
          <button 
            className={styles.deleteBtn}
            onClick={(e) => {
                e.stopPropagation(); // WICHTIG: Verhindert, dass der Karten-Klick feuert
                onDelete(id);
            }}
          >
            Löschen
          </button>
        </div>
      </div>
  );
}