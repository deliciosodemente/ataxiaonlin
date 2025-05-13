import Image from 'next/image';
import InfoCard from '@/components/ui/InfoCard';

const experiences = [
  {
    title: "Prioritizing Comfort",
    description: "Comfort is a priority. Organizers have thought of every detail: from hydration areas with refreshing drinks to spaces with tents for privacy. Everything is arranged so that the experience is not only memorable but also comfortable.",
    delay: "0s"
  },
  {
    title: "Magical Ambiance",
    description: "After the beautiful sunset, the stage lights reflect in the crystal-clear pool waters and on the faces of attendees, creating a play of sparkles with the magical light of the full moon. The natural environment, bathed in soft moonlight, becomes an almost dreamlike setting where music and nature blend perfectly.",
    delay: "0.1s"
  },
  {
    title: "Valley Camping",
    description: "The possibility of camping in the valley is an unparalleled option. With pre-arranged tents in carefully selected locations to ensure privacy and comfort, each campsite becomes a personal sanctuary under the starry sky.",
    delay: "0.2s"
  }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-6 bg-background/70 backdrop-blur-sm section-fade-in">
      <div className="container mx-auto">
        <h2>The Ataxia Experience</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <InfoCard 
              key={index}
              title={exp.title}
              description={exp.description}
              delay={exp.delay}
            />
          ))}
        </div>
        <div className="mt-12 mx-auto max-w-4xl rounded-lg overflow-hidden shadow-xl">
           {/* data-ai-hint: camping starry sky */}
          <Image 
            src="https://picsum.photos/seed/starrycamping/1024/600" 
            alt="Camping tents under a starry sky in a mountain valley"
            width={1024}
            height={600}
            className="w-full h-auto object-cover"
            data-ai-hint="camping starry sky"
          />
        </div>
      </div>
    </section>
  );
}
