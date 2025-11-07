import React, { useState } from 'react';
import { schoolData } from '../data/schoolData';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import BookIcon from '../components/icons/BookIcon';
import CheckIcon from '../components/icons/CheckIcon';

const BooklistsPage: React.FC = () => {
  const { booklists } = schoolData;
  const grades = Object.keys(booklists);
  const [activeGrade, setActiveGrade] = useState(grades[0]);

  const gradeDisplayNames: { [key: string]: string } = {
      'pp1': 'Pre-Primary 1',
      'pp2': 'Pre-Primary 2',
      'grade1': 'Grade 1',
      'grade2': 'Grade 2',
      'grade3': 'Grade 3',
      'grade4': 'Grade 4',
      'grade5': 'Grade 5',
      'grade6': 'Grade 6',
      'grade7': 'Grade 7',
  };

  const selectedBooklist = booklists[activeGrade];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold font-heading text-brand-purple opacity-0 animate-fade-in-up">Textbook & Resource Lists</h1>
        <p className="mt-4 text-xl text-brand-text/80 max-w-3xl mx-auto opacity-0 animate-fade-in-up animate-delay-200">
          Find the required textbooks and stationery for each grade level for the academic year.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="mb-8 overflow-x-auto">
          <div className="flex justify-start md:justify-center border-b-2 border-gray-200">
            {grades.map(grade => (
              <button
                key={grade}
                onClick={() => setActiveGrade(grade)}
                className={`px-4 py-3 text-sm md:text-base font-semibold transition-colors duration-300 relative whitespace-nowrap ${activeGrade === grade ? 'text-brand-purple' : 'text-gray-500 hover:text-brand-purple'}`}
              >
                {gradeDisplayNames[grade]}
                {activeGrade === grade && <span className="absolute bottom-[-2px] left-0 w-full h-1 bg-brand-purple rounded-t-lg"></span>}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start opacity-0 animate-fade-in-up">
            {/* Textbooks */}
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><BookIcon /> Textbooks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="border-b-2 border-gray-200">
                                    <tr>
                                        <th className="py-3 font-bold text-gray-600">Subject</th>
                                        <th className="py-3 font-bold text-gray-600">Title</th>
                                        <th className="py-3 font-bold text-gray-600 hidden sm:table-cell">Publisher</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedBooklist.textbooks.map((book, index) => (
                                        <tr key={index} className="border-b last:border-0 odd:bg-gray-50/50">
                                            <td className="py-4 font-medium text-brand-text">{book.subject}</td>
                                            <td className="py-4 text-brand-text/90">{book.title}</td>
                                            <td className="py-4 text-brand-text/70 hidden sm:table-cell">{book.publisher}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Stationery */}
            <div>
                 <Card>
                    <CardHeader>
                        <CardTitle>Stationery</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {selectedBooklist.stationery.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="mt-1"><CheckIcon/></div>
                                    <span className="ml-3 text-md text-brand-text/90">{item.item} - <strong>Qty: {item.quantity}</strong></span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BooklistsPage;
