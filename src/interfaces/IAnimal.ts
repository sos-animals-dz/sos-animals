import { MarkerProps } from 'react-map-gl'

export default interface IAnimal {
  id: number
  type: string
  description: string
  marker: MarkerProps
  picture?: string  
  reports?: string[]
  created_at?: any
}

