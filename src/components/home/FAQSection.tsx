import React from "react";
import FAQCard from "./FAQCard";

const faqS: FAQSection[] = [
  {
    title: "What types of furniture do you offer?",
    desc: "We offer a wide range of contemporary furniture including sofas, chairs, tables, beds, storage solutions, and outdoor furniture. Our collection is designed to suit modern aesthetics and functional needs.",
  },
  {
    title: "Do you offer international shipping?",
    desc: "Yes, we offer international shipping to select countries. Shipping costs and delivery times may vary depending on the destination. Please refer to our shipping policy or contact customer support for more details.",
  },
  {
    title: "What is your return policy?",
    desc: "We offer a 30-day return policy on all furniture items, provided they are in their original condition and packaging. If you're not satisfied with your purchase, you can initiate a return for a refund or exchange. Return shipping fees may apply.",
  },
  {
    title: "What payment methods do you accept?",
    desc: "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and financing options through Affirm. All transactions are secure and encrypted.",
  },
];

const FAQSection = () => {
  return (
    <div className="flex flex-col h-full space-y-8 border-b-[1px] border-[#D9D9D9]">
      <h1 className="text-4xl font-semibold text-gray-800">
        We have got the answers to your questions
      </h1>
      {/* FAQ SECTION */}
      {faqS.map((faq, index) => (
        <FAQCard index={index} title={faq.title} desc={faq.desc} key={index} />
      ))}
    </div>
  );
};

export default FAQSection;
