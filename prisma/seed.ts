import { PrismaClient } from '@prisma/client';
import { readFile } from 'node:fs';

const prisma = new PrismaClient();
async function main() {
  await prisma.category.create({
    data: {
      name: 'ouro',
    },
  });

  await prisma.category.create({
    data: {
      name: 'prata',
    },
  });

  await prisma.category.create({
    data: {
      name: 'bronze',
    },
  });

  await readFile('./prisma/datas/tag.csv', async (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const datas = String(data).split('\r\n');
    await Promise.all(
      datas.map(async (data) => {
        const formatedData = data.split(',');
        await prisma.tag.create({
          data: {
            slug: formatedData[1],
            name: formatedData[2],
            image: formatedData[3],
            categoryId: Number(formatedData[4]),
          },
        });
      }),
    );
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
