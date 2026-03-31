import cardImg from "@/assests/cardImg.svg";
import simThumb from "@/assests/simThumb.svg";
import Image from "next/image";
import dataImg from "@/assests/data.svg";
import calenderImg from "@/assests/calender.svg";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Card, CardContent } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import ban from "@/assests/ban.png";
import nepal from "@/assests/nepal.png";
import australia from "@/assests/australia.png";
import canada from "@/assests/canada.png";
import germany from "@/assests/germany.png";
import bahrain from "@/assests/bahrain.png";
import japan from "@/assests/japan.png";
import morocco from "@/assests/morocco.png";
import newZealand from "@/assests/newZealand.png";
import portugal from "@/assests/portugal.png";
import southKorea from "@/assests/southKorea.png";
import turkey from "@/assests/turkey.png";
import uk from "@/assests/uk.png";
import usa from "@/assests/usa.png";
import Link from "next/link";

const countries = [
  {
    label: "Bangladesh",
    flag: ban,
  },
  {
    label: "Nepal",
    flag: nepal,
  },
  {
    label: "Australia",
    flag: australia,
  },
  {
    label: "USA",
    flag: usa,
  },
  {
    label: "UK",
    flag: uk,
  },
  {
    label: "Canada",
    flag: canada,
  },
  {
    label: "Germany",
    flag: germany,
  },
  {
    label: "Bahrain",
    flag: bahrain,
  },
  {
    label: "Japan",
    flag: japan,
  },
  {
    label: "Morocco",
    flag: morocco,
  },
  {
    label: "Portugal",
    flag: portugal,
  },
  {
    label: "New Zealand",
    flag: newZealand,
  },
  {
    label: "South Korea",
    flag: southKorea,
  },
  {
    label: "Turkey",
    flag: turkey,
  },
];

