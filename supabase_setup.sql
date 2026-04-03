-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Safe enum creation
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('admin', 'member', 'public');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'request_status') THEN
    CREATE TYPE request_status AS ENUM ('new', 'contacted', 'paid_pending_confirmation', 'confirmed', 'closed');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'member_status') THEN
    CREATE TYPE member_status AS ENUM ('active', 'pending', 'suspended');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'announcement_status') THEN
    CREATE TYPE announcement_status AS ENUM ('draft', 'published');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  role user_role DEFAULT 'public',
  full_name TEXT,
  email TEXT UNIQUE NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS communities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS join_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  community_id UUID REFERENCES communities(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  status request_status DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  category TEXT,
  content TEXT NOT NULL,
  avatar_url TEXT,
  image_url TEXT,
  rating INTEGER DEFAULT 5,
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  featured_quote TEXT,
  featured_transformation TEXT,
  media_thumbnail_url TEXT,
  media_title TEXT,
  community_slug TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS announcements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT,
  author TEXT DEFAULT 'Admin',
  target TEXT DEFAULT 'All Communities',
  status announcement_status DEFAULT 'draft',
  views INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_content (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  community_id UUID REFERENCES communities(id),
  community_slug TEXT,
  country TEXT,
  status member_status DEFAULT 'active',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE communities ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE communities ADD COLUMN IF NOT EXISTS tagline TEXT;
ALTER TABLE communities ADD COLUMN IF NOT EXISTS summary TEXT;
ALTER TABLE communities ADD COLUMN IF NOT EXISTS who_its_for TEXT;
ALTER TABLE communities ADD COLUMN IF NOT EXISTS price_period TEXT DEFAULT 'one-off';
ALTER TABLE communities ADD COLUMN IF NOT EXISTS hero_image_url TEXT;
ALTER TABLE communities ADD COLUMN IF NOT EXISTS whatsapp_message TEXT;
ALTER TABLE communities ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]'::jsonb;
ALTER TABLE communities ADD COLUMN IF NOT EXISTS stats JSONB DEFAULT '[]'::jsonb;
ALTER TABLE communities ADD COLUMN IF NOT EXISTS comparison_points JSONB DEFAULT '[]'::jsonb;
ALTER TABLE communities ADD COLUMN IF NOT EXISTS focus_label TEXT;
ALTER TABLE communities ADD COLUMN IF NOT EXISTS focus_stage TEXT;
ALTER TABLE communities ADD COLUMN IF NOT EXISTS focus_outcome TEXT;
ALTER TABLE communities ADD COLUMN IF NOT EXISTS community_size_label TEXT;
ALTER TABLE communities ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;
ALTER TABLE communities ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

UPDATE communities
SET slug = CASE LOWER(name)
  WHEN 'better man' THEN 'better-man'
  WHEN 'innovation lab' THEN 'innovation-lab'
  WHEN 'budding ceos' THEN 'budding-ceos'
  ELSE LOWER(REGEXP_REPLACE(COALESCE(name, id::text), '[^a-z0-9]+', '-', 'g'))
END
WHERE slug IS NULL OR slug = '';

CREATE UNIQUE INDEX IF NOT EXISTS communities_slug_key ON communities(slug);

UPDATE members m
SET community_slug = c.slug
FROM communities c
WHERE m.community_id = c.id AND (m.community_slug IS NULL OR m.community_slug = '');

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_join_requests_updated_at ON join_requests;
CREATE TRIGGER update_join_requests_updated_at
  BEFORE UPDATE ON join_requests
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_site_content_updated_at ON site_content;
CREATE TRIGGER update_site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

ALTER TABLE communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE join_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION is_admin() RETURNS BOOLEAN AS $$
  BEGIN
    RETURN EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin');
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP POLICY IF EXISTS "Public can read communities" ON communities;
CREATE POLICY "Public can read communities" ON communities FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage communities" ON communities;
CREATE POLICY "Admins can manage communities" ON communities USING (is_admin());
DROP POLICY IF EXISTS "Public can insert join requests" ON join_requests;
CREATE POLICY "Public can insert join requests" ON join_requests FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admins can manage join requests" ON join_requests;
CREATE POLICY "Admins can manage join requests" ON join_requests USING (is_admin());
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
DROP POLICY IF EXISTS "Admins can manage profiles" ON profiles;
CREATE POLICY "Admins can manage profiles" ON profiles USING (is_admin());
DROP POLICY IF EXISTS "Public can read testimonials" ON testimonials;
CREATE POLICY "Public can read testimonials" ON testimonials FOR SELECT USING (is_published = true);
DROP POLICY IF EXISTS "Admins can manage testimonials" ON testimonials;
CREATE POLICY "Admins can manage testimonials" ON testimonials USING (is_admin());
DROP POLICY IF EXISTS "Public can read announcements" ON announcements;
CREATE POLICY "Public can read announcements" ON announcements FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage announcements" ON announcements;
CREATE POLICY "Admins can manage announcements" ON announcements USING (is_admin());
DROP POLICY IF EXISTS "Public can read site content" ON site_content;
CREATE POLICY "Public can read site content" ON site_content FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage site content" ON site_content;
CREATE POLICY "Admins can manage site content" ON site_content USING (is_admin());
DROP POLICY IF EXISTS "Public can read members" ON members;
CREATE POLICY "Public can read members" ON members FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage members" ON members;
CREATE POLICY "Admins can manage members" ON members USING (is_admin());

INSERT INTO communities (
  slug, name, tagline, summary, description, who_its_for, price, price_period,
  image_url, hero_image_url, whatsapp_message, features, stats, comparison_points,
  focus_label, focus_stage, focus_outcome, community_size_label, sort_order, is_active
) VALUES
('better-man','Better Man','Masculinity & Discipline','Master self-leadership before leading others.','A specialized track for men committed to building character, discipline, and intentionality in every area of life.','People serious about inner work, self-leadership, stronger communication, discipline, and personal standards.',15000,'one-off','https://picsum.photos/seed/betterman/800/1000','https://picsum.photos/seed/betterman-hero/1200/600','Hello, I want to join the Better Man Community. Please share the payment steps.','["Weekly character-building masterminds","Accountability partnerships","Physical fitness and discipline tracks","Spiritual growth and leadership training"]'::jsonb,'[{"label":"Active Members","value":"142","icon":"Users"},{"label":"Weekly Sessions","value":"3","icon":"Zap"},{"label":"Focus","value":"Discipline","icon":"Target"}]'::jsonb,'["Self-Leadership","Personal Mastery","Discipline","Intimate"]'::jsonb,'Primary Focus','Personal Mastery','Discipline','Intimate',1,true),
('innovation-lab','Innovation Lab','Creativity & Tech','A creative sanctuary for thinkers and builders.','Where faith meets innovation. A hub for creatives, tech enthusiasts, and problem-solvers building the future.','Creatives who want more structure, strategists who want more imagination, and builders who want to execute their ideas.',20500,'one-off','https://picsum.photos/seed/innovation/800/1000','https://picsum.photos/seed/innovation-hero/1200/600','Hello, I want to join the Innovation Lab Community. Please share the payment steps.','["Tech-focused workshops and bootcamps","Creative project collaborations","Mentorship from industry leaders","Product development and launch support"]'::jsonb,'[{"label":"Creators","value":"86","icon":"Users"},{"label":"Projects Launched","value":"45","icon":"Zap"},{"label":"Focus","value":"Execution","icon":"Target"}]'::jsonb,'["Creative Strategy","Idea / Concept","Execution","Collaborative"]'::jsonb,'Primary Focus','Idea / Concept','Execution','Collaborative',2,true),
('budding-ceos','Budding CEOs','Business & Entrepreneurship','Practical strategy for business builders.','Empowering the next generation of ethical business leaders and entrepreneurs to build impactful ventures.','Entrepreneurs, founders, side hustlers, and business builders who need accountability, structure, and peers who understand the work.',28000,'one-off','https://picsum.photos/seed/ceos/800/1000','https://picsum.photos/seed/ceos-hero/1200/600','Hello, I want to join the Budding CEOs Community. Please share the payment steps.','["Business strategy and planning sessions","Financial literacy and investment training","Networking with established entrepreneurs","Pitch competitions and funding advice"]'::jsonb,'[{"label":"Entrepreneurs","value":"54","icon":"Users"},{"label":"Businesses Started","value":"18","icon":"Zap"},{"label":"Focus","value":"Scale","icon":"Target"}]'::jsonb,'["Business Operations","Active Venture","Scale","Strategic"]'::jsonb,'Primary Focus','Active Venture','Scale','Strategic',3,true)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  summary = EXCLUDED.summary,
  description = EXCLUDED.description,
  who_its_for = EXCLUDED.who_its_for,
  price = EXCLUDED.price,
  price_period = EXCLUDED.price_period,
  image_url = EXCLUDED.image_url,
  hero_image_url = EXCLUDED.hero_image_url,
  whatsapp_message = EXCLUDED.whatsapp_message,
  features = EXCLUDED.features,
  stats = EXCLUDED.stats,
  comparison_points = EXCLUDED.comparison_points,
  focus_label = EXCLUDED.focus_label,
  focus_stage = EXCLUDED.focus_stage,
  focus_outcome = EXCLUDED.focus_outcome,
  community_size_label = EXCLUDED.community_size_label,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active;

INSERT INTO members (full_name, email, phone, community_slug, country, status)
VALUES
('Alex Rivera', 'alex@example.com', '+2348012345678', 'innovation-lab', 'Nigeria', 'active'),
('Sarah Chen', 'sarah@example.com', '+2348023456789', 'budding-ceos', 'Ghana', 'active'),
('Marcus Bell', 'marcus@example.com', '+2348034567890', 'better-man', 'Nigeria', 'pending'),
('Elena Gomez', 'elena@example.com', '+2348045678901', 'innovation-lab', 'Kenya', 'active'),
('David Okafor', 'david@example.com', '+2348056789012', 'budding-ceos', 'Nigeria', 'active')
ON CONFLICT (email) DO NOTHING;

UPDATE members m
SET community_id = c.id
FROM communities c
WHERE m.community_slug = c.slug AND m.community_id IS NULL;

INSERT INTO testimonials (name, role, category, content, avatar_url, image_url, rating, is_featured, featured_quote, featured_transformation, media_thumbnail_url, media_title, community_slug, sort_order)
VALUES
('Tunde Afolayan', 'Creative Director', 'Creativity', 'The Inner Circle gave me a compass for my creative life and a community that sharpened my discipline.', 'https://picsum.photos/seed/tunde/100/100', 'https://picsum.photos/seed/tunde/800/1000', 5, true, 'The Inner Circle gave me a compass for my creative life and a community that sharpened my discipline.', 'From scattered ideas to a structured creative agency.', 'https://picsum.photos/seed/video1/800/450', 'Creative breakthrough story', 'innovation-lab', 1),
('Amaka Eze', 'Tech Founder', 'Leadership', 'Finding a circle of peers who understand both leadership and faith has been life-changing.', 'https://picsum.photos/seed/amaka/100/100', 'https://picsum.photos/seed/amaka/800/1000', 5, true, 'Finding a circle of peers who understand both leadership and faith has been life-changing.', 'Developed the emotional intelligence to lead a growing startup team.', 'https://picsum.photos/seed/video2/800/450', 'Founder growth story', 'budding-ceos', 2),
('Grace Emmanuel', 'Designer', 'Creativity', 'I found my voice here and finally had the structure to create at a higher level.', 'https://picsum.photos/seed/grace/100/100', null, 5, false, null, null, null, null, 'innovation-lab', 3),
('Michael Chen', 'Product Manager', 'Faith', 'A community that values spiritual grounding as much as professional success.', 'https://picsum.photos/seed/michael/100/100', null, 5, false, null, null, null, null, 'better-man', 4)
ON CONFLICT DO NOTHING;

INSERT INTO announcements (title, body, author, target, status, views, published_at)
VALUES
('New Onboarding Workflow', 'We have updated the onboarding flow for new members.', 'Admin', 'All Communities', 'published', 1242, NOW() - interval '7 days'),
('Community Guidelines Update', 'Please review the latest updates to our guidelines.', 'Admin', 'Better Man', 'draft', 0, NULL),
('Upcoming CEO Summit 2024', 'Save the date for the next Budding CEOs summit.', 'Admin', 'Budding CEOs', 'published', 842, NOW() - interval '14 days')
ON CONFLICT DO NOTHING;

INSERT INTO site_content (key, value) VALUES
('app_settings', '{"whatsappNumber":"2348123456789","supportEmail":"hello@innercircle.com","supportPhone":"+234 812 345 6789"}'::jsonb),
('homepage_metrics', '{"weeklyMasterminds":3,"satisfaction":98,"growthRate":100}'::jsonb),
('brand_overview', '{"badge":"Our Essence","title":"A Movement of","highlight":"Intentional Souls.","description":"Inner Circle is a purpose-driven, faith-centered ecosystem for individuals committed to spiritual depth, mental clarity, and world-class impact."}'::jsonb),
('home_faqs', '[{"question":"What is The Inner Circle?","answer":"The Inner Circle is a purpose-driven, faith-centered community and movement of intentional individuals committed to growth, discipline, and impact."}]'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;


update communities
set
  name = 'Better Man Community',
  tagline = 'Before you lead a business, a family, or a movement, you have to lead yourself.',
  summary = 'Before you lead a business, a family, or a movement, you have to lead yourself. The Better Man Community is where that work begins.',
  description = 'Before you lead a business, a family, or a movement, you have to lead yourself. The Better Man Community is where that work begins. This is a space for personal mastery, developing the character, discipline, emotional intelligence, and internal clarity that every high-performing life is built on. The work here is deep, deliberate, and transformational.',
  who_its_for = 'People who want to build real discipline, think with more clarity, communicate with more power, and live by a standard they actually respect. If you are serious about the internal work, this is your community.',
  price = 15000,
  price_period = 'one-off'
where slug = 'better-man';

update communities
set
  name = 'Innovation Lab Community',
  tagline = 'A creative sanctuary for thinkers, makers, and builders.',
  summary = 'The Innovation Lab is a creative sanctuary for thinkers, makers, and builders.',
  description = 'The Innovation Lab is a creative sanctuary for thinkers, makers, and builders. If you have an idea worth building or you want to develop that instinct this is your space. We combine design thinking, creative strategy, and practical frameworks to help members move from concept to creation. Whether you are designing something new or reimagining something old, the Lab gives your ideas the structure they need to survive contact with the real world.',
  who_its_for = 'Creatives who want more structure. Strategists who want more imagination. Anyone sitting on an idea they have not been able to execute. If you think differently, build differently, or just refuse to accept things the way they are, the Innovation Lab was built for you.',
  price = 20500,
  price_period = 'one-off'
where slug = 'innovation-lab';

update communities
set
  name = 'Budding CEOs Community',
  tagline = 'Practical, real-world business knowledge for builders.',
  summary = 'Budding CEOs is built for members who are actively running or building a venture.',
  description = 'Budding CEOs is built for members who are actively running or building a venture and need practical, real-world business knowledge to match their ambition. This is not theory. This is strategy, operations, and leadership in a room full of people who are in the trenches with you. From your first business model to your first hire to your first scale, this is where you get equipped.',
  who_its_for = 'Entrepreneurs at any stage whether you have a registered business or just a burning idea you cannot let go of. Side hustlers ready to go full. Founders who need structure, accountability, and peers who actually understand the weight of building something from scratch.',
  price = 28000,
  price_period = 'one-off'
where slug = 'budding-ceos';
