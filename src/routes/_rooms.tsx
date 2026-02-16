import { createFileRoute, Outlet } from "@tanstack/react-router";
import MenuBarViewRooms from "~/components/MenuBarRooms";
import styles from "../css/footer.module.css";

export const Route = createFileRoute("/_rooms")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="core_wrapper">
      <MenuBarViewRooms />
      <Outlet />
    </div>
  );
}

// rooms with a view
