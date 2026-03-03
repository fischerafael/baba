# `use client` checklist

- Component has event handlers? (`onClick`, `onChange`, `onSubmit`) -> client.
- Component uses React client hooks? (`useState`, `useEffect`, `useRef`) -> client.
- Component uses browser globals? (`window`, `document`, `localStorage`) -> client.
- Can the interactive part be extracted to a smaller child? -> do it.
- Are props sent to client serializable? -> ensure yes.
- Is sensitive logic kept server-side? -> ensure yes.
