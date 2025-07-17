"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import React from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log(values);
        setIsSubmitting(false);
        toast({
          title: "Message Sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        })
        form.reset();
    }
    
    // Custom floating label input
    const FloatingLabelInput = ({ field, label }: { field: any; label: string }) => (
        <div className="relative">
            <FormControl>
                <Input placeholder=" " {...field} className="peer h-12 pt-4" />
            </FormControl>
            <FormLabel className="absolute top-3 left-3 text-muted-foreground duration-300 transform -translate-y-1/2 scale-100 origin-[0] peer-focus:scale-75 peer-focus:-translate-y-3 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:-translate-y-3 pointer-events-none">
                {label}
            </FormLabel>
        </div>
    );

    const FloatingLabelTextarea = ({ field, label }: { field: any; label: string }) => (
        <div className="relative">
            <FormControl>
                <Textarea placeholder=" " {...field} className="peer pt-6 min-h-[120px]" />
            </FormControl>
            <FormLabel className="absolute top-5 left-3 text-muted-foreground duration-300 transform -translate-y-1/2 scale-100 origin-[0] peer-focus:scale-75 peer-focus:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:-translate-y-4 pointer-events-none">
                {label}
            </FormLabel>
        </div>
    );

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                    <FloatingLabelInput field={field} label="Your Name" />
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                    <FloatingLabelInput field={field} label="Your Email" />
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
                <FormItem>
                    <FloatingLabelTextarea field={field} label="Your Message" />
                    <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit" className="w-full text-lg py-6" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
        </form>
        </Form>
    )
}
