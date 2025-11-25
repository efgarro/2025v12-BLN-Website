import { ClientOnly, createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react';
import { useGetImageStackOptions } from '~/apiFns/apiFns';
import { ImageCluster } from '~/components/ImageCluster';

export const Route = createFileRoute('/activities/hiking')({
  loader: ({ context }) => {
            // Kick off loading as early as possible!
            context.queryClient.prefetchQuery(
              useGetImageStackOptions("019a939d-cbf3-783d-8d26-0bebc531acb7")
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
