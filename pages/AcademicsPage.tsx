
import React, { useState } from 'react';
import { schoolData } from '../data/schoolData';
import Card, { CardContent } from '../components/ui/Card';
import { CoCurricularActivity, SchoolEvent } from '../types';
import CalendarIcon from '../components/icons/CalendarIcon';

const ActivityCard: React.FC<{ activity: CoCurricularActivity }> = ({ activity }) => (
    <div className="p-6 bg-brand-background rounded-lg border border-gray-200/80 text-center transition-transform hover:scale-105 h-full flex flex-col justify-center">
        <h4 className="font-bold text-lg text-brand-purple">{activity.activity}</h4>
        <p className="text-sm text-gray-500 mt-1">{activity.classes}</p>
        <p className="mt-3 font-bold text-xl text-brand-red">{activity.fee_per_term}</p>
    </div>
);

const EventCard: React.FC<{ event: SchoolEvent }> = ({ event }) => {
    const date = new Date(event.date);
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const day = date.getDate();

    const categoryColor = {
        'Term Dates': 'bg-brand-green/10 text-brand-green',
        'Holiday': 'bg-brand-yellow/20 text-yellow-800',
        'Event': 'bg-brand-purple/10 text-brand-purple'
    }

    return (
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 text-center bg-brand-red text-white rounded-lg p-2 w-16">
                <p className="text-sm font-bold">{month}</p>
                <p className="text-2xl font-bold">{day}</p>
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <h4 className="font-bold text-lg text-brand-purple">{event.title}</h4>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryColor[event.category]}`}>
                        {event.category}
                    </span>
                </div>
                {event.description && <p className="text-brand-text/80 mt-1">{event.description}</p>}
            </div>
        </div>
    )
}

const AcademicsPage: React.FC = () => {
  const { co_curricular_activities, school_calendar } = schoolData;
  const [activeTab, setActiveTab] = useState<'compulsory' | 'optional'>('compulsory');

  const tabs = {
    compulsory: co_curricular_activities.compulsory,
    optional: co_curricular_activities.optional
  };
  
  const sortedCalendar = [...school_calendar].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold font-heading text-brand-purple opacity-0 animate-fade-in-up">Academics & Activities</h1>
        <p className="mt-4 text-xl text-brand-text/80 max-w-3xl mx-auto opacity-0 animate-fade-in-up animate-delay-200">
            We follow the Competency-Based Curriculum (CBC), enhanced with a rich variety of activities to foster holistic development.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <div className="flex justify-center border-b-2 border-gray-200 mb-8">
            <button 
                onClick={() => setActiveTab('compulsory')}
                className={`px-6 py-3 text-lg font-semibold transition-colors duration-300 relative ${activeTab === 'compulsory' ? 'text-brand-purple' : 'text-gray-500 hover:text-brand-purple'}`}
            >
                Compulsory Activities
                {activeTab === 'compulsory' && <span className="absolute bottom-[-2px] left-0 w-full h-1 bg-brand-purple rounded-t-lg"></span>}
            </button>
            <button 
                onClick={() => setActiveTab('optional')}
                className={`px-6 py-3 text-lg font-semibold transition-colors duration-300 relative ${activeTab === 'optional' ? 'text-brand-purple' : 'text-gray-500 hover:text-brand-purple'}`}
            >
                Optional Activities
                {activeTab === 'optional' && <span className="absolute bottom-[-2px] left-0 w-full h-1 bg-brand-purple rounded-t-lg"></span>}
            </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 opacity-0 animate-fade-in-up">
            {tabs[activeTab].map((act, i) => (
                <div key={i} className="opacity-0 animate-fade-in-up" style={{animationDelay: `${i * 100}ms`}}>
                    <ActivityCard activity={act} />
                </div>
            ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-16 opacity-0 animate-fade-in-up animate-delay-300">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-heading text-brand-purple flex items-center justify-center gap-3">
                <CalendarIcon />
                School Calendar
            </h2>
        </div>
        <Card>
            <CardContent className="space-y-6">
                {sortedCalendar.map((event, i) => (
                    <div key={i} className={`py-4 ${i < sortedCalendar.length - 1 ? 'border-b border-gray-200/80' : ''}`}>
                         <EventCard event={event} />
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default AcademicsPage;