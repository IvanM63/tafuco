import { prisma } from "@/utils/db";

export const GET = async (
  _request: Request,
  { params }: { params: { id: string } }
) => {
  if (!params.id)
    return new Response(JSON.stringify("Require Id"), { status: 400 });
  try {
    const address = await prisma.address.findMany({
      where: { userId: parseInt(params.id) },
    });
    return new Response(JSON.stringify(address));
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  if (!params.id)
    return new Response(JSON.stringify("Require Id"), { status: 400 });

  const { firstName, lastName, phone, address, city, country } =
    await request.json();

  if (!firstName || !lastName || !phone || !address || !city || !country)
    return new Response(JSON.stringify("Require field"), { status: 400 });

  try {
    //Try Upsert to database
    const newAddress = await prisma.address.upsert({
      where: {
        userId: parseInt(params.id),
      },
      update: {
        userId: parseInt(params.id),
        firstName,
        lastName,
        phone: phone,
        address,
        city,
        country,
      },
      create: {
        userId: parseInt(params.id),
        firstName,
        lastName,
        phone: phone,
        address,
        city,
        country,
      },
    });
    if (!newAddress)
      return new Response(
        JSON.stringify("Something error when creating address"),
        { status: 400 }
      );
    return new Response(JSON.stringify(newAddress), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
