const AboutUs = () => {
  const teamMembers = [
    {
      name: "Md Jaoadul Islam",
      role: "Project Manager",
      photo: "https://avatars.githubusercontent.com/u/138320105?v=4",
      bio: "Jaoad has over 10 years of experience in project management, specializing in delivering high-quality projects on time and within budget.",
      aos: "flip-left",
      duration: 2500,
    },
    {
      name: "John Smith",
      role: "Lead Developer",
      photo:
        "https://img.pikbest.com/photo/20240626/portrait-of-a-happy-young-employee-sits-at-his-desk-in-modern-office-setting_10637689.jpg!f305cw",
      bio: "John is a passionate developer with expertise in full-stack development and a knack for solving complex technical challenges.",
      aos: "zoom-in",
      duration: 2000,
    },
    {
      name: "Emily Johnson",
      role: "UX Designer",
      photo:
        "https://img.freepik.com/free-photo/blue-eyed-business-woman-white-blouse-standing-confident-pose-with-her-international-co-workers-indoor-portrait-asian-african-employees-with-blonde-lady_197531-3756.jpg",
      bio: "Emily is a creative UX designer with a keen eye for detail and a commitment to crafting intuitive and user-friendly interfaces.",
      aos: "flip-right",
      duration: 2500,
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="text-lg text-gray-600 md:mt-3">
          Learn more about our company, our values, and the amazing team behind
          our success.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-4">Company History</h2>
        <p className="text-lg text-gray-700">
          Founded in 2000, our company has been dedicated to providing top-notch
          car rental services. Our mission is to offer affordable and reliable
          transportation solutions while ensuring customer satisfaction. Our
          vision is to become the leading car rental service provider known for
          excellence and innovation.
        </p>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="card bg-white md:shadow-md rounded-lg p-6"
                data-aos={member.aos}
                data-aos-duration={`${member.duration}`}
              >
                <div className="flex items-center justify-center mb-4">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center">
                  {member.name}
                </h3>
                <p className="text-center text-gray-600">{member.role}</p>
                <p className="mt-2 text-gray-700 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-4">Our Fleet</h2>
        <p className="text-lg text-gray-700 mb-4">
          We offer a diverse range of vehicles to meet every need. Whether
          you're looking for an economy car for a budget-friendly trip, a luxury
          vehicle for a special occasion, or an SUV for a family vacation, we
          have the perfect car for you.
        </p>
        <ul className="list-disc list-inside pl-5 text-gray-700">
          <li>
            Economy Cars: Affordable and efficient options for everyday use.
          </li>
          <li>
            Luxury Cars: High-end vehicles for a touch of elegance and comfort.
          </li>
          <li>
            SUVs: Spacious and versatile vehicles for families and adventures.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-4">Values & Commitment</h2>
        <p className="text-lg text-gray-700">
          Our commitment to customer service is at the heart of everything we
          do. We strive to provide a seamless and enjoyable experience for every
          customer. Additionally, we are dedicated to sustainability and
          actively work towards reducing our environmental footprint through
          various initiatives.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
        <ul className="list-none text-lg text-gray-700">
          <li className="mb-2">
            <strong>Phone:</strong> +(880) 11-00-88888
          </li>
          <li className="mb-2">
            <strong>Email:</strong> support@ourcompany.com
          </li>
          <li>
            <strong>Address:</strong> 1361 Dhaka, Bangladesh
          </li>
        </ul>
      </section>
    </div>
  );
};

export default AboutUs;
