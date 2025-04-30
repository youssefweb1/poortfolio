import { useState, useEffect, useRef } from "react";
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
import { useLanguage } from "@/hooks/useLanguage";
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction
} from "@/components/ui/alert-dialog";

// Create validation schemas for each language
const createFormSchema = (language: string) => {
  // Different validation messages based on language
  const errorMessages = {
    name: language === 'ar' 
      ? "يجب أن يكون الاسم على الأقل حرفين" 
      : "Name must be at least 2 characters",
    email: language === 'ar' 
      ? "يرجى إدخال بريد إلكتروني صحيح" 
      : "Please enter a valid email address",
    message: language === 'ar' 
      ? "يجب أن تكون الرسالة على الأقل 10 أحرف" 
      : "Message must be at least 10 characters",
  };

  return z.object({
    name: z.string().min(2, {
      message: errorMessages.name,
    }),
    email: z.string().email({
      message: errorMessages.email,
    }),
    message: z.string().min(10, {
      message: errorMessages.message,
    }),
  });
};

// Create a type for form values
type FormValues = {
  name: string;
  email: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { currentLanguage } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  // Create schema reference that will be used for validation
  const formSchemaRef = useRef(createFormSchema(currentLanguage));
  
  // Update schema reference when language changes
  useEffect(() => {
    formSchemaRef.current = createFormSchema(currentLanguage);
  }, [currentLanguage]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchemaRef.current),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  
  // Update the validation schema when language changes
  useEffect(() => {
    if (currentLanguage) {
      // Just clear errors when language changes
      form.clearErrors();
    }
  }, [currentLanguage, form]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Send form data to Web3Forms
      await sendContactForm(data);
      
      // Show success dialog instead of toast
      setShowSuccessDialog(true);
      
      // Reset form
      form.reset();
    } catch (error) {
      // Show error toast
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
    <>
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
                <FormMessage className="text-xs text-red-500">{form.formState.errors.name?.message || ''}</FormMessage>
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
                <FormMessage className="text-xs text-red-500">{form.formState.errors.email?.message || ''}</FormMessage>
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
                <FormMessage className="text-xs text-red-500">{form.formState.errors.message?.message || ''}</FormMessage>
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

      {/* Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="glass border border-primary/20 max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-lg font-semibold text-primary">
              {t('contact.form.success.title')}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-foreground">
              {t('contact.form.success.message')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4 sm:justify-center">
            <AlertDialogAction className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
              {t('contact.form.success.buttonText') || 'OK'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ContactForm;
