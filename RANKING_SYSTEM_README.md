# Movie Ranking System Implementation

## Changes Made

### 1. Database Schema (schema.prisma)
Added two new fields to Movie model:
- `views` (Int, default: 0) - Tracks download/view count
- `isEditorPick` (Boolean, default: false) - Marks editor's choice movies

### 2. API Endpoints

#### GET /api/movies/ranked
Returns 24 movies arranged in 4 rows (6 per row) based on ranking algorithm.

**Response Format:**
```json
{
  "row1": [...],  // Best 6 movies overall
  "row2": [...],  // Top 6 Hollywood movies
  "row3": [...],  // Top 6 Indian movies
  "row4": [...]   // Variety/Discovery 6 movies
}
```

#### POST /api/movies/:slug/view
Increments view count for a movie (call when user visits detail page or downloads).

**Response:**
```json
{
  "success": true,
  "views": 123
}
```

### 3. Ranking Algorithm

**Score Formula:**
```
score = 0.45 × recency_score
      + 0.25 × popularity_score
      + 0.12 × rating_score
      + 0.18 × editorial_score
```

**Components:**
- **recency_score**: Based on upload date (newer = higher, decays over 30 days)
- **popularity_score**: views / max_views (normalized 0-1)
- **rating_score**: IMDb rating / 10
- **editorial_score**: 1 if isEditorPick, else 0

### 4. Industry Quotas
- Minimum 8 Hollywood movies
- Minimum 8 Indian (Bollywood/South) movies
- Maximum 16 per industry
- Total exactly 24 movies

### 5. Admin Panel Updates
Added checkbox in Admin form:
- ⭐ Editor's Pick (boosts ranking by 18%)

### 6. Usage

**Frontend Integration:**
```typescript
// Fetch ranked movies for homepage
const response = await fetch('http://localhost:3001/api/movies/ranked');
const { row1, row2, row3, row4 } = await response.json();

// Display in 4 rows × 6 columns grid
<div className="grid grid-cols-6 gap-4">
  {row1.map(movie => <MovieCard key={movie.id} movie={movie} />)}
</div>
// Repeat for row2, row3, row4

// Increment views when user visits movie detail page
await fetch(`http://localhost:3001/api/movies/${slug}/view`, { method: 'POST' });
```

### 7. Migration Applied
Run this if needed:
```bash
npx prisma db push
npx prisma generate
```

## Testing

1. Add some movies with different:
   - Upload dates (recent vs old)
   - Ratings (high vs low)
   - Quality (BluRay vs CAM)
   - Origins (Hollywood vs Bollywood)
   - Editor's Pick status

2. Call `/api/movies/ranked` to see the sorted results

3. Increment views on popular movies to see them rank higher

## Notes

- Views start at 0 for all existing movies
- Mark important movies as "Editor's Pick" to boost their ranking
- The system automatically balances Hollywood and Indian content
- Ranking updates in real-time based on current data
