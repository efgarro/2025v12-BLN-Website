import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import EmblaCarousel from "~/components/carousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";

export const getMarkdownfile = createServerFn().handler(async () => {
  const response = await axios.get(
    "https://r2storage.bijalapa.com/prose/baqueano/bijagual-waterfall.md",
  );

  return response.data;
});

export const Route = createFileRoute("/baqueano/town-of-bijagual")({
  head: () => ({
    meta: [
      {
        title: "Town of Bijagual",
      },
      {
        name: "description",
        content:
          "It features an article with information on the town of Bijagual",
      },
    ],
  }),
  loader: async () => {
    // Kick off loading as early as possible!
    return await getMarkdownfile();
  },
  component: RouteComponent,
});

const OPTIONS: EmblaOptionsType = { loop: true, duration: 30 };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const singles = [
  {
    id: "019d1883-d2c2-702a-b23f-b2fd7e5a4c96",
    url: "https://r2storage.bijalapa.com/hiking/8910fd6b67f2_bijagual-waterfall-at-second-entrance-private-reserve.jpg",
    orientation: "por",
    description:
      "Bijagual Waterfall with viewpoint positioned at the bottom of the waterfall with visitors in the foreground",
    figcaption: "Rushing Water at Second Entrance",
  },
  {
    id: "019aabac-1494-7dd7-986a-ad8aa7f4bfce",
    url: "https://r2storage.bijalapa.com/rooms/59b8d3307f3d_balcon-3.jpg",
    orientation: "lan",
    description: "Hiking tour group arriving at a river pool",
    figcaption: "Balcony at BijaLapa Natural",
  },
  {
    id: "019a967b-025a-7b6d-88a8-83a3a9388811",
    url: "https://r2storage.bijalapa.com/hiking/8910fd6b67f2_bijagual-waterfall-at-second-entrance-private-reserve.jpg",
    orientation: "por",
    description:
      "The lodge building lighted at night features two side-by-side mirrored rooms sharing a balcony",
    figcaption: "Rushing Water at Second Entrance",
  },
  {
    id: "019a967b-00a3-7c08-9699-87e1d0789418",
    url: "https://r2storage.bijalapa.com/rooms/7c6e3308998e_room-with-view-guarumo-01.JPEG",
    orientation: "lan",
    description:
      "The room bathroom is a mixture of modern fixtures and materials and traditional handcrafted furniture",
    figcaption: "Guarumo Insight View at Second Entrance",
  },
  {
    id: "019a967b-00b9-7c51-8451-bc59f0371287",
    url: "https://r2storage.bijalapa.com/rooms/bc59f0371287_interior-guarumo-1.jpg",
    orientation: "lan",
    description:
      "The Guarumo Room features two full-size handcrafted beds, framed paintings on the wall and large windows with French doors",
    figcaption: "Interior Guarumo at Second Entrance",
  },
];

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <div>
      <div className="article_wrapper mt-8 mb-12">
        {/* <div className="prose prose-lg prose-pre:bg-amber-900">
          <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
            {data}
          </Markdown>
        </div> */}
        <EmblaCarousel slides={singles} options={OPTIONS} />
        {/* <EmblaCarousel slides={SLIDES} options={OPTIONS} /> */}
      </div>
    </div>
  );
}
