/**
 * GENERATED FILE - do not edit.
 *
 * Source: lib/actions.js + client/index.js
 * Rebuild: node build.mjs
 */
window.__ModuleLoader__.load({
	id: "dsh-followup-actions",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		const React = require("react");
  /**
   * Follow-up actions for dsh-followup-actions.
   *
   * Pure data plus pure lookups: no DOM, no network, no dependencies. The browser
   * half inlines this file, so what the tests check is what the user clicks.
   *
   * The list is deliberately short and each entry names the *reaction*, not the
   * technique: someone who does not know they want a "socratic cross-examination"
   * still knows they want to ask "哪里可能不对".
   *
   * @module dsh-followup-actions/actions
   */

  /** Severity of the chip row, used only to group the display order. */
  const ACTIONS = [
    {
      id: 'plain',
      label: '说人话',
      title: '用大白话重讲一遍，不用行话',
      prompt: '把上面这条回答用大白话重讲一遍。假设我完全没有相关背景，不要用行话；先用一个生活里的类比，再讲清楚结论。',
    },
    {
      id: 'translate-zh',
      label: '翻译成中文',
      title: '把上一段回答翻译成中文',
      prompt: '把上面这条回答翻译成中文，保持原意，用自然的中文书面语，不要逐字直译。',
    },
    {
      id: 'shorter',
      label: '缩成三句',
      title: '压成结论、依据、下一步',
      prompt: '把上面这条回答压缩成三句话：第一句是结论，第二句是最重要的依据，第三句是我下一步该做什么。',
    },
    {
      id: 'steps',
      label: '给我步骤',
      title: '整理成能照着做的步骤',
      prompt: '把上面这条回答里我需要动手做的事，整理成按顺序执行的步骤。每一步写清楚：做什么、大概花多久、怎么确认这一步完成了。',
    },
    {
      id: 'table',
      label: '做成表格',
      title: '把关键信息整理成表格',
      prompt: '把上面这条回答里的关键信息整理成一张表格。如果里面在比较多个东西，每个对比维度单独一列，并在表格后写一句结论。',
    },
    {
      id: 'example',
      label: '举个例子',
      title: '给每个结论配一个具体例子',
      prompt: '给上面这条回答里的每个关键结论各举一个具体例子。一个来自日常生活，一个来自工作场景，每个例子两三句话。',
    },
    {
      id: 'doubt',
      label: '哪里可能不对',
      title: '指出可能的错误和没有依据的地方',
      prompt: '上面这条回答里有哪些地方可能不准、过时或者没有依据？请逐条指出，说明为什么可疑，以及我应该怎么验证。不要为了照顾我而略过。',
    },
    {
      id: 'email',
      label: '写成邮件',
      title: '改写成可以直接发的邮件',
      prompt: '把上面这条回答改写成一封可以直接发出去的邮件。要有称呼、正文和结尾；语气客气、简洁，不要出现「综上所述」这类空话。',
    },
    {
      id: 'english',
      label: '换成英文',
      title: '翻译成自然的英文',
      prompt: '把上面这条回答翻译成英文。保持原意和结构，用自然的书面英语，专业术语保留原词。',
    },
  ]

  /** The ids in display order, for tests and for a stable render key check. */
  function actionIds() {
    return ACTIONS.map(function (action) { return action.id })
  }

  /** Total number of actions, for the host-side boot line. */
  function actionCount() {
    return ACTIONS.length
  }

  /**
   * The prompt for one action id.
   * @param id - an action id from ACTIONS.
   * @returns the prompt, or null when the id is unknown.
   */
  function promptFor(id) {
    for (const action of ACTIONS) {
      if (action.id === id) return action.prompt
    }
    return null
  }

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

		exports.FollowupActions = FollowupActions;
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
