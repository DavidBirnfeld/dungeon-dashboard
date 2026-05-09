"use client";

import { useState } from "react";
import { Character, Stats } from "@/app/campaigns/[campaignId]/page";
import styles from "./PartyModal.module.css";

export function PartyModal({ 
  isOpen, 
  onClose, 
  onSave 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (char: Character) => void; 
}) {
  const [name, setName] = useState("");
  const [hp, setHp] = useState(10);
  const [stats, setStats] = useState<Stats>({
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  });
  const [resistances, setResistances] = useState("");
  const [vulnerabilities, setVulnerabilities] = useState("");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({
      name,
      hp,
      stats,
      resistances: resistances.split(",").map(s => s.trim()).filter(Boolean),
      vulnerabilities: vulnerabilities.split(",").map(s => s.trim()).filter(Boolean),
      notes
    });
    onClose();
  };

  const updateStat = (key: keyof Stats, val: string) => {
    setStats(prev => ({ ...prev, [key]: parseInt(val) || 0 }));
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>New Party Member</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.content}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Name</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Character Name" />
            </div>
            <div className={styles.field} style={{ flex: '0 0 100px' }}>
              <label>HP</label>
              <input type="number" value={hp} onChange={e => setHp(parseInt(e.target.value) || 0)} />
            </div>
          </div>

          <div className={styles.statsGrid}>
            {(Object.keys(stats) as Array<keyof Stats>).map(stat => (
              <div key={stat} className={styles.statField}>
                <label>{stat.substring(0, 3)}</label>
                <input type="number" value={stats[stat]} onChange={e => updateStat(stat, e.target.value)} />
              </div>
            ))}
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Resistances</label>
              <input value={resistances} onChange={e => setResistances(e.target.value)} placeholder="Fire, Cold..." />
            </div>
            <div className={styles.field}>
              <label>Vulnerabilities</label>
              <input value={vulnerabilities} onChange={e => setVulnerabilities(e.target.value)} placeholder="Force, Psychic..." />
            </div>
          </div>

          <div className={styles.field}>
            <label>Notes</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="Background, equipment, etc..." />
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.saveBtn} onClick={handleSave}>Add Character</button>
        </div>
      </div>
    </div>
  );
}