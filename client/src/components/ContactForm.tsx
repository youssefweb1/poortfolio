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
              <FormLabel>{t('contact.form.name')}</FormLabel>
              <FormControl>
                <Input 
                  placeholder={t('contact.form.namePlaceholder')} 
                  {...field} 
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary" 
                />
              </FormControl>
              <FormMessage>{t(form.formState.errors.name?.message || '')}</FormMessage>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contact.form.email')}</FormLabel>
              <FormControl>
                <Input 
                  placeholder={t('contact.form.emailPlaceholder')} 
                  type="email" 
                  {...field} 
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary" 
                />
              </FormControl>
              <FormMessage>{t(form.formState.errors.email?.message || '')}</FormMessage>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contact.form.message')}</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={t('contact.form.messagePlaceholder')} 
                  rows={5} 
                  {...field} 
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary" 
                />
              </FormControl>
              <FormMessage>{t(form.formState.errors.message?.message || '')}</FormMessage>
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-lg"
        >
          {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
