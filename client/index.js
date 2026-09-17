/**
 * Browser half of dsh-followup-actions.
 *
 * This file is a FACTORY BODY, not a module: build.mjs inlines it (plus
 * lib/actions.js) into the generated lib/client.js, so everything below runs
 * inside the module-loader factory closure where React and the action helpers
 * are already in scope.
 *
 * It appends one chip row to conversation.chat.assistant-actions, the action
 * row under a finished assistant message. Picking a chip writes a full
 * follow-up question into the composer; it never sends by itself.
 */

const h = React.createElement

/** Injected stylesheet owner id; removed when the plugin unloads. */
const STYLE_ID = 'dsh-followup-actions-style'

const CSS = [
  '.dfa-root {',
  '  display: flex;',
  '  flex-wrap: wrap;',
  '  align-items: center;',
  '  gap: 4px;',
  '  margin: 2px 0 0;',
  '  font: 12px/1.4 ui-sans-serif, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;',
  '}',
  '.dfa-label { color: var(--dsw-alias-label-tertiary); margin-right: 2px; white-space: nowrap; }',
  '.dfa-chip {',
  '  padding: 2px 9px;',
  '  border: 1px solid var(--dsw-alias-border-l2);',
  '  border-radius: 999px;',
  '  background: transparent;',
  '  color: var(--dsw-alias-label-secondary);',
  '  font: inherit;',
  '  cursor: pointer;',
  '  white-space: nowrap;',
  '}',
  '.dfa-chip:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }',
  '.dfa-chip:active { transform: translateY(1px); }',
  '@media (prefers-reduced-motion: reduce) { .dfa-chip:active { transform: none; } }',
].join('\n')

/**
 * The chip row. Each chip writes one complete follow-up question into the
 * composer, so the user can edit it before sending.
 * @param props - assistant-action slot props; only inputActions is read.
 * @returns the row element.
 */
function FollowupActions(props) {
  const actions = props.inputActions
  const chips = ACTIONS.map(function (action) {
    return h('button', {
      type: 'button',
      className: 'dfa-chip',
      key: action.id,
      title: action.title,
      onClick: function () {
        if (actions && typeof actions.setDraft === 'function') actions.setDraft(action.prompt)
      },
    }, action.label)
  })
  return h('div', { className: 'dfa-root', role: 'group', 'aria-label': '接着问' },
    h('span', { className: 'dfa-label' }, '接着问：'),
    chips)
}

/** Cordis services this browser half waits for: the slot registry. */
const inject = ['slots']

/**
 * Register the chip row under finished assistant messages, and keep the
 * stylesheet tied to this fiber's lifetime.
 * @param ctx - browser-half plugin context.
 */
function apply(ctx) {
  ctx.effect(function () {
    const style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent = CSS
    document.head.append(style)
    return function () { style.remove() }
  }, 'followup-actions: stylesheet')

  ctx.slots.inject('conversation.chat.assistant-actions', function () {
    return ctx.slots.register({ name: 'conversation.chat.assistant-actions', id: 'followup-actions' }, FollowupActions)
  })
}
