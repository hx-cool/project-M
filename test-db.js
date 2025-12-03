import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('Testing database connection...');
    const movieCount = await prisma.movie.count();
    console.log(`✓ Database connected successfully!`);
    console.log(`✓ Total movies in database: ${movieCount}`);
    
    if (movieCount > 0) {
      const recentMovies = await prisma.movie.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, title: true, year: true }
      });
      console.log('\nRecent movies:');
      recentMovies.forEach(m => console.log(`  - ${m.title} (${m.year})`));
    }
  } catch (error) {
    console.error('✗ Database connection failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
