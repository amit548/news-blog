import { promisify } from 'util';
import { unlink } from 'fs';
import { join } from 'path';

export const makeId = (length: number) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const deleteFile = async (fileName: string) => {
  const unlinkFile = promisify(unlink);
  try {
    await unlinkFile(join(__dirname, '../../public/images/' + fileName));
  } catch (_) {}
};
