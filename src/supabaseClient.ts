import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nvskgsshxumljbwnfarc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52c2tnc3NoeHVtbGpid25mYXJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxNjkyNjgsImV4cCI6MjA0NTc0NTI2OH0.YS39WkjmP7RRup_1wYud9n5n9GczKJ_PHSXJ53RSXbs';
export const supabase = createClient(supabaseUrl, supabaseKey);