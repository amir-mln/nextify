import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { artistsData } from "./songsData";

const prisma = new PrismaClient();

function upsertArtist(artist: typeof artistsData[number]) {
  const createdSongs = artist.songs.map(({ name, duration, url }) => ({ name, duration, url }));

  return prisma.artist.upsert({
    where: { name: artist.name },
    update: {},
    create: {
      name: artist.name,
      songs: { create: createdSongs },
    },
  });
}
const artistUpserts = artistsData.map(upsertArtist);

const email = "admin@admins.com";
const salt = bcrypt.genSaltSync();
const password = bcrypt.hashSync("password", salt);

const user = prisma.user.upsert({
  where: { email },
  update: {},
  create: { email, password },
});

const seeds = [...artistUpserts, user];

Promise.all(seeds)
  .catch((e: Error) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
