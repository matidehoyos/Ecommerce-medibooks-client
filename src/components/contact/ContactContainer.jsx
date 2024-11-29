import ContactData from "./ContactData";
import ContactForm from "./ContactForm";


const ContactContainer = () => {


    return (
        <div className='md:w-[80%] px-[3%] pt-[60px] md:pt-[170px] mx-auto pb-20 flex flex-col lg:flex-row-reverse md:justify-center md:items-stretch gap-8'>
            <ContactData />
            <ContactForm />
        </div>
    )
}


export default ContactContainer;