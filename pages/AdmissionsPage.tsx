import React from 'react';
import { schoolData } from '../data/schoolData';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import CheckIcon from '../components/icons/CheckIcon';

const AdmissionsPage: React.FC = () => {
  const { admissions_2026 } = schoolData;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold font-heading text-brand-purple opacity-0 animate-fade-in-up">Admissions 2026</h1>
        <p className="mt-4 text-xl text-brand-text/80 max-w-3xl mx-auto opacity-0 animate-fade-in-up animate-delay-200">
          We are excited to welcome new students to the Goodsteps family. Our <span className="font-bold text-brand-green">{admissions_2026.status}</span> intake is now open.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        
        <div className="lg:col-span-2 opacity-0 animate-fade-in-up animate-delay-300">
            <Card>
              <CardHeader>
                <CardTitle>Application Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {admissions_2026.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <CheckIcon />
                      <span className="ml-3 text-lg text-brand-text/90">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
        </div>

        <div className="space-y-8 opacity-0 animate-fade-in-up animate-delay-500">
            <Card>
              <CardHeader>
                <CardTitle>Openings Per Class</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-lg">
                  <li className="flex justify-between items-center"><span>Playgroup</span> <span className="font-bold text-brand-red bg-brand-red/10 px-3 py-1 rounded-full">{admissions_2026.openings_per_class.Playgroup}</span></li>
                  <li className="flex justify-between items-center"><span>PP1 to Grade 6</span> <span className="font-bold text-brand-red bg-brand-red/10 px-3 py-1 rounded-full">{admissions_2026.openings_per_class['PP1_to_Grade_6']}</span></li>
                  <li className="flex justify-between items-center"><span>Grade 7</span> <span className="font-bold text-brand-red bg-brand-red/10 px-3 py-1 rounded-full">{admissions_2026.openings_per_class['Grade_7']}</span></li>
                </ul>
              </CardContent>
            </Card>
        </div>

      </div>

      <div className="mt-16 text-center opacity-0 animate-fade-in-up animate-delay-500">
          <Card className="max-w-3xl mx-auto bg-brand-purple/5">
            <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-left">
                    <h3 className="text-2xl font-bold font-heading text-brand-purple">Experience Our Campus</h3>
                    <p className="mt-2 text-lg text-brand-text/80">
                      School tours are currently <span className="font-semibold text-brand-green">{admissions_2026.school_visit_tours.toLowerCase()}</span>. We invite you to see our vibrant learning environment firsthand.
                    </p>
                </div>
                <button className="bg-brand-red text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-red/90 transition-all transform hover:scale-105 whitespace-nowrap">
                    Book a School Tour
                </button>
            </CardContent>
          </Card>
      </div>

    </div>
  );
};

export default AdmissionsPage;