import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-6 container mx-auto section-fade-in">
      <h2>More Than Conventional</h2>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p>In the majesty of two mountains, an event is celebrated that goes beyond the conventional: a rave that is a symphony of elegance, comfort, and a profound feeling of freedom.</p>
          <p>This setting, where nature is the canvas for a unique experience, offers a perfect communion between the beauty of the surroundings and the vibrant energy of electronic music.</p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl">
          {/* data-ai-hint: mountain rave dusk */}
          <Image 
            src="https://picsum.photos/seed/mountainrave/600/400" 
            alt="Electronic music rave in a mountain valley at dusk" 
            width={600} 
            height={400}
            className="w-full h-auto object-cover"
            data-ai-hint="mountain rave"
          />
        </div>
      </div>
    </section>
  );
}
