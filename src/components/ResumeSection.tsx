import Link from 'next/link';

export default function ResumeSection() {
  return (
    <section id="resume" className="max-w-6xl mx-auto mb-20 px-4">
      <span className="inline-block bg-gray-100 text-black px-4 py-1 rounded-full text-sm font-medium mb-4">Resume</span>
      <h2 className="text-3xl md:text-4xl font-bold text-black mb-10">View my complete professional journey</h2>
      <div>
        <p className="text-gray-600 mb-8 max-w-xl">
          Want to know more about my experience, education, and skills? View my full resume below.
        </p>
        <Link
          href="https://drive.google.com/file/d/1qxLp8dgP4uWqXQVdmsR8Ca4Ydgl715_S/view?usp=sharing"
          target="_blank"
          className="bg-black text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-900 transition"
        >
          View Resume
        </Link>
      </div>
    </section>
  );
}