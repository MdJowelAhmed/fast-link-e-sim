"use client";

import { IoIosArrowDown } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import userImg from "@/assests/userImg.svg";
import Image from "next/image";
import mySimIcon from "@/assests/mySim.svg";
import logoutIcon from "@/assests/logout.svg";
import settingIcon from "@/assests/setting.svg";
import starIcon from "@/assests/star.svg";
import earnIcon from "@/assests/earn.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useModal } from "@/contexts/ModalContext";
import { notifyAuthChange } from "@/helpers/authEvents";
import { useGetMyProfileQuery } from "@/helpers/authApi";
import { baseApi } from "@/helpers/baseApi";
import { imageUrl } from "@/components/shared/getImageUrl";

const UserDropdown = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { openFeedbackModal } = useModal();
  const { data } = useGetMyProfileQuery();
  const profile = data?.data ?? null;
  const avatarSrc = imageUrl(profile?.image);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("resetToken");
    dispatch(baseApi.util.resetApiState());
    notifyAuthChange();
    router.replace("/login");
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-[#F7F7F7] border-none cursor-pointer rounded-full shadow flex justify-center items-center gap-2 p-0.5 pr-2 focus:outline-none">
          {avatarSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarSrc}
              alt={profile?.name ? `${profile.name} profile` : "Profile"}
              className="w-10 h-10 rounded-full object-cover shrink-0"
            />
          ) : (
            <Image
              className="w-10 h-10 rounded-full object-cover"
              src={userImg}
              alt="User"
            />
          )}
          <IoIosArrowDown className="text-primary text-xl" />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end">
          <Link href={"/account"}>
            <DropdownMenuItem>
              {avatarSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarSrc}
                  alt=""
                  className="w-6 h-6 rounded-full object-cover shrink-0"
                />
              ) : (
                <Image className="w-6 h-6" src={userImg} alt="" />
              )}
              <span>My Account</span>
            </DropdownMenuItem>
          </Link>

          <Link href={"/my-eSIMs"}>
            <DropdownMenuItem>
              <Image className="w-6 h-6" src={mySimIcon} alt="User Image" />
              <span>My eSIM</span>
            </DropdownMenuItem>
          </Link>

          <Link href={"/invite-earn"}>
            <DropdownMenuItem>
              <Image className="w-6 h-6" src={earnIcon} alt="User Image" />
              <span>Invite & Earn</span>
            </DropdownMenuItem>
          </Link>

          <Link href={"/setting"}>
            <DropdownMenuItem>
              <Image className="w-6 h-6" src={settingIcon} alt="User Image" />
              <span>Account Setting</span>
            </DropdownMenuItem>
          </Link>

          {/* <Link href={"/feedback"}> */}
            <DropdownMenuItem onClick={openFeedbackModal}> 
              <Image className="w-6 h-6" src={starIcon} alt="User Image" />
              <span>Feedback</span>
            </DropdownMenuItem>
          {/* </Link> */}

          {/* <Dialog>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog> */}

          <DropdownMenuItem onClick={handleLogout}>
            <Image className="w-6 h-6" src={logoutIcon} alt="User Image" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDropdown;
