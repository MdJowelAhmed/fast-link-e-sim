import bg from "@/assests/shortBannerBg.svg";
import BackButton from "./BackButton";

const ShortBanner = ({ text, img }) => {
  return (
    <div>
      <section
        className="h-[180px] bg-cover bg-center bg-no-repeat w-full bg-[#F7F7F7] mt-20"
        style={{
          backgroundImage: `url(${
            img
              ? typeof img === "string"
                ? img
                : img?.src
              : typeof bg === "string"
              ? bg
              : bg.src
          })`,
        }}
      >
        <div className="flex flex-col items-center justify-center h-full max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-primary text-3xl">{text}</h2>
          <div className="absolute top-3 left-10">
            <BackButton />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShortBanner;
