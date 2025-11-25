import { ClientOnly, createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react';
import { useGetImageStackOptions } from '~/apiFns/apiFns';
import { ImageCluster } from '~/components/ImageCluster';

export const Route = createFileRoute('/grounds/ranch')({
  loader: ({ context }) => {
            // Kick off loading as early as possible!
            context.queryClient.prefetchQuery(
              useGetImageStackOptions("019aa644-6a98-7328-82b0-bf7c08d46fea")
            );
          },
  component: Ranch,
})

function Ranch() {
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



