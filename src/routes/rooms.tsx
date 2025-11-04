import { createFileRoute, Outlet } from '@tanstack/react-router'
import MenuBarViewRooms from '~/components/MenuBarRooms';

export const Route = createFileRoute('/rooms')({
  component: Rooms,
})

function Rooms() {
  return (
    <div className="core_wrapper">
      <MenuBarViewRooms />
      <Outlet/>
    </div>
  );
}
