import {
  writable
} from 'svelte/store'

export const username = writable(0)
export const userId = writable(0)
export const userSession = writable(0)
export const userValidSession = writable(0)
export const userProfilePicture = writable(0);
export const hasValueToPass = writable(0);
export const userProducts = writable(0);