import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'link',
    title: 'Link',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required().max(100),
        }),
        defineField({
            name: 'url',
            title: 'URL',
            type: 'url',
            validation: (Rule) => Rule.required().uri({
                allowRelative: false,
                scheme: ['http', 'https'],
            }),
        }),
        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'string',
            description: 'React Icons component name (e.g., FaGithub, FaLinkedin)',
        }),
    ],
});