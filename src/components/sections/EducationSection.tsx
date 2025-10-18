import { GraduationCap, Calendar, MapPin } from "lucide-react";

export const EducationSection = () => {
  return (
    <div className="animate-fade-in space-y-6">
      <h2 className="text-3xl font-bold text-foreground text-center">Education</h2>

      <div className="space-y-6">
        {/* Bachelor of Technology */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="p-3 bg-blue-50 rounded-full">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                Bachelor of Technology - Computer Science
              </h3>
              <p className="text-gray-600 mb-3">
                Vellore Institute of Technology
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>2022 - 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>Amaravati</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-1 rounded-full bg-blue-600"></div>
                  <span className="text-sm text-gray-800">
                    Relevant Coursework: DSA, OOP, CN, Operating Systems, Software Engineering, Deep Learning, NoSQL databases
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-1 rounded-full bg-blue-600"></div>
                  <span className="text-sm text-gray-800">CGPA: 8.24/10 </span>
                </div>
                {/* <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-1 rounded-full bg-blue-600"></div>
                  <span className="text-sm text-gray-800">
                    Active in coding competitions and hackathons
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Intermediate Education */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="p-3 bg-blue-50 rounded-full">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Board of Intermediate Education
              </h3>
              <p className="text-gray-600 mb-3">Sri Chaitanya Junior College</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>2020 - 2022</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>Vijayawada, India</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-1 rounded-full bg-blue-600"></div>
                  <span className="text-sm text-gray-800">Grade: 83.7%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Education */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="p-3 bg-blue-50 rounded-full">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Secondary Board of Education
              </h3>
              <p className="text-gray-600 mb-3">Sri Chaitanya High School</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>2020</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>Vijayawada, India</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-1 rounded-full bg-blue-600"></div>
                  <span className="text-sm text-gray-800">Grade: 97.1%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
