import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { educationData } from "@/data/educationData";

export const EducationSection = () => {
  const items = educationData.map((item) => ({
    title: item.major ? `${item.title} - ${item.major}` : item.title,
    org: item.campus ? `${item.org} ${item.campus}` : item.org,
    date: item.date,
    place: item.place,
    notes: [
      `Relevant Coursework: ${item.courses.join(", ")}`,
      `Grade: ${item.grade}`,
    ],
  }));

  return (
    <section className="animate-fade-in">
      <h2 className="mb-8 text-center text-2xl font-bold text-foreground select-none pointer-events-none sm:text-3xl">
        Education
      </h2>

      <div className="relative">
        {/* vertical line */}
        <div className="absolute left-4 top-5 bottom-0 w-[2px] bg-border sm:left-6 sm:top-6" />

        <div className="space-y-8">
          {items.map((it, idx) => (
            <article key={idx} className="relative pl-12 sm:pl-16">
              {/* marker */}
              <div className="absolute left-0 top-3 flex items-center justify-center">
                <div className="z-10 rounded-full bg-card border border-border p-1.5 shadow-sm sm:p-2">
                  <div className="rounded-full bg-blue-50 p-1.5 dark:bg-blue-900/20 sm:p-2">
                    <GraduationCap className="h-4 w-4 text-blue-600 dark:text-blue-400 sm:h-5 sm:w-5" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-card border border-border p-5 shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-1">
                    <h3 className="mb-1 text-lg font-semibold text-card-foreground md:text-2xl">
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
