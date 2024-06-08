
-- Roles
INSERT INTO public."role" VALUES('ADM', 'administrator')
    ON CONFLICT("id") DO UPDATE SET "name" = excluded."name";

INSERT INTO public."role" VALUES('VST', 'visitor')
    ON CONFLICT("id") DO UPDATE SET "name" = excluded."name";

INSERT INTO public."role" VALUES('VGT', 'vigilant')
    ON CONFLICT("id") DO UPDATE SET "name" = excluded."name";

INSERT INTO public."role" VALUES('RST', 'resident')
    ON CONFLICT("id") DO UPDATE SET "name" = excluded."name";

INSERT INTO public."role" VALUES('ECG', 'responsible')
    ON CONFLICT("id") DO UPDATE SET "name" = excluded."name";