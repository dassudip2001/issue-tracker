"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/models/issue";
import { z } from "zod";
type IssueForm = z.infer<typeof issueSchema>;

const CreateIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();
  return (
    <>
      <form
        className="max-w-xl space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issue", data);
            router.push("/issues");
          } catch (error) {
            console.error(error);
            setError("Failed to create issue");
          }
        })}
      >
        <TextField.Root
          placeholder="Enter Title"
          {...register("title")}
        ></TextField.Root>
        {errors.title && <p>{errors.title.message}</p>}
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <SimpleMDE placeholder="Reply to comment…" {...field} />
          )}
        />
        {errors.description && <p>{errors.description.message}</p>}
        <Button className="p-3 bg-blue-500 text-white rounded-md">
          Create Issue
        </Button>
      </form>
    </>
  );
};

export default CreateIssuePage;
