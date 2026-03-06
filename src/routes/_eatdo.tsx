import { createFileRoute, Outlet } from "@tanstack/react-router";
import MenuBarEatDo from "~/components/MenuBarEatDo";

export const Route = createFileRoute("/_eatdo")({
  head: () => ({
    meta: [
      {
        name: "description",
        content:
          "It includes vetted places to go to eat local food and pizza and activities to do around town incluing; two different trails to the Bijagual Waterfalls, walk to La Esperanza, El Cruce de los Monos trail, river pools, Carara National Park Trails, Jaco surfing lessons, Crocodile River Tours",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="core_wrapper">
      <MenuBarEatDo />
      <Outlet />
    </div>
  );
}
