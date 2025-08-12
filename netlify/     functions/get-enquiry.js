import { neon } from '@netlify/neon';

// Create a Neon SQL client that uses the env NETLIFY_DATABASE_URL
const sql = neon();

export const handler = async (event, context) => {
  try {
    // Example: Query to get all enquiries
    const enquiries = await sql`SELECT * FROM enquiries;`;
    
    return {
      statusCode: 200,
      body: JSON.stringify(enquiries),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
