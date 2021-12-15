export default function Stringify({ obj }) {
  return <pre>{JSON.stringify(obj, null, 4)}</pre>;
}
