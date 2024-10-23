import { prisma } from "@/utils/db";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (_request: Request) => {
  try {
    const users = await prisma.user.findMany();
    if (!users)
      return new Response(JSON.stringify("User not found"), { status: 500 });
    return new Response(JSON.stringify(users), { status: 500 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
