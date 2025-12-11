import styles from "./EmployeeCard.module.css";
// Pfad ggf. anpassen, je nachdem wo dein Bild liegt!
import placeholderImg from "../assets/user-placeholder.jpg"; 

export default function EmployeeCard({ id, name, role, isActive, imageUrl, onDelete, onEdit }) {
  const statusStyle = isActive ? styles.active : styles.inactive;
  const imageSource = imageUrl || placeholderImg;

  return (
    <div className={styles.card}>
      <img src={imageSource} alt={name} className={styles.profileImage} />
      <h3 className={styles.name}>{name}</h3>
      <p>{role}</p>
      <span className={`${styles.badge} ${statusStyle}`}>
        {isActive ? "Aktiv" : "Abwesend"}
      </span>

      <div className={styles.actionButtons}>
        <button className={styles.editBtn} onClick={() => onEdit(id)}>
          Bearbeiten
        </button>
        <button className={styles.deleteBtn} onClick={() => onDelete(id)}>
          Löschen
        </button>
      </div>
    </div>
  );
}