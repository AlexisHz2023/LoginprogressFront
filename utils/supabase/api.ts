import { createClient } from '@supabase/supabase-js'
import { NewEntrenadores } from './datos'
import { v4 as uuidv4 } from 'uuid'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const entrenadorAPI = {
  create: async (entrenador: NewEntrenadores) => {
    const { data, error } = await supabase
      .from('entrenadores')
      .insert([{ id: uuidv4(), ...entrenador }])
      .select()
      .single()

    if (error) throw error
    return data
  },
}