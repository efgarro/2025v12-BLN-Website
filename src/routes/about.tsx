import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import axios from "axios";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import BasicLayout from "~/components/01-Basic";

export const getMdfile = createServerFn().handler(async () => {
  const response = await axios.get(
    "https://raw.githubusercontent.com/efgarro/2024v10-SCR-CMApp/refs/heads/main/README.md"
  );
  return response.data;
});

export const Route = createFileRoute("/about")({
  component: RouteComponent,
  loader: async () => await getMdfile(),
});

function RouteComponent() {
  const data = Route.useLoaderData();
  console.log(data);
  return (
    <>
      <div className="font-serif">Hello "/about"!</div>
      <div className="core_wrapper">
        <div className="flex gap-4">
          <button className="btn btn-neutral">Neutral</button>
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-secondary">Secondary</button>
          <button className="btn btn-accent">Accent</button>
          <button className="btn btn-info">Info</button>
          <button className="btn btn-success">Success</button>
          <button className="btn btn-warning">Warning</button>
          <button className="btn btn-error">Error</button>
        </div>
        <textarea className="textarea my-3" placeholder="Bio"></textarea>
        <BasicLayout />
        <div className="prose prose-lg prose-pre:bg-amber-900">
          {/* <Markdown>{data}</Markdown> */}
          <Markdown remarkPlugins={[remarkGfm]}>{data}</Markdown>
        </div>
      </div>
    </>
  );
}
