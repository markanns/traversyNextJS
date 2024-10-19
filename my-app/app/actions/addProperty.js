'use server';
import connectDb from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


const addProperty = async (formData) => {
    await connectDb();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User id is required');
    }
    const { userId } = sessionUser;
    
    const amenities = formData.getAll('amenities');
    const images = formData
    .getAll('images')
    .filter((image) => image.name !== '')
    .map((image) => image.name);

    const propertyData = {
        owner: userId,
        name: formData.get('name'),
        description: formData.get('description'),
        type: formData.get('type'),
        location: {
            street: formData.get('location.street'),
            city: formData.get('location.city'),
            state: formData.get('location.state'),
            zipcode: formData.get('location.zipcode')
        },
        beds: formData.get('beds'),
        baths: formData.get('baths'),
        square_feet: formData.get('square_feet'),
        amenities,
        rates:{
            weekly:formData.get('rates.weekly'),
            nightly:formData.get('rates.nightly'),
            monthly:formData.get('rates.monthly')
        },
        seller_info:{
            name:formData.get('seller_info.name'),
            email:formData.get('seller_info.email'),
            phone:formData.get('seller_info.phone'),
        },
        images
    }    

    const newProperty = new Property(propertyData);
    await newProperty.save();
    revalidatePath('/','layout');
    redirect(`/properties/${newProperty._id}`);
};

export default addProperty;