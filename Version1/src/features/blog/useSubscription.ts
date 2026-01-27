import { useState } from 'react';
import { supabase } from '@/config/supabase';
import { toast } from 'sonner';

export const useSubscription = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscribe = async (email: string): Promise<boolean> => {
    setIsSubmitting(true);
    
    try {
      // Check if email already exists
      const { data: existingSubscriber, error: checkError } = await supabase
        .from('blog_subscribers')
        .select('email, is_active')
        .eq('email', email)
        .maybeSingle();

      if (checkError) {
        console.error('Error checking subscriber:', checkError);
        toast.error('Failed to check subscription status');
        return false;
      }

      if (existingSubscriber) {
        if (existingSubscriber.is_active) {
          toast.info('✅ You\'re already subscribed!');
          return false;
        } else {
          // Reactivate subscription
          const { error: updateError } = await supabase
            .from('blog_subscribers')
            .update({ is_active: true })
            .eq('email', email);

          if (updateError) {
            console.error('Error reactivating subscription:', updateError);
            toast.error('Failed to reactivate subscription');
            return false;
          }

          toast.success('Welcome back! Your subscription has been reactivated.');
          return true;
        }
      }

      // Generate unsubscribe token
      const unsubscribeToken = crypto.randomUUID();

      // Insert new subscriber
      const { error: insertError } = await supabase
        .from('blog_subscribers')
        .insert({
          email,
          is_active: true,
          unsubscribe_token: unsubscribeToken,
        });

      if (insertError) {
        console.error('Error inserting subscriber:', insertError);
        toast.error('Failed to subscribe. Please try again.');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Unexpected error during subscription:', error);
      toast.error('An unexpected error occurred');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { subscribe, isSubmitting };
};
