import { useQuery } from '@tanstack/react-query';
import { listUsers } from '../services/listUsers';
import { IUser } from '../types/IUser';
import { WithStatus } from '../types/utils';

export const USERS_QUERY_KEY = ['users'];

export type UsersQueryData = WithStatus<IUser>[];

export function useUsers() {
  const { data, isLoading } = useQuery({
    staleTime: Infinity,
    queryKey: USERS_QUERY_KEY,
    queryFn: async () => {
      const users = await listUsers();
      return users as UsersQueryData;
    },
  });

  return {
    users: data ?? [],
    isLoading,
  };
}
