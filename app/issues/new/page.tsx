"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const CreateIssuePage = () => {
  return (
    <>
      <div className="max-w-xl space-y-3">
        <TextField.Root placeholder="Enter Title"></TextField.Root>
        <SimpleMDE placeholder="Reply to comment…" />
        <Button className="p-3 bg-blue-500 text-white rounded-md">
          Create Issue
        </Button>
      </div>
    </>
  );
};

export default CreateIssuePage;
