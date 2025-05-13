import Image from 'next/image';

export default function CommunitySection() {
  return (
    <section id="community" className="py-20 px-6 container mx-auto section-fade-in">
      <h2>Authentic Connection</h2>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="rounded-lg overflow-hidden shadow-xl order-last md:order-first">
          {/* data-ai-hint: people music event */}
          <Image 
            src="https://picsum.photos/seed/communityevent/600/400" 
            alt="People connecting authentically at an outdoor music event"
            width={600}
            height={400}
            className="w-full h-auto object-cover"
            data-ai-hint="people music event"
          />
        </div>
        <div>
          <p>Here, inhibitions dissolve, giving way to an authentic connection between people and music. It's a place where masks fall, where identity is celebrated in its purest form, and where each individual finds their space to be completely free.</p>
          <p>The dimension we enter and the community that forms is one of understanding, elevation, and respect. Where common well-being is the priority.</p>
        </div>
      </div>
    </section>
  );
}
