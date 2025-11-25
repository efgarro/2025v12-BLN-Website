import { ClientOnly, createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react';
import { useGetImageStackOptions } from '~/apiFns/apiFns';
import { ImageCluster } from '~/components/ImageCluster';

export const Route = createFileRoute('/habitat/trees')({
  loader: ({ context }) => {
                  // Kick off loading as early as possible!
                  context.queryClient.prefetchQuery(
                    useGetImageStackOptions("019aa989-0c0f-77a5-85eb-8cb8044cc909")
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
