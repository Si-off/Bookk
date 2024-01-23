import { QueryClient, QueryClientConfig } from '@tanstack/react-query';

const getQueryClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        gcTime: Infinity,
        retry: 0,
      },
    },
  } as QueryClientConfig);

  return queryClient;
};

export default getQueryClient;
