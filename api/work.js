import pool from '../utils/db.js';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://boyidris.vercel.app'); // restrict to your frontend
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ error: "Slug is required" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM posts WHERE slug = $1",
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Work not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error getting this work" });
  }
}
