import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import prisma from "@/prisma/client";
const issueSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(3),
});

export async function POST(req: NextRequest, res: NextResponse) {
  // code here
  const body = await req.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  }

  // Save the issue to the database
  const issue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(issue, { status: 201 });
}
