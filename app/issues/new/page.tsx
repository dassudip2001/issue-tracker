"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const CreateIssuePage = () => {
  return (
    <>
      <div className="max-w-xl space-y-3">
        <TextField.Root placeholder="Enter Title"></TextField.Root>
        <TextArea placeholder="Reply to comment…" />
        <Button className="p-3 bg-blue-500 text-white rounded-md">
          Create Issue
        </Button>
      </div>
    </>
  );
};

export default CreateIssuePage;
