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
export const ACTIONS = [
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
export function actionIds() {
  return ACTIONS.map(function (action) { return action.id })
}

/** Total number of actions, for the host-side boot line. */
export function actionCount() {
  return ACTIONS.length
}

/**
 * The prompt for one action id.
 * @param id - an action id from ACTIONS.
 * @returns the prompt, or null when the id is unknown.
 */
export function promptFor(id) {
  for (const action of ACTIONS) {
    if (action.id === id) return action.prompt
  }
  return null
}
