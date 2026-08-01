import Button from "@/components/button/Button";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
      <p className="mt-4 text-lg text-gray-600">
        This is a simple example of a React component using Tailwind CSS.
      </p>
      <Button variant="outline" onClick={() => console.log("Button clicked!")}>
        Click me
      </Button>
    </div>
  );
}

export default HomePage;
