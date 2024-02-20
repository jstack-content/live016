import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../services/createUser';
import { USERS_QUERY_KEY, UsersQueryData } from './useUsers';

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createUser,
    onMutate: (variables) => {
      const tmpUserId = String(Math.random());

      queryClient.setQueryData<UsersQueryData>(
        USERS_QUERY_KEY,
        (old) => old?.concat({
          ...variables,
          id: tmpUserId,
          status: 'pending',
        }),
      );

      return { tmpUserId };
    },
    onSuccess: async (data, _variables, context) => {
      await queryClient.cancelQueries({ queryKey: USERS_QUERY_KEY });

      queryClient.setQueryData<UsersQueryData>(
        USERS_QUERY_KEY,
        (old) => old?.map(user => (
          user.id === context.tmpUserId
            ? data
            : user
        )),
      );
    },
    onError: async (_error, _variables, context) => {
      await queryClient.cancelQueries({ queryKey: USERS_QUERY_KEY });

      queryClient.setQueryData<UsersQueryData>(
        USERS_QUERY_KEY,
        (old) => old?.map(user => (
          user.id === context?.tmpUserId
            ? { ...user, status: 'error' }
            : user
        )),
      );
    },
  });

  return {
    createUser: mutateAsync,
    isLoading: isPending,
  };
}
