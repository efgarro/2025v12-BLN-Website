import { ClientOnly, createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react';
import { useGetImageMixOptions } from '~/apiFns/apiFns';
import { ImageCluster } from '~/components/ImageCluster';

export const Route = createFileRoute('/_grounds/ranch')({
  head: () => ({
    meta: [
      {
        title: "Ranch Social Space",
      },
      {
        name: "description",
        content:
          "It includes a photo gallery on the ranch social shared space",
      },
    ],
  }),
  loader: ({ context }) => {
            // Kick off loading as early as possible!
            context.queryClient.prefetchQuery(
              useGetImageMixOptions("ranch")
            );
          },
  component: Ranch,
})

function Ranch() {
  return (
        <div>
          <Suspense fallback="Loading Middleman...">
            <ClientOnly>
              <ImageCluster image_mix_name={"ranch"}/>
            </ClientOnly>
          </Suspense>
          <div className="h-48 mb-12"></div>
        </div>
      );
}



