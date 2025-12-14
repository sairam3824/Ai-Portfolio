import { GraduationCap, Calendar, MapPin } from "lucide-react";

export const EducationSection = () => {
  const items = [
    {
      title: "Bachelor of Technology - Computer Science",
      org: "Vellore Institute of Technology Andhra Pradesh",
      date: "2022 - 2026",
      place: "Amaravati, Andhra Pradesh, India",
      notes: [
        "Relevant Coursework: Data Structures & Algorithms, Operating Systems, OOP, Software Engineering (Design Patterns, System Design), Computer Networks, Deep Learning, NoSQL databases",
        "CGPA: 8.24",
      ],
    },
    {
      title: "Board of Intermediate Education",
      org: "Sri Chaitanya Junior College",
      date: "2020 - 2022",
      place: "Vijayawada, Andhra Pradesh, India",
      notes: ["Grade: 83.7%", "Subjects: Mathematics, Physics, Chemistry"],
    },
    {
      title: "Board of Secondary Education",
      org: "Sri Chaitanya High School",
      date: "2020",
      place: "Vijayawada, Andhra Pradesh, India",
      notes: ["Grade: 97.1%"],
    },
  ];

  return (
    <section className="animate-fade-in">
      <h2 className="text-3xl font-bold text-foreground text-center mb-8 select-none pointer-events-none">
        Education
      </h2>

      <div className="relative">
        {/* vertical line */}
        <div className="absolute left-6 top-6 bottom-0 w-[2px] bg-border" />

        <div className="space-y-8">
          {items.map((it, idx) => (
            <article key={idx} className="relative pl-16">
              {/* marker */}
              <div className="absolute left-0 top-3 flex items-center justify-center">
                <div className="p-2 bg-card border border-border rounded-full shadow-sm z-10">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                    <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold text-card-foreground mb-1">
                      {it.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">{it.org}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{it.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{it.place}</span>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      {it.notes.map((n, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-2 h-2 mt-1 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                          <span className="text-sm text-foreground/90">{n}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* optional right-side date badge for larger screens */}
                  <div className="hidden md:flex md:flex-col md:items-end md:justify-start md:gap-2 md:ml-4">
                    <span className="text-sm text-muted-foreground">{it.date}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
