import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_rooms/guarumo")({
  component: GuarumoRoom,
});

function GuarumoRoom() {
  return <div>Hello "/rooms/guarumo"!</div>;
}
