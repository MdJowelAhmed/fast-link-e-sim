"use client";

import { useState } from "react";
import bg from "@/assests/profileBg.svg";
import ShortBanner from "../shared/ShortBanner";
import userImg from "@/assests/userImg.svg";
import Image from "next/image";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const Account = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Asadujjaman",
    email: "Asadujjaman@gmail.com",
    age: "25",
    dob: "1999-05-25",
    country: "USA",
    address: "51/A, park street ,New York",
    contact: "+0999999999999999",
    gender: "Male",
    occupation: "Student",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send formData to your API here
    console.log("Updated Data:", formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-[#F7F7F7] pb-[30px]">
      <ShortBanner img={bg} />
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        <Image src={userImg} alt="User Image" className="-mt-32 w-[240px]" />
      </div>

      <div
        className="max-w-[1220px] mx-4 xl:mx-auto px-4 sm:px-6 lg:px-16 py-16 bg-[#FDFDFD] rounded-b-3xl rounded-tl-3xl mt-4 flex flex-col gap-7 relative"
        style={{ boxShadow: "2px 2px 4px 1px rgba(0, 0, 0, 0.07)" }}
      >
        {!isEditing ? (
          <>
            <div className="text-[#5C5C5C] flex items-center">
              <p className="min-w-32 md:min-w-40">Name</p>
              <p>: {formData.name}</p>
            </div>
            <div className="text-[#5C5C5C] flex items-center">
              <p className="min-w-32 md:min-w-40">Email</p>
              <p>: {formData.email}</p>
            </div>
            <div className="text-[#5C5C5C] flex items-center">
              <p className="min-w-32 md:min-w-40">Age</p>
              <p>
                : {formData.age}, Date of birth:{" "}
                {new Date(formData.dob).toLocaleDateString()}
              </p>
            </div>
            <div className="text-[#5C5C5C] flex items-center">
              <p className="min-w-32 md:min-w-40">Country</p>
              <p>: {formData.country}</p>
            </div>
            <div className="text-[#5C5C5C] flex items-center">
              <p className="min-w-32 md:min-w-40">Address</p>
              <p>: {formData.address}</p>
            </div>
            <div className="text-[#5C5C5C] flex items-center">
              <p className="min-w-32 md:min-w-40">Contact No</p>
              <p>: {formData.contact}</p>
            </div>
            <div className="text-[#5C5C5C] flex items-center">
              <p className="min-w-32 md:min-w-40">Gender</p>
              <p>: {formData.gender}</p>
            </div>
            <div className="text-[#5C5C5C] flex items-center">
              <p className="min-w-32 md:min-w-40">Occupation</p>
              <p>: {formData.occupation}</p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="absolute -top-12 right-0 text-[#222222] font-medium px-6 py-3 bg-[#B0E0CA] rounded-t-lg"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Age"
                />
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Country"
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                />
              </div>
              <div>
                <Label htmlFor="contact">Contact No</Label>
                <Input
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="Contact No"
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) =>
                    setFormData({ ...formData, gender: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  placeholder="Occupation"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <Button
                type="submit"
                className="bg-primary hover:bg-primary text-white w-40 h-12"
              >
                Save
              </Button>
              <Button
                type="button"
                className="bg-[#ebebeb] hover:bg-[#ebebeb] w-40 h-12"
                variant="secondary"
                onClick={() => setIsEditing(false)}
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
