"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/contexts/ModalContext";
import { ConfigProvider, Rate } from "antd";
import { Button } from "../ui/button";

export default function FeedbackModal() {
  const { isFeedbackOpen, closeFeedbackModal } = useModal();

  return (
    <Dialog open={isFeedbackOpen} onOpenChange={closeFeedbackModal}>
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
              <Rate />
            </ConfigProvider>
          </div>
          <textarea
            className="w-full h-24 border rounded p-2"
            placeholder="Review"
          />
          <div className="flex justify-end mt-8">
            <Button
              className="bg-primary text-white h-12 w-[230px] rounded-md text-base font-normal leading-5 hover:bg-primary"
              onClick={closeFeedbackModal}
            >
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
