import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const ouro = await prisma.category.create({
    data: {
      name: 'ouro',
    },
  });

  const prata = await prisma.category.create({
    data: {
      name: 'prata',
    },
  });

  const bronze = await prisma.category.create({
    data: {
      name: 'bronze',
    },
  });

  await prisma.tag.create({
    data: {
      slug: 'cda',
      name: 'Cidade Alta',
      image: 'https://cidadealtarp.com/imagens/challenge/cidade-alta.png',
      categoryId: ouro.id,
    },
  });

  await prisma.tag.create({
    data: {
      slug: 'cda-valley',
      name: 'Cidade Alta Valley',
      image:
        'https://cidadealtarp.com/imagens/challenge/cidade-alta-valley.png',
      categoryId: prata.id,
    },
  });

  await prisma.tag.create({
    data: {
      slug: 'policia',
      name: 'Policia do Cidade Alta',
      image: 'https://cidadealtarp.com/imagens/challenge/policia.png',
      categoryId: ouro.id,
    },
  });

  await prisma.tag.create({
    data: {
      slug: 'hospital',
      name: 'Hospital do Cidade Alta',
      image: 'https://cidadealtarp.com/imagens/challenge/hospital.png',
      categoryId: bronze.id,
    },
  });

  await prisma.tag.create({
    data: {
      slug: 'taxi',
      name: 'Taxi do Cidade Alta',
      image: 'https://cidadealtarp.com/imagens/challenge/taxi.png',
      categoryId: bronze.id,
    },
  });

  await prisma.tag.create({
    data: {
      slug: 'curuja',
      name: 'Coruja do Cidade Alta',
      image: 'https://cidadealtarp.com/imagens/challenge/coruja.png',
      categoryId: bronze.id,
    },
  });

  await prisma.tag.create({
    data: {
      slug: 'hiena',
      name: 'Hiena do Cidade Alta',
      image: 'https://cidadealtarp.com/imagens/challenge/hiena.png',
      categoryId: bronze.id,
    },
  });

  await prisma.tag.create({
    data: {
      slug: 'gato',
      name: 'Gato do Cidade Alta',
      image: 'https://cidadealtarp.com/imagens/challenge/gato.png',
      categoryId: bronze.id,
    },
  });

  await prisma.tag.create({
    data: {
      slug: 'urso',
      name: 'Urso do Cidade Alta',
      image: 'https://cidadealtarp.com/imagens/challenge/urso.png',
      categoryId: bronze.id,
    },
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
