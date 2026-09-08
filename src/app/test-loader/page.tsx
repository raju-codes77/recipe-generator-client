export default async function TestLoaderPage() {
  // Simulate a slow network request to artificially trigger the loading state
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">This is the loaded test page!</h1>
    </div>
  );
}
