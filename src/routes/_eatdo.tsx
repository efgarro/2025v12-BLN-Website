import { createFileRoute, Outlet } from "@tanstack/react-router";
import MenuBarEatDo from "~/components/MenuBarEatDo";

export const Route = createFileRoute("/_eatdo")({
  head: () => ({
    meta: [
      {
        title: "Where to Eat & What to Do",
      },
      {
        name: "description",
        content:
          "It includes vetted places to eat local food and pizza, as well as activities around town such as: two different trails to the Bijagual Waterfalls, a walk to La Esperanza, El Cruce de los Monos trail, river pools, Carara National Park Trails, Jaco surfing lessons, and Crocodile River Tours",
      },
    ],
  }),
  component: PathlessLayoutEatDo,
});

function PathlessLayoutEatDo() {
  return (
    <div className="core_wrapper">
      <MenuBarEatDo />
      <Outlet />
    </div>
  );
}
