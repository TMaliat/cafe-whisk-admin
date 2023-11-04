"use client";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Hypoallergenic } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";


const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(4).regex(/^#/, {
        message: 'String must be a valid hex code',
    }),
});


type HypoallergenicFormValues = z.infer<typeof formSchema>;


interface HypoallergenicFormProps {
    initialData: Hypoallergenic | null;
}


export const HypoallergenicForm: React.FC<HypoallergenicFormProps> = ({
    initialData
}) => {

    const params=useParams();
    const router=useRouter();
    const [open,setOpen]=useState(false);
    const [loading,setLoading]=useState(false);
    const origin = useOrigin();

    const title = initialData ? "Edit hypoallergenic" : "Create hypoallergenic" ;
    const description = initialData ? "Edit a hypoallergenic" : "Add a new hypoallergenic" ;
    const toastMessage = initialData ? "Hypoallergenic updated!" : "Hypoallergenic created!" ;
    const action = initialData ? "Save changes" : "Create" ;

    const form = useForm<HypoallergenicFormValues> ({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            value: ''
        }
    });

    
    const onSubmit = async (data: HypoallergenicFormValues) => {
        try {
            setLoading(true);
            if(initialData){
                await axios.patch(`/api/${params.storeId}/hypoallergenics/${params.hypoallergenicId}`, data);
            }else {
                await axios.post(`/api/${params.storeId}/hypoallergenics`, data);
            }
            router.refresh();
            router.push(`/${params.storeId}/hypoallergenics`)
            toast.success(toastMessage);
            
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };


    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/hypoallergenics/${params.hypoallergenicId}`)
            router.refresh();
            router.push(`/${params.storeId}/hypoallergenics`);
            toast.success("Hypoallergenic Deleted!");
        } catch (error) {
            toast.error("Make sure you remove all products first using this hypoallergenic.");
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }


    return (
        <>
        <AlertModal 
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
        />
        <div className="flex items-center justify-between">
            <Heading 
            title={title}
            description={description}
            />
            { initialData && (
                <Button 
                disabled={loading}
                variant="destructive"
                size="icon"
                onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4"/>
                </Button>
            )}
        </div>
        <Separator />
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full ">
               <div className="grid grid-cols-3 gap-8">
                <FormField 
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Name
                        </FormLabel>
                        <FormControl>
                            <Input disabled={loading} placeholder="Hypoallergenic Name" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
                />
                <FormField 
                control={form.control}
                name="value"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Value
                        </FormLabel>
                        <FormControl>
                            <div className="flex items-center gap-x-4">
                            <Input disabled={loading} placeholder="Hypoallergenic Value" {...field} />
                            <div 
                            className="border p-4 rounded-full"
                            style={{ backgroundColor: field.value }}
                            />
                            </div>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
                />
               </div>
<Button disabled={loading} className="ml-auto" type="submit">
    {action}
</Button>

            </form>
        </Form>

      
       
        </>
    );
};