import PlaylistGeneratorForm from "@/components/forms/PlaylistGeneratorForm";

export default function PlaylistGeneratorPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-foreground">
        Craft Your Perfect Vibe
      </h1>
      <div className="max-w-2xl mx-auto">
        <PlaylistGeneratorForm />
      </div>
    </div>
  );
}
