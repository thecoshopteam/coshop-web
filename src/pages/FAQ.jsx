import React from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I add an item to my list?",
      answer: "Navigate to the List tab and click 'Add Item'.",
    },
    {
      question: "How do I change the name of my list?",
      answer:
        "Navigate to the List tab and simply click the title of the list to edit it.",
    },
    {
      question: "Can I share my list with others?",
      answer:
        "Yes. Currently the only way to do this is via an image download on the list page. This can then be shared to others.",
    },
    {
      question: "What should I do if I forget my password?",
      answer:
        "Click on the 'Forgot Password' link on the login page to reset your password.",
    },
    {
      question: "How do I report a bug I found?",
      answer:
        "Navigate to the Profile icon in the top right. Click it and you will see the option to report a bug.",
    },
  ];

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Frequently Asked Questions
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default FAQ;
