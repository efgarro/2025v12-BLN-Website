import { ClientOnly, createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react';
import { useGetImageStackOptions } from '~/apiFns/apiFns';
import { ImageCluster } from '~/components/ImageCluster';

export const Route = createFileRoute('/activities/restaurants')({
    loader: ({ context }) => {
                // Kick off loading as early as possible!
                context.queryClient.prefetchQuery(
                  useGetImageStackOptions("019aa7b8-2cf0-7f0a-ab87-8f2609341a82")
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
