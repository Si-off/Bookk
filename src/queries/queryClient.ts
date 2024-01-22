import { QueryClient } from '@tanstack/react-query';

const getQueryClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        retry: 0,
      },
    },
  });

  return queryClient;
};

export default getQueryClient;
