db = connect("mongodb://localhost/db_psql");

db.createUser({
  user: "postgres",
  pwd: "postgres",
  roles: [{ role: "readWrite", db: "db_psql" }],
  passwordDigestor: "server",
});

db.createCollection("patients");

db.patients.insertMany([
    {
        first_name: 'John',
        last_name: 'Doe',
        middle_name: 'A',
        date_of_birth: new Date('1980-01-01'),
        gender: 'Male',
        residential_address_id: 1,
        records: [{text: 'Medical record text for patient 1', date_created: new Date('2017-02-02')}, {text: 'New medical record text for patient 1', date_created: new Date('2023-02-02')}]
    },
    {
        first_name: 'Jane',
        last_name: 'Smith',
        middle_name: 'B',
        date_of_birth: new Date('1990-02-02'),
        gender: 'Female',
        residential_address_id: 2,
        records: [{text: 'Medical record text for patient 2', date_created: new Date('2020-02-02')}, {text: 'New medical record text for patient 2', date_created: new Date('2021-02-02')}, {text: 'Most new medical record text for patient 2', date_created: new Date('2022-02-02')}]
    }
]);
