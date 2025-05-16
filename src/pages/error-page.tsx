export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-start justify-start flex-col p-8">
      <div className="max-w-lg text-left">

        <h3 className="text-5xl font-bold text-gray-800 mb-4">Det finns inget här...</h3>
        <p className="text-black mb-4">Whatever you were looking for is not here...</p>
        <a href="/" className="text-black underline">
          Go to the main screen
        </a>

      </div>
    </div>
  );
}