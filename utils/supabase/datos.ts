export interface entrenadores {
    id: string // Cambiado a string ya que es un UUID
    nombre: string
    apellido: string 
    correo: string 
    contrasena: string
  }
    
  export type NewEntrenadores = Omit<entrenadores, 'id'>
  export type UpdateUser = Partial<entrenadores>