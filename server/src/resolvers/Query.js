async function feed(parent, args, context, info) {
  const where = args.filter
    ? {
        OR: [
          { description: { contains: args.filter } },
          { url: { contains: args.filter } }
        ]
      }
    : {};

  const links = await context.prisma.link.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy
  });

  const count = await context.prisma.link.count({ where });

  return {
    id: 'main-feed',
    links,
    count
  };
}

async function link(parent, args, context, info) {
  const link = await context.prisma.link.findUnique({
    where: {
      id: Number(args.id),
    },
  });

  if (!link) {
    throw new Error('No such link found');
  }
  return link
}

module.exports = {
  feed,
  link
};
