export default function ImagePlaygroundPage() {
  return (
    <iframe
      src="/image-playground/index.html"
      className="fixed inset-0 w-full h-full border-0"
      allow="clipboard-read; clipboard-write"
    />
  )
}
