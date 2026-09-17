/**
 * Host half of dsh-followup-actions.
 *
 * The actions are static data and the row is pure UI, so this half owns no
 * service and touches no request path. It exists to be a real loader entry and
 * to print the shipped action list once at boot.
 *
 * @module dsh-followup-actions
 */

import { actionCount, actionIds } from './lib/actions.js'

/**
 * Announce the actions this build ships.
 * @param ctx - host plugin context.
 */
export function apply(ctx) {
  ctx.logger?.info?.('followup-actions: 追问快捷键已挂载 - ' + actionCount() + ' 个 (' + actionIds().join(', ') + ')')
}
