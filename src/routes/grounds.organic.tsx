import { ClientOnly, createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react';
import { useGetImageStackOptions } from '~/apiFns/apiFns';
import { ImageCluster } from '~/components/ImageCluster';

export const Route = createFileRoute('/grounds/organic')({
    loader: ({ context }) => {
          // Kick off loading as early as possible!
          context.queryClient.prefetchQuery(
            useGetImageStackOptions("019a9182-7e9e-774b-803f-1daea2a6e3f6")
          );
        },
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <div>
        <Suspense fallback="Loading Middleman...">
          <ClientOnly>
            <ImageCluster />
          </ClientOnly>
        </Suspense>
      </div>
    );
}
