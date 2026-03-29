import { createFileRoute, Outlet } from "@tanstack/react-router";
import MenuBarViewRooms from "~/components/MenuBarRooms";
import styles from "../css/footer.module.css";

export const Route = createFileRoute("/_rooms")({
  head: () => ({
    meta: [
      {
        title: "Rooms with a View",
      },
      {
        name: "description",
        content:
          "It includes a description and a photo gallery of the two rooms available for lodging",
      },
    ],
  }),
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
