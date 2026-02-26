-- Create a table for public profiles
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  USING ( true );

CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

CREATE POLICY "Users can update own profile."
  ON public.profiles FOR UPDATE
  USING ( auth.uid() = id );

-- Create UserSneakers table
CREATE TABLE public.user_sneakers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  sneaker_id TEXT NOT NULL, -- ID from thesneakerdatabase.com
  brand TEXT NOT NULL,
  name TEXT NOT NULL,
  image_url TEXT,
  is_running_shoe BOOLEAN DEFAULT false,
  total_steps INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.user_sneakers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own sneakers."
  ON public.user_sneakers FOR SELECT
  USING ( auth.uid() = user_id );

CREATE POLICY "Users can view all sneakers (for leaderboard)."
  ON public.user_sneakers FOR SELECT
  USING ( true );

CREATE POLICY "Users can insert their own sneakers."
  ON public.user_sneakers FOR INSERT
  WITH CHECK ( auth.uid() = user_id );

CREATE POLICY "Users can update their own sneakers."
  ON public.user_sneakers FOR UPDATE
  USING ( auth.uid() = user_id );

CREATE POLICY "Users can delete their own sneakers."
  ON public.user_sneakers FOR DELETE
  USING ( auth.uid() = user_id );

-- Create DailyLogs table
CREATE TABLE public.daily_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  user_sneaker_id UUID REFERENCES public.user_sneakers(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  steps INTEGER DEFAULT 0,
  photo_proof_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, date) -- One log per user per day
);

ALTER TABLE public.daily_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Daily logs visible by everyone (leaderboards)."
  ON public.daily_logs FOR SELECT
  USING ( true );

CREATE POLICY "Users can insert their own logs."
  ON public.daily_logs FOR INSERT
  WITH CHECK ( auth.uid() = user_id );

CREATE POLICY "Users can update their own logs."
  ON public.daily_logs FOR UPDATE
  USING ( auth.uid() = user_id );

-- Database Functions for steps
CREATE OR REPLACE FUNCTION update_sneaker_steps()
RETURNS TRIGGER AS $$
BEGIN
  -- If inserting/updating log, add steps to the shoe's total_steps
  -- A real app needs more robust diff logic if updating existing steps.
  -- For MVP, just simple increment.
  IF TG_OP = 'INSERT' THEN
    UPDATE public.user_sneakers
    SET total_steps = total_steps + NEW.steps
    WHERE id = NEW.user_sneaker_id;
  ELSIF TG_OP = 'UPDATE' THEN
    UPDATE public.user_sneakers
    SET total_steps = total_steps + (NEW.steps - OLD.steps)
    WHERE id = NEW.user_sneaker_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_daily_log_insert_update
  AFTER INSERT OR UPDATE ON public.daily_logs
  FOR EACH ROW
  EXECUTE FUNCTION update_sneaker_steps();
