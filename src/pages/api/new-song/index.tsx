import fs from "fs";
import path from "path";
import multer from "multer";

import prismaClient from "lib/prisma-client";
import { getValidatedUser } from "lib/auth/validator";
import withMiddleware, { HigherApiHandler } from "lib/with-middleware";

type MemoryFile = Pick<Express.Multer.File, "destination" | "filename" | "path">;

const multerStorage = multer.diskStorage({
  async destination(req, file, callback) {
    const user = await getValidatedUser(req);
    const isExcessiveSize = file.size <= 1024 ** 2 * 10;
    const isValidMime = file.mimetype.includes("audio/");
    const artistName = (req.body.artist as string).toLowerCase().trim().replace(/\s+/g, "-");

    if (isExcessiveSize || !isValidMime) return void callback(new Error("invalid file"), "");

    if (!user) return void callback(new Error("user does not exist"), "");

    const artistFolder = path.join(path.resolve("."), "public", "songs", artistName);

    try {
      const createdDir = await fs.promises.mkdir(artistFolder, { recursive: true });
      callback(null, createdDir || artistFolder);
    } catch (e) {
      callback(e as Error, "");
    }
  },
  async filename(req, file, callback) {
    const songName = (req.body.title as string).toLowerCase().trim().replace(/\s+/g, "-");
    const artistName = (req.body.artist as string).toLowerCase().trim().replace(/\s+/g, "-");
    const exists = await prismaClient.song.findFirst({ where: { name: songName, artist: { name: artistName } } });

    if (exists) {
      const existsError = new Error("song already exist");
      callback(existsError, "");
    } else {
      const songExtension = file.originalname.replace(/.+(?=\.\S+)/g, "");
      const songFileName = songName + songExtension;
      callback(null, songFileName);
    }
  },
});

const multerMiddleware = multer({ storage: multerStorage }).single("file");

const apiHandler: HigherApiHandler<{ file: Partial<MemoryFile> }> = async (req, res) => {
  const filePath = req.file.path;
  const redundantPath = path.join(path.resolve("."), "public");
  const url = filePath!.replace(redundantPath, "").replaceAll("\\", "/");
  const songName = (req.body.title as string).toLowerCase().trim().replace(/\s+/g, "-");
  const artistName = (req.body.artist as string).toLowerCase().trim().replace(/\s+/g, "-");

  await prismaClient.song.create({
    data: {
      name: songName,
      url,
      artist: {
        connectOrCreate: {
          where: { name: artistName },
          create: { name: artistName },
        },
      },
    },
  });

  return res.status(200).json({ message: "Song was added successfully" });
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withMiddleware(multerMiddleware, apiHandler);
