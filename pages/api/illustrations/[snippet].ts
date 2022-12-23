import { GetCommand } from '@aws-sdk/lib-dynamodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ddbDocClient } from '../../../lib/ddbDocClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { Item } = await ddbDocClient.send(
        new GetCommand({
          TableName: process.env.TABLE_NAME,
          Key: {
            PK: 'Illustration#' + req.query.snippet,
          },
        })
      );
      return res.status(200).json(Item);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
}