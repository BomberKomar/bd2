CREATE TABLE "medicalRecords" (
  "id" serial PRIMARY KEY,
  "patient_id" int NOT NULL,
  "record_text" text NOT NULL,
  "creation_date" timestamp NOT NULL DEFAULT 'now()',
  "updated_at" timestamp
);

CREATE TABLE "patients" (
  "id" serial PRIMARY KEY,
  "first_name" text NOT NULL,
  "last_name" text NOT NULL,
  "middle_name" text,
  "date_of_birth" date NOT NULL,
  "gender" text NOT NULL,
  "residential_address_id" int NOT NULL,
  "registration_date" timestamp NOT NULL DEFAULT 'now()'
);

ALTER TABLE "medicalRecords" ADD FOREIGN KEY ("patient_id") REFERENCES "patients" ("id");

INSERT INTO patients (first_name, last_name, middle_name, date_of_birth, gender, residential_address_id) VALUES ('John', 'Doe', 'A', '1980-01-01', 'Male', 1);

INSERT INTO patients (first_name, last_name, middle_name, date_of_birth, gender, residential_address_id) VALUES ('Jane', 'Smith', 'B', '1990-02-02', 'Female', 2);


INSERT INTO "medicalRecords" (patient_id, record_text) VALUES (1, 'Medical record text for patient 1');

INSERT INTO "medicalRecords" (patient_id, record_text)  VALUES (2, 'Medical record text for patient 2');

INSERT INTO "medicalRecords" (patient_id, record_text) VALUES (1, 'New medical record text for patient 1');

INSERT INTO "medicalRecords" (patient_id, record_text)  VALUES (1, 'Most new medical record text for patient 1');

INSERT INTO "medicalRecords" (patient_id, record_text)  VALUES (2, 'New medical record text for patient 2');
