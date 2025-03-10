---
title: Markdown Field
prev: /docs/fields/textarea
next: /docs/fields/date
---

The `markdown` field represents a chunk of markdown content. This field is typically used for the body of markdown files.

## Definition

Below is an example of how a `markdown` field could be defined in a Gatsby remark form. Read more on passing in form field options [here](/docs/gatsby/markdown#customizing-remark-forms).

```javascript
const BlogPostForm = {
  fields: [
    {
      name: 'rawMarkdownBody',
      component: 'markdown',
      label: 'Post Body',
      description: 'Edit the body of the post here',
    },
    // ...
  ],
}
```

## Options

 - `name`: The path to some value in the data being edited.
 - `component`: The name of the React component that should be used to edit this field. Available field component types are [defined here](/docs/concepts/fields#field-types)
 - `label`: A human readable label for the field. This label displays in the sidebar and is optional. If no label is provided, the sidebar will default to the name.
 - `description`: An optional description that expands on the purpose of the field or prompts a specific action.

```typescript
interface MarkdownConfig {
  name: string
  component: 'markdown'
  label?: string
  description?: string
}
```
