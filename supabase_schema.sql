-- Supabase Schema and Seed Data for Pixel & Proof HQ

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-------------------------------------------------------------------------------
-- 1. TABLES
-------------------------------------------------------------------------------

-- Clients Table
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  industry TEXT,
  status TEXT DEFAULT 'Active',
  services TEXT[] DEFAULT '{}',
  contact TEXT,
  spent TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks Table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  client_id UUID REFERENCES clients(id),
  title TEXT NOT NULL,
  status TEXT NOT NULL,
  priority TEXT NOT NULL,
  assignee TEXT,
  due_date TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Invoices Table (Finance)
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  client_id UUID REFERENCES clients(id) NOT NULL,
  amount NUMERIC NOT NULL,
  status TEXT NOT NULL,
  due_date TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content Pipeline Table
CREATE TABLE content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  client_id UUID REFERENCES clients(id),
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  platform TEXT,
  status TEXT NOT NULL,
  assignee TEXT,
  due_date TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ideas Vault Table
CREATE TABLE ideas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  aspect_ratio TEXT,
  image_url TEXT,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Calendar Events Table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  client_id UUID REFERENCES clients(id),
  title TEXT NOT NULL,
  date DATE NOT NULL,
  start_time TEXT,
  end_time TEXT,
  type TEXT NOT NULL,
  participants TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-------------------------------------------------------------------------------
-- 2. ROW LEVEL SECURITY (RLS)
-------------------------------------------------------------------------------
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policies so users can only access their own data
CREATE POLICY "Users can manage their own clients" ON clients FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own tasks" ON tasks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own invoices" ON invoices FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own content" ON content FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own ideas" ON ideas FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own events" ON events FOR ALL USING (auth.uid() = user_id);

-------------------------------------------------------------------------------
-- 3. SEED DATA (Dummy Data)
-------------------------------------------------------------------------------
-- Note: This dummy data uses a default user ID. 
-- In a real scenario, you should replace 'YOUR_USER_ID_HERE' with your actual Supabase Auth User ID, 
-- OR run these inserts without user_id if RLS is temporarily disabled for seeding.

-- DO NOT RUN the SEED section until you have created a user in Auth and replaced the placeholder ID.
-- Example: 
-- INSERT INTO clients (id, user_id, name, industry, status, services, contact, spent, website) 
-- VALUES ('a4b64f9b-6fc6-4a46-8e50-bd1865e91eb7', 'YOUR_USER_ID_HERE', 'Acme Corp', 'SaaS', 'Active', '{"Branding", "Content"}', 'john@acme.com', '$12,000', 'acme.com');
how do u think should client content and client files should work bc rn in content there is all clients in one right