/*
  # Create submissions table

  1. New Tables
    - `submissions`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `dob` (date, optional)
      - `education` (text, optional)
      - `college` (text, optional - only for students)
      - `year` (text, optional - only for students)
      - `phone` (text, optional)
      - `email` (text, required)
      - `project_details` (text, required)
      - `submitted_at` (timestamp, default: current timestamp)

  2. Security
    - Enable RLS on `submissions` table
    - Add policy for public insert access (contact form submissions)
*/

CREATE TABLE IF NOT EXISTS submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  dob date,
  education text,
  college text,
  year text,
  phone text,
  email text NOT NULL,
  project_details text NOT NULL,
  submitted_at timestamptz DEFAULT now()
);

ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Allow public access to insert contact form submissions
CREATE POLICY "Allow public contact form submissions"
  ON submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to view submissions (for admin purposes)
CREATE POLICY "Allow authenticated users to view submissions"
  ON submissions
  FOR SELECT
  TO authenticated
  USING (true);