import { describe, it, expect } from 'vitest'
import sanitizeHtml from 'sanitize-html'
import { SANITIZE_OPTIONS } from '../app/api/generate/sanitize-options'

describe('sanitization', () => {
  it('removes script tags, event handlers and javascript: URIs', () => {
    const malicious = `
      <p>Hello</p>
      <script>alert('x')</script>
      <a href="javascript:alert('x')" onclick="doEvil()">click</a>
      <img src="x" onerror="steal()" />
    `

    const cleaned = sanitizeHtml(malicious, SANITIZE_OPTIONS as any)

    expect(cleaned).toContain('<p>Hello</p>')
    expect(cleaned).not.toMatch(/<script/i)
    expect(cleaned).not.toContain('javascript:')
    expect(cleaned).not.toMatch(/on(error|click|load)/i)
  })
})
