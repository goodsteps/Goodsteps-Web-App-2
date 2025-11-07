import React from 'react';
import { schoolData } from '../data/schoolData';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const FeesPage: React.FC = () => {
  const { fees, transport_charges } = schoolData;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold font-heading text-brand-purple opacity-0 animate-fade-in-up">Fee Structure</h1>
        <p className="mt-4 text-xl text-brand-text/80 max-w-3xl mx-auto opacity-0 animate-fade-in-up animate-delay-200">
          A clear breakdown of our fees per term, inclusive of tuition, tea, lunch, and debate clubs.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Tuition Fees */}
        <div className="lg:col-span-2 opacity-0 animate-fade-in-up animate-delay-300">
            <Card>
              <CardHeader>
                <CardTitle>Tuition Fees (Per Term)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="border-b-2 border-gray-200">
                      <tr>
                        <th className="py-3 font-bold text-gray-600">Grade Level</th>
                        <th className="py-3 text-right font-bold text-gray-600">Fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(fees.tuition_per_term).map(([level, cost]) => (
                        <tr key={level} className="border-b last:border-0 odd:bg-gray-50/50">
                          <td className="py-4 font-medium text-brand-text">{level}</td>
                          <td className="py-4 text-right font-bold text-lg text-brand-red">{cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
        </div>

        {/* Other Charges */}
        <div className="opacity-0 animate-fade-in-up animate-delay-500">
            <Card>
              <CardHeader>
                <CardTitle>Other Charges</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {Object.entries(fees.other_charges).map(([charge, cost]) => (
                     <li key={charge} className="flex justify-between items-center text-md">
                        <span className="text-brand-text/90">{charge.replace(/_/g, ' ')}</span>
                        <span className="font-semibold text-brand-text">{cost}</span>
                     </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
        </div>
      </div>

       {/* Transport Charges */}
        <div className="mt-16 opacity-0 animate-fade-in-up animate-delay-300">
             <Card>
                <CardHeader>
                    <CardTitle className="text-center">Transport Charges (Per Term)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50">
                                <tr className="border-b-2 border-gray-200">
                                    <th className="p-4 font-bold text-gray-600">Zone</th>
                                    <th className="p-4 font-bold text-gray-600">Route</th>
                                    <th className="p-4 text-right font-bold text-gray-600">Two Way</th>
                                    <th className="p-4 text-right font-bold text-gray-600">One Way</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transport_charges.zones.map(zone => (
                                    <tr key={zone.zone} className="border-b last:border-0 even:bg-gray-50/50">
                                        <td className="p-4 font-bold text-brand-purple">{zone.zone}</td>
                                        <td className="p-4 text-brand-text/80">{zone.route}</td>
                                        <td className="p-4 text-right font-semibold text-brand-red">{zone.two_way}</td>
                                        <td className="p-4 text-right font-semibold text-brand-red">{zone.one_way}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
};

export default FeesPage;