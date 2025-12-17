import { Lightbulb, Target, Users } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Section } from '../components/ui/Section'
import { values, whyRobotics } from '../data/content'

export default function AboutPage() {
  return (
    <>
      <Section
        title="About the Robotics Club"
        eyebrow="Who we are"
        description="We are a student-driven community advancing robotics and AI at Rwanda Coding Academy through hands-on projects, mentorship, and competition-ready builds."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-primary">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-text-primary">Mission</h3>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              Empower students to design and deploy robotics solutions that
              address real-world challenges in Rwanda and beyond.
            </p>
          </Card>
          <Card className="p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-primary">
              <Lightbulb className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-text-primary">Vision</h3>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              Become a leading hub for ethical AI, robotics research, and
              competition-grade engineering within East Africa.
            </p>
          </Card>
          <Card className="p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-primary">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-text-primary">
              Why Robotics Matters
            </h3>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              Robotics bridges software, hardware, and design thinking—driving
              innovation in healthcare, agriculture, mobility, and education.
            </p>
          </Card>
        </div>
      </Section>

      <Section
        title="RCA Focus"
        eyebrow="Our approach"
        description="We prototype quickly, test rigorously, and document every build so members learn from real engineering constraints."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {whyRobotics.map((item) => (
            <Card key={item.title} className="p-6">
              <h3 className="text-lg font-bold text-text-primary">{item.title}</h3>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        title="Club Values"
        eyebrow="How we work"
        description="Principles that guide our builds, mentorship, and competitions."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {values.map((value) => (
            <Card
              key={value.title}
              className="p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-lg font-bold text-text-primary">
                {value.title}
              </h3>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">
                {value.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  )
}

