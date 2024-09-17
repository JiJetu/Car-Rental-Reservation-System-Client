import { Card } from "antd";
import {
  DollarCircleOutlined,
  CarOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";

const ChooseUs = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Us?</h2>
        <p className="text-lg md:text-xl text-gray-600 mb-12">
          Discover the advantages of choosing us for your car rental needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 shadow-lg rounded-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
            <DollarCircleOutlined className="text-4xl text-[#49af88] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
            <p className="text-gray-600">
              Enjoy the best deals and competitive prices across all car
              categories.
            </p>
          </Card>
          <Card className="p-6 shadow-lg rounded-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
            <CarOutlined className="text-4xl text-[#49af88] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
            <p className="text-gray-600">
              Choose from a wide variety of cars for every occasion and
              preference.
            </p>
          </Card>
          <Card className="p-6 shadow-lg rounded-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
            <CustomerServiceOutlined className="text-4xl text-[#49af88] mb-4" />
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">
              We are here for you around the clock with our dedicated support
              team.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;
