import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendContactForm } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name.error",
  }),
  email: z.string().email({
    message: "email.error",
  }),
  message: z.string().min(10, {
    message: "message.error",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await sendContactForm(data);
      toast({
        title: t('contact.form.success.title'),
        description: t('contact.form.success.message'),
      });
      form.reset();
    } catch (error) {
      toast({
        title: t('contact.form.error.title'),
        description: t('contact.form.error.message'),
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">{t('contact.form.name')}</FormLabel>
              <FormControl>
                <Input 
                  placeholder={t('contact.form.namePlaceholder')} 
                  {...field} 
                  className="glass border border-border/50 focus:border-primary/50 rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground/70" 
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500">{t(form.formState.errors.name?.message || '')}</FormMessage>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">{t('contact.form.email')}</FormLabel>
              <FormControl>
                <Input 
                  placeholder={t('contact.form.emailPlaceholder')} 
                  type="email" 
                  {...field} 
                  className="glass border border-border/50 focus:border-primary/50 rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground/70" 
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500">{t(form.formState.errors.email?.message || '')}</FormMessage>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">{t('contact.form.message')}</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={t('contact.form.messagePlaceholder')} 
                  rows={4} 
                  {...field} 
                  className="glass border border-border/50 focus:border-primary/50 rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground/70 resize-none" 
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500">{t(form.formState.errors.message?.message || '')}</FormMessage>
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2.5 px-6 rounded-full transition-colors shadow-md btn-hover-effect"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('contact.form.sending')}
            </div>
          ) : (
            t('contact.form.send')
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
