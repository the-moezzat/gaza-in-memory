"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";

const quotes = [
  { text: "هذه روح الروح", direction: "right" },
  { text: "تعيطش زلمه كلنا مشاريع شهاده", direction: "right" },
  { text: "الولاد ماتوا بدون ما ياكلوا", direction: "right" },
  {
    text: "اسمه يوسف 7 سنين شعره كيرلي وأبيضاني وحلو.. بدي يوسف يابابا",
    direction: "right",
  },
  {
    text: "كان يصرخ عليّ يا كمال يا كمال! كان عايش والله.. بدي أبوسه",
    direction: "right",
  },
  {
    text: "الولاد وين؟ الولاد ماتوا بدون ماياكلوا يشهد عليا الله",
    direction: "right",
  },
  { text: "قوم ارضع حبيبي.. قوم..", direction: "right" },
  { text: "بدي شعرة منه.. شعرة واحدة بس قبل ما تدفنوه", direction: "right" },
  { text: "كنت نايم!", direction: "right" },
  {
    text: "يا عمـــااار.. حاسس فيني؟ مش راح أمشي قبل م تطلع من تحت الردم بستنى ليوم ليومين لسنة لحتى تطلع",
    direction: "right",
  },
  {
    text: "والله بنتي عروسة استشهدت، عرسها كان الجمعة اللى فاتت والله ما رجعنا فستان العرس لصاحبه!",
    direction: "right",
  },
  { text: "والله عروسة حامل شهرين", direction: "right" },
  { text: "السبعة مع أمهم.. السبعة مع أمهم", direction: "right" },
  {
    text: "ثانية بس ثانية واحدة سبت ايدي ليش.. ياريتني مت معك.. سبتيني لمين!",
    direction: "right",
  },
  { text: "ياعالم جيبولي بنتي", direction: "right" },
  { text: "ياجماعة زوجي استشهد.. استشهد أبوكي", direction: "right" },
  {
    text: "أربعين سنة بشتغل عشان أبني الدار.. راحت، فدا فلسطين",
    direction: "right",
  },
  { text: "كنت ناوي أعملها عيد ميلاد..", direction: "right" },
  { text: "ياريتني أنا أروح عند أبوي كمان", direction: "right" },
  {
    text: "ماتعيطش يازلمة.. كلنا شهداء، كلنا مشاريع شهداء",
    direction: "right",
  },
  { text: "فدا الأقصى يمّا فدا الأقصى", direction: "right" },
  { text: "ماتخافش يابا أنا كويس يابا..", direction: "right" },
  {
    text: "قلبي انقطع عليكي يا أختي.. العرب وينهم، المسلمين وينهم؟",
    direction: "right",
  },
  { text: "بيكفي ياعالم بيكفي", direction: "right" },
  { text: "حطي قلبك على قلبي يمّا.. حس فيكي يمّا", direction: "right" },
  { text: "والله ما احنا منهزين", direction: "right" },
  {
    text: "هذه مرح بتحب الرسم كانت، وهذه بيسان الدكتورة..",
    direction: "right",
  },
  { text: "رايح أدفن أبويا بسيارتي..", direction: "right" },
  { text: "ياعمو وديني على ماما.. بدي ماما", direction: "right" },
  {
    text: "إيش عملتلهم هالبنت الصغيرة؟ عشرين سنة نفسه يخلف.. قعدت شهرين وراحت!",
    direction: "right",
  },
  {
    text: "عمر أحكي بسم الله، حبيبي سامعني قول ورايا أشهد أن لا إله إلا الله.. علّي صوتك حبيبي",
    direction: "right",
  },
  { text: "أخواتي أخواتي .. ما فيني شي بدي أخواتي", direction: "right" },
  { text: "دارنا راحت وين بدنا نقعد؟!", direction: "right" },
  {
    text: "ماضلش مكان نشرد.. وين بدنا نشرد؟ ماضلش مكان نسكن فيه",
    direction: "right",
  },
];

const QuoteBubble = ({
  quote,
  direction,
}: {
  quote: string;
  direction: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 50 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.8, y: -50 }}
    transition={{ duration: 0.5 }}
    dir={"rtl"}
    className={classNames(
      `dir max-w-80 w-fit h-fit bg-[#9B9B9B] rounded-3xl after:content-[''] after:w-6 after:h-5 after:bottom-0 after:absolute after:bg-transparent after:rounded-b-xl px-6 py-2 text-white text-xl relative`,
      {
        "after:ml-0.5 after:-right-6 after:shadow-[-8px_0_0_0_#9B9B9B]":
          direction === "right",
        "after:mr-0.5 after:-left-6 after:shadow-[8px_0_0_0_#9B9B9B]":
          direction === "left",
      },
    )}
  >
    {quote}
  </motion.div>
);

const AnimatedQuoteBubbles = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 3000); // Change quote every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-10 flex items-end right-10 h-15">
      <AnimatePresence mode="wait">
        <QuoteBubble
          key={currentQuoteIndex}
          quote={quotes[currentQuoteIndex].text}
          direction={quotes[currentQuoteIndex].direction}
        />
      </AnimatePresence>
    </div>
  );
};

export default AnimatedQuoteBubbles;
