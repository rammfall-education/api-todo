import { Theme } from '@prisma/client';

export const HASH_ROUNDS = 10;
export const EXPIRES_ACCESS_TOKEN = '15m';
export const DEFAULT_USER_THEME = Theme.dark;
export const DEADLINE_SESSION = 75;
