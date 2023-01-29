import type { Transaction, User } from "@prisma/client";

import { prisma } from "~/db.server";

export function createTransaction({
  description,
  price,
  userId,
}: Pick<Transaction, "description" | "price"> & {
  userId: User["id"];
}) {
  return prisma.transaction.create({
    data: {
      description,
      price,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function getTransactions({ userId }: { userId: User["id"] }) {
  return prisma.transaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}
