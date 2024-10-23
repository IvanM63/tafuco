import { prisma } from "@/utils/db";

export const GET = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: Request,
  { params }: { params: { id: string } }
) => {
  //Go try catch to supabase databae
  try {
    const result = await prisma.product.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!result)
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
      });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
