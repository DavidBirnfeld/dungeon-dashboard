import styles from "./CampaignCard.module.css";

interface CampaignCardProps {
  name: string;
  description: string;
}

export function CampaignCard({ name, description }: CampaignCardProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{name}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
