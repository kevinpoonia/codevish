import { neon } from '@netlify/neon';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, subject, message } = JSON.parse(event.body);

    const sql = neon();  // uses NETLIFY_DATABASE_URL env variable
    await sql`
      INSERT INTO enquiries (name, email, subject, message)
      VALUES (${name}, ${email}, ${subject}, ${message})
    `;

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Enquiry saved successfully' }),
    };

  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
