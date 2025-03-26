import GenerateInput from "@/components/generate-input";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 ">
      <h1 className="text-center text-4xl md:text-6xl font-bold mb-4 max-w-4xl">
        <span className="bg-gradient-to-r from-blue-800  to-rose-500 text-transparent bg-clip-text ">
          Create beautiful Image with Artificial Intelligence
        </span>
      </h1>

      <p className=" text-center mb-12">
        Get started with our AI-powered image generator tools
      </p>
      <GenerateInput />
    </div>
  );
}
