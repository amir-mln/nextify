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

const uspsertedArtists = artistsData.map(upsertArtist);

Promise.all(uspsertedArtists)
  .then(() => {
    const firstName = "Amir";
    const lastName = "Molaeyan";
    const email = "admin@admins.com";
    const salt = bcrypt.genSaltSync();
    const password = bcrypt.hashSync("password", salt);

    return prisma.user.upsert({
      where: { email },
      update: {},
      create: { email, password, firstName, lastName },
    });
  })
  .then(async (user) => {
    const songs = await prisma.song.findMany({});

    for (let i = 0; i < 10; i++) {
      await prisma.playlist.create({
        data: {
          name: `Playlist #${i + 1}`,
          user: {
            connect: { id: user.id },
          },
          songs: {
            connect: songs.map((song) => ({ id: song.id })),
          },
        },
      });
    }
  })
  .catch((e: Error) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
