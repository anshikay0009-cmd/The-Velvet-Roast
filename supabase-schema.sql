-- The Velvet Roast Cafe - Supabase PostgreSQL Database Schema Setup
-- Run these commands in the Supabase SQL Editor to create the foundational database tables.

-- 1. Create orders Table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name VARCHAR(255) NOT NULL,
    total_amount_inr DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    status VARCHAR(50) NOT NULL DEFAULT 'pending' 
        CONSTRAINT chk_order_status CHECK (status IN ('pending', 'preparing', 'ready', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Enable Row Level Security (RLS) on orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies for orders (allowing staff authenticated roles full access and public reads if desired)
CREATE POLICY "Allow public select on orders" ON orders 
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated staff to update/insert orders" ON orders 
    FOR ALL USING (auth.role() = 'authenticated');


-- 2. Create reservations Table
CREATE TABLE IF NOT EXISTS reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    party_size INT NOT NULL CHECK (party_size > 0),
    reservation_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'confirmed' 
        CONSTRAINT chk_reservation_status CHECK (status IN ('confirmed', 'seated', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Enable Row Level Security (RLS) on reservations
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Create policies for reservations
CREATE POLICY "Allow public select on reservations" ON reservations 
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert on reservations" ON reservations 
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated staff to update reservations" ON reservations 
    FOR UPDATE USING (auth.role() = 'authenticated');


-- 3. Seed some initial demo data for testing
INSERT INTO orders (customer_name, total_amount_inr, items, status) VALUES
('Clara Deveraux', 810.00, '[{"name": "Activated Charcoal Rose Latte", "quantity": 1, "price": 450}, {"name": "Twice-Baked Almond Frangipane Croissant", "quantity": 1, "price": 360}]'::jsonb, 'pending'),
('Arthur Pendragon', 1230.00, '[{"name": "Truffled Smashed Avocado Toast", "quantity": 1, "price": 750}, {"name": "Malabar Pistachio Shakerato", "quantity": 1, "price": 480}]'::jsonb, 'preparing'),
('Maya Lin', 390.00, '[{"name": "Salted Jaggery Cold Foam Brew", "quantity": 1, "price": 390}]'::jsonb, 'ready');

INSERT INTO reservations (customer_name, phone_number, party_size, reservation_time, status) VALUES
('James Carter', '+91 98200 12345', 2, NOW() + INTERVAL '1 day', 'confirmed'),
('Elena Rostova', '+91 98900 98765', 4, NOW() + INTERVAL '1 day 2 hours', 'confirmed'),
('Siddharth Sen', '+91 98111 22233', 6, NOW() + INTERVAL '3 days', 'confirmed');
