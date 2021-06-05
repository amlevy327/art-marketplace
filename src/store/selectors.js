import { get } from 'lodash'
import { createSelector } from 'reselect'

const account = state => get(state, 'web3.account')
export const accountSelector = createSelector(account, a => a)

const artGen0Loaded = state => get(state, 'artFactory.artGen0.loaded', false)
export const artGen0LoadedSelector = createSelector(artGen0Loaded, al => al)

const artGen0 = state => get(state, 'artFactory.artGen0.data', [])
export const artGen0Selector = createSelector(artGen0, a => a)