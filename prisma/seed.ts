import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { artistsData } from "./songsData";

const prisma = new PrismaClient();

const firstName = "Amir";
const lastName = "Molaeyan";
const email = "admin@admins.com";
const salt = bcrypt.genSaltSync();
const password = bcrypt.hashSync("password", salt);

const userUpsert = prisma.user.upsert({
  where: { email },
  update: {},
  create: { email, password, firstName, lastName },
});

const songs = prisma.song.findMany({});

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

const createdPlaylists = Array(10)
  .fill(0)
  .map(async (_, i) =>
    prisma.playlist.create({
      data: {
        name: `Playlist #${i + 1}`,
        user: {
          connect: { id: (await userUpsert).id },
        },
        songs: {
          connect: (await songs).map((song) => ({
            id: song.id,
          })),
        },
      },
    })
  );

// i don't need to add songs and user to this array since i `await` them in `createdPlaylists`
const seeds = [...uspsertedArtists, ...createdPlaylists];

Promise.all(seeds)
  .catch((e: Error) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
