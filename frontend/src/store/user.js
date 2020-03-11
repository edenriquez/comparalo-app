import {
  writable
} from 'svelte/store'

export const username = writable(0)
export const userSession = writable(0)
export const userValidSession = writable(0)