import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@14.21.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', { apiVersion: '2023-10-16' })
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
)

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  const body = await req.text()
  
  try {
    const event = stripe.webhooks.constructEvent(body, signature!, Deno.env.get('STRIPE_WEBHOOK_SECRET') || '')
    
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        await supabase.from('subscriptions').insert({
          user_id: session.metadata.userId,
          stripe_customer_id: session.customer,
          stripe_subscription_id: session.subscription,
          plan_type: session.metadata.planType,
          status: 'active',
        })
        break
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        await supabase.from('subscriptions')
          .update({ status: subscription.status })
          .eq('stripe_subscription_id', subscription.id)
        break
      }
    }
    
    return new Response(JSON.stringify({ received: true }), { headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 })
  }
})
