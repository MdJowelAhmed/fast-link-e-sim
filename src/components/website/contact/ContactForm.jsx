// app/components/ContactForm.jsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      /* 🔗 hit your API route or EmailJS endpoint here */

      toast.success("Message sent ✅");
      //   setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error("Something went wrong 😢");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto space-y-6 rounded-md p-6 bg-[#FDFDFD]"
    >
      {/* Row 1: Name + Phone */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name">Name</label>
          <Input
            id="name"
            name="name"
            className="h-12"
            placeholder="Type name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone">Contact Number</label>
          <Input
            id="phone"
            name="phone"
            className="h-12"
            placeholder="Type your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          name="email"
          className="h-12"
          placeholder="Type your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <label htmlFor="subject">Subject</label>
        <Input
          id="subject"
          name="subject"
          className="h-12"
          placeholder="Write subject"
          value={formData.subject}
          onChange={handleChange}
        />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message">Message</label>
        <Textarea
          id="message"
          name="message"
          className="h-60 shadow-none"
          placeholder="Type description"
          rows={6}
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full h-12 bg-[#333333] font-medium"
        disabled={loading}
      >
        {loading ? "Sending…" : "Submit"}
      </Button>
    </form>
  );
}
