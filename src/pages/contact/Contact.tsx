import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";

interface IFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // Simulate form submission
    console.log(data);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your message has been sent!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="container mx-auto p-6 md:p-12">
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 mt-3">
          We'd love to hear from you! Feel free to reach out with any questions
          or concerns.
        </p>
      </section>
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
            <p className="text-lg text-gray-700 mb-2">
              <strong>Phone:</strong> +(880) 11-00-8888
            </p>
            <p className="text-lg text-gray-700 mb-2">
              <strong>Email:</strong> support@ourcompany.com
            </p>
            <p className="text-lg text-gray-700 mb-4">
              <strong>Address:</strong> 1361 Dhaka, Bangladesh
            </p>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-4">Business Hours</h3>
              <p className="text-lg text-gray-700">
                Monday - Friday: 9:00 AM - 6:00 PM
                <br />
                Saturday: 10:00 AM - 4:00 PM
                <br />
                Sunday: Closed
              </p>
            </div>
            <div className="relative w-full h-64 md:h-96 mb-6">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.919852589131!2d-122.4194185846806!3d37.77492927975912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c5d1d5f1b%3A0x68c4d896b40575a8!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1632818710057!5m2!1sen!2sus"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Send Us a Message</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label
                    className="block text-lg font-semibold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className={`input input-bordered w-full ${
                      errors.name ? "border-red-500" : ""
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label
                    className="block text-lg font-semibold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className={`input input-bordered w-full ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label
                  className="block text-lg font-semibold mb-2"
                  htmlFor="subject"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  {...register("subject", { required: "Subject is required" })}
                  className={`input input-bordered w-full ${
                    errors.subject ? "border-red-500" : ""
                  }`}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm">
                    {errors.subject.message}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label
                  className="block text-lg font-semibold mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  {...register("message", { required: "Message is required" })}
                  className={`textarea textarea-bordered w-full ${
                    errors.message ? "border-red-500" : ""
                  }`}
                  rows={6}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm">
                    {errors.message.message}
                  </p>
                )}
              </div>
              <div className="text-center">
                <Button
                  type="submit"
                  className="bg-black text-white font-semibold text-lg rounded-xl"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
