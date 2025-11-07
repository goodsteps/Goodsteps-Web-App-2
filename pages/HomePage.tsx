import React from 'react';
import { schoolData } from '../data/schoolData';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import MissionIcon from '../components/icons/MissionIcon';
import VisionIcon from '../components/icons/VisionIcon';

const StatCard: React.FC<{ value: string; label: string, delay: string }> = ({ value, label, delay }) => (
    <div className={`text-center opacity-0 animate-fade-in-up ${delay}`}>
        <p className="text-5xl font-bold font-heading text-brand-red">{value}</p>
        <p className="text-lg text-brand-text/80 mt-2">{label}</p>
    </div>
);

const HomePage: React.FC = () => {
    const { name, motto, mission, vision } = schoolData.institution;
    return (
        <div>
            {/* Hero Section with Video Background */}
            <div className="relative h-screen min-h-[600px] max-h-[900px] flex items-center justify-center text-center overflow-hidden">
                <video
                    src="https://ik.imagekit.io/kjvqdfdva/Good%20Steps%20Academy.mp4?updatedAt=1762449350880"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                />
                {/* Overlay for text readability */}
                <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>
                
                {/* Content */}
                <div className="relative z-20 container mx-auto px-4 space-y-4 text-white opacity-0 animate-fade-in-up">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold drop-shadow-lg">
                        {name}
                    </h1>
                    <p className="text-xl sm:text-2xl max-w-3xl mx-auto font-semibold drop-shadow-md">
                       "{motto}"
                    </p>
                    <p className="text-lg max-w-3xl mx-auto opacity-90 drop-shadow-md animate-delay-200">
                        Nurturing bright futures where every learner takes confident steps towards excellence and character.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                 <div className="grid md:grid-cols-3 gap-8 text-center mb-20">
                    <StatCard value="2018" label="Year Established" delay="animate-delay-100"/>
                    <StatCard value="CBC" label="Curriculum" delay="animate-delay-200"/>
                    <StatCard value="238+" label="Happy Students" delay="animate-delay-300"/>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div className="opacity-0 animate-fade-in-up animate-delay-300">
                        <Card>
                            <CardHeader className="text-center">
                                <div className="mx-auto bg-brand-purple/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                    <MissionIcon />
                                </div>
                                <CardTitle>Our Mission</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg text-brand-text/80 text-center">{mission}</p>
                            </CardContent>
                        </Card>
                    </div>
                     <div className="opacity-0 animate-fade-in-up animate-delay-500">
                        <Card>
                             <CardHeader className="text-center">
                                <div className="mx-auto bg-brand-red/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                    <VisionIcon />
                                </div>
                               <CardTitle>Our Vision</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg text-brand-text/80 text-center">{vision}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;