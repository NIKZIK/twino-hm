import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");

const json = {
  groups: [
    {
      title: "Financial situation",
      questions: [
        {
          question: "Your total assets",
          answers: [
            "€0–€3,000",
            "€3,000–€10,000",
            "€10,000–€50,000",
            "€50,000–€500,000",
            "€500,000–€1,000,000",
            "More than €1,000,000",
          ],
        },
        {
          question: "Net income in the last 12 months",
          answers: [
            "€0–€3,000",
            "€3,000–€10,000",
            "€10,000–€50,000",
            "€50,000–€500,000",
            "€500,000–€1,000,000",
            "More than €1,000,000",
          ],
        },
        {
          question:
            "Please indicate the ratio of your regular monthly financial obligations (ex. mortgage repayment) to monthly income",
          answers: [
            "Up to 10% of monthly income",
            "10%–20% of monthly income",
            "20%–30% of monthly income",
            "More than 30% of monthly income",
          ],
        },
      ],
    },
    {
      title: "Investment goals",
      questions: [
        {
          question: "Your investment strategy",
          answers: [
            "Aggressive, high risk strategy",
            "Medium risk, conservative strategy",
            "Low risk strategy",
          ],
        },
        {
          question:
            "Imagine a situation where a stock market value has fallen by 20% in the last 3 months. At the same time, the value of the shares of a particular company you own has fallen by the same 20%. How would you act?",
          answers: [
            "Sell all the shares",
            "Sell ​​part of the shares",
            "Do not take any action on the shares of this company",
            "Buy additional shares",
          ],
        },
        {
          question:
            "What is the recommended strategy for allocating/diversifying investment risks?",
          answers: [
            "Investing in both different loan originators and different types of LPN so that the total portfolio is divided into as many different instruments as possible. A well-diversified portfolio could be when an investor has invested in at least 20 different LPNs",
            "Investing only in the one loan originator's instruments, as it is unlikely that this loan originator will have difficulty repaying its financial instruments",
            "Investing in loan originators that are from a particular region, if that region seems more stable than others",
          ],
        },
      ],
    },
    {
      title: "Professional experience",
      questions: [
        {
          question: "Your education",
          answers: [
            "Basic education",
            "Secondary education",
            "Bachelor's degree or equivalent",
            "Bachelor's degree or equivalent in finance or economics",
          ],
        },
        {
          question: "Your financial experience",
          answers: [
            "None",
            "Internationally recognized financial industry certification",
            "Investment portfolio manager",
            "Financial, risk analyst",
            "Auditor in the field of investments",
            "Financial advisor in the field of investments",
          ],
        },
        {
          question:
            "Investment experience in peer-to-peer lending and crowdfunding",
          answers: ["None", "1-3 months", "3-12 months"],
        },
      ],
    },
  ],
};
