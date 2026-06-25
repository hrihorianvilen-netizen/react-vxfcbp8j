-- ============================================================================
-- Alimac Fitness OS — initial schema (roadmap stage 2)
-- Tables: profiles, exercises, routines, routine_exercises, workout_logs
-- Security: Row-Level Security so each user only touches their own rows;
--           the `exercises` catalog is readable by any authenticated user and
--           writable only by admins.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Helper: is the current user an admin? (used by admin-only write policies)
-- SECURITY DEFINER + stable so it can read profiles without recursing on RLS.
-- ---------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ---------------------------------------------------------------------------
-- profiles — 1:1 with auth.users, holds membership + gamification + metrics
-- ---------------------------------------------------------------------------
create table public.profiles (
  id                     uuid primary key references auth.users (id) on delete cascade,
  full_name              text,
  avatar_url             text,
  role                   text not null default 'member' check (role in ('member', 'admin')),
  membership_expires_at  timestamptz,
  xp                     integer not null default 0,
  streak                 integer not null default 0,
  weight_kg              numeric(5, 2),
  body_fat_pct           numeric(4, 1),
  muscle_mass_kg         numeric(5, 2),
  height_m               numeric(3, 2),
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by their owner"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Admins can manage all profiles"
  on public.profiles for all
  using (public.is_admin())
  with check (public.is_admin());

-- Auto-create a profile row whenever a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- exercises — shared catalog (managed by admins via the CMS in stage 6)
-- ---------------------------------------------------------------------------
create table public.exercises (
  id          bigint generated always as identity primary key,
  name        text not null,
  sets        text,
  rest        text,
  muscle      text,
  image_url   text,
  video_url   text,
  color       text,
  muscles     text[],
  description text,
  benefits    text,
  created_at  timestamptz not null default now()
);

alter table public.exercises enable row level security;

create policy "Exercises are readable by authenticated users"
  on public.exercises for select
  to authenticated
  using (true);

create policy "Admins manage the exercise catalog"
  on public.exercises for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- routines — a user's weekday assignment (e.g. Monday = Chest & Triceps)
-- ---------------------------------------------------------------------------
create table public.routines (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references public.profiles (id) on delete cascade,
  day_of_week smallint not null check (day_of_week between 0 and 6),
  title       text,
  created_at  timestamptz not null default now(),
  unique (user_id, day_of_week)
);

alter table public.routines enable row level security;

create policy "Users manage their own routines"
  on public.routines for all
  using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

-- ---------------------------------------------------------------------------
-- routine_exercises — ordered exercises within a routine
-- ---------------------------------------------------------------------------
create table public.routine_exercises (
  id          bigint generated always as identity primary key,
  routine_id  bigint not null references public.routines (id) on delete cascade,
  exercise_id bigint not null references public.exercises (id) on delete cascade,
  position    integer not null default 0,
  unique (routine_id, exercise_id)
);

alter table public.routine_exercises enable row level security;

-- Access is gated through the owning routine.
create policy "Users manage exercises of their own routines"
  on public.routine_exercises for all
  using (
    exists (
      select 1 from public.routines r
      where r.id = routine_id
        and (r.user_id = auth.uid() or public.is_admin())
    )
  )
  with check (
    exists (
      select 1 from public.routines r
      where r.id = routine_id
        and (r.user_id = auth.uid() or public.is_admin())
    )
  );

-- ---------------------------------------------------------------------------
-- workout_logs — one row per completed set/exercise; source for XP & streaks
-- ---------------------------------------------------------------------------
create table public.workout_logs (
  id           bigint generated always as identity primary key,
  user_id      uuid not null references public.profiles (id) on delete cascade,
  exercise_id  bigint not null references public.exercises (id) on delete cascade,
  performed_at timestamptz not null default now(),
  weight       text,
  reps         text,
  completed    boolean not null default true,
  xp_awarded   integer not null default 0
);

alter table public.workout_logs enable row level security;

create index workout_logs_user_performed_idx
  on public.workout_logs (user_id, performed_at desc);

create policy "Users read their own workout logs"
  on public.workout_logs for select
  using (auth.uid() = user_id or public.is_admin());

create policy "Users insert their own workout logs"
  on public.workout_logs for insert
  with check (auth.uid() = user_id);
