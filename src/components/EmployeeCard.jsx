import styles from "./EmployeeCard.module.css";
// Pfad ggf. anpassen, je nachdem wo dein Bild liegt!
import placeholderImg from "../assets/user-placeholder.jpg";
import { Link } from "react-router-dom";

export default function EmployeeCard({ id, name, role, isActive, imageUrl, onDelete, onEdit, onClick, isDetail=false }) {
  const statusStyle = isActive ? styles.active : styles.inactive;
  const imageSource = imageUrl || placeholderImg;

  // CSS-Klassen Logik:
  // Wenn isDetail true ist, kombinieren wir ".card" mit ".detailCard"
  const cardClasses = `${styles.card} ${isDetail ? styles.detailCard : ''}`;
  const imageClasses = `${styles.profileImage} ${isDetail ? styles.detailImage : ''}`;
  const nameClasses = `${styles.name} ${isDetail ? styles.detailName : ''}`;

  return (
      <div
        className={cardClasses}
        onClick={onClick ? () => onClick(id) : undefined}
        // Optional: Cursor ändern, wenn klickbar
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      >

        <img src={imageSource} alt={name} className={imageClasses} />
        <h3 className={nameClasses}>{name}</h3>
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