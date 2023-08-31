const fs = require('fs');
const csv = require('csv-parser');
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'qa',
  port: 5432,
});

function formatDate(timestamp) {
  return new Date(Number(timestamp)).toISOString().split('T')[0];
}

// very slow, only for practice
// use copyCSVtoDB instead
async function importCSVtoDB(filePath, tableName, columns) {
  const client = await pool.connect();

  try {
    const rows = [];
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
          if (data.date_written) {
            data.date_written = formatDate(data.date_written);
          }
          rows.push(data);
        })
        .on('end', resolve)
        .on('error', reject);
    });

    for (const row of rows) {
      const values = columns.map((col) => row[col]);
      const query = {
        text: `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${columns.map((_, i) => `$${i + 1}`).join(', ')})`,
        values,
      };
      await client.query(query);
    }

    console.log(`Imported ${rows.length} rows into ${tableName}`);
  } catch (err) {
    console.error('Error importing data:', err.stack);
  } finally {
    client.release();
  }
}

// COPY is much faster
async function copyCSVtoDB(filePath, tableName) {
  const client = await pool.connect();

  try {
    await client.query(`COPY ${tableName} FROM '${filePath}' DELIMITER ',' CSV HEADER`);
    console.log(`Successfully copied data from ${filePath} to ${tableName}`);
  } catch (err) {
    console.error('Error using COPY command:', err.stack);
  } finally {
    client.release();
  }
}

// put absolution path to files here
// copyCSVtoDB('questions.csv', 'questions');
// copyCSVtoDB('answers.csv', 'answers');
// copyCSVtoDB('answers_photos.csv', 'answer_photos');
