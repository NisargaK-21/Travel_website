const express=require('express')
const cors=require('cors')
const app=express()
app.use(cors())
app.use(express.json())


const{createClient}=require("@supabase/supabase-js");

const supabase=createClient('https://bivnqyowpkhmyykszlgk.supabase.co',
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpdm5xeW93cGtobXl5a3N6bGdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4OTA5MDIsImV4cCI6MjA3MDQ2NjkwMn0.rnA83zbiwltg4IWqTk9kh3qte_0EgQ8u045eWbwDsQY')


app.get('/destinations',async(request,response)=>{
    console.log('Endpoint called')
    const{data,error}=await supabase
    .from('destinations')
    .select();
    if(error!=null){
        response.status(500).json({message:'Error fetching data'})
    }
    response.json(data);
});


app.get('/hotels',async(request,response)=>{
    console.log('Endpoint called')
    const{data,error}=await supabase
    .from('hotels')
    .select();
    if(error!=null){
        response.status(500).json({message:'Error fetching data'})
    }
    response.json(data);
});


app.get('/events',async(request,response)=>{
    console.log('Endpoint called')
    const{data,error}=await supabase
    .from('events')
    .select();
    if(error!=null){
        response.status(500).json({message:'Error fetching data'})
    }
    response.json(data);
});


app.post('/bookings', async (request, response) => {
    console.log('Bookings endpoint called');
    const { data, error } = await supabase.from('bookings').select();
    if (error) return response.status(500).json({ message: 'Error fetching data' });
    response.json({ status: 200, message: 'success', data });
});



app.post('/event_registrations', async (request, response) => {
    console.log('Event registrations endpoint called');
    const { data, error } = await supabase.from('event_registrations').select();
    if (error) return response.status(500).json({ message: 'Error fetching data' });
    response.json({ status: 200, message: 'success', data });
});


   
app.listen(5000,()=>{
    console.log("server is running ")
})

