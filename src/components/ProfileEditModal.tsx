'use client'
import { useState } from 'react'
import { User } from '@/types'
import { useAuth } from '@/hooks/useAuth'

interface ProfileEditModalProps {
  isOpen: boolean
  onClose: () => void
  user: User
}

export default function ProfileEditModal({ isOpen, onClose, user }: ProfileEditModalProps) {
  const { updateProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    displayName: user.displayName || '',
    handicap: user.handicap || '',
    homeClub: user.homeClub || '',
    bio: user.bio || '',
    phoneNumber: user.phoneNumber || '',
    preferences: {
      playStyle: user.preferences?.playStyle || 'casual',
      preferredTeeTime: user.preferences?.preferredTeeTime || 'morning',
      walkingOrCart: user.preferences?.walkingOrCart || 'both',
      notifications: user.preferences?.notifications || true
    }
  })

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const updates: Partial<User> = {
        displayName: formData.displayName,
        homeClub: formData.homeClub || '',
        bio: formData.bio || '',
        phoneNumber: formData.phoneNumber || '',
        preferences: formData.preferences
      }

      // Only add handicap if it has a value (Firebase doesn't accept undefined)
      if (formData.handicap) {
        updates.handicap = Number(formData.handicap)
      }

      await updateProfile(updates)
      onClose()
    } catch (error) {
      console.error('Profile update error:', error)
      alert(`Erreur de mise à jour: ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: any) => {
    if (field.startsWith('preferences.')) {
      const prefField = field.split('.')[1]
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefField]: value
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '32px',
        width: '100%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#333' }}>
            Modifier mon profil
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666',
              padding: '4px'
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', color: '#333' }}>
              Nom d'affichage
            </label>
            <input
              type="text"
              value={formData.displayName}
              onChange={(e) => handleChange('displayName', e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
              }}
              placeholder="Votre nom"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', color: '#333' }}>
                Index handicap
              </label>
              <input
                type="number"
                value={formData.handicap}
                onChange={(e) => handleChange('handicap', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
                placeholder="18"
                min="0"
                max="54"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', color: '#333' }}>
                Club d'attache
              </label>
              <input
                type="text"
                value={formData.homeClub}
                onChange={(e) => handleChange('homeClub', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
                placeholder="Golf de Saint-Cloud"
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', color: '#333' }}>
              Téléphone (optionnel)
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
              }}
              placeholder="+33 6 12 34 56 78"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', color: '#333' }}>
              Bio (optionnel)
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px',
                minHeight: '80px',
                resize: 'vertical'
              }}
              placeholder="Quelques mots sur vous..."
            />
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#333' }}>
            Préférences
          </h3>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', color: '#333' }}>
              Style de jeu
            </label>
            <select
              value={formData.preferences.playStyle}
              onChange={(e) => handleChange('preferences.playStyle', e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            >
              <option value="casual">Décontracté</option>
              <option value="competitive">Compétitif</option>
              <option value="practice">Entraînement</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', color: '#333' }}>
              Horaire préféré
            </label>
            <select
              value={formData.preferences.preferredTeeTime}
              onChange={(e) => handleChange('preferences.preferredTeeTime', e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            >
              <option value="morning">Matin (8h-11h)</option>
              <option value="afternoon">Après-midi (12h-16h)</option>
              <option value="evening">Soirée (16h-19h)</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', color: '#333' }}>
              Marche/Voiturette
            </label>
            <select
              value={formData.preferences.walkingOrCart}
              onChange={(e) => handleChange('preferences.walkingOrCart', e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            >
              <option value="walking">Marche préférée</option>
              <option value="cart">Voiturette préférée</option>
              <option value="both">Les deux</option>
            </select>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              fontWeight: '500',
              color: '#333',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={formData.preferences.notifications}
                onChange={(e) => handleChange('preferences.notifications', e.target.checked)}
                style={{ marginRight: '8px' }}
              />
              Recevoir les notifications
            </label>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '12px 24px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                background: 'white',
                color: '#666',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                background: '#4A7C2E',
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}