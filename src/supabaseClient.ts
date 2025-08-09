import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://youefpbqytmlinupiymr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdWVmcGJxeXRtbGludXBpeW1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMjczNjgsImV4cCI6MjA2NzcwMzM2OH0.J24fqQnCfwOYYj0RXdGwp-mVsy_fi_uq0sbtA3rlJs8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)