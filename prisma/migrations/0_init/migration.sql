-- CreateTable
CREATE TABLE "VokabelEnglisch" (
    "ID" SERIAL NOT NULL,
    "Vokabel" VARCHAR NOT NULL,
    "Uebersetzung" VARCHAR NOT NULL,

    CONSTRAINT "VokabelEnglisch_pkey" PRIMARY KEY ("ID")
);

