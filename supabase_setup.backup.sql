-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
CREATE TYPE user_role AS ENUM ('admin', 'member', 'public');
CREATE TYPE request_status AS ENUM ('new', 'contacted', 'paid_pending_confirmation', 'confirmed', 'closed');

-- Profiles Table
CREATE TABLE profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    role user_role DEFAULT 'public',
    full_name TEXT,
    email TEXT UNIQUE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Communities Table
CREATE TABLE communities (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Join Requests Table
CREATE TABLE join_requests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    community_id UUID REFERENCES communities(id),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    status request_status DEFAULT 'new',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed Communities
INSERT INTO communities (name, price, description) VALUES
('Better Man', 15000, 'Masculinity & Discipline'),
('Innovation Lab', 20500, 'Creativity & Tech'),
('Budding CEOs', 28000, 'Business & Entrepreneurship');

-- Updated_at Trigger Function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_join_requests_updated_at
    BEFORE UPDATE ON join_requests
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- RLS Policies
ALTER TABLE communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE join_requests ENABLE ROW LEVEL SECURITY;

-- Helper: Admin Check
CREATE OR REPLACE FUNCTION is_admin() RETURNS BOOLEAN AS $$
  BEGIN
    RETURN EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin');
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Communities: Public Read, Admin Write
CREATE POLICY "Public can read communities" ON communities FOR SELECT USING (true);
CREATE POLICY "Admins can manage communities" ON communities USING (is_admin() AND auth.jwt()->>'email_confirmed_at' IS NOT NULL);

-- Join Requests: Public Insert, Admin Read/Write
CREATE POLICY "Public can insert join requests" ON join_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage join requests" ON join_requests USING (is_admin() AND auth.jwt()->>'email_confirmed_at' IS NOT NULL);

-- Profiles: Own Read, Admin Read/Write
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id AND auth.jwt()->>'email_confirmed_at' IS NOT NULL);
CREATE POLICY "Admins can manage profiles" ON profiles USING (is_admin() AND auth.jwt()->>'email_confirmed_at' IS NOT NULL);
