"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/contexts/ModalContext";
import { ConfigProvider, Rate } from "antd";
import { Button } from "../ui/button";
import { useCreateReviewMutation } from "@/helpers/reviewApi";
import toast from "react-hot-toast";

export default function FeedbackModal() {
  const { isFeedbackOpen, closeFeedbackModal } = useModal();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [createReview, { isLoading }] = useCreateReviewMutation();

  const handleClose = () => {
    setRating(0);
    setComment("");
    closeFeedbackModal();
  };

  const handleSubmit = async () => {
    if (!rating) {
      toast.error("Please select a rating", { id: "review" });
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write your feedback", { id: "review" });
      return;
    }

    try {
      const res = await createReview({
        rating,
        comment: comment.trim(),
      }).unwrap();

      if (res?.success) {
        toast.success(res.message || "Review submitted successfully", {
          id: "review",
        });
        handleClose();
        return;
      }

      toast.error(res?.message || "Could not submit review", { id: "review" });
    } catch (err) {
      const errors = err?.data?.errorMessages ?? err?.data?.errors;
      const firstValidation =
        Array.isArray(errors) && errors[0]?.message
          ? errors[0].message
          : null;
      const message =
        firstValidation ??
        err?.data?.message ??
        err?.data?.error ??
        err?.error ??
        "Something went wrong. Please try again.";

      toast.error(
        typeof message === "string" ? message : "Could not submit review",
        { id: "review" }
      );
    }
  };

  return (
    <Dialog open={isFeedbackOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-normal leading-8 text-left">
            Your Feedback
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <div className="mb-5">
            <ConfigProvider
              theme={{
                components: {
                  Rate: {
                    starSize: 24,
                  },
                },
              }}
            >
              <Rate value={rating} onChange={setRating} />
            </ConfigProvider>
          </div>
          <textarea
            className="w-full h-24 border rounded p-2"
            placeholder="Review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-end mt-8">
            <Button
              className="bg-primary text-white h-12 w-[230px] rounded-md text-base font-normal leading-5 hover:bg-primary"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Confirm"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
