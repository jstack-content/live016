import { useUpdateUser } from '@/app/hooks/useUpdateUser';
import { useUsers } from '@/app/hooks/useUsers';
import { cn } from '@/app/libs/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import { Switch } from './ui/Switch';
import { Skeleton } from './ui/skeleton';

export function UsersList() {
  const { users, isLoading } = useUsers();
  const { updateUser } = useUpdateUser();

  async function handleBlockedChange(id: string, blocked: boolean) {
    await updateUser({ id, blocked });
  }

  return (
    <div className="space-y-4">
      {isLoading && (
        <>
          <Skeleton className="h-[74px]" />
          <Skeleton className="h-[74px]" />
          <Skeleton className="h-[74px]" />
        </>
      )}

      {users.map(user => (
        <div
          key={user.id}
          className={cn(
            'border p-4 rounded-md flex items-center justify-between',
            user.status === 'pending' && 'opacity-70',
            user.status === 'error' && 'border-destructive bg-destructive/10',
          )}
        >
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={`https://github.com/${user.username}.png`} />
              <AvatarFallback>
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div>
              <strong className="text-lg block leading-4">{user.name}</strong>
              <small className="text-muted-foreground">@{user.username}</small>
            </div>
          </div>

          <Switch
            checked={user.blocked}
            onCheckedChange={(blocked) => handleBlockedChange(user.id, blocked)}
            disabled={user.status === 'pending' || user.status === 'error'}
          />
        </div>
      ))}
    </div>
  );
}
