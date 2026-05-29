# Fire Alarm Ops

Operations management platform for fire alarm companies — project management, device address calculation, and employee timesheets.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI**: Material UI v5
- **Database**: PostgreSQL via Prisma ORM
- **Auth**: NextAuth v5 (credentials)
- **Containers**: Docker + Docker Compose
- **CI/CD**: GitHub Actions

## Roles

| Role       | Access                                          |
|------------|-------------------------------------------------|
| Admin      | Full access — users, all projects, all data     |
| Manager    | Projects, timesheets, address calculator        |
| Technician | Assigned projects, timesheets, address calc     |
| Viewer     | Read-only access to projects                    |

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/your-org/fire-alarm-ops.git
cd fire-alarm-ops
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### 3. Start the database

```bash
docker compose -f docker/docker-compose.yml up postgres -d
```

### 4. Run migrations & seed

```bash
npm run db:migrate
npm run db:seed
```

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Seed credentials:**
- `admin@firealarmops.com` / `Admin1234!`
- `manager@firealarmops.com` / `Manager1234!`
- `tech@firealarmops.com` / `Tech1234!`

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm test` | Run unit tests |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:seed` | Seed the database |

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Login, register pages
│   ├── (dashboard)/     # All protected pages
│   │   ├── admin/       # Admin-only pages
│   │   ├── components/  # Shared dashboard components
│   │   └── ...
│   └── api/             # API route handlers
├── components/
│   ├── layout/          # ThemeRegistry, shells
│   └── ui/              # Reusable UI components
├── lib/                 # auth.ts, prisma.ts
├── middleware.ts         # Route protection & RBAC
└── types/               # TypeScript type definitions
```
