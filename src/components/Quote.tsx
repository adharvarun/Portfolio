import Image from 'next/image';

export default function Testimonial() {
  return (
    <section className="max-w-4xl mx-auto mb-20 px-4">
      <div className="bg-white rounded-2xl shadow p-10 flex flex-col items-center text-center border border-gray-200">
      <svg className="w-10 h-10 text-gray-200 mb-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
      </svg>
        <blockquote className="text-xl md:text-2xl font-medium text-black mb-6">
          "Innovation distinguishes between a leader and a follower"
        </blockquote>
        <div className="flex flex-col items-center">
          <Image src="/steve-jobs.jpg" alt="Steve Jobs" width={48} height={48} className="rounded-full mb-2" />
          <span className="font-semibold text-black">Steve Jobs</span>
          <span className="text-gray-500 text-sm">Founder, Apple</span>
        </div>
      </div>
    </section>
  );
} 