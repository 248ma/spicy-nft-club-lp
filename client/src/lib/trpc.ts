// Static site implementation - no backend TRPC
export const trpc = {
  useQuery: () => ({ data: null, isLoading: false, error: null }),
  useMutation: () => ({ mutate: () => {}, isLoading: false, error: null }),
} as any;
