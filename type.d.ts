declare module 'bun:test'

declare module '*.png' {
  const content: string;
  export default content;
}