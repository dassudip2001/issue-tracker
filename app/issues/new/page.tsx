"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
interface IssueForm {
  title: string;
  description: string;
}

const CreateIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();
  return (
    <>
      <form
        className="max-w-xl space-y-3"
        onSubmit={handleSubmit(
          async (data) =>
            await axios
              .post("/api/issue", data)
              .then(() => router.push("/issues"))
        )}
      >
        <TextField.Root
          placeholder="Enter Title"
          {...register("title")}
        ></TextField.Root>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <SimpleMDE placeholder="Reply to comment…" {...field} />
          )}
        />
        <Button className="p-3 bg-blue-500 text-white rounded-md">
          Create Issue
        </Button>
      </form>
    </>
  );
};

export default CreateIssuePage;