const SimCard = ({ discount }) => {
  return (
    <>
      <div
        className="rounded-2xl p-3 relative"
        style={{
          boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.12)",
        }}
      >
        <div className="flex gap-6 items-start mb-10">
          <Image src={cardImg} alt="eSIM Card" />
          <div>
            <h4 className="text-xl font-medium text-[#333333] mb-3">
              Fatafati
            </h4>
            <p className="text-primary text-sm">Bangladesh</p>
          </div>
        </div>

        <div className="flex justify-between items-center border-t pt-5">
          <div className="flex items-center gap-3">
            <Image src={dataImg} alt="eSIM Card" />
            <p className="text-sm">20 GB</p>
          </div>
          <p className="text-xl font-medium text-[#333333]">$38.00 USD</p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-3">
            <Image src={calenderImg} alt="eSIM Card" />
            <p className="text-sm">7 Day</p>
          </div>
          {discount && (
            <p className="text-[#FF4040] line-through text-xs">$40.00 USD</p>
          )}
        </div>

        <div className="mt-10">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full bg-transparent text-primary py-2 rounded-lg border-primary border cursor-pointer hover:bg-transparent">
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="lg:min-w-[960px] min-h-[740px] p-3 bg-[#F4F4F4]">
              <VisuallyHidden asChild>
                <DialogTitle>SIM Card Details</DialogTitle>
              </VisuallyHidden>
              <div className="h-[740px] overflow-y-scroll scrollbar-hide">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Left Side - Image */}
                  <div className="bg-gray-100 flex items-center justify-center">
                    <Image
                      src={simThumb}
                      alt="Fatafati eSIM"
                      className="rounded-md h-[293px] w-[464px]"
                    />
                  </div>

                  {/* Right Side - Info */}
                  <div className="md:pt-10 pb-5 md:px-10 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-medium leading-5 text-[#333333]">
                        Fatafati
                      </h2>
                      <p className="text-primary text-sm leading-5 mt-2 font-normal">
                        Bangladesh
                      </p>
                      <ul className="mt-6 text-sm space-y-2">
                        <li className="flex justify-between items-center">
                          <p className="text-[#5C5C5C] leading-5 opacity-80">
                            Data
                          </p>{" "}
                          <p className="text-[#5C5C5C] leading-5 opacity-80">
                            2 GB
                          </p>
                        </li>
                        <hr style={{ borderColor: "#C0C0C0" }} />
                        <li className="flex justify-between items-center">
                          <p className="text-[#5C5C5C] leading-5 opacity-80">
                            Validity
                          </p>{" "}
                          <p className="text-[#5C5C5C] leading-5 opacity-80">
                            7 Day
                          </p>
                        </li>
                        <hr style={{ borderColor: "#C0C0C0" }} />
                        <li className="flex justify-between items-center">
                          <p className="text-[#5C5C5C] leading-5 opacity-80">
                            Price
                          </p>{" "}
                          <p className="text-[#5C5C5C] leading-5 opacity-80">
                            $2.00 USD
                          </p>
                        </li>
                        <hr style={{ borderColor: "#C0C0C0" }} />
                      </ul>
                    </div>

                    <Link href={"/secure-checkout"}>
                      <Button className="w-full bg-primary hover:bg-primary h-12 mt-16">
                        BUY NOW
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm lg:mt-4">
                  {/* Additional Info */}
                  <Card className="py-0 shadow-none bg-[#FDFDFD] border-none">
                    <CardContent className="p-4">
                      <h3 className="text-lg text-[#333333] leading-5 font-medium mb-6">
                        Additional Information
                      </h3>
                      <ScrollArea className="h-[300px]">
                        <ul className="space-y-3">
                          <li className="flex flex-col gap-2">
                            <p className="text-xs text-[#C0C0C0] font-medium leading-5">
                              Plan Type
                            </p>{" "}
                            <p className="text-[#767676] text-xs leading-5">
                              Data Only
                            </p>
                          </li>
                          <li className="flex flex-col gap-2">
                            <p className="text-xs text-[#C0C0C0] font-medium leading-5">
                              IP Routing
                            </p>{" "}
                            <p className="text-[#767676] text-xs leading-5">
                              Yes
                            </p>
                          </li>
                          <li className="flex flex-col gap-2">
                            <p className="text-xs text-[#C0C0C0] font-medium leading-5">
                              Top-Up Option
                            </p>{" "}
                            <p className="text-[#767676] text-xs leading-5">
                              Data Only
                            </p>
                          </li>
                          <li className="flex flex-col gap-2">
                            <p className="text-xs text-[#C0C0C0] font-medium leading-5">
                              Validity Policy
                            </p>
                            <p className="text-[#767676] text-xs leading-5">
                              The validity period starts when the eSIM connects
                              to a mobile network in its coverage area. If you
                              install the eSIM outside of the coverage area, you
                              can connect to a network when you arrive.
                            </p>
                          </li>
                          <li className="flex flex-col gap-2">
                            <p className="text-xs text-[#C0C0C0] font-medium leading-5">
                              Other Info
                            </p>
                            <p className="text-[#767676] text-xs leading-5">
                              The validity period starts when the eSIM connects
                              to a mobile network in its coverage area. If you
                              install the eSIM outside of the coverage area, you
                              can connect to a network when you arrive.
                            </p>
                          </li>
                        </ul>
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  {/* Supported Countries */}
                  <Card className="py-0 shadow-none bg-[#FDFDFD] border-none">
                    <CardContent className="p-4">
                      <h3 className="text-lg text-[#333333] leading-5 font-medium md:mb-4">
                        Supported Country
                      </h3>
                      <ScrollArea className="h-[300px]">
                        <ul className="space-y-2">
                          {countries?.map((country) => (
                            <li
                              key={country?.label}
                              className="flex items-center gap-3 px-2 py-3"
                            >
                              <Image
                                src={country?.flag}
                                className="w-5 h-3"
                                alt="Bangladesh Flag"
                              />{" "}
                              <p className="text-xs text-[#767676] leading-5">
                                {country?.label}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Link href={"/secure-checkout"}>
            <Button className="w-full bg-primary text-white py-2 rounded-lg mt-2 uppercase cursor-pointer hover:bg-primary">
              Buy Now
            </Button>
          </Link>
        </div>

        {discount && (
          <div className="absolute -top-4 right-6 bg-[#FFABA9] px-4 py-1 rounded-full">
            <p className="text-white text-xs">20% Off</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SimCard;
