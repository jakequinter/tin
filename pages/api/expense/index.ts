import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { prisma } from '@/lib/prisma';

// GET /api/category
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  // POST /api/expense
  if (req.method === 'GET') {
    if (session && session.user) {
      const result = await prisma.expense.findMany({
        where: {
          userId: session.user.id,
        }
      });

      return res.status(200).json(result);
    }
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  // POST /api/expense
  // Required fields in body: name, amount, categoryId
  if (req.method === 'POST') {
    const { name, amount, categoryId } = req.body;

    if (session && session.user) {
      const result = await prisma.expense.create({
        data: {
          name,
          amount,
          categoryId,
          userId: session.user.id,
        },
      });

      return res.status(200).json(result);
    } else {
      return res.status(401).send({ message: 'Unauthorized' });
    }
  }
}