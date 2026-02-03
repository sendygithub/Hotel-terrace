// types/room.ts
export interface RoomProps {
  id: string
  name: string
  description: string
  image: string
  price: number
  capacity: number
  RoomAmenities: {
    amenity: { name: string }
  }[]
}
