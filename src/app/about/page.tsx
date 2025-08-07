import React from 'react';
import Image from 'next/image';

export default function DeepbluePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-4xl w-full bg-white/5 backdrop-blur-md rounded-2xl shadow-xl p-10">
        <div className="flex flex-col items-center mb-8">
          <Image src="/image/deepblue-logo.png" alt="PSU Deepblue Logo" width={120} height={120} className="mb-4" />
          <h1 className="text-5xl font-extrabold text-white text-center">PSU Deepblue คืออะไร?</h1>
        </div>
        <div className="text-gray-300 text-lg leading-relaxed">
          <p className="mb-6">
            <strong className="text-white">PSU Deepblue</strong> คือบริการปัญญาประดิษฐ์ (LLM – Large Language Model) ที่พัฒนาขึ้นโดยมหาวิทยาลัยสงขลานครินทร์ เพื่อให้นักศึกษาและบุคลากรใช้งาน
          </p>
          <p className="mb-6">
            Deepblue จะมีความสามารถในการตอบคำถาม พูดคุย และช่วยค้นหาข้อมูล โดยใช้โมเดลจากหลากหลายแบรนด์ชั้นนำ ด้าน AI ระดับโลก ในช่วง Soft Launch นี้ เราให้บริการผ่านโมเดลดังนี้:
          </p>
          <ul className="list-disc list-inside mb-6 pl-4">
            <li><strong className="text-white">Qwen Plus</strong></li>
            <li><strong className="text-white">Amazon Nova Pro</strong></li>
          </ul>
          <p className="mb-6">
            และในอนาคตอันใกล้ จะมีโมเดลใหม่ ๆ เพิ่มเข้ามาให้เลือกใช้มากขึ้น!
          </p>
          <h2 className="text-3xl font-bold text-white mt-10 mb-4">จุดเด่นของ PSU Deepblue</h2>
          <p className="mb-6">
            Deepblue ได้เสริมความรู้เฉพาะทางของมหาวิทยาลัยสงขลานครินทร์ เข้าไปด้วยเทคนิค <strong className="text-white">RAG (Retrieval-Augmented Generation)</strong>
          </p>
          <p className="mb-6">
            ในช่วงเริ่มต้นนี้ Deepblue ได้รับการเสริมข้อมูลพิเศษ เช่น:
          </p>
          <ul className="list-disc list-inside mb-6 pl-4">
            <li>รายวิชาที่เปิดสอนในมหาวิทยาลัย</li>
            <li>เรื่องราวเกี่ยวกับชีวิตและการใช้ชีวิตที่ PSU</li>
          </ul>
          <p className="mb-6">
          </p>
          <p>
            ทีมพัฒนามีเป้าหมายให้ Deepblue กลายเป็นระบบ AI ที่รู้ลึก รู้จริงเกี่ยวกับ PSU เพื่อช่วยเสริมประสบการณ์การเรียนและการทำงานของทุกคนให้ดียิ่งขึ้น
          </p>
        </div>
      </div>
    </main>
  );
}
