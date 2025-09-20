const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());


const supabase = createClient(
  'https://bivnqyowpkhmyykszlgk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpdm5xeW93cGtobXl5a3N6bGdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4OTA5MDIsImV4cCI6MjA3MDQ2NjkwMn0.rnA83zbiwltg4IWqTk9kh3qte_0EgQ8u045eWbwDsQY'
);


app.get('/destinations', async (req, res) => {
  const { data, error } = await supabase.from('destinations').select();
  if (error) return res.status(500).json({ message: 'Error fetching destinations' });
  res.json(data);
});

app.get('/hotels', async (req, res) => {
  const { data, error } = await supabase.from('hotels').select();
  if (error) return res.status(500).json({ message: 'Error fetching hotels' });
  res.json(data);
});

app.get('/events', async (req, res) => {
  const { data, error } = await supabase.from('events').select();
  if (error) return res.status(500).json({ message: 'Error fetching events' });
  res.json(data);
});


app.post('/bookings', async (req, res) => {
  const { customer_name, customer_email, customer_phone, booking_type, reference_id, booking_date } = req.body;

  const { data, error } = await supabase.from('bookings').insert([
    { customer_name, customer_email, customer_phone, booking_type, reference_id, booking_date }
  ]);

  if (error) return res.status(500).json({ message: 'Error creating booking' });
  res.json({ status: 200, message: 'Booking successful', data });
});


app.post('/event_registrations', async (req, res) => {
  const { customer_name, customer_email, customer_phone, event_id } = req.body;

  const { data, error } = await supabase.from('event_registrations').insert([
    { customer_name, customer_email, customer_phone, event_id }
  ]);

  if (error) return res.status(500).json({ message: 'Error registering for event' });
  res.json({ status: 200, message: 'Event registration successful', data });
});


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
