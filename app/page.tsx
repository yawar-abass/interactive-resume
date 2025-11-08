import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[400px] w-[400px] bg-indigo-500/30 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 h-[300px] w-[300px] bg-purple-500/30 blur-3xl rounded-full animate-pulse"></div>
      </div>

      <div className="text-center px-6 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Welcome!
        </h1>
        <p className="mt-4 text-gray-300 text-md md:text-xl">
          Frontend Developer Assignment for AlgoKart. Create and manage your
          interactive resume with ease.
        </p>
        <div className="mt-10">
          <Link href="/login">
            <Button className="px-8 py-6 cursor-pointer text-lg font-semibold rounded-2xl bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105">
              Login to Interactive Resume
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </Container>
  );
}
