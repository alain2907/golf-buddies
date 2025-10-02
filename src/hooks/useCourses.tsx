'use client'
import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export interface Course {
  id: string
  name: string
  city: string
  region: string
  country: string
  address: string
  coordinates: {
    latitude: number
    longitude: number
  }
  holes: number
  description?: string
  website?: string
  phone?: string
  rating?: number
}

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true)
        const coursesQuery = query(
          collection(db, 'courses'),
          orderBy('name', 'asc')
        )
        const snapshot = await getDocs(coursesQuery)
        const coursesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Course[]

        setCourses(coursesData)
        setError(null)
      } catch (err) {
        console.error('Error fetching courses:', err)
        setError('Erreur lors du chargement des parcours')
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  return { courses, loading, error }
}
