import { prisma } from "@/utils/db";

export const GET = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: Request,
  { params }: { params: { id: string } }
) => {
  if (!params.id)
    return new Response(JSON.stringify("Require user id!"), { status: 400 });
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(params.id),
      },
    });

    if (!user)
      return new Response(JSON.stringify("User not found"), { status: 404 });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  //Check if params contain userId or not!
  if (!params.id)
    return new Response(JSON.stringify("Require user id!"), { status: 400 });

  //Deconstruct from request
  const { fullName, username, gender } = await request.json();

  //Check if body response exist
  if (!fullName || !username || !gender)
    return new Response(JSON.stringify("Require body!"), { status: 400 });

  try {
    //1. Go straight update user to database
    const userUpdate = await prisma.user.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        fullName,
        username,
        gender,
      },
    });
    if (!userUpdate)
      return new Response(JSON.stringify("User not found"), {
        status: 404,
      });
    return new Response(JSON.stringify("Success update user"), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
