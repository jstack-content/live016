export type WithStatus<T> = T & { status?: 'pending' | 'error' };
