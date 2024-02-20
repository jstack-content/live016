import { sleep } from '../libs/utils';
import { IUser } from '../types/IUser';

type IUpdateUserDTO = Partial<Omit<IUser, 'id'>> & { id: string };

export async function updateUser({ id, blocked, name, username }: IUpdateUserDTO) {
  await sleep(500);

  const response = await fetch(`http://localhost:3000/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      blocked,
      name,
      username,
    }),
  });
  const body = await response.json();

  return body as IUser;
}
