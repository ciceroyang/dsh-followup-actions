import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ACTIONS, actionCount, actionIds, promptFor } from '../lib/actions.js'

test('the row has enough actions to be worth a row, and no duplicates', () => {
  assert.ok(actionCount() >= 8, 'expected at least 8 actions')
  assert.equal(new Set(actionIds()).size, actionIds().length)
})

test('every action is complete and usable as-is', () => {
  for (const action of ACTIONS) {
    assert.ok(action.label.length > 0, 'empty label: ' + action.id)
    assert.ok(action.label.length <= 8, 'label too long for a chip: ' + action.id)
    assert.ok(action.title.length > 0, 'empty title: ' + action.id)
    assert.ok(action.prompt.length >= 20, 'prompt too short: ' + action.id)
  }
})

test('every prompt refers to the previous answer, so it works without the message text', () => {
  for (const action of ACTIONS) {
    assert.ok(action.prompt.indexOf('上面这条回答') !== -1, 'prompt does not reference the previous answer: ' + action.id)
  }
})

test('promptFor resolves a known id and refuses an unknown one', () => {
  assert.equal(promptFor('plain'), ACTIONS[0].prompt)
  assert.equal(promptFor('doubt'), ACTIONS.find(a => a.id === 'doubt').prompt)
  assert.equal(promptFor('nope'), null)
  assert.equal(promptFor(''), null)
  assert.equal(promptFor(undefined), null)
})
