CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION update_updatedAt()
RETURNS TRIGGER AS $$
BEGIN
   NEW."updatedAt" = now();
   RETURN NEW;
END;
$$ language "plpgsql";

BEGIN;
CREATE TABLE IF NOT EXISTS "users" (
  "userId" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "email" VARCHAR NOT NULL,
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY("userId"),
  UNIQUE("email")
);

CREATE TRIGGER update_users_updatedAt BEFORE UPDATE
  ON users FOR EACH ROW EXECUTE PROCEDURE 
  update_updatedAt();

COMMIT;