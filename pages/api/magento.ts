import type { NextApiRequest, NextApiResponse } from "next";

// CORS was not allowing me to use useQuery for magento so I used route apis instead
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }
  const { variables, query } = req.body;
  const data = await fetch("https://magento.test/graphql", {
    body: JSON.stringify({ variables, query }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  res.status(200).json({ data });
}
