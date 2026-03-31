import world from "@/assests/authImg.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const notFound = () => {
  return (
    <div
      className="w-screen h-screen bg-[#F7F7F7] flex justify-center items-center"
      style={{
        backgroundImage: `url(${
          typeof world === "string" ? world : world.src
        })`,
      }}
    >
      <div
        className="bg-cover bg-center bg-no-repeat w-[900px] h-[700px] flex flex-col justify-center items-center"
        style={{
          backgroundImage: `url(${
            typeof world === "string" ? world : world.src
          })`,
        }}
      >
        <h2 className="text-[156px] text-[#333333] font-semibold leading-[115px] tracking-[1.62px] mt-40">
          404
        </h2>
        <h4 className="text-[54px] text-[#333333] font-medium leading-[56px] tracking-[4.68px] mt-4">
          Not Found
        </h4>
        <p className="font-medium leading-6 text-[#5C5C5C] my-12">
          Visited page not found, please go to homepage.
        </p>
        <Link href="/">
          <Button variant="link" className="text-xl font-medium">
            Go Home Page
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default notFound;
