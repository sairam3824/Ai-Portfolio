-- ============================================
-- Supabase Database Schema
-- ============================================
-- This file contains all the SQL commands needed to set up
-- the database schema for the portfolio application
-- ============================================

-- ============================================
-- Table 1: Blog Subscribers
-- ============================================
-- Stores email addresses of users who subscribe to blog updates
CREATE TABLE blog_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  unsubscribe_token UUID DEFAULT gen_random_uuid() UNIQUE
);

-- ============================================
-- Table 2: Contact Messages
-- ============================================
-- Stores messages submitted through the contact form
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_read BOOLEAN DEFAULT false,
  user_agent TEXT,
  ip_address INET
);

-- ============================================
-- Enable Row Level Security (RLS)
-- ============================================
-- RLS ensures that users can only access data they're authorized to see
ALTER TABLE blog_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS Policies for blog_subscribers
-- ============================================
-- Allow anonymous users to subscribe (insert)
CREATE POLICY "Allow public inserts for subscribers" 
  ON blog_subscribers
  FOR INSERT 
  TO anon
  WITH CHECK (true);

-- Allow anonymous users to check if email exists (select)
CREATE POLICY "Allow public to check if email exists" 
  ON blog_subscribers
  FOR SELECT 
  TO anon
  USING (true);

-- Allow anonymous users to update their subscription status
CREATE POLICY "Allow public updates for subscribers" 
  ON blog_subscribers
  FOR UPDATE 
  TO anon
  USING (true)
  WITH CHECK (true);

-- ============================================
-- RLS Policies for contact_messages
-- ============================================
-- Allow anonymous users to submit messages (insert)
CREATE POLICY "Allow public inserts for messages" 
  ON contact_messages
  FOR INSERT 
  TO anon
  WITH CHECK (true);

-- ============================================
-- Performance Indexes
-- ============================================
-- Indexes to improve query performance
CREATE INDEX idx_blog_subscribers_email ON blog_subscribers(email);
CREATE INDEX idx_blog_subscribers_active ON blog_subscribers(is_active);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX idx_contact_messages_is_read ON contact_messages(is_read);

-- ============================================
-- Views
-- ============================================
-- View to quickly get count of unread messages
CREATE VIEW unread_messages_count AS
  SELECT COUNT(*) as count
  FROM contact_messages
  WHERE is_read = false;

-- ============================================
-- Optional: Functions
-- ============================================
-- Function to mark a message as read
CREATE OR REPLACE FUNCTION mark_message_as_read(message_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE contact_messages
  SET is_read = true
  WHERE id = message_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to unsubscribe using token
CREATE OR REPLACE FUNCTION unsubscribe_by_token(token UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE blog_subscribers
  SET is_active = false
  WHERE unsubscribe_token = token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- Optional: Triggers
-- ============================================
-- Trigger to prevent duplicate active subscriptions
CREATE OR REPLACE FUNCTION prevent_duplicate_active_subscription()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_active = true THEN
    UPDATE blog_subscribers
    SET is_active = false
    WHERE email = NEW.email AND id != NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ensure_single_active_subscription
  BEFORE INSERT OR UPDATE ON blog_subscribers
  FOR EACH ROW
  EXECUTE FUNCTION prevent_duplicate_active_subscription();
