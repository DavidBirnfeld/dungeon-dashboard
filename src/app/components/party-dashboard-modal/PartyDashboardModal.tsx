"use client";

import { Character, Stats } from "@/app/campaigns/[campaignId]/page";
import styles from "./PartyDashboardModal.module.css";
import { useState } from "react";

export function PartyDashboardModal({
  isOpen,
  party,
  onClose,
  onUpdate,
}: {
  isOpen: boolean;
  party: Character[];
  onClose: () => void;
  onUpdate: (updatedParty: Character[]) => void;
}) {
  const [damageAmounts, setDamageAmounts] = useState<Record<number, number>>({});
  const [healAmounts, setHealAmounts] = useState<Record<number, number>>({});

  if (!isOpen) return null;

  const updateChar = (index: number, fields: Partial<Character>) => {
    const newParty = [...party];
    newParty[index] = { ...newParty[index], ...fields };
    onUpdate(newParty);
  };

  const updateStat = (index: number, stat: keyof Stats, val: number) => {
    const newStats = { ...party[index].stats, [stat]: val };
    updateChar(index, { stats: newStats });
  };

  const applyDamage = (index: number) => {
    const amount = damageAmounts[index] || 0;
    if (amount > 0) {
      updateChar(index, { hp: Math.max(0, party[index].hp - amount) });
      setDamageAmounts({ ...damageAmounts, [index]: 0 });
    }
  };

  const applyHeal = (index: number) => {
    const amount = healAmounts[index] || 0;
    if (amount > 0) {
      updateChar(index, { hp: party[index].hp + amount });
      setHealAmounts({ ...healAmounts, [index]: 0 });
    }
  };

  const addAffinity = (index: number, type: "resistances" | "vulnerabilities", val: string) => {
    if (!val.trim()) return;
    const newList = [...party[index][type], val.trim()];
    updateChar(index, { [type]: newList });
  };

  const removeAffinity = (index: number, type: "resistances" | "vulnerabilities", tagIndex: number) => {
    const newList = party[index][type].filter((_, i) => i !== tagIndex);
    updateChar(index, { [type]: newList });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Party Dashboard</h2>
          <button className={styles.closeBtn} onClick={onClose}>Finish Session</button>
        </div>

        <div className={styles.scrollArea}>
          {party.map((char, i) => (
            <div key={i} className={styles.charCard}>
              <h3 className={styles.charName}>{char.name}</h3>

              <div className={styles.hpSection}>
                <span className={styles.hpDisplay}>HP: {char.hp}</span>
                <div className={styles.hpControls}>
                  <input 
                    type="number" 
                    placeholder="Damage" 
                    min="0"
                    value={damageAmounts[i] || 0}
                    onChange={(e) => setDamageAmounts({ ...damageAmounts, [i]: parseInt(e.target.value) || 0 })}
                  />
                  <button onClick={() => applyDamage(i)}>Apply Damage</button>
                </div>
                <div className={styles.hpControls}>
                  <input 
                    type="number" 
                    placeholder="Heal" 
                    min="0"
                    value={healAmounts[i] || 0}
                    onChange={(e) => setHealAmounts({ ...healAmounts, [i]: parseInt(e.target.value) || 0 })}
                  />
                  <button onClick={() => applyHeal(i)}>Apply Heal</button>
                </div>
              </div>

              <div className={styles.statsGrid}>
                {(Object.keys(char.stats) as Array<keyof Stats>).map(s => (
                  <div key={s} className={styles.statBox}>
                    <span className={styles.tagLabel}>{s.substring(0, 3)}</span>
                    <input 
                      type="number" 
                      value={char.stats[s]} 
                      onChange={(e) => updateStat(i, s, parseInt(e.target.value) || 0)}
                    />
                  </div>
                ))}
              </div>

              <div className={styles.tagSection}>
                <span className={styles.tagLabel}>Resistances</span>
                <div className={styles.tags}>
                  {char.resistances.map((r, idx) => (
                    <span key={idx} className={styles.tag}>
                      {r} <span className={styles.tagDelete} onClick={() => removeAffinity(i, "resistances", idx)}>×</span>
                    </span>
                  ))}
                </div>
                <input 
                  className={styles.tagInput} 
                  placeholder="+ Add Resistance" 
                  onKeyDown={(e) => e.key === 'Enter' && (addAffinity(i, "resistances", e.currentTarget.value), e.currentTarget.value = '')}
                />
              </div>

              <div className={styles.tagSection}>
                <span className={styles.tagLabel}>Vulnerabilities</span>
                <div className={styles.tags}>
                  {char.vulnerabilities.map((v, idx) => (
                    <span key={idx} className={styles.tag}>
                      {v} <span className={styles.tagDelete} onClick={() => removeAffinity(i, "vulnerabilities", idx)}>×</span>
                    </span>
                  ))}
                </div>
                <input 
                  className={styles.tagInput} 
                  placeholder="+ Add Vulnerability" 
                  onKeyDown={(e) => e.key === 'Enter' && (addAffinity(i, "vulnerabilities", e.currentTarget.value), e.currentTarget.value = '')}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}