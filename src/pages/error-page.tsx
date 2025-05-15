export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-black mb-4">Det finns inget här...</h1>
        <p className="text-black mb-4">Whatever you were looking for is not here...</p>
        <a href="/" className="text-black underline">
          Go to the main screen
        </a>
      </div>
    </div>
  );
}