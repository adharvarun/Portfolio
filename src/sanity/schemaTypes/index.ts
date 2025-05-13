import { type SchemaTypeDefinition } from 'sanity'
import about from './about'
import experience from './experience'
import projects from './projects'
import contact from './contact'
import links from './links'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [about, experience, projects, contact, links],
}
