// api/works.js
import pool from '../utils/db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://boyidris.vercel.app'); // restrict to your frontend
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let page = parseInt(req.query.page) || 1;
    if (page <= 0) page = 1;
    const limit = 12;
    const offset = (page - 1) * limit;

    // Get total count
    const totalResult = await pool.query('SELECT COUNT(*) FROM posts');
    const total = parseInt(totalResult.rows[0].count, 10);

    // Get paginated posts
    const postsResult = await pool.query(
      'SELECT * FROM posts ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );

    res.status(200).json({
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      items: postsResult.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch works' });
  }
}
