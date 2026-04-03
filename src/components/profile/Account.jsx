"use client";

import { useEffect, useRef, useState } from "react";
import bg from "@/assests/profileBg.svg";
import ShortBanner from "../shared/ShortBanner";
import userImg from "@/assests/userImg.svg";
import { imageUrl } from "@/components/shared/getImageUrl";
import Image from "next/image";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/helpers/authApi";
import Loading from "@/app/loading";
import { ImagePlus } from "lucide-react";

const formatDate = (value) => {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString();
};

const Account = () => {
  const { data, isLoading, isError, refetch, isFetching } =
    useGetMyProfileQuery();
  const [updateProfile, { isLoading: isSaving }] = useUpdateMyProfileMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [contact, setContact] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const profile = data?.data ?? null;
  const savedAvatarSrc = imageUrl(profile?.image);

  useEffect(() => {
    if (!profile || isEditing) return;
    setName(profile.name ?? "");
    setRole(profile.role ?? "");
    setContact(profile.contact ?? "");
    setImageFile(null);
    setImagePreview(null);
  }, [profile, isEditing]);

  useEffect(() => {
    if (!imageFile) {
      setImagePreview(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    setImageFile(file ?? null);
  };

  const handlePickImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleCancelEdit = () => {
    if (profile) {
      setName(profile.name ?? "");
      setRole(profile.role ?? "");
      setContact(profile.contact ?? "");
    }
    setImageFile(null);
    setImagePreview(null);
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", name.trim());
    fd.append("role", role.trim());
    fd.append("contact", contact.trim());
    if (imageFile) {
      fd.append("image", imageFile);
    }

    toast.loading("Saving profile...", { id: "profile-update" });

    try {
      const res = await updateProfile(fd).unwrap();

      if (res?.success !== false) {
        toast.success(res?.message || "Profile updated", {
          id: "profile-update",
        });
        setImageFile(null);
        setImagePreview(null);
        setIsEditing(false);
        return;
      }

      toast.error(res?.message || "Could not update profile", {
        id: "profile-update",
      });
    } catch (err) {
      const errors = err?.data?.errorMessages ?? err?.data?.errors;
      const firstValidation =
        Array.isArray(errors) && errors[0]?.message ? errors[0].message : null;
      const message =
        firstValidation ??
        err?.data?.message ??
        err?.data?.error ??
        err?.error ??
        "Something went wrong. Please try again.";
      toast.error(typeof message === "string" ? message : "Update failed", {
        id: "profile-update",
      });
    }
  };

  const displayAvatarSrc = imagePreview || savedAvatarSrc;

  if (isLoading && !profile) {
    return (
      <div className="bg-[#F7F7F7] pb-[30px] min-h-[50vh] flex items-center justify-center">
        <div className="col-span-full flex justify-center items-center w-full">
          <Loading />
        </div>
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="bg-[#F7F7F7] pb-[30px] min-h-[50vh] flex flex-col items-center justify-center gap-4">
        <p className="text-[#5C5C5C]">Could not load profile.</p>
        <Button type="button" onClick={() => refetch()} variant="secondary">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F7F7] pb-[30px]">
      <ShortBanner img={bg} />
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="-mt-32 w-[240px] h-[240px] rounded-full overflow-hidden border-4 border-white shadow-md bg-white relative">
          {displayAvatarSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={displayAvatarSrc}
              alt={profile.name || "Profile"}
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={userImg}
              alt={profile.name || "Profile"}
              width={240}
              height={240}
              className="object-cover w-full h-full"
            />
          )}
          {isEditing ? (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                aria-hidden
                tabIndex={-1}
                onChange={handleImageChange}
              />
              <div
                className="absolute inset-x-0 bottom-0 flex justify-center pb-3 pt-8 bg-gradient-to-t from-black/55 to-transparent pointer-events-none"
                aria-hidden
              >
                <button
                  type="button"
                  onClick={handlePickImageClick}
                  className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#333333] shadow-md border border-white/90 hover:bg-[#f7f7f7] transition-colors"
                  aria-label="Change profile photo"
                >
                  <ImagePlus className="h-5 w-5" strokeWidth={2} />
                </button>
              </div>
            </>
          ) : null}
        </div>
        {isFetching && !isLoading ? (
          <p className="text-sm text-[#5C5C5C] mt-2">Refreshing...</p>
        ) : null}
      </div>

      <div
        className="max-w-[1220px] mx-4 xl:mx-auto px-4 sm:px-6 lg:px-16 py-16 bg-[#FDFDFD] rounded-b-3xl rounded-tl-3xl mt-4 flex flex-col gap-7 relative"
        style={{ boxShadow: "2px 2px 4px 1px rgba(0, 0, 0, 0.07)" }}
      >
        {!isEditing ? (
          <>
            <div className="text-[#5C5C5C] flex items-center">
              <p className="min-w-32 md:min-w-40">Name</p>
              <p>: {profile.name ?? "—"}</p>
            </div>
            <div className="text-[#5C5C5C] flex items-center">
              <p className="min-w-32 md:min-w-40">Email</p>
              <p>: {profile.email ?? "—"}</p>
            </div>
            <div className="text-[#5C5C5C] flex items-center">
              <p className="min-w-32 md:min-w-40">Role</p>
              <p>: {profile.role ?? "—"}</p>
            </div>
            <div className="text-[#5C5C5C] flex items-center">
              <p className="min-w-32 md:min-w-40">Contact</p>
              <p>: {profile.contact ?? "—"}</p>
            </div>
            {/* <div className="text-[#5C5C5C] flex items-center">
              <p className="min-w-32 md:min-w-40">Referral code</p>
              <p>: {profile.refferal_code ?? "—"}</p>
            </div>
            <div className="text-[#5C5C5C] flex items-center">
              <p className="min-w-32 md:min-w-40">Verified</p>
              <p>: {profile.verified ? "Yes" : "No"}</p>
            </div>
            <div className="text-[#5C5C5C] flex items-center">
              <p className="min-w-32 md:min-w-40">Status</p>
              <p>: {profile.status ?? "—"}</p>
            </div>
            <div className="text-[#5C5C5C] flex items-center">
              <p className="min-w-32 md:min-w-40">Age</p>
              <p>: {profile.age ?? "—"}</p>
            </div>
            <div className="text-[#5C5C5C] flex items-center">
              <p className="min-w-32 md:min-w-40">Date of birth</p>
              <p>: {formatDate(profile.date_of_birth)}</p>
            </div>
            <div className="text-[#5C5C5C] flex items-center">
              <p className="min-w-32 md:min-w-40">Gender</p>
              <p>: {profile.gender ?? "—"}</p>
            </div>
            <div className="text-[#5C5C5C] flex items-center">
              <p className="min-w-32 md:min-w-40">Country</p>
              <p>: {profile.country || "—"}</p>
            </div> */}
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="absolute -top-12 right-0 text-[#222222] font-medium px-6 py-3 bg-[#B0E0CA] rounded-t-lg"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={profile.email ?? ""}
                  readOnly
                  disabled
                  className="bg-muted/50"
                />
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. USER, ARTIST"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contact">Contact</Label>
                <Input
                  id="contact"
                  name="contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Contact number"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <Button
                type="submit"
                className="bg-primary hover:bg-primary text-white w-40 h-12"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                className="bg-[#ebebeb] hover:bg-[#ebebeb] w-40 h-12"
                variant="secondary"
                disabled={isSaving}
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Account;
