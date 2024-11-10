import fs from 'fs';
import path from 'path';

export const deleteFile = async (
    filename: string,
    location: '/uploads',
) => {
    try {
        const img = path.resolve(
            path.join(__dirname, `../public/${location}/${filename}`),
        );
        fs.unlinkSync(img);
        if (fs.existsSync(img)) {
            fs.unlinkSync(img);
            console.log(filename,' deleted');
        }
    } catch (err) {
        console.log((err as Error).message);
    }
};
