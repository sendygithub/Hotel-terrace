// app/admin/rooms/page.tsx
import { getRooms } from '@/lib/data'
import Card from '@/components/card'

const Main = async () => {
  const rooms = await getRooms()

  return (

    <div className='max-w-screen-xl py-2 pb-10 px-4 mx-auto'>
      <div className="grid gap-7 md:grid-cols-3">
      {rooms.map((room) => (
        <Card key={room.id} room={room} />
      ))}
    </div>

    </div>
    



    
  )
}

export default Main
