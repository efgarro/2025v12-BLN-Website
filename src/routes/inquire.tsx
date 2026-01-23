import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start';
import axios from 'axios';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

export const getMdfile = createServerFn().handler(async () => {
  const response = await axios.get(
    "https://r2storage.bijalapa.com/prose/inquire.md"
  );
  return response.data;
});

export const Route = createFileRoute('/inquire')({
  component: RouteComponent,
  loader: async () => {
      return await getMdfile();
    },
})

function RouteComponent() {
  const data = Route.useLoaderData();
    return (
        <div>
          <div className="article_wrapper mt-6">
            <div className="prose prose-lg prose-pre:bg-amber-900">
              <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
                {data}
              </Markdown>
            </div>
          </div>
        </div>
      );
}
