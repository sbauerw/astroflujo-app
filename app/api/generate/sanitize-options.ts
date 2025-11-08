import type { IOptions } from 'sanitize-html'

export const SANITIZE_OPTIONS: IOptions = {
  // Permitir solo las etiquetas básicas que usamos en los prompts
  allowedTags: ['h2', 'p', 'ul', 'li', 'strong', 'em', 'br', 'a'],
  // Atributos permitidos (muy conservador)
  allowedAttributes: {
    a: ['href', 'target', 'rel']
  },
  // Permitir solo esquemas seguros en enlaces
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  transformTags: {
    a: (tagName: string, attribs: Record<string, any>) => ({
      tagName: 'a',
      attribs: {
        href: attribs.href || '#',
        target: '_blank',
        rel: 'nofollow noopener noreferrer'
      }
    })
  }
}
