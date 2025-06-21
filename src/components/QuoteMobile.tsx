import Image from 'next/image';
import ScrollAnimation from './ScrollAnimation';

export default function QuoteMobile() {
  return (
    <section className="max-w-md mx-auto mb-12 px-4">
      <ScrollAnimation direction="down">
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center border border-gray-200">
          <svg className="w-8 h-8 text-gray-200 mb-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
          </svg>
          <blockquote className="text-lg font-medium text-black mb-4">
            &quot;Innovation distinguishes between a leader and a follower&quot;
          </blockquote>
          <div className="flex flex-col items-center">
            <Image src="/steve-jobs.jpg" alt="Steve Jobs" width={40} height={40} className="rounded-full mb-1" />
            <span className="font-semibold text-black text-sm">Steve Jobs</span>
            <span className="text-gray-500 text-xs">Founder, Apple</span>
          </div>
        </div>
      </ScrollAnimation>
    </section>
  );
} 