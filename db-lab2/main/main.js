const { Connection } = require("postgresql-client");
const { MongoClient } = require("mongodb");

const postgresConnection = new Connection({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "db_psql",
});

const mongoClient = new MongoClient("mongodb://localhost/db_psql");

async function fetchDataFromMongoDB() {
  const db = mongoClient.db("db_psql");
  const collection = db.collection("patients");

  await collection.find({first_name: 'John'});
}

async function fetchDataFromPostgreSQL() {
  await postgresConnection.query(
    `SELECT p.id, first_name, last_name, date_of_birth, gender, residential_address_id, creation_date, record_text  FROM patients p
    INNER JOIN "medicalRecords" mr ON mr.patient_id = p.id AND p.first_name='John'`
  );
}

async function calculateAsyncFunctionExecutionTime(fn) {
  const start = Date.now();

  return fn().then(() => Date.now() - start);
}

async function main() {
  await Promise.all([postgresConnection.connect(), mongoClient.connect()]);

  const [mongoDBExecutionTime, postgresExecutionTime] = await Promise.all([
    calculateAsyncFunctionExecutionTime(fetchDataFromMongoDB),
    calculateAsyncFunctionExecutionTime(fetchDataFromPostgreSQL),
  ]);

  console.log(`MongoDB execution time: ${mongoDBExecutionTime}ms`);
  console.log(`PostgreSQL execution time: ${postgresExecutionTime}ms`);

  await Promise.all([mongoClient.close(), postgresConnection.close()]);
}

main();
