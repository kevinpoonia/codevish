import { neon } from '@netlify/neon';

export default async (event, context) => {
  const postId = event.queryStringParameters.id;
  const sql = neon();
  const [post] = await sql`SELECT * FROM posts WHERE id = ${postId}`;
  // Return as JSON response
  return {
    statusCode: 200,
    body: JSON.stringify(post),
  };
};
