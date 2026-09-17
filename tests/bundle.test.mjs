/**
 * Contract test for the generated browser bundle: it must be valid, register
 * under the package name, and wire the row into the assistant action slot.
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function loadBundle() {
  let registration = null
  globalThis.window = { __ModuleLoader__: { load(reg) { registration = reg } } }
  const react = {
    createElement: function () {
      return { type: arguments[0], props: arguments[1] || {}, children: Array.prototype.slice.call(arguments, 2) }
    },
    useMemo: function (fn) { return fn() },
    useState: function (initial) { return [typeof initial === 'function' ? initial() : initial, function () {}] },
    useEffect: function () {},
    useRef: function (value) { return { current: value } },
  }
  const code = readFileSync(join(root, 'lib/client.js'), 'utf8')
  new Function(code)()
  assert.ok(registration, 'the bundle must register with the module loader')
  const mod = registration.factory(function (name) {
    if (name === 'react') return react
    throw new Error('unexpected require: ' + name)
  })
  return { registration, mod }
}

test('the generated bundle registers under the package name', () => {
  const { registration } = loadBundle()
  assert.equal(registration.id, 'dsh-followup-actions')
})

test('the client half registers in the assistant action slot', () => {
  const { mod } = loadBundle()
  assert.deepEqual(mod.inject, ['slots'])
  const injected = []
  const registered = []
  let style = null
  globalThis.document = {
    createElement: function () { style = { id: '', textContent: '', remove: function () {} }; return style },
    head: { append: function () {} },
  }
  const ctx = {
    effect: function (fn, label) { assert.equal(typeof label, 'string'); assert.equal(typeof fn(), 'function') },
    slots: {
      inject: function (name, cb) { injected.push(name); cb() },
      register: function (options, Component) { registered.push({ options, Component }); return function () {} },
    },
  }
  mod.apply(ctx)
  assert.deepEqual(injected, ['conversation.chat.assistant-actions'])
  assert.equal(registered[0].options.name, 'conversation.chat.assistant-actions')
  assert.equal(registered[0].options.id, 'followup-actions')
  assert.ok(style && style.id === 'dsh-followup-actions-style')
  assert.ok(style.textContent.indexOf('dfa-chip') !== -1)
})

test('every action becomes a chip, and a click writes the full follow-up question', () => {
  const { mod } = loadBundle()
  const written = []
  const node = mod.FollowupActions({ inputActions: { setDraft: function (text) { written.push(text) } } })
  const chips = node.children[1]
  assert.equal(chips.length, 9)
  for (const chip of chips) assert.equal(chip.props.className, 'dfa-chip')
  chips[0].props.onClick()
  assert.equal(written.length, 1)
  assert.ok(written[0].indexOf('上面这条回答') !== -1)
  assert.ok(written[0].length > 20)
})
