import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vyzdnzlcbpnlzdljmcqp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5emRuemxjYnBubHpkbGptY3FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2Mzg4NjEsImV4cCI6MjA5MTIxNDg2MX0.ZLPfdUY_UeE_HytBfkEpcBVEq6DH2flYvu4kGErFaaQ'

export const supabase = createClient(supabaseUrl, supabaseKey)